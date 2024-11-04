---
title: Learning Large Graph Property Prediction via Graph Segment Training
authors:
- Kaidi Cao
- Phitchaya Mangpo Phothilimthana
- Sami Abu-El-Haija
- Dustin Zelle
- Yanqi Zhou
- Charith Mendis
- Jure Leskovec
- Bryan Perozzi
date: '2023-11-01'
publishDate: '2024-11-04T04:02:22.385365Z'
publication_types:
- manuscript
publication: '*arXiv*'
abstract: 'Learning to predict properties of a large graph is challenging because
  each prediction requires the knowledge of an entire graph, while the amount of memory
  available during training is bounded. Here we propose Graph Segment Training (GST),
  a general framework that utilizes a divide-and-conquer approach to allow learning
  large graph property prediction with a constant memory footprint. GST first divides
  a large graph into segments and then backpropagates through only a few segments
  sampled per training iteration. We refine the GST paradigm by introducing a historical
  embedding table to efficiently obtain embeddings for segments not sampled for backpropagation.
  To mitigate the staleness of historical embeddings, we design two novel techniques.
  First, we finetune the prediction head to fix the input distribution shift. Second,
  we introduce Stale Embedding Dropout to drop some stale embeddings during training
  to reduce bias. We evaluate our complete method GST+EFD (with all the techniques
  together) on two large graph property prediction benchmarks: MalNet and TpuGraphs.
  Our experiments show that GST+EFD is both memory-efficient and fast, while offering
  a slight boost on test accuracy over a typical full graph training regime.'
tags:
- Computer Science - Machine Learning
- Computer Science - Social and Information Networks
links:
- name: URL
  url: http://arxiv.org/abs/2305.12322
---
