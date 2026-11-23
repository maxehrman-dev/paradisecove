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
| stock-barrel-surfer.jpg | 1502680390469-be75c86b636f | Club Paradise door |
| stock-blue-wave-surfer.jpg | 1455729552865-3658a5d39692 | Club Paradise hero |
| stock-sunset-silhouette.jpg | 1415931633537-351070d20b81 | Home photo band |
| stock-wave-crest.jpg | 1500375592092-40eb2168fd21 | Size by Swell, Story band |
| stock-golden-shore.jpg | 1473116763249-2faaef81ccda | Home story |
| stock-underwater-light.jpg | 1530053969600-caed2596d242 | Footer |

Swap any of them for your own shoot with the same file name.
