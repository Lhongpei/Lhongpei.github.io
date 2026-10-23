---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

image:
  filename: sharing.jpg
  focal_point: Smart
  preview_only: true

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: academic-bio
    id: bio
    content:
      username: admin
      eyebrow: Optimization & Machine Learning
      role: First-year PhD student
      affiliation: Northwestern IEMS
      affiliation_url: https://www.iems.northwestern.edu/
      introduction: |-
        I am a **first-year PhD student** in the Department of Industrial Engineering & Management Sciences (IEMS) at **Northwestern University**.
      background: |-
        I received my Bachelor's degree from Shanghai University of Finance and Economics (September 2021 – June 2025), where I was advised by Prof. **[Yinyu Ye](https://stanford.edu/~yyye/)** and Prof. **[Dongdong Ge](https://acem.sjtu.edu.cn/en/faculty/gedongdong.html)**.
      button:
        text: Download CV
        url: uploads/resume.pdf
      research:
        title: Research
        summary: 'My interests lie in optimization, artificial intelligence, and the intersection of operations research and machine learning.'
        areas:
          - title: Optimization for AI
            text: 'Developing optimization-based algorithmic frameworks to enhance the training and inference efficiency of large language models (LLMs).'
          - title: AI for Optimization
            text: 'Accelerating classical optimization methods with AI techniques that learn from historical data.'
          - title: GPU-Accelerated Optimization
            text: 'Designing and implementing efficient algorithms for large-scale optimization, with a particular focus on GPU-accelerated methods.'
    design:
      css_class: bio-home
      spacing:
        padding: ['0', '0', '0', '0']

  - block: home-publications
    id: papers
    content:
      title: Recent research
      count: 5
    design:
      css_class: bio-publications
      spacing:
        padding: ['0', '0', '0', '0']
---
