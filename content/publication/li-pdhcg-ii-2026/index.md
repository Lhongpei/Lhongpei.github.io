---
title: 'PDHCG-II: An Enhanced Version of PDHCG for Large-Scale Convex QP'
authors:
- Hongpei Li
- Yicheng Huang
- Huikang Liu
- Dongdong Ge
- Yinyu Ye
date: '2026-02-01'
publishDate: '2026-02-01T00:00:00.000000Z'
publication_types:
- manuscript
publication: '*arXiv*'
doi: 10.48550/arXiv.2602.23967
abstract: Quadratic programming (QP) is a fundamental optimization model with wide-ranging
  applications in decision-making and machine learning, yet efficiently solving large-scale
  instances remains a major computational challenge. Building upon the recently developed
  PDHCG framework, we propose PDHCG-II, an enhanced first-order solver tailored for
  large-scale convex QPs. The proposed method explicitly exploits the quadratic structure
  of the objective and incorporates several key algorithmic innovations, including
  Halpern-type acceleration and a PID-controlled adaptive update of the primal-dual
  weight. To further improve practical performance, PDHCG-II introduces a refined adaptive
  termination criterion for inner subproblems to prevent over-solving, together with
  an infeasibility detection mechanism for robust handling of ill-posed instances.
  Extensive numerical experiments demonstrate that PDHCG-II consistently achieves 2.5-5
  times speedups over PDHCG on standard QP benchmarks. To facilitate reproducibility
  and broader adoption, we release a CUDA-C implementation of PDHCG-II as open-source
  software.
tags:
- Mathematics - Optimization and Control
url_pdf: https://arxiv.org/pdf/2602.23967
url_code: https://github.com/Lhongpei/PDHCG
---
