---
title: Restarted Primal-Dual Hybrid Conjugate Gradient Method for Large-Scale Quadratic
  Programming
authors:
- Yicheng Huang
- Wanyu Zhang
- Hongpei Li
- Dongdong Ge
- Huikang Liu
- Yinyu Ye
date: '2024-10-01'
publishDate: '2024-11-04T04:25:01.539523Z'
publication_types:
- manuscript
publication: '*arXiv*'
abstract: Convex quadratic programming (QP) is an essential class of optimization
  problems with broad applications across various fields. Traditional QP solvers,
  typically based on simplex or barrier methods, face significant scalability challenges.
  In response to these limitations, recent research has shifted towards matrix-free
  first-order methods to enhance scalability in QP. Among these, the restarted accelerated
  primal-dual hybrid gradient (rAPDHG) method, proposed by Lu, has gained notable
  attention due to its linear convergence rate to an optimal solution and its straightforward
  implementation on Graphics Processing Units (GPUs). Building on this framework,
  this paper introduces a restarted primal-dual hybrid conjugate gradient (PDHCG)
  method, which incorporates conjugate gradient (CG) techniques to address the primal
  subproblems inexactly. We demonstrate that PDHCG maintains a linear convergence
  rate with an improved convergence constant and is also straightforward to implement
  on GPUs. Extensive numerical experiments on both synthetic and real-world datasets
  demonstrate that our method significantly reduces the number of iterations required
  to achieve the desired accuracy compared to rAPDHG. Additionally, the GPU implementation
  of our method achieves state-of-the-art performance on large-scale problems. In
  most large-scale scenarios, our method is approximately 5 times faster than rAPDHG
  and about 100 times faster than other existing methods. These results highlight
  the substantial potential of the proposed PDHCG method to greatly improve both the
  efficiency and scalability of solving complex quadratic programming challenges.
tags:
- Mathematics - Optimization and Control
links:
- name: URL
  url: http://arxiv.org/abs/2405.16160
---
