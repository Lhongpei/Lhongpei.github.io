---
title: Interpretable Modeling of Deep Reinforcement Learning Driven Scheduling
authors:
- Boyang Li
- Zhiling Lan
- Michael E. Papka
date: '2023-10-01'
publishDate: '2024-11-04T04:02:22.342102Z'
publication_types:
- paper-conference
publication: '*2023 31st International Symposium on Modeling, Analysis, and Simulation
  of Computer and Telecommunication Systems (MASCOTS)*'
doi: 10.1109/MASCOTS59514.2023.10387651
abstract: In the field of high-performance computing (HPC), there has been recent
  exploration into the use of deep reinforcement learning for cluster scheduling (DRL
  scheduling), which has demonstrated promising outcomes. However, a significant challenge
  arises from the lack of interpretability in deep neural networks (DNN), rendering
  them as black-box models to system managers. This lack of model interpretability
  hinders the practical deployment of DRL scheduling. In this work, we present a framework
  called IRL (Interpretable Reinforcement Learning) to address the issue of interpretability
  of DRL scheduling. The core idea is to interpret DNN (i.e., the DRL policy) as a
  decision tree by utilizing imitation learning. Unlike DNN, decision tree models
  are non-parametric and easily comprehensible to humans. To extract an effective
  and efficient decision tree, IRL incorporates the Dataset Aggregation (DAgger) algorithm
  and introduces the notion of critical state to prune the derived decision tree.
  Through trace-based experiments, we demonstrate that IRL is capable of converting
  a black-box DNN policy into an interpretable rulebased decision tree while maintaining
  comparable scheduling performance. Additionally, IRL can contribute to the setting
  of rewards in DRL scheduling.
tags:
- Computer Science - Artificial Intelligence
- Computer Science - Machine Learning
- Computer Science - Distributed
- Parallel
- and Cluster Computing
links:
- name: URL
  url: http://arxiv.org/abs/2403.16293
---
