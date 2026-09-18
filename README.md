# Sprite

A minimal, touch-friendly sprite sheet editor for iPhone and desktop. Plain HTML, CSS, and JavaScript; no build step or dependencies required.

## Run

```sh
python3 -m http.server 8787 --directory public
```

Open `http://localhost:8787`. For iPhone home-screen installation and offline caching, serve the app over HTTPS and choose **Share → Add to Home Screen** in Safari.

## Features

- New sheets with 8, 16, or 32 pixel sprites and 2×2, 4×4, 6×6, 8×8, or 16×16 layouts.
- PNG import with a live sprite-grid preview; dimensions must divide evenly by the chosen sprite size.
- Home always supports box selection and dragging; tap a selected tile or group to edit. Full-sheet Edit, Copy, Paste, and Clear controls support undo/redo for paste and clear.
- Box-select and drag tile groups in the sheet or pixel regions in the editor. Moves replace destination pixels, preserve transparency, and support undo/redo.
- Edit and Tint operate on the whole selected rectangle; Copy, Paste, and Clear also support groups.
- Play selected tiles as animation frames in row order, with Play/Pause, Close, and configurable FPS (default 8).
- Pencil, eraser, fill, and color adjustments respect the pixel selection. Pixel Copy/Paste preserves alpha and clips to the current selection. Tap in pixel Select mode, or tap Select again while active, to deselect. Choosing a color in the editor activates Pencil.
- Previous/next arrows advance the editing window by one sprite, preserving its dimensions; the edit navigation row is Undo, Left, Up, coordinates, Down, Right, Redo. Vertical arrows shift one sprite row without changing the edit window size.
- Home returns to the sheet, Map opens tile testing, and Mute toggles drawing audio. The current color and Pick sit beside the recent-color strip. Sprite coordinates and navigation arrows align below a fixed square canvas frame; dimensions and save status align above it. The menu, canvas frame, navigation, and tools form one evenly spaced, bottom-anchored stack. Unused vertical space stays above the stack. Reserved control rows keep the frame stationary across modes.
- Pencil, eraser, flood fill, eyedropper, undo, and redo.
- Global color adjustments for the selected sprite: live preview, cumulative hue/saturation/brightness sliders that recenter on release, Cancel/Done, and one-step undo. Alpha is preserved.
- Pixel-aligned transparency checkerboard.
- Tile testing mode: select a drawn tile and paint an 8×8 test map, hide grid lines to inspect seams, erase, clear, and undo/redo without changing the source sprites.
- Color changes apply with Done; Close discards the selection.
- Hue, saturation, and vibrancy controls; tappable original, complementary, and new color comparisons. Saved colors start with black and white. Recently painted colors and saved palettes persist locally between sessions.
- Named PNG export, with imported filenames preserved and `.png` added automatically.
- Optional Web Audio drawing sounds based on the selected color.
- Device-local autosave, home-screen manifest, and offline service worker.
- Automatic update checks on launch, return to the app, reconnection, and every minute while visible. Updates reload after three idle seconds outside dialogs, preserving the sheet, test map, view, and undo/redo history. If browser storage is full, automatic reload is deferred.

## Files

- `public/editor.html`: complete app, including its styles and JavaScript.
- `public/index.html`: identical app for the root URL; keep synchronized with `editor.html`.
- `public/manifest.webmanifest`: installable app metadata.
- `public/sw.js`: offline caching. Increment its cache version when updating assets.
- `public/icon-192.png` and `public/icon-512.png`: app icons.

Serve `public` at the domain root. PNG images stay on the device; there is no backend or upload service. Autosaves are browser- and origin-specific, so export PNGs before changing domains or clearing browser data. The sound toggle starts muted and remembers your preference. Page zoom is disabled for the touch drawing interface.

## Interaction checks

Run `node tests/editor-interactions.cjs` to check selection/movement, multi-tile edits, undo/redo, and animation timing using a simulated DOM and canvas.

Generated with AI.
