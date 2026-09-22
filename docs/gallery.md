# Gallery albums

The Gallery landing page groups existing work into Drawings (including logos and design) and Models. These albums reuse the images in `content/gallery_pic/`; the original artwork URLs remain available. `source_tag` selects the existing category and `cover_page` selects its cover artwork.

## Add a photography album

Create `content/gallery/your-album-name/index.md` and put the photos in the same directory. Alternatively, run `hugo new content --kind gallery gallery/your-album-name`.

Example metadata (replace the title and image filenames with your own):

```yaml
---
title: 'An Afternoon in Chicago'
type: gallery
category: photography
date: '2026-09-21'
draft: true
location: 'Chicago, IL'
camera: 'iPhone 16 Pro Max'
summary: 'A walk through the city.'
cover: featured.jpg
photos:
  - src: featured.jpg
    alt: 'Describe what is visible in this photograph.'
    caption: 'Optional caption'
  - src: lakefront.jpg
    alt: 'Describe the second photograph.'
---
```

The cover is cropped only on the landing-page card. Photos inside the album retain their aspect ratios and follow the order in `photos`. The slideshow rotates every five seconds, with play/pause, previous/next, clickable progress markers, and fullscreen controls. It supports arrow keys and horizontal swipes. Buttons appear while the pointer is over the player, or on keyboard focus and touch. Moving the pointer outside hides them, even when paused. The progress strip always stays visible along the bottom edge. On touch screens, tap once to reveal controls and tap outside to dismiss them.

Clicking the main photo or a photo in the grid opens a full-screen lightbox and pauses playback. Use arrows or swipe to switch photos, +/− to zoom, Fit to reset, and Escape or × to close. Scroll to pan a zoomed photo. Download original saves the selected source file. Only the selected original is loaded in the lightbox; the grid and player use WebP previews. Closing restores focus and leaves the player paused on the last viewed photo.

Reduced-motion preferences disable autoplay and transitions. Without JavaScript, the grid links directly to the originals. Include the cover in `photos` if it should also appear inside the album. `camera` is optional and appears right-aligned below the date and location; omit it to hide the device label. Photo captions are also optional.

The card shows the title above the date (bottom left) and location (bottom right). Albums are sorted newest first using the outing date. Set `draft: false` when the photos and text are ready. Preview drafts with `hugo server -D`.
