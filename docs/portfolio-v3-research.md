# Portfolio v3 — reference study

Eight portfolios reviewed (Oct 2026) for components worth adopting. The goal is a site that wins freelance client work, so engineering credibility counts as much as visual craft.

| Site | What makes it work | Adopted as |
|---|---|---|
| dennissnellenberg.com | Multilingual "Hello" preloader with curved lift; photo hero with scroll-reactive name marquee; location pill with spinning globe; hover list with cursor-following preview; magnetic buttons; menu button that appears on scroll; curved transition into a night footer with local time | `Preloader`, `Hero`, `Work`, `MenuButton`, `Contact` |
| brittanychiang.com | Sticky intro beside a scrolling experience list; hovering one role dims the rest; tech chips; "View full résumé" | `About` |
| rauno.me | Restraint and micro-detail; copy-email with "Copied" feedback | Copy-to-clipboard email in `Contact` |
| emilkowal.ski | Credibility from shipped open source and writing, not adjectives | Live demo / GitHub links surfaced in `Work` ("View" / "Code" cue) |
| robin-noguier.com | One honest line per project plus a clear "open case study" action | Project names + category + year in the list |
| leerob.com | Content-first, fast, no gimmicks | Kept the page light: no WebGL, no autoplay media |
| bruno-simon.com | Fully interactive 3D world | Skipped — memorable, but heavy and off-message for client work |
| joshwcomeau.com | Whimsical, sound-reactive interactions | Skipped — scale of polish needs bespoke illustration |

## Still to do for real impact

- Replace the placeholder SVG covers in `public/work/` with real product screenshots or device mockups.
- A higher-resolution portrait (≥1600px, plain background) would let the hero go full-bleed.
- Real client testimonials before adding a quotes section (the ones in `site.ts` are placeholders).
