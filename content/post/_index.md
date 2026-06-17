---
title: Blog
type: landing
cms_exclude: true

design:
  # Default section spacing
  spacing: "1rem"

sections:
  - block: markdown
    content:
      title: Blog
      text: ""
    design:
      css_class: dark
      spacing:
        padding: ['8rem', '0', '8rem', '0']
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: blog-bg.jpg
          filters:
            brightness: 0.6
          size: cover
          position: center
          parallax: true
  - block: collection
    id: posts
    content:
      title: ""
      text: ""
      count: 0
      filters:
        folders:
          - post
        exclude_featured: false
    design:
      view: article-grid
      columns: '3'
---
