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

### Scope: knitted fabric only — this is deliberate

The company's business card reads _"Mfrs & Fabricators of: Knitted Cloth, Terry
Towel & Cotton Handkerchief"_ and carries two house brands, **DHOOM**
(handkerchief) and **K.K. TOWEL**. None of that is on this site, and that is a
decision the client made, not an oversight.

**This site sells knitted fabric by the kilo.** Terry towels and handkerchiefs are
finished goods sold to a different buyer in a different way, and mixing them in
would blur the positioning. Do not add them, or the brands, without the client
asking.

Note the distinction: the **Terry Fabric** category is in scope — that is cloth.
A terry _towel_ is not.

**Positioning: mid-market, reliability-led.** The company is a ~₹1.5–5 Cr proprietorship
with 11–25 staff. Do not write luxury/couture copy — it invites certification questions
(Oeko-Tex, GOTS) the business cannot currently answer, and it damages credibility.
Do not write bargain-basement copy either. The register is: _established, capable,
easy to deal with._

**USP — lead with flexibility.** The genuine advantage over a large mill is that K.K will
accept a small lot and turn it around fast. Heritage (36 years) is the trust backup,
not the headline.

- Tagline: **"Mill-direct knitted fabric. Small lots, quick turnaround."**
- Supporting: _"Knitting for Ludhiana's garment trade since 1990."_

---

## 2. Hard rules

These are not stylistic preferences. Breaking one is a bug.

| #   | Rule                                                                                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Never render a price.** No ₹, no "Rs", no "/kg", no ranges. Everything is _price on request_.                                |
| 2   | **No cart, checkout, or payment.** Enquiry only.                                                                               |
| 3   | **No raw hex colours in components.** Use the Tailwind theme tokens in `app/globals.css`.                                      |
| 4   | **One responsive codebase.** Never a separate mobile site or a UA-sniffing branch.                                             |
| 5   | **Company facts are immutable.** GST, address, year, owner — `lib/site.ts` is the only source. Never invent or "improve" them. |
| 6   | **Invented specs stay marked.** Any value not recovered from the old site carries `TODO: confirm with client`.                 |
| 7   | **Generated textures are never a product's main image**, and are never captioned as a photo of a specific fabric.              |
| 8   | **Static export must keep working.** No server-only APIs in page rendering.                                                    |

### On prices

The old site published ₹150–210/kg. The client chose to withhold these. The recovered
figures live in `../documentation/kkknitwear/internal-reference.md`, deliberately
outside this repo, for the client's own use — they must never
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
docs/pitches/   product pitch notes
prompt.md       prompt log — see §7
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

## 7. Prompt logging — do this every session

`prompt.md` records every prompt used on this project, in order, for later
comparative analysis across the class's projects.

**Append to it as you go.** After acting on a user prompt that changes the
project — a new feature, a correction, a decision, a change of direction —
add an entry: the prompt **verbatim** (typos included), what it produced, and
one honest note on why it did or didn't work well.

Skip only trivial exchanges ("yes", "carry on") that changed nothing.

Never rewrite earlier entries to look tidier. The corrections and dead ends
are the point — a log where nothing went wrong teaches nobody anything.

---
