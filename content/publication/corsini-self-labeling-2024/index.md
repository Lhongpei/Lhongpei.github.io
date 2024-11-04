---
title: Self-Labeling the Job Shop Scheduling Problem
authors:
- Andrea Corsini
- Angelo Porrello
- Simone Calderara
- Mauro Dell'Amico
date: '2024-01-01'
publishDate: '2024-11-04T04:02:22.334850Z'
publication_types:
- manuscript
publication: '*arXiv*'
abstract: In this work, we propose a Self-Supervised training strategy specifically
  designed for combinatorial problems. One of the main obstacles in applying supervised
  paradigms to such problems is the requirement of expensive target solutions as ground-truth,
  often produced with costly exact solvers. Inspired by Semi- and Self-Supervised
  learning, we show that it is possible to easily train generative models by sampling
  multiple solutions and using the best one according to the problem objective as
  a pseudo-label. In this way, we iteratively improve the model generation capability
  by relying only on its self-supervision, completely removing the need for optimality
  information. We prove the effectiveness of this Self-Labeling strategy on the Job
  Shop Scheduling (JSP), a complex combinatorial problem that is receiving much attention
  from the Reinforcement Learning community. We propose a generative model based on
  the well-known Pointer Network and train it with our strategy. Experiments on two
  popular benchmarks demonstrate the potential of this approach as the resulting models
  outperform constructive heuristics and current state-of-the-art Reinforcement Learning
  proposals.
tags:
- Computer Science - Artificial Intelligence
- Computer Science - Machine Learning
- G.2
- I.2
- Mathematics - Combinatorics
links:
- name: URL
  url: http://arxiv.org/abs/2401.11849
---
