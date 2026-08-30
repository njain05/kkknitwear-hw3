@AGENTS.md

# K.K Knitwear Club — project rules

A B2B website for a knitted-fabric manufacturer in Ludhiana, Punjab (established 1990).
Replaces a dated IndiaMART-templated site.

**Read this before changing anything.** The rules below encode decisions already made
with the client. Do not quietly revise them.

---

## 1. Who this site is for

**Business buyers only.** Garment manufacturers, sportswear brands, home-furnishing
makers, wholesalers, buying agents. Fabric is bought by the kilo in lots.

There is **no consumer path**. Never add a shopping cart, checkout, payment flow,
"Buy now", wishlist, or per-piece pricing. The conversion goal is always an **enquiry**,
never a transaction.

**Positioning: mid-market, reliability-led.** The company is a ~₹1.5–5 Cr proprietorship
with 11–25 staff. Do not write luxury/couture copy — it invites certification questions
(Oeko-Tex, GOTS) the business cannot currently answer, and it damages credibility.
Do not write bargain-basement copy either. The register is: *established, capable,
easy to deal with.*

**USP — lead with flexibility.** The genuine advantage over a large mill is that K.K will
accept a small lot and turn it around fast. Heritage (36 years) is the trust backup,
not the headline.

- Tagline: **"Mill-direct knitted fabric. Small lots, quick turnaround."**
- Supporting: *"Knitting for Ludhiana's garment trade since 1990."*

---

## 2. Hard rules

These are not stylistic preferences. Breaking one is a bug.

| # | Rule |
|---|---|
| 1 | **Never render a price.** No ₹, no "Rs", no "/kg", no ranges. Everything is *price on request*. |
| 2 | **No cart, checkout, or payment.** Enquiry only. |
| 3 | **No raw hex colours in components.** Use the Tailwind theme tokens in `app/globals.css`. |
| 4 | **One responsive codebase.** Never a separate mobile site or a UA-sniffing branch. |
| 5 | **Company facts are immutable.** GST, address, year, owner — `lib/site.ts` is the only source. Never invent or "improve" them. |
| 6 | **Invented specs stay marked.** Any value not recovered from the old site carries `TODO: confirm with client`. |
| 7 | **Generated textures are never a product's main image**, and are never captioned as a photo of a specific fabric. |
| 8 | **Static export must keep working.** No server-only APIs in page rendering. |

### On prices
The old site published ₹150–210/kg. The client chose to withhold these. The recovered
figures live in `docs/internal-reference.md` for the client's own use — they must never
reach `content/` or any component, because a static export ships its data to the browser.

---

## 3. Feature parity — never drop these

The old site's capabilities must all survive. Removing one is a regression:

- All **17 product categories** listed and reachable
- Product enquiry capability
- Company profile / About, including the full facts table
- Complete contact details — address, phone, email
- Product photo gallery
- Sitemap
- Social sharing (Facebook, X/Twitter, LinkedIn)
- Trust indicators — GST number, years in business
- Per-product specifications

---

## 4. Architecture

```
app/            routes (App Router, static export)
components/     UI; components/textures/ holds the SVG fabric generators
content/        product data + image manifest (the content layer)
lib/            site facts, product helpers, types
scripts/        fetch-assets.mjs (photo pipeline), gen-textures.mjs
public/products/ 114 recovered product photos
docs/           internal reference — NOT shipped
```

**Data flow:** `content/products/*` → `lib/products.ts` helpers → pages.
Never fetch product data at runtime; it is compiled in.

**Quote basket:** React context + `localStorage`, hydrated client-side. Submitting
builds both a mailto/API payload and a WhatsApp deep link.

---

## 5. Imagery

Two layers, and the distinction matters.

**Layer 1 — recovered photos (primary).** 114 real photos in `public/products/`,
mapped by `content/image-manifest.json`. These are close-up texture shots on
inconsistent backgrounds, so they must run **edge-to-edge** in cards — never floated
on white as if they were styled product shots.

**Layer 2 — generated SVG textures (supporting).** Seamless knit-structure patterns
(`components/textures/`). For category tiles, backgrounds, empty states, OG images,
and cards where no photo exists.

**If a photo exists for a product, the photo wins.** A texture may never stand in as a
product detail page's main image.

---

## 6. Design

**Paper & Indigo.** Chrome stays near-neutral because fabric supplies all the colour —
the photos range from sage to olive to cream, and a coloured UI fights them.

Tokens live in `app/globals.css` (`paper`, `ink`, `indigo`, `clay`, `rule`).
Type: Instrument Sans for UI, Instrument Serif for display accents.

Mobile-first. A sticky bottom action bar (Call · WhatsApp · Quote) on small screens.

---

## 7. Open items — client input needed

1. ~~Phone/WhatsApp number~~ — resolved from the company business card:
   Avnish Jain +91 93169 15363 (primary, WhatsApp), factory +91 98157 37965.
2. ~~Destination email~~ — resolved: avnishjain10@yahoo.co.in
3. **Registered address conflicts between sources.** The old site gives
   *Street No-1, Kabir Nagar, Sekhonwal Road, Ludhiana 141008*; the business
   card gives *Kabir Nagar, St. No. 0, Sekhewal Road, Shivpuri, Ludhiana* with
   no PIN. Street number, road spelling and locality all differ. `lib/site.ts`
   still carries the old-site version. Do not guess — confirm which is correct.
4. **The company makes more than this site shows.** The business card reads
   "Mfrs & Fabricators of: Knitted Cloth, Terry Towel & Cotton Handkerchief"
   and carries two brands, **DHOOM** (handkerchief) and **K.K. TOWEL**.
   Terry and handkerchief lines are absent from the catalogue, and neither
   brand appears anywhere. This also means the Terry Fabric category is a real
   line, not a stale listing.
5. Specs, MOQ and lead times for products lacking recovered data.
6. Whether any certifications exist (changes the trust band).
7. Higher-resolution photography for detail pages.
8. A second contact, **Kimti Lal Jain**, appears on the card; his number was
   redacted on the copy supplied, so he is not listed on the site.
