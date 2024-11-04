---
title: 'A Comprehensive Study on Large-Scale Graph Training: Benchmarking and Rethinking'
authors:
- Keyu Duan
- Zirui Liu
- Peihao Wang
- Wenqing Zheng
- Kaixiong Zhou
- Tianlong Chen
- Xia Hu
- Zhangyang Wang
date: -01-01
publishDate: '2024-11-04T04:02:22.371181Z'
publication_types:
- article-journal
abstract: Large-scale graph training is a notoriously challenging problem for graph
  neural networks (GNNs). Due to the nature of evolving graph structures into the
  training process, vanilla GNNs usually fail to scale up, limited by the GPU memory
  space. Up to now, though numerous scalable GNN architectures have been proposed,
  we still lack a comprehensive survey and fair benchmark of this reservoir to ﬁnd
  the rationale for designing scalable GNNs. To this end, we ﬁrst systematically formulate
  the representative methods of large-scale graph training into several branches and
  further establish a fair and consistent benchmark for them by a greedy hyperparameter
  searching. In addition, regarding efﬁciency, we theoretically evaluate the time
  and space complexity of various branches and empirically compare them w.r.t GPU
  memory usage, throughput, and convergence. Furthermore, We analyze the pros and
  cons for various branches of scalable GNNs and then present a new ensembling training
  manner, named EnGCN, to address the existing issues. Remarkably, our proposed method
  has achieved new state-ofthe-art (SOTA) performance on large-scale datasets. Our
  code is available at https://github.com/VITA-Group/Large_Scale_GCN_Benchmarking.
tags:
- l2t
---
