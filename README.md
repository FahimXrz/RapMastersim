# RapMaster Simulator (Vite + React + TS)

A lightweight starter of your RapMaster web game. Ready for GitHub Pages and Vercel.

## Dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy
- **Vercel:** Connect repo → import → build command `npm run build`, output `dist`
- **GitHub Pages:** `npm run build && npm run deploy`

### Environment (optional)
Add to Vercel Project Settings → Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
