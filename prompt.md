# Prompt log — K.K Knitwear Club

Every prompt used to build this project, in order, recorded for comparative
analysis: what works in which situation, and what is reusable elsewhere.

Prompts are **verbatim**, typos included. The typos matter — part of the point
is seeing how much precision a prompt actually needs.

> **Maintenance:** append each new prompt as it happens. Do not tidy earlier
> entries afterwards; the value is in the real sequence, including the
> corrections and changes of direction.
>
> Entries 1–18 were reconstructed at entry 18 from the session transcript, which
> is why they are complete rather than written live.

---

## 1 — Opening probe

> `https://www.kkknitwearclub.com/ can u see this website`

**Produced:** fetched and summarised the existing site.
**Worth noting:** a deliberately tiny opening prompt. It cost almost nothing and
established shared context before any real instruction was given. Cheap
grounding beats a long brief written blind.

---

## 2 — The main brief

> `Ok, so this website is like really really old website and it's like not the one I think. It's like not nice. I think we need to modernize this website and add something Like, new features. I think the target target customer for this website would be a business. Because This business is supplying fabric. and fabric would only be used for... by business. Right? I don't think so it would be a customer to business type of thing, and we're only a business to business type of thing. It is a clothing or fabric manufacture type of business. And I've given you the previous website, and you can identify the item services, categories, location, contact info also. And, also, just, like, I need to plan this with you. Like, would this go for mid tier, do tier people, or, like, high tier people? I don't know. Mobile, we need to build one USp or or a tagline.. Now what we need to do is think upon what kind of user experience would the business usually need. What we need to do is make the same wedside for both mobile and Desktop client We'll make it look streamlined, and colors would be... I don't know. Just enlighten me about that. And Also, we need to make a Claude.md file regarding u know imporatant stuff that we are not going aginst them some architecture , as well u see all the features that are already in this website we are not going to change it , it needs to be in the claude.md file , by the way we should plan things out first`

**Produced:** entered planning mode; deep scrape of the old site; four clarifying
questions; a written plan file.

**The single most effective prompt in the project.** Why it worked despite being
unstructured and full of typos:

- **Stated the audience** ("business to business") and reasoned about *why*
- **Admitted uncertainty out loud** — "I don't know", "just enlighten me". This
  invited recommendations instead of forcing guesses, and produced the tier
  positioning, the colour direction and the tagline.
- **Named a hard constraint** — don't drop existing features
- **Asked for a persistent rules file** (CLAUDE.md), which then governed every
  later decision without needing to be restated
- **Said "we should plan things out first"** — the highest-leverage five words
  in the whole log. It stopped code being written before the brief was settled.

**Reusable pattern:** *audience + constraints + admitted unknowns + "plan first"
+ "write the rules to a file".* Polish is not required. Direction is.

---

## 3 — Clarifying answers (structured choice)

Answers to four multiple-choice questions:
photos → *"can u like make some stuffup as i dont have the new product pictures
so for like now use those alredy on the website"*; stack → **Next.js + Tailwind**;
enquiries → **WhatsApp + email**; catalogue → **all 17, placeholder specs**.

**Worth noting:** four decisions resolved in one exchange. Asking the human to
*choose* rather than *compose* is far faster than open questions — and the
options themselves surfaced trade-offs the user hadn't considered.

---

## 4 — Second round of choices

pricing → **price on request only**; look → **Paper & Indigo**;
USP → **small lots, fast**.

**Worth noting:** these three shaped everything visual and commercial. Held as a
separate round *after* the technical questions, so each decision was made with
the previous answers already known.

---

## 5 — Course correction on imagery

> `so what i think is pls generate these images that we neeed to use streamline it with the website that is being made`

**Produced:** an honest "I have no image-generation tool here", followed by a
counter-proposal — knit structures drawn as SVG — demonstrated immediately with
eight rendered swatches.

**Worth noting:** the request was impossible as literally stated. Showing a
working alternative in the same reply, rather than only reporting the limitation,
kept the project moving. **Reusable: when a request can't be met, answer with the
nearest thing that can be, already built.**

---

## 6 — Sharpening the correction

> `pls use the existing images also`

**Produced:** rewrote the imagery plan so recovered photos became the primary
layer and generated textures filled only genuine gaps.

**Worth noting:** four words, significant redirect. Short corrections work well
*when the shared context is already rich* — which is what prompts 1–4 bought.

---

## 7 — Working style (sent mid-task)

> `i want u to make this websute in iterations or steps so that u dont get overwelmed`

**Produced:** an 8-step ladder, each ending in something viewable.

**Worth noting:** changed the shape of all remaining work. Sent *during* a running
turn and picked up immediately — process instructions don't have to wait for a
turn boundary. **Reusable on any large build.**

---

## 8 — Ambiguous reply

> `yup they do`

**Produced:** a clarifying question rather than a guess, because two readings led
to materially different work (inventing product lines vs. not).

**Worth noting:** the honest failure case in this log. A two-word reply to a
message containing several claims is genuinely ambiguous. Cost: one extra round
trip — cheap compared with fabricating a product range.

---

## 9 — Admitting not knowing

> `i dont know` *(asked whether the company makes terry fabric and foams/films)*

**Produced:** those categories stayed as honest "available on request" pages
instead of getting invented inventory.

**Worth noting:** "I don't know" is a genuinely useful answer. It produced a
better outcome than a confident wrong guess would have.

---

## 10 — Status check

> `ok so what else is left`

**Produced:** verified the real state with shell commands rather than answering
from memory — which caught that nothing was committed and Lighthouse had never run.

**Reusable:** open-ended status questions are worth asking periodically. They
surface things neither side was tracking.

---

## 11 — Choosing the next work

commit / category pages / performance pass (three of four options).

**Worth noting:** the performance pass uncovered a real architectural bug —
`useSearchParams` was preventing the catalogue from server-rendering, so the
built HTML contained zero product images. Score went 64 → 93. **That bug would
not have been found by reading the code.** Measuring found it.

---

## 12 — Curiosity question (sent mid-task)

> `Also, tell me, how are the pictures being fetched`

**Produced:** a walkthrough of the image pipeline.

**Worth noting:** asking how something works mid-build is worth doing. It
surfaced two things the user hadn't been told: the photos are committed to the
repo rather than hot-linked, and their ownership should be confirmed.

---

## 13 — Status check, repeated

> `what else is left to do now`

**Worth noting:** the second status check returned a genuinely different answer
from the first. Repeating them at intervals is not redundant.

---

## 14 — Supplying real data (image)

*Photograph of the company business card.*

**Produced:** resolved the launch blocker (real phone), the RFQ email, and
confirmed terry is a real product line. Also surfaced two conflicts —
a disagreeing address and two unlisted product lines — neither of which was
acted on without asking.

**Worth noting:** the single highest-value input in the project, and it was a
photograph rather than text. **One image of a real-world artefact beat every
attempt to reason about the missing facts.** One number on the card was struck
through; that redaction was treated as intentional and left alone.

---

## 15 — Resolving the conflicts

address → **use the business card version**; product lines → **leave the site
knitted-fabric only**.

**Worth noting:** the scope decision was written into CLAUDE.md with its
reasoning, so a later reader doesn't mistake a deliberate omission for a gap.
**Reusable: record decisions *not* to build something, not just decisions to
build.**

---

## 16 — Pasted context from another conversation

*A summary of a separate chat about how to pitch the finished site to the client.*

**Worth noting:** carrying a summary between conversations worked. It let this
session act on decisions made elsewhere. Prompted a `whois` check that found the
domain's DNS sits on IndiaMART's nameservers — a practical obstacle neither
conversation had considered.

---

## 17 — Asking for a summary to reuse elsewhere

> `u see i need to message him that pls give me moneyy , u understand right ? , so i need to give him a message so for that can u describe evrytinh u did in this website so that i can copy it and put 9n the chat with claude`

**Produced:** a copy-pasteable plain-language description of the whole build,
with figures verified by running commands rather than recalled.

**Worth noting:** stating *where the output will be pasted* changed the format —
plain text in a single block, non-technical, no file paths. **Reusable: say who
the output is for and where it's going.**

---

## 18 — This document

> `1. Pitch practice + a short pitch doc... 2. Prompt documentation... do these things and save in the folder`

**Produced:** `docs/pitches/kk-knitwear-club.md` and this file.

---

## What the log shows

**Worked well**
- Planning before building — one prompt ("plan things out first") shaped everything
- A rules file written early and referenced throughout, so constraints never
  needed restating
- Admitting uncertainty; it invites recommendations instead of guesses
- Multiple-choice questions over open ones for decisions
- Short corrections *once* context is rich
- Measuring instead of assuming — found a bug reading code would not have
- Supplying a photograph of a real artefact instead of describing it

**Cost time**
- Ambiguous short replies before shared context was established
- A broken shell test that reported a false "price leak" — the tool was wrong,
  not the code
- An early performance baseline taken on a single-threaded server, which had to
  be re-measured before optimising anything

**Not exercised in this project**
No animation or motion work, no state management beyond a localStorage basket,
no authentication, no database. A project needing those would produce a very
different log — worth pairing this with one that does for the comparison.

---

## Log gap — 30 Aug to 3 Sep 2026

This file was moved out of the repository to `documentation/kkknitwear/` on
30 August (commit `61af767`) and moved back on 3 September. Nothing was lost, but
`CLAUDE.md` §7 pointed at a `prompt.md` that wasn't in the project for four days,
so the rule was unfollowable and no entries were written in that window.

**The lesson, which is the point of keeping this log:** a rule that names a file
path breaks silently when the file moves. Nothing errors — the instruction just
stops being actionable, and a session reading `CLAUDE.md` has no way to know.
If a documentation file is referenced by a rule, keep it beside the code the rule
governs.

---

<!-- Append new entries below. Never edit an entry above this line. -->

---

## 19 — Orientation prompt

**Date:** 5 Sep 2026

> `soo what do u infer from this folder`

**Produced:** a plain-language read of the project — business context, tech stack, page
inventory, client constraints, and the meta-observation that it's a coursework assignment
tracking AI-assisted development.

**Worth noting:** no code changed; the prompt was a status check. The response surfaced
something the user may not have consciously articulated: the `hw3` suffix and the
`prompt.md` requirement already tell a story about the course's methodology before a
single prompt is run.

---

## 20 — Homework slide (image)

**Date:** 5 Sep 2026

> *(Photograph of classroom slide: "Use Plan mode to propose one small improvement to your
> Session 2 website. Review and revise the plan, then implement, test, and push it.
> Confirm Vercel updates the same live link.")*

**Produced:** identified the assignment requirements — plan mode, one visible improvement,
new GitHub repo distinct from the hw2 clone, Vercel deploy. Led directly into exploring
the codebase for a good improvement candidate (and finding text search already existed,
social sharing present only in the footer and always pointing at the homepage).

**Worth noting:** a photograph of a slide is a perfectly valid prompt input. It's faster
than transcribing the text, and the image captures layout and emphasis that a typed
summary would flatten.

---

## 21 — Direction and repo requirement

**Date:** 5 Sep 2026

> `So what we need to ask, make a new repository and get up GitHub and then make some
> changes to the code, and we need to make sure that the code is not being pushed to the
> same depository. It was cloned from. We need to make a new repository and then will try
> and deploy it on and we need to make a change that is very visible which can be seen,
> and if we compare with the two websites, we can see what changes we have made and by
> that I'm not saying we need to change the UIUX, but we need to changes`

**Produced:** entered Plan mode; explored the codebase; identified that per-product social
sharing was missing (only the footer had sharing, and it always shared the homepage URL);
proposed adding Facebook/X/LinkedIn share buttons to every product detail page.

**Worth noting:** "very visible which can be seen, and if we compare with the two websites"
is a strong constraint that ruled out invisible improvements (SEO meta, performance
tweaks). It pushed toward a feature a visitor would see and interact with. The "not the
UIUX" qualifier clarified this was about function, not cosmetics — which confirmed the
share buttons over, say, a design refresh.

---

## 22 — Prompt log request

**Date:** 5 Sep 2026

> `Also add all the prompts in prompt.md`

**Produced:** the plan was updated to include a prompt-logging step (Step 6), and these
entries were written after implementation.

**Worth noting:** this was a correction mid-plan, caught before ExitPlanMode. The rule in
§7 covers this, but it's worth noting that the placeholder entry (## 19 — Homework 3)
left blank in the file was a reminder that logging was still owed. Placeholders with blank
fields are better than no placeholder at all — they make the gap visible.

---

## 23 — Vercel deployment

**Date:** 7 Sep 2026

> `can u pls deploy it on vercel real quick`

**Produced:** checked the project setup (static export, custom image loader), confirmed
Vercel CLI was installed, instructed the user to run `vercel login` then `vercel --prod`.
After a "Not authorized" error the user logged in via the device-flow URL and re-ran the
deploy. Built cleanly in 9 s, 54 pages, aliased to `kkknitwear-hw3.vercel.app`.

**Worth noting:** "real quick" is a useful signal — it ruled out anything that needed
config files, framework research, or back-and-forth decisions. The right response was a
single command, not a tutorial. The only friction was the missing login, which a CLI tool
cannot avoid on a fresh machine.

---

## 24 — Share buttons upgrade

**Date:** 7 Sep 2026

> `i mean what feature u have added its i know about that but its not visible enought , but u see its ok its fine add a generic share copy link , whatttap share etc becoz that would be help full`

**Produced:** rewrote `components/ShareButtons.tsx` — replaced plain text links with
five pill-style buttons: Copy link (clipboard API with "Copied!" feedback), WhatsApp
(pre-filled with fabric name + URL), Facebook, X, LinkedIn. Each button has a
brand-coloured hover state so they read as distinct actions. Passed `productName` prop
through from the product detail page so the WhatsApp message is specific to the fabric.
Committed and deployed to production.

**Worth noting:** "its not visible enought" was the key diagnostic — it identified the
problem (plain `<a>` tags styled like footnotes) without needing to name the fix. "copy
link , whatttap share" was precise enough to know exactly what to add. The "becoz that
would be help full" rationale confirmed the WhatsApp button should generate a useful
pre-filled message, not just open WhatsApp. Typos did not reduce signal at all.
