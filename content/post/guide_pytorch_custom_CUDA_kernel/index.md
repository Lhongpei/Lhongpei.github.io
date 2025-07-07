---
Title: Use Customized CUDA kernel in your PyTorch Code
Date: 2025-07-07
Categories:
- Guide  
- LLM  
- GPU
- CUDA Kernel
Commentable: true  
---

Sometimes, PyTorch might not natively support a specific operation you need, or its existing implementation leads to redundant calculations. In such scenarios, implementing a customized operation using a custom CUDA kernel can significantly improve performance. This blog post will guide you step-by-step through the process of binding a custom CUDA kernel with PyTorch. Also, this blog willl contain the process of implementing the api of PyTorch's `autograd`.

## Step 1: Write Your CUDA Kernel

First, let's write the CUDA kernel and its PyTorch wrapper. For this example, we'll implement an element-wise multiplication kernel. Create a file named ```elementwise_mult.cu``` inside ```my_kernel/kernel/```.

```// elementwise_mult.cu
// my_kernel/kernel/elementwise_mult.cu
#include <torch/extension.h>
#include <cuda_runtime.h>

// Macro to check if a tensor is on CUDA
#define CHECK_CUDA(x) TORCH_CHECK(x.is_cuda(), #x " must be a CUDA tensor!")
// Macro to check if a tensor is contiguous in memory
#define CHECK_CONTIGUOUS(x) TORCH_CHECK(x.is_contiguous(), #x " must be contiguous!")
// Macro to check if a tensor has the expected data type (float in this case)
#define CHECK_INPUT_TYPE(x) TORCH_CHECK(x.dtype() == torch::kFloat, #x " must be of float type!")

// CUDA kernel for element-wise multiplication
__global__ void elementwise_mult_kernel(
    const float* __restrict__ a,
    const float* __restrict__ b,
    float* __restrict__ result,
    int n
) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        result[idx] = a[idx] * b[idx];
    }
}

// PyTorch wrapper function for the CUDA kernel.
void elementwise_mult_torch(
    torch::Tensor a,
    torch::Tensor b,
    torch::Tensor result // The output tensor, pre-allocated by PyTorch
) {
    // Perform checks on input tensors to ensure they meet the kernel's requirements.
    CHECK_CUDA(a);
    CHECK_CUDA(b);
    CHECK_CUDA(result);
    CHECK_CONTIGUOUS(a);
    CHECK_CONTIGUOUS(b);
    CHECK_CONTIGUOUS(result);
    CHECK_INPUT_TYPE(a);
    CHECK_INPUT_TYPE(b);
    CHECK_INPUT_TYPE(result);

    TORCH_CHECK(a.numel() == b.numel(), "Input tensors must have the same number of elements!");
    TORCH_CHECK(a.numel() == result.numel(), "Result tensor must have the same number of elements as inputs!");

    // Get the total number of elements in the tensors.
    int n = a.numel();

    int block_size = 256;
    int num_blocks = (n + block_size - 1) / block_size;

    // Launch the CUDA kernel.
    elementwise_mult_kernel<<<num_blocks, block_size>>>(
        a.data_ptr<float>(),
        b.data_ptr<float>(),
        result.data_ptr<float>(),
        n
    );
    cudaDeviceSynchronize();
}

// PYBIND11_MODULE is a macro that creates the entry point for the Python module.
// The first argument "elementwise_mult" is the name of the Python module that will be imported.
// The second argument "m" is a pybind11::module object, through which we can define functions, classes, etc.
PYBIND11_MODULE(elementwise_mult, m) {
    // m.def() binds a C++ function to a Python function.
    // "elementwise_mult": The name of the function as it will appear in Python.
    // &elementwise_mult_torch: A pointer to the C++ function to be exposed.
    // "Element-wise multiplication of two tensors": A docstring for the Python function.
    m.def("elementwise_mult", &elementwise_mult_torch, "Element-wise multiplication of two tensors");

}

// Check macros
#define CHECK_CUDA(x) TORCH_CHECK(x.is_cuda(), #x " must be a CUDA tensor")
#define CHECK_CONTIGUOUS(x) TORCH_CHECK(x.is_contiguous(), #x " must be contiguous")

// PyBind11 module
PYBIND11_MODULE(elementwise_mult, m) {
    m.def("elementwise_mult", &elementwise_mult_torch, "Element-wise multiplication of two tensors");
}
```

## Step 2: Set Up Compilation

To compile your CUDA kernel and link it with PyTorch, you'll need `pyproject.toml` and `setup.py` files. Assume your directory structure is as follows:

```md
root/
├── pyproject.toml    # new
├── setup.py          # new
├── my_kernel/
│   ├── __init__.py   # Can be empty or contain Python imports
│   └── kernel/
│       └── elementwise_mult.cu
```

`pyproject.toml`: This file specifies the build system requirements.
```
# pyproject.toml
[build-system]
requires = ["setuptools", "wheel", "torch"]
build-backend = "setuptools.build_meta"
```

`setup.py`: This script uses `setuptools` and PyTorch's `torch.utils.cpp_extension` to define how your extension module is built.
```
# setup.py
from setuptools import setup
from torch.utils.cpp_extension import CUDAExtension, BuildExtension

setup(
    name='elementwise_mult', # The name of your Python package
    ext_modules=[
        CUDAExtension(
            name='elementwise_mult', # The name of the compiled C++ extension module
            sources=['my_kernel/kernel/elementwise_mult.cu'], # Path to your CUDA source file(s)
            extra_compile_args={ # Additional compiler arguments
                'cxx': ['-O3'], # Optimization level for C++ compiler
                'nvcc': ['-O3', '--use_fast_math'] # Optimization level and fast math for NVCC (CUDA compiler)
            }
        )
    ],
    cmdclass={'build_ext': BuildExtension}, # Use PyTorch's custom build extension
    # This ensures that the CUDA extension is built correctly.
)
```

Now, navigate to your `root` directory in the terminal and run the following command to compile and install your custom kernel in editable mode:
run
```
pip install -e .
```
The `-e` flag (editable mode) means that changes to your source files (like `elementwise_mult.cu`) will be reflected without needing to reinstall, though you'll need to re-run the `pip install -e .` command if you modify `setup.py` or add/remove source files.

To clean up build artifacts and cache:

```
python setup.py clean
```


## Step 3: Usage

Here is a simple example.
```
import torch
import elementwise_mult

# create torch tensor
a = torch.randn(1000, device='cuda')
b = torch.randn(1000, device='cuda')
result = torch.empty_like(a)

# use new kernel
elementwise_mult.elementwise_mult(a, b, result)

# test result
print(torch.allclose(result, a * b)) 
```

## Make Your Kernel Differentiable (Autograd Function)
For your custom operation to integrate seamlessly into PyTorch's computational graph and support automatic differentiation, you need to wrap it in a `torch.autograd.Function`. This involves defining `forward` and `backward` methods.

Create a Python file, for example, `my_kernel/__init__.py`, and add the following code.
```
# my_kernel/__init__.py
import torch
from torch.autograd import Function

# Import the compiled C++ extension.
# This 'elementwise_mult' refers to the name defined in PYBIND11_MODULE and setup.py.
import elementwise_mult_cuda_extension # Renamed to avoid conflict if a Python file is also named elementwise_mult

class ElementwiseMultFunction(Function):
    """
    Autograd Function for our custom element-wise multiplication CUDA kernel.
    This allows PyTorch to compute gradients through our custom operation.
    """

    @staticmethod
    def forward(ctx, a, b):
        """
        Forward pass of the operation.
        ctx: A context object that can be used to stash information for backward computation.
        a, b: Input tensors.
        """
        # Check Inputs
        if not a.is_cuda or not b.is_cuda:
            raise TypeError("Inputs must be CUDA tensors!")
        if a.shape != b.shape:
            raise ValueError("Input tensors must have the same shape!")
        if a.dtype != b.dtype:
            raise TypeError("Input tensors must have the same data type!")
        if a.dtype != torch.float32: # Our kernel currently only supports float32
            raise TypeError("Input tensors must be of float32 type!")

        # Create an output tensor of the same shape and type as inputs, on the same device.
        output = torch.empty_like(a)

        # Call our custom CUDA kernel through the imported C++ extension.
        elementwise_mult_cuda_extension.elementwise_mult(a, b, output)

        # Save tensors needed for the backward pass.
        # For element-wise multiplication, we need the original inputs to compute gradients.
        ctx.save_for_backward(a, b)

        return output

    @staticmethod
    def backward(ctx, grad_output):
        """
        Backward pass of the operation (computes gradients).
        ctx: The context object from the forward pass.
        grad_output: The gradient of the loss with respect to the output of this operation.
        """
        # Retrieve the saved tensors from the forward pass.
        a, b = ctx.saved_tensors

        # Initialize gradients for inputs a and b.
        grad_a = None
        grad_b = None

        # Compute gradients:
        # For output = a * b,
        # d(output)/da = b
        # d(output)/db = a
        # So, grad_a = grad_output * d(output)/da = grad_output * b
        # And, grad_b = grad_output * d(output)/db = grad_output * a

        # Check if gradients are required
        if ctx.needs_input_grad[0]:
            grad_a = grad_output * b
        if ctx.needs_input_grad[1]:
            grad_b = grad_output * a

        return grad_a, grad_b

# Create a convenient Python function to use the autograd.Function
def elementwise_mult(a, b):
    """
    A user-friendly API.
    """
    return ElementwiseMultFunction.apply(a, b)
```

### Usage

Now you can use your custom element-wise multiplication operation in your PyTorch code, and it will be fully differentiable!

```
import torch
from my_kernel import elementwise_mult

a = torch.randn(1000, device='cuda', requires_grad=True)
b = torch.randn(1000, device='cuda', requires_grad=True)

# Use your new custom kernel function
result = elementwise_mult(a, b)

# Test the forward pass result
print(f"Forward pass correct: {torch.allclose(result, a * b)}")

# Perform a backward pass to compute gradients
loss = result.sum()
loss.backward()

# Check the computed gradients against PyTorch's native gradients

# Expected grad_a = 1 * b = b
# Expected grad_b = 1 * a = a

print(f"Gradient for 'a' correct: {torch.allclose(a.grad, b)}")
print(f"Gradient for 'b' correct: {torch.allclose(b.grad, a)}")

# Example with different shapes (but same number of elements)
a_reshaped = torch.randn(10, 100, device='cuda', requires_grad=True)
b_reshaped = torch.randn(10, 100, device='cuda', requires_grad=True)
result_reshaped = elementwise_mult(a_reshaped, b_reshaped)
print(f"\nForward pass with reshaped tensors correct: {torch.allclose(result_reshaped, a_reshaped * b_reshaped)}")

loss_reshaped = result_reshaped.sum()
loss_reshaped.backward()
print(f"Gradient for 'a_reshaped' correct: {torch.allclose(a_reshaped.grad, b_reshaped)}")
print(f"Gradient for 'b_reshaped' correct: {torch.allclose(b_reshaped.grad, a_reshaped)}")

```

## Conclusion
You have successfully bound a custom CUDA kernel to PyTorch, enabling it to perform element-wise multiplication and support automatic differentiation. This process is fundamental for implementing highly optimized custom operations in deep learning. Please feel free to comment!