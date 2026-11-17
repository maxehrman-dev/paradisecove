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
Missing photos render as dashed placeholder slots that name the file they expect. Drop real photos into `public/assets/photos/` with these names and swap the slot for an image:
- `lifestyle-shore.jpg` (home, shore)
- `crewneck-front.jpg`, `crewneck-back.jpg`, embroidery details (see catalog)
- `tee-XX-front.jpg` / `tee-XX-back.jpg` for each tee

## Email signup
`POST /api/signup` forwards to `SIGNUP_WEBHOOK_URL` when set. Without it, the form tells visitors signups open soon.

## Motion rules
Only three wave moves: the looping waterline, the wave wipe between sections, the Size by Swell wave. Logos only fade in. Transform and opacity only. `prefers-reduced-motion` turns all of it off.
