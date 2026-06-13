---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: resume-biography
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
      # Show a call-to-action button under your biography? (optional)
      button:
        text: Download CV
        url: uploads/resume.pdf
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: background.jpeg
          filters:
            brightness: 0.6
          size: cover
          position: center
          parallax: true

  - block: markdown
    content:
      title: ''
      subtitle: ''
      text: |-
        <h3 style="display: flex; align-items: center; gap: 0.5rem; margin: 0;">
          <img src="/uploads/icon.png" width="30" style="margin: 0;" />
          About Me
        </h3>


        I will join the Department of Industrial Engineering & Management Sciences (IEMS) at **Northwestern University** as a PhD student in **Fall 2026**.

        I received my Bachelor's degree from Shanghai University of Finance and Economics (2021.9 - 2025.6), in the Pilot Class of Interdisciplinary Sciences.

        <!--col-->

        ### 📚 My Research

        My research interests include **Optimization**, **Artificial Intelligence (AI)**, and the **interdisciplinary area between Operations Research and Machine Learning**.

        Currently, I am particularly focused on:

        * Developing optimization-based algorithmic frameworks to enhance the training and inference efficiency of large language models (LLMs)
        * Accelerating classical optimization methods by leveraging AI techniques that learn from historical data
        * Designing and implementing efficient optimization algorithms for large-scale problems, with a particular focus on GPU-accelerated methods
    design:
      columns: '2'

  - block: markdown
    content:
      title: Recent Publications
      text: ""
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: bg.jpg
          filters:
            brightness: 0.6
          size: cover
          position: center
          parallax: true

  - block: collection
    id: papers
    content:
      title: ""
      text: ""
      filters:
        folders:
          - publication
        exclude_featured: false
    design:
      view: citation
---
