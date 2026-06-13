---
title: 'OSDN: Improving Delta Rule with Provable Online Preconditioning in Linear Attention'
authors:
- Chenyu Zhou
- Hongpei Li
- Yuerou Liu
- Jianghao Lin
- Dongdong Ge
- Yinyu Ye
date: '2026-05-01'
publishDate: '2026-05-01T00:00:00.000000Z'
publication_types:
- manuscript
publication: '*arXiv*'
doi: 10.48550/arXiv.2605.13473
abstract: Linear attention and state-space models offer constant-memory alternatives
  to softmax attention, but often struggle with in-context associative recall. The
  Delta Rule mitigates this by writing each token via one step of online gradient descent.
  However, its step size relies on a single scalar gate that ignores the feature-wise
  curvature of the inner objective. We propose Online Scaled DeltaNet (OSDN), which
  augments the scalar gate with a diagonal preconditioner updated online via hypergradient
  feedback. Crucially, this right-preconditioning is algebraically equivalent to a
  per-feature scaling of the write-side key. This equivalence allows OSDN to strictly
  preserve the hardware-friendly chunkwise parallel pipeline of DeltaNet without incurring
  high-dimensional state overhead. Theoretically, by exploiting the exact-quadratic
  structure of the inner regression loss, we establish super-geometric convergence
  against a right-Newton comparator and prove an algorithm-aligned token-local residual
  contraction bound. To handle non-stationary contexts, we further introduce Adaptive
  Preconditioner Forgetting (APF) to dynamically refresh stale calibration. Empirically,
  OSDN demonstrates strong performance across scales. At the 340M-parameter scale,
  OSDN improves JRT-style in-context recall by 32% over DeltaNet. Scaling to 1.3B parameters,
  it achieves a 39% reduction in the recall residual ratio while maintaining parity
  on general downstream tasks (e.g., perplexity and LongBench).
tags:
- Computer Science - Machine Learning
url_pdf: https://arxiv.org/pdf/2605.13473
---
