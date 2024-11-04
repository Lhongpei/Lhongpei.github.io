---
title: 'QPALM: a proximal augmented lagrangian method for nonconvex quadratic programs'
authors:
- Ben Hermans
- Andreas Themelis
- Panagiotis Patrinos
date: '2022-09-01'
publishDate: '2024-11-04T04:02:22.667789Z'
publication_types:
- article-journal
publication: '*Mathematical Programming Computation*'
doi: 10.1007/s12532-022-00218-0
abstract: We propose QPALM, a nonconvex quadratic programming (QP) solver based on
  the proximal augmented Lagrangian method. This method solves a sequence of inner
  subproblems which can be enforced to be strongly convex and which therefore admit
  a unique solution. The resulting steps are shown to be equivalent to inexact proximal
  point iterations on the extended-real-valued cost function, which allows for a fairly
  simple analysis where convergence to a stationary point at an R-linear rate is shown.
  The QPALM algorithm solves the subproblems iteratively using semismooth Newton directions
  and an exact linesearch. The former can be computed efﬁciently in most iterations
  by making use of suitable factorization update routines, while the latter requires
  the zero of a monotone, one-dimensional, piecewise afﬁne function. QPALM is implemented
  in open-source C code, with tailored linear algebra routines for the factorization
  in a self-written package LADEL. The resulting implementation is shown to be extremely
  robust in numerical simulations, solving all of the Maros-Meszaros problems and
  ﬁnding a stationary point for most of the nonconvex QPs in the Cutest test set.
  Furthermore, it is shown to be competitive against state-of-the-art convex QP solvers
  in typical QPs arising from application domains such as portfolio optimization and
  model predictive control. As such, QPALM strikes a unique balance between solving
  both easy and hard problems efﬁciently.
links:
- name: URL
  url: https://link.springer.com/10.1007/s12532-022-00218-0
---
