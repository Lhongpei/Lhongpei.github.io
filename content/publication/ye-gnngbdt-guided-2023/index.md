---
title: GNN&GBDT-Guided Fast Optimizing Framework for Large-scale Integer Programming
authors:
- Huigen Ye
- Hua Xu
- Hongyan Wang
- Chengming Wang
- Yu Jiang
date: '2023-07-01'
publishDate: '2024-11-04T04:02:22.400335Z'
publication_types:
- paper-conference
publication: '*Proceedings of the 40th International Conference on Machine Learning*'
abstract: 'The latest two-stage optimization framework based on graph neural network
  (GNN) and large neighborhood search (LNS) is the most popular framework in solving
  large-scale integer programs (IPs). However, the framework can not effectively use
  the embedding spatial information in GNN and still highly relies on large-scale
  solvers in LNS, resulting in the scale of IP being limited by the ability of the
  current solver and performance bottlenecks. To handle these issues, this paper presents
  a GNN&GBDT-guided fast optimizing framework for large-scale IPs that only uses a
  small-scale optimizer to solve large-scale IPs efficiently. Specifically, the proposed
  framework can be divided into three stages: Multi-task GNN Embedding to generate
  the embedding space, GBDT Prediction to effectively use the embedding spatial information,
  and Neighborhood Optimization to solve large-scale problems fast using the small-scale
  optimizer. Extensive experiments show that the proposed framework can solve IPs
  with millions of scales and surpass SCIP and Gurobi in the specified wall-clock
  time using only a small-scale optimizer with 30% of the problem size. It also shows
  that the proposed framework can save 99% of running time in achieving the same solution
  quality as SCIP, which verifies the effectiveness and efficiency of the proposed
  framework in solving large-scale IPs.'
links:
- name: URL
  url: https://proceedings.mlr.press/v202/ye23e.html
---
