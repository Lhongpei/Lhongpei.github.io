---
title: A Practical and Optimal First-Order Method for Large-Scale Convex Quadratic
  Programming
authors:
- Haihao Lu
- Jinwen Yang
date: '2024-05-01'
publishDate: '2024-11-04T04:02:22.640096Z'
publication_types:
- manuscript
publication: '*arXiv*'
abstract: Convex quadratic programming (QP) is an important class of optimization
  problem with wide applications in practice. The classic QP solvers are based on
  either simplex or barrier method, both of which suffer from the scalability issue
  because their computational bottleneck is solving linear equations. In this paper,
  we design and analyze a first-order method for QP, called restarted accelerated
  primal-dual hybrid gradient (rAPDHG), whose computational bottleneck is matrix-vector
  multiplication. We show that rAPDHG has a linear convergence rate to an optimal
  solution when solving QP, and the obtained linear rate is optimal among a wide class
  of primal-dual methods. Furthermore, we connect the linear rate with a sharpness
  constant of the KKT system of QP, which is a standard quantity to measure the hardness
  of a continuous optimization problem. Numerical experiments demonstrate that both
  restarts and acceleration can significantly improve the performance of the algorithm.
  Lastly, we present PDQP.jl, an opensource solver based on rAPDHG that can be run
  on both GPU and CPU. With a numerical comparison with SCS and OSQP on standard QP
  benchmark sets and large-scale synthetic QP instances, we demonstrate the effectiveness
  of rAPDHG for solving QP.
tags:
- Mathematics - Optimization and Control
links:
- name: URL
  url: http://arxiv.org/abs/2311.07710
---
