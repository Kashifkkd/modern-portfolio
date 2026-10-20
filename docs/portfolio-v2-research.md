# Portfolio v2 — research notes

Goal: a portfolio that wins awards *and* wins clients. Studied in Oct 2026.

## The 9 sites we learned from

| # | Site | Award / proof | What we take from it |
|---|------|---------------|----------------------|
| 1 | **Dennis Snellenberg** — dennissnellenberg.com | Awwwards SOTD + Dev Award; the most-cloned freelancer portfolio | Structure: multilingual preloader → oversized name marquee → one positioning line → 4 projects labelled by *role* ("Design & Development", year) → "Let's work together" footer with email, phone, **local time**. Magnetic buttons, curved-SVG page transitions, smooth scroll. |
| 2 | **Gil Huybrecht** — gilhuybrecht.com | SOTD Sep 2026, 7.66; Animations 8.4 | Next.js + WebGL + CMS. Strict 2-colour palette (#0D0D0F / #FFF). Lists **availability** as first-class content. Weak spot: SEO/semantics 6.6. |
| 3 | **Pacôme Pertant** — pacomepertant.com | SOTD Jun 2026, 7.76; Animations 8.6, WPO 8.0 | GSAP + Three.js. Projects as a 3D spiral that *collapses into a plain list* (toggle). Footer scroll transition, loader, mouse trail. Monochrome. |
| 4 | **Léo Parpeix** — leoparpeix.com | SOTD Sep 2026, Creativity 8.04 | Heavy 3D/Blender; proves motion wins the award but Usability/Accessibility (7.0) caps the score. |
| 5 | **Maria Vasilyeva** — mariavasilyeva.com | SOTD Oct 2026 + CSSDA WOTD | "Rhythm" concept: preloader, page transitions, scroll-animated About, hover on project cards, **annotations** UI motif. Accessibility 6.4 — the trade-off again. |
| 6 | **Bruno Simon** — bruno-simon.com | Site of the Month Jan 2026; Dev Site of the Year 2019 | Pick *one* idea and execute it ten times better. Performance discipline: "if it runs at 10 FPS, no one will stick around" — instancing, Draco, KTX2, mobile preset. Set a release date; you are your own worst client. |
| 7 | **Trionn** — trionn.com (Codrops case study) | FWA, GSAP, CSSDA | The reference architecture for our stack: **Next.js + Tailwind + GSAP/ScrollTrigger/SplitText + Lenis on gsap.ticker**. Blur-in char reveal (`blur(12px)→0`, stagger 0.08 random, delay until page transition). One 0–1 progress value per pinned section. Reduced motion = *slower*, not off. |
| 8 | **Brittany Chiang** — brittanychiang.com | 8k GitHub stars; the hiring-manager model | Experience as a scannable list: dates · role · 2 lines · stack chips · **proof links** (press, metrics badges like "100k+ installs"). Inter, dark navy, no motion. Zero client CTA — what we must add. |
| 9 | **Tamal Sen / Jessica Goldman / Andy Clarke** (conversion models) | Hostinger & Colorlib 2026 roundups | Spread social proof *next to the work*, not in one section. Case-study titles lead with the business result ("15% conversion growth"). Availability banner on every page ("Taking on projects next month"). Book-a-call button in the first screen. |

## What the winners have in common

1. **Art direction first** — "take away the animation and the static frames still look like someone made them on purpose." Monochrome (near-black + off-white) with one accent, oversized grotesk type, generous space.
2. **Motion has a director** — one repeated transition motif, scroll as the storytelling engine, transitions *between* states (page, hover, scroll-in). Not stacked effects.
3. **Performance is the discipline** — jurors test on mid-range Android. 60 fps or no award. HTML first, 3D lazy and optional.
4. **Content-light, structure-tight** — hero → 3–4 projects → about → contact. Everything else lives on sub-pages.
5. The consistent **weakness** of award sites: Usability/Accessibility/SEO in the 6s. Beating that is how we out-score them.

## What clients need (that award sites skip)

- "What you do, proof you do it well, how to hire you" visible in the first 5 seconds.
- **Availability** status, always visible.
- One CTA: book a call / email, plus a *separate* work-inquiries route.
- Projects framed as *client challenge → what I built → measurable result*, with live links and stack.
- Testimonials and numbers placed beside the work they prove.
- Credit collaborators, link every award, say how you charge before the first call (optional).

## Direction for v2

**Concept: "Signal"** — a monochrome, editorial, motion-directed site whose one hard idea is a live-data hero (a particle/shader field that reacts to cursor and scroll, nodding to the 150k-signals/day event platform Kashif built). Everything else is typographic restraint.

Structure (single page + case-study routes):
1. Preloader (short, multilingual greeting, curved exit) — skippable, once per session.
2. Hero: eyebrow "Senior Software Engineer · Full-Stack · AI/LLM", oversized name marquee, one positioning line, availability pill ("Available from Nov 2026 · UK/IN remote"), two CTAs (Book a call · See work). Local time + location.
3. Selected work (3–4): large cards, role label, year, result-first title, hover image reveal. "More work →" to /work.
4. Proof strip: numbers (150k signals/day, 35% faster load, 5+ enterprise clients) + testimonials inline.
5. Services / how I work: 3 offers (Product build, AI integration, Mobile) with process and starting engagement.
6. Experience: Chiang-style list with proof links.
7. About: short, human, photo, stack chips.
8. Contact: "Let's work together", magnetic button, email + phone, socials, local time.

Stack: Next.js 16, Tailwind 4, Motion (already in repo) + GSAP/ScrollTrigger/SplitText + Lenis; R3F for the hero only, lazy-loaded, with a static fallback. Reduced-motion and "plain view" toggle. Targets: Lighthouse ≥ 90 perf on mobile, 100 a11y/SEO.
