---
title: 'Trust Region Policy Optimization with Optimal Transport Discrepancies: Duality
  and Algorithm for Continuous Actions'
authors:
- Antonio Terpin
- Nicolas Lanzetti
- Batuhan Yardim
- Florian Dörfler
- Giorgia Ramponi
date: '2022-10-01'
publishDate: '2024-11-04T04:02:22.721552Z'
publication_types:
- manuscript
publication: '*arXiv*'
abstract: Policy Optimization (PO) algorithms have been proven particularly suited
  to handle the high-dimensionality of real-world continuous control tasks. In this
  context, Trust Region Policy Optimization methods represent a popular approach to
  stabilize the policy updates. These usually rely on the Kullback-Leibler (KL) divergence
  to limit the change in the policy. The Wasserstein distance represents a natural
  alternative, in place of the KL divergence, to deﬁne trust regions or to regularize
  the objective function. However, state-of-the-art works either resort to its approximations
  or do not provide an algorithm for continuous state-action spaces, reducing the
  applicability of the method. In this paper, we explore optimal transport discrepancies
  (which include the Wasserstein distance) to deﬁne trust regions, and we propose
  a novel algorithm – Optimal Transport Trust Region Policy Optimization (OT-TRPO)
  – for continuous state-action spaces. We circumvent the inﬁnite-dimensional optimization
  problem for PO by providing a one-dimensional dual reformulation for which strong
  duality holds. We then analytically derive the optimal policy update given the solution
  of the dual problem. This way, we bypass the computation of optimal transport costs
  and of optimal transport maps, which we implicitly characterize by solving the dual
  formulation. Finally, we provide an experimental evaluation of our approach across
  various control tasks. Our results show that optimal transport discrepancies can
  offer an advantage over state-of-theart approaches.
tags:
- Computer Science - Artificial Intelligence
- Computer Science - Machine Learning
- Electrical Engineering and Systems Science - Systems and Control
links:
- name: URL
  url: http://arxiv.org/abs/2210.11137
---
