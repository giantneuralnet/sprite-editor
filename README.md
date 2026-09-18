# Sprite

A minimal, touch-friendly sprite sheet editor for iPhone and desktop. Plain HTML, CSS, and JavaScript; no build step or dependencies required.

## Run

```sh
python3 -m http.server 8787 --directory public
```

Open `http://localhost:8787`. For iPhone home-screen installation and offline caching, serve the app over HTTPS and choose **Share → Add to Home Screen** in Safari.

## Features

- New sheets with 8, 16, or 32 pixel sprites and 2×2, 4×4, 6×6, or 8×8 layouts.
- PNG import with a live sprite-grid preview; dimensions must divide evenly by the chosen sprite size.
- Tap a sprite to edit; pencil, eraser, flood fill, eyedropper, undo, and redo.
- Pixel-aligned transparency checkerboard.
- Hue, saturation, and vibrancy controls; saved, recent, and in-sheet colors.
- Named PNG export, with imported filenames preserved and `.png` added automatically.
- Optional Web Audio drawing sounds based on the selected color.
- Device-local autosave, home-screen manifest, and offline service worker.

## Files

- `public/editor.html`: complete app, including its styles and JavaScript.
- `public/index.html`: identical app for the root URL; keep synchronized with `editor.html`.
- `public/manifest.webmanifest`: installable app metadata.
- `public/sw.js`: offline caching. Increment its cache version when updating assets.
- `public/icon-192.png` and `public/icon-512.png`: app icons.

Serve `public` at the domain root. PNG images stay on the device; there is no backend or upload service. Autosaves are browser- and origin-specific, so export PNGs before changing domains or clearing browser data. The sound toggle starts muted and remembers your preference. Page zoom is disabled for the touch drawing interface.
