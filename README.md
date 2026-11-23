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
`public/assets/products` holds full-size exports of the Canva mockups: every tee front and back (PCSC Approved Lineup + PCSC Final 8), the off-shoulder crewneck front and back with three real close-up crops, and the hoodie front and back. `public/assets/photos` holds the two lifestyle photos from the brand deck. Replace any file with a real photo shoot later, keeping the file name.

## Lifestyle photos
`public/assets/photos`: the wake-surf and hoodie-on-the-boat photos (brand deck), plus four crops from the Paradise Cove Launch deck in Canva: `bluff-surfer.jpg`, `barrel.jpg`, `woodie.jpg`, `crewneck-beach.jpg`. Confirm you own or have a license for the Launch deck images before going live; swap any of them for your own shoot with the same file name.
