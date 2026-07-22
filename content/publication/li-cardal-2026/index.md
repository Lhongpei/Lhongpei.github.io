---
title: 'A Curvature-Aware Rank-Adaptive Distributed Augmented-Lagrangian Solver for Large-Scale SDPs'
authors:
- Hongpei Li
- Huikang Liu
- Dongdong Ge
- Yinyu Ye
date: '2026-07-20'
publishDate: '2026-07-20T13:31:19Z'
publication_types:
- manuscript
publication: '*arXiv*'
doi: 10.48550/arXiv.2607.17933
abstract: We present CARDAL (Curvature-Aware Rank-Adaptive Distributed Augmented
  Lagrangian), a distributed multi-GPU solver for large-scale semidefinite programs
  (SDPs) based on a rank-adaptive Burer-Monteiro factorization and an augmented
  Lagrangian method. At fixed ranks, a matrix-free L-BFGS method with negative-curvature
  corrections targets an approximate Euclidean second-order stationary point of the
  factored augmented Lagrangian. A reverse multiplier shift turns a negative dual-slack
  direction into exact negative curvature after rank expansion, and a small joint
  rank-lift problem selects a batched low-rank correction. A verified slack lower bound
  provides an a posteriori approximate KKT certificate. Our analysis establishes generic
  global-optimality guarantees for heterogeneous products of PSD cones at per-block
  ranks near the Barvinok-Pataki scale, together with a finite-accuracy counterpart
  under blockwise cost smoothing. For scalable execution, CARDAL distributes constraint
  rows, factor columns, and PSD blocks over a Constraint x Rank x Cone device mesh.
  The primal residual, gradient, Hessian-vector products, and slack matrix-vector
  products are evaluated using device-local operations and axis-wise collectives.
  On the Mittelmann benchmark, CARDAL exhibits stronger robustness than existing
  low-rank GPU approaches under a uniform accuracy standard. Experiments on large-scale
  SDP relaxations from robotics, electronic structure, and Max-Cut demonstrate the
  complementary scaling regimes of the three distribution axes, with observed
  wall-clock speedups of up to 4x on four H100 GPUs.
tags:
- Mathematics - Optimization and Control
- Distributed, Parallel, and Cluster Computing
url_pdf: https://arxiv.org/pdf/2607.17933
url_code: https://github.com/Lhongpei/CARDAL
---
