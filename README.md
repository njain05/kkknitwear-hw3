# K.K Knitwear Club

**Mill-direct knitted fabric. Small lots, quick turnaround.**

B2B fabric catalogue for [K.K Knitwear Club](https://www.kkknitwearclub.com), a knitted-fabric manufacturer in Ludhiana, Punjab, established 1990. Replaces a dated IndiaMART-templated site.

---

## What this site is

A product catalogue and enquiry channel for business buyers — garment manufacturers, sportswear brands, wholesalers, and buying agents. There is no shopping cart, no checkout, and no pricing. The conversion goal is always an **enquiry**.

17 knitted-fabric categories, 114 recovered product photos, and a quote-basket that builds a WhatsApp/email RFQ in one tap.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Instrument Sans · Instrument Serif (Google Fonts) |
| Images | Custom build-time pipeline (`scripts/optimise-images.mjs`) |
| Deployment | Vercel (static) |

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

Build the static export:

```bash
npm run build     # outputs to /out
```

---

## Project structure

```
app/              Pages (App Router)
components/       UI components + SVG fabric texture generators
content/          Product data & image manifest — the content layer
lib/              Site facts (site.ts), product helpers, types
public/products/  114 recovered product photos
scripts/          Image pipeline + content validator
docs/             Internal reference (not shipped)
```

All company facts (GST, address, phone, owner) live exclusively in `lib/site.ts`.

---

## Key features

- **17 product categories** with dedicated landing pages
- **Quote basket** — add products, submit as WhatsApp deep link or email RFQ
- **114 real product photos** from the original IndiaMART listing
- **Generated SVG textures** for categories without photos
- Mobile-first with a sticky Call · WhatsApp · Quote action bar
- Fully static export — no server required, deployable anywhere
- Structured data (Organization schema) for SEO

---

## Licence

All code is MIT. Product photos and company details belong to K.K Knitwear Club, Ludhiana.
