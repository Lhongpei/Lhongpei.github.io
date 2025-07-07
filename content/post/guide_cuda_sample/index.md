---
Title: Unlocking Your GPU's Potential--A Guide to CUDA Samples and Performance Testing
Date: 2025-06-17  
Categories:
- Guide  
- LLM  
- GPU
Commentable: true  
---

If you're delving into GPU computing with NVIDIA CUDA, understanding your hardware's capabilities and interconnections is crucial. The CUDA samples provide an excellent starting point for this exploration. This guide will walk you through downloading these samples, compiling them, and then using them to assess your GPU's performance and connectivity.

## Getting the CUDA Samples

The first order of business is to get your hands on the CUDA samples. While the link you provided points to a specific file, it's generally best to clone the entire repository to get all the examples and necessary build files.

1.  **Install Git (if you haven't already):**
    If you don't have Git installed, you'll need it to clone the repository. On Ubuntu/Debian, you can install it with:
    ```bash
    sudo apt update
    sudo apt install git
    ```
    For other operating systems, refer to the Git official documentation.

2.  **Clone the Repository:**
    Open your terminal and navigate to the directory where you want to store the samples. Then, execute the following command:
    ```bash
    git clone https://github.com/NVIDIA/cuda-samples.git
    ```
    This will create a `cuda-samples` directory containing all the sample code.

## Building the CUDA Samples

Once you have the samples, you'll need to compile them. The `cuda-samples` repository typically uses CMake for its build system, which simplifies the process across different platforms.

1.  **Navigate to the Samples Directory:**
    ```bash
    cd cuda-samples
    ```

2.  **Create a Build Directory:**
    It's good practice to build outside the source directory to keep things clean.
    ```bash
    mkdir build
    cd build
    ```

3.  **Run CMake:**
    CMake will configure the build system based on your environment.
    ```bash
    cmake ..
    ```
    *Self-correction: Ensure you have CMake installed (`sudo apt install cmake` on Ubuntu/Debian) and that your CUDA Toolkit is properly installed and configured in your `PATH` and `LD_LIBRARY_PATH` environment variables. If not, CMake might complain about not finding CUDA.*

4.  **Build the Samples:**
    Now, compile all the samples using `make`. The `-j` flag can speed up compilation by using multiple CPU cores.
    ```bash
    make -j$(nproc)
    ```
    This process might take some time, depending on your system's specifications.

## Single GPU Performance Testing (Bandwidth)

After a successful build, you can start running performance tests. The `bandwidthTest` utility is excellent for assessing the memory bandwidth between your GPU and its global memory.

1.  **Navigate to the `bandwidthTest` executable:**
    ```bash
    cd ~/cuda-samples/build/Samples/1_Utilities/bandwidthTest
    ```
    *(Note: The `~/` indicates your home directory. Adjust the path if you cloned the repository elsewhere.)*

2.  **Run the test:**
    ```bash
    ./bandwidthTest
    ```
    This test will output the measured host-to-device, device-to-host, and device-to-device memory transfer rates, providing valuable insights into your GPU's memory subsystem performance.

## Inter-GPU Transfer Testing (P2P Bandwidth and Latency)

If you have multiple GPUs in your system, testing the direct peer-to-peer (P2P) transfer performance is crucial for applications that involve significant data exchange between GPUs.

1.  **Navigate to the `p2pBandwidthLatencyTest` executable:**
    ```bash
    cd ~/cuda-samples/build/Samples/5_Domain_Specific/p2pBandwidthLatencyTest
    ```

2.  **Run the test:**
    ```bash
    ./p2pBandwidthLatencyTest
    ```
    This utility will enumerate your GPUs and report the direct P2P bandwidth and latency between each pair of GPUs that support the feature. It will also indicate if P2P is not supported for certain connections, often requiring NVLink or PCIe direct access features.

## Understanding GPU Connectivity with `nvidia-smi topo -m`

Beyond synthetic benchmarks, understanding the physical and logical connections between your GPUs is vital. The `nvidia-smi` utility, part of the NVIDIA driver installation, provides a powerful tool for this.

1.  **Execute the command:**
    ```bash
    nvidia-smi topo -m
    ```
    This command will generate a topology map of your GPUs, indicating how they are connected (e.g., via PCIe, NVLink, or CPU bridges). This output is invaluable for debugging multi-GPU setups and optimizing your applications for data locality and transfer efficiency. You'll see symbols like `NV` for NVLink, `PHB` for PCIe Host Bridge, and `SYS` for System/CPU connections.

---

By following these steps, you've successfully downloaded, built, and executed essential CUDA samples to benchmark your GPU's performance and understand its connectivity. These insights are fundamental for developing high-performance CUDA applications and optimizing your multi-GPU setups. Keep experimenting with the other samples to deepen your understanding of CUDA's capabilities!