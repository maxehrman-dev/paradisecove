# Paradise Cove Surf Club website

Next.js (App Router) + Tailwind + Framer Motion. Deploy-ready for Vercel.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Launch flag
`NEXT_PUBLIC_LAUNCHED` (see `.env.example`). `false` shows the coming-soon home: the shore, both doors locked, "First drop coming soon." and the email signup. Set it to `true` in Vercel on launch day and redeploy.

## Products
Everything lives in `data/catalog.json`: collections, products (crewneck $65, tees $40, hoodie in a later drop) and the Club Paradise clubs. No cart yet; every product ends in "Find it at ATLAS · Westfield UTC". A store can read the same file later.

## Assets
`public/assets/logos` holds the brand logo files exactly as supplied (script, stacked, wave in navy and cream, the navy CA 1 shield). Never redraw, recolor or stretch them.
`public/assets/labels` holds the neck label photos (not used yet: they say "Malibu").
The `Slot` component renders a dashed, clearly named placeholder for any photo that doesn't exist yet.

## Email signup
`POST /api/signup` forwards to `SIGNUP_WEBHOOK_URL` when set. Without it, the form tells visitors signups open soon.

## Motion rules
Only three wave moves: the looping waterline, the wave wipe between sections, the Size by Swell wave. Logos only fade in. Transform and opacity only. `prefers-reduced-motion` turns all of it off.

## Instagram
Paste real post links from @paradisecovesurf into `data/instagram.json` → `posts` (e.g. `"https://www.instagram.com/p/ABC123/"`). They render with Instagram's official embed on the home page and Find us (first 3). With no links it shows a follow block, never fake posts.

## Product images
`public/assets/products` holds full-size exports of the Canva mockups: every tee front and back (PCSC Approved Lineup + PCSC Final 8), the off-shoulder crewneck front and back with three real close-up crops, and the hoodie front and back. `public/assets/photos` holds the two lifestyle photos from the brand deck plus the stock vibe photos listed below. Replace any file with a real photo shoot later, keeping the file name.

## Lifestyle and stock photos
Product images only appear where you shop (hero crewneck, the Paradise Cove page, the Club Paradise rack, club card backs). Everything else is real stock photography for vibe, with a gentle scroll parallax (`components/ParallaxPhoto.tsx`, off under reduced motion).

Brand deck: `lifestyle-wakesurf.jpg`, `lifestyle-hoodie-boat.jpg`.

Stock, from Unsplash under the Unsplash License (free for commercial use, no attribution required). Source: `https://unsplash.com/photos/<id>`.

| File | Unsplash id | Used on |
| --- | --- | --- |
| stock-shore-sunrise.jpg | 1476673160081-cf065607f449 | Home shore |
| stock-aerial-surf.jpg | 1505142468610-359e7d316be0 | Home doors background |
| stock-pink-sunset-surfer.jpg | 1502933691298-84fc14542831 | Paradise Cove door, Paradise Cove hero |
| stock-club-longboard.jpg | 1531722569936-825d3dd91b15 | Club Paradise door |
| stock-club-crew-sunset.jpg | 1517699418036-fb5d179fef0c | Club Paradise hero |
| stock-club-palm.jpg | 1520454974749-611b7248ffdb | Club Paradise photo band |
| stock-sunset-silhouette.jpg | 1415931633537-351070d20b81 | Home photo band |
| stock-wave-crest.jpg | 1500375592092-40eb2168fd21 | Size by Swell, Story band |
| stock-golden-shore.jpg | 1473116763249-2faaef81ccda | Home story |
| stock-underwater-light.jpg | 1530053969600-caed2596d242 | Footer |

Swap any of them for your own shoot with the same file name.

## Scroll videos
`components/ScrollSequence.tsx` plays a video by scroll: the first frame shows on arrival, and scrolling moves it forward and back. Frames are WebP stills drawn to a canvas, blended between neighbours, loaded coarse-first so it scrubs right away. Reduced motion shows one still frame with no pinning.

| Folder | Source | Used on |
| --- | --- | --- |
| `public/assets/scroll/wave-d`, `wave-m` | Mixkit 1127 "Person surfing" (120 frames, warm grade, crop follows the surfer; built by `scripts/ride-frames.py`) | Home opener |
| `public/assets/scroll/sunset-d`, `sunset-m` | Mixkit 2168 "Bright orange sunset on beach" (100 frames; `-m` is a portrait crop on the sun) | Club Paradise, house rules at sunset |

Mixkit videos are free for commercial use under the Mixkit License (no attribution). To swap a clip, re-export frames with ffmpeg, for example:

```bash
ffmpeg -t 40 -i clip.mp4 -vf "fps=120/40,scale=1200:-2" -c:v libwebp -quality 42 public/assets/scroll/shore-d/%03d.webp
```

Then update `count` where the sequence is used.

## Artifact preview
The claude.ai artifact is a static copy of the site: a Next static export (in a scratch copy with `app/api` removed and `output: "export"`, `images.unoptimized: true`), turned into plain pages by `scripts/artifact/build.py`. `scripts/artifact/app.js` replaces React in that copy, wiring scroll videos, parallax, Size by Swell, card flips and signup through the `data-*` hooks in the components. The signup there only shows a message, and the map links out, since an artifact can't call the API or embed Google Maps.

```bash
python3 scripts/artifact/build.py <export>/out public <artifact-folder>
```
