---
Title: Accelerating Nonlinear Programming on GPUs
Date: 2025-08-12
Categories:
- Guide  
- LLM  
- GPU
- CUDA Kernel
Commentable: true  
---


# 🚀 Accelerating Nonlinear Programming on GPUs: rAPDHG + L-BFGS-B for Large-Scale Problems

Solving large-scale **Nonlinear Programming (NLP)** problems efficiently is a challenge — especially when the problem includes **linear equality constraints** and **box constraints**. Traditional CPU-based solvers can be fast for small problems, but when you scale up to millions of variables, they start to feel… well, a bit like dial-up internet.

In this post, I’ll walk you through a **GPU-accelerated solver** I’ve been building, combining two powerful ideas:

* **Restarted Adaptive Primal-Dual Hybrid Gradient (rAPDHG)**
* **L-BFGS-B** for exact primal subproblem solves

The result? A method that **runs circles around Mosek** (a top-tier commercial optimizer) on certain large-scale problems — particularly the **Fisher market equilibrium problem with CES utilities**.

The source code is publicly available at https://github.com/Lhongpei/PDNLP/.

---

## 💡 The Core Idea

We’re solving problems of the form:

$$
\begin{aligned}
& \min_{x} && f(x) \\
& \text{s.t.} && Ax = b \\
& && l \leq x \leq u
\end{aligned}
$$

Here, $f(x)$ is smooth and convex.
The **PDHG** algorithm is a natural choice — it alternates between primal and dual updates:

$$
\begin{aligned}
x^{k+1} &= \arg\min_{l \leq x \leq u} \; f(x) + y^\top (Ax - b) + \frac{1}{2\tau^{k+1}} \|x - x^{k-1}\|^2 \\
y^{k+1} &= y^k + \delta^{k+1}\big(A(2x^{k+1} - x^k) - b\big)
\end{aligned}
$$

The **primal subproblem** is a box-constrained nonlinear optimization problem.
Instead of approximating it, we **solve it exactly** using a GPU-accelerated **L-BFGS-B**. This gives us:

* More accurate primal solutions
* Better stability when constraints are tight
* Faster convergence overall

For acceleration, we add **Adaptive step size with restarts** — boosting PDHG’s convergence speed.

---

## 🔧 Implementation Notes

* We adapted the **[cuLBFGSB](https://github.com/raymondyfei/lbfgsb-gpu)** CUDA implementation, integrating it into our rAPDHG loop.
* This lets us handle **box constraints** directly inside the primal step — no dualization tricks needed.
* The code is currently specialized for the Fisher market problem but will eventually support more general NLPs.

---

## 📊 Case Study: Fisher Market Equilibrium with CES Utilities

**The Fisher market problem** with CES utilities can be formulated as:

$$
\begin{aligned}
& \min_{x} && -\sum_{i=1}^{n} w_i \log \left( \sum_{j=1}^{m} u_{ij} x_{ij}^p \right)^{1/p} \\
& \text{s.t.} && \sum_{i=1}^{n} x_{ij} = 1, \quad \forall j \\
& && x_{ij} \ge 0
\end{aligned}
$$

For Mosek, we reformulated it into a **conic program** with power and exponential cones.
For our solver, we tackled it directly via rAPDHG + L-BFGS-B.

We stop when the **relative residual**:

$$
r = \max(r_{\text{primal}}, r_{\text{dual}}) < 1\times 10^{-4}
$$

---

## ⚡ Benchmark Results

| Agents (n) | Goods (m) | Variables | Mosek (s) | Our Solver (s) | Speedup |
| ---------- | --------- | --------- | --------- | -------------- | ------- |
| 1,000      | 400       | 80,000    | 1.60      | **1.33**       | 1.2×    |
| 10,000     | 4,000     | 800,000   | 29.13     | **2.75**       | 10.6×   |
| 100,000    | 4,000     | 8M        | 218.56    | **9.48**       | 23.1×   |
| 100,000    | 5,000     | 10M       | 302.05    | **20.98**      | 14.4×   |
| 1M         | 10,000    | 20M       | 556.57    | **87.61**      | 6.4×    |

**Takeaway:** As the problem size scales, the GPU solver’s advantage becomes huge — over **23× faster** in some cases.

---

## 🗺️ Roadmap

* ✅ Fisher problem solver
* 🔜 General-purpose API
* 🔜 Full documentation

---

**Final Thoughts:**
By pairing **exact GPU-accelerated subproblem solves** with an **accelerated primal-dual method**, we can push large-scale NLP solving into a new performance regime. While still in development, this approach shows promise for domains like economics, network optimization, and large-scale resource allocation.

If you’re working on similar problems or want to try this out, feel free to reach out at `ishongpeili@gmail.com`.

