---
title: Software
type: landing
cms_exclude: true

sections:
  - block: software-projects
    id: software
    content:
      title: Software
      eyebrow: Research software
      description: GPU-accelerated solvers for large-scale optimization.
      image: software-bg.jpg
      projects:
        - name: CARDAL
          visual: rank-adaptive
          diagram_description: 'CARDAL solves semidefinite programs: minimize the matrix inner product of C and X, subject to A(X) = b and positive-semidefinite X. A thin factor F represents X = F F-transpose. Adding a correction column updates the symmetric matrix while preserving positive semidefiniteness.'
          category: Semidefinite programming
          repo: Lhongpei/CARDAL
          description: A low-rank augmented Lagrangian solver for large-scale semidefinite programs, with multi-GPU acceleration.
          topics: [GPU, Multi-GPU, Low-Rank, Semidefinite Programming]
          paper_url: https://arxiv.org/abs/2607.17933
        - name: PDHCG
          visual: primal-dual
          diagram_description: 'PDHCG alternates updates of the primal variable x and dual variable y. The problem is to minimize one-half x-transpose H x plus c-transpose x, subject to A x belonging to the set C.'
          category: Quadratic programming
          repo: Lhongpei/PDHCG
          description: A GPU-accelerated first-order solver for convex conic quadratic programs, with multi-GPU support.
          topics: [GPU, Multi-GPU, First-Order Methods, Quadratic Programming]
          paper_url: https://arxiv.org/abs/2602.23967
          page_url: https://pdhcg.github.io/PDHCG/
        - name: D-PDLP
          visual: distributed
          diagram_description: 'Adapted from D-PDLP Figure 1: four GPUs form a two-dimensional mesh. Each device stores A[i,j], x[j] and y[i]. Local A-transpose-y products reduce vertically along R to update x; local A-x-bar products reduce horizontally along C to update y.'
          category: Linear programming
          repo: Lhongpei/D-PDLP
          description: A first-order linear programming solver accelerated across multiple GPUs.
          topics: [GPU, Multi-GPU, First-Order Methods, Linear Programming]
          paper_url: https://arxiv.org/abs/2601.07628
    design:
      css_class: catalog-page software-page
      spacing:
        padding: ['0', '0', '0', '0']
---
