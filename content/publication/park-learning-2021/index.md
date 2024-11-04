---
title: 'Learning to schedule job-shop problems: Representation and policy learning
  using graph neural network and reinforcement learning'
authors:
- Junyoung Park
- Jaehyeong Chun
- Sang Hun Kim
- Youngkook Kim
- Jinkyoo Park
date: '2021-06-01'
publishDate: '2024-11-04T04:02:22.208770Z'
publication_types:
- article-journal
publication: '*International Journal of Production Research*'
doi: 10.1080/00207543.2020.1870013
abstract: We propose a framework to learn to schedule a job-shop problem (JSSP) using
  a graph neural network (GNN) and reinforcement learning (RL). We formulate the scheduling
  process of JSSP as a sequential decision-making problem with graph representation
  of the state to consider the structure of JSSP. In solving the formulated problem,
  the proposed framework employs a GNN to learn that node features that embed the
  spatial structure of the JSSP represented as a graph (representation learning) and
  derive the optimum scheduling policy that maps the embedded node features to the
  best scheduling action (policy learning). We employ Proximal Policy Optimization
  (PPO) based RL strategy to train these two modules in an end-to-end fashion. We
  empirically demonstrate that the GNN scheduler, due to its superb generalization
  capability, outperforms practically favored dispatching rules and RL-based schedulers
  on various benchmark JSSP. We also confirmed that the proposed framework learns
  a transferable scheduling policy that can be employed to schedule a completely new
  JSSP (in terms of size and parameters) without further training.
tags:
- Computer Science - Artificial Intelligence
- Computer Science - Multiagent Systems
links:
- name: URL
  url: http://arxiv.org/abs/2106.01086
---
