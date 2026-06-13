---
title: 'D-PDLP: Scaling PDLP to Distributed Multi-GPU Systems'
authors:
- Hongpei Li
- Yicheng Huang
- Huikang Liu
- Dongdong Ge
- Yinyu Ye
date: '2026-01-01'
publishDate: '2026-01-01T00:00:00.000000Z'
publication_types:
- manuscript
publication: '*arXiv*'
doi: 10.48550/arXiv.2601.07628
abstract: We present a distributed framework of the Primal-Dual Hybrid Gradient (PDHG)
  algorithm for solving massive-scale linear programming (LP) problems. Although PDHG-based
  solvers demonstrate strong performance on single-node GPU architectures, their applicability
  to industrial-scale instances is often limited by single-GPU computational throughput.
  To overcome these challenges, we propose D-PDLP, the first Distributed PDLP framework,
  which extends PDHG to a multi-GPU setting via a practical two-dimensional grid partitioning
  of the constraint matrix. To improve load balance and computational efficiency, we
  introduce a block-wise random permutation strategy combined with nonzero-aware matrix
  partitioning. By distributing the intensive computation required in PDHG iterations,
  the proposed framework harnesses multi-GPU parallelism to achieve substantial speedups
  with relatively low communication overhead. Extensive experiments on standard LP
  benchmarks (including MIPLIB and Mittelmann instances) as well as huge-scale real-world
  datasets show that our distributed implementation, built upon cuPDLPx, achieves strong
  scalability and high performance while preserving full FP64 numerical accuracy.
tags:
- Mathematics - Optimization and Control
url_pdf: https://arxiv.org/pdf/2601.07628
url_code: https://github.com/Lhongpei/D-PDLP
---
