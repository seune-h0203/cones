# CONES

**TWO ORIGINS, ONE SYSTEM.**

FOUR MINDS. TWO ORIGINS. ONE SYSTEM.
`PROJECT : CONNECTION : 00` — DEBUT SHOWCASE `09.15.2026`

**Live site:** https://seune-h0203.github.io/cones/

---

## Project Overview

CONES is a fictional K-pop entertainment debut project. It is not a startup
landing page or a student demo — it is built and treated as the official
website of a real artist project, from its world-building down to its
component architecture.

CONES is built from two independent origins that cannot complete the system
alone:

| Origin | Mandate | Artists |
| --- | --- | --- |
| **AI UNIT** | THINK / PREDICT | SERINA (`LEARN`), BAESAN (`PREDICT`) |
| **COMPUTER UNIT** | BUILD / EXECUTE | HYUN JIZEL (`DESIGN`), HAM BOM (`EXECUTE`) |

The name itself is a compression of the concept: **CON**nect + **ONES**
(independent beings) → *Connecting Ones.*

## World

The site's world-building lives on `/world` as its own page rather than a
paragraph of copy. It stages the founding idea as a sequence, driven by
scroll position:

```
O        O   →   O + O   →   ∞   →   CONES
AI UNIT      COMPUTER UNIT
```

Two circles (the two origins) converge into an overlap, resolve into an
infinity mark, and reveal the wordmark — implemented as one scroll-linked SVG
(`ConnectionSequence`), not a canned video. The same page renders the system
cycle that keeps the world running:

```
LEARN → PREDICT → DESIGN → EXECUTE → LEARN → … → ∞
```

`SystemCycle` renders this as four connected nodes, each linking straight to
the artist who owns that ability, so the world page and the artist roster
stay one connected story instead of two disconnected sections.

## Artists

Every artist is a data record, not a hand-built page. Adding, correcting, or
retiring an artist is a single edit to `src/data/artists.ts` — the roster,
filters, routing, detail template, SEO/OG tags, and prev/next navigation all
follow automatically.

| # | Stage name | Real name | Unit | Ability | Position |
| --- | --- | --- | --- | --- | --- |
| 01 | **SERINA** (세리나) | 박세린 | AI UNIT | LEARN | MAIN DESIGNER |
| 02 | **BAESAN** (배산) | 배정호 | AI UNIT | PREDICT | MARKETING |
| 03 | **HYUN JIZEL** (현지젤) | 현세은 | COMPUTER UNIT | DESIGN | MAIN PLANNER |
| 04 | **HAM BOM** (함봄) | 함채림 | COMPUTER UNIT | EXECUTE | MAIN DEVELOPER |

> The `id` (`rina`), image filenames, and video manifest key for this artist
> stay `rina` for backward compatibility with existing routes/assets — every
> UI surface (roster, detail page, OG image, `<title>`) now reads
> **SERINA / 세리나**.

Each artist detail page (`/artists/:id`) shares one template but reads as a
distinct identity, because the `ability` field drives a dedicated visual
motif (`AbilityMotif`):

| Ability | Visual language |
| --- | --- |
| LEARN | data points, scanning line, observation |
| PREDICT | a single origin branching into futures |
| DESIGN | blueprint frames, guides, structure |
| EXECUTE | activating bars, a running pointer |

Each artist also carries their own teaser slot (see **Teaser Video System**
below) — the detail page always plays *that* artist's teaser, never a shared
default.

## Connection : 00

`/project` documents CONES' debut release, `CONNECTION : 00` — the moment the
two origins are proven to interoperate. `00` reads as two circles and as "not
yet decided," which is why the page repeats the same visual grammar as
`/world`'s founding sequence rather than introducing new iconography. The
page's countdown and status line are driven by the same `useCountdown` hook
as the homepage, so `COMING SOON` and `NOW LIVE` never fall out of sync.

## Information Architecture

```
/                    HOME       — hero, countdown, origins, artist grid, connection, project, CTA
/world               WORLD      — two origins → connection → the system cycle
/artists             ARTISTS    — full roster, unit filter (ALL / AI UNIT / COMPUTER UNIT)
/artists/:artistId   ARTIST     — rina · baesan · hyun-jizel · ham-bom
/project             PROJECT    — CONNECTION : 00
/about               ABOUT      — TEAM 02, leadership, project footer
*                    NOT FOUND  — "SYSTEM NOT FOUND" — never a browser default 404
```

Routing uses `HashRouter`, so every one of these paths is a plain static
file request underneath — refreshing or deep-linking to `/artists/rina` on
GitHub Pages never 404s, with no server rewrite rules required.

## Technical Architecture

React 19 + TypeScript (strict) + Vite. No UI or animation library — every
interaction below is native CSS/DOM/SVG.

```
src/
├─ components/   Navbar, ArtistCard, LogoMark, TeaserVideo, TeaserPlayer,
│                VideoModal, Countdown, ConnectionSequence, SystemCycle,
│                AbilityMotif, LoadingScreen, PageTransition, CustomCursor,
│                EasterEgg, Footer, Reveal, SectionHeader …
├─ pages/        Home, World, Artists, ArtistDetail, Project, About, NotFound
├─ data/         artists.ts (single source of truth), site.ts (brand, debut
│                date, unit copy, system cycle)
├─ hooks/        useCountdown, useInView, useScrollProgress, useTeaser,
│                useSeo, useFocusTrap / useScrollLock, useMedia
├─ utils/        asset.ts (deployment-safe path resolution), analytics.ts
└─ styles/       tokens.css (design tokens), global.css (primitives)

public/
├─ images/       artist portraits · 16:9 teaser posters · OG cards · logo
└─ videos/       teaser files + manifest.json (see below)
```

Design tokens (`src/styles/tokens.css`) centralize color, type, spacing, and
motion — `--c-black`, `--c-white`, `--c-silver`, the `--chrome` gradient,
`--f-display` (Bebas Neue), `--f-body` (Inter / Noto Sans KR), `--f-mono`
(JetBrains Mono), and the `--m-*` / `--ease*` motion scale. Components read
these tokens rather than hard-coding values.

### Teaser Video System

Every artist owns a teaser slot, declared in `public/videos/manifest.json`:

```json
{
  "teasers": {
    "rina": {
      "desktop": "rina-teaser.mp4",
      "mobile": "rina-teaser-mobile.mp4",
      "label": "TEASER 01"
    }
  }
}
```

- `desktop` is required; `mobile` (a 9:16 cut) is selected automatically on
  narrow viewports.
- The homepage's `WATCH TEASER` button reads the `project` key.
- **No file is invented.** An artist without a manifest entry renders their
  real portrait as a poster with a `SIGNAL PENDING` state — never a fake or
  placeholder video.
- Playback is `muted`, `playsInline`, `preload="metadata"`, with a real
  poster frame; nothing autoplays with sound.
- An `IntersectionObserver` starts playback only once a player scrolls into
  view and pauses it the moment it leaves — no more than one teaser is ever
  decoding at a time, and nothing is fetched until it's needed.
- The custom control bar (play/pause, scrub, mute, fullscreen) is native
  `<video>` underneath, so keyboard and screen-reader users get real media
  semantics, not a div pretending to be a player.

## Interaction

- **Scroll reveal** — `Reveal` / `useInView`, applied section by section.
- **Founding sequence** — `ConnectionSequence`: scroll-position drives two
  SVG circles into an infinity mark and the wordmark, no video required.
- **System cycle** — `SystemCycle`: LEARN → PREDICT → DESIGN → EXECUTE nodes
  connect into a loop as they enter view.
- **Ability motifs** — per-artist SVG language (see **Artists**).
- **Logo mark** — `LogoMark`: a power-on wipe reveal, a chrome highlight
  swept across the wordmark's own alpha silhouette, and a breathing glow —
  all disabled under `prefers-reduced-motion`.
- **Cursor-following micro interaction** — `CustomCursor`, desktop
  (`hover: hover` + `pointer: fine`) only; touch devices never see it.
- **Page transitions** — a chrome-line wipe between routes.
- **Video modal** — focus-trapped, `Escape` closes and returns focus to the
  trigger, background scroll is locked while open.
- **Easter egg** — one subtle, undocumented interaction. It exists; it isn't
  advertised here.

Nothing above is decorative for its own sake — every animation marks a state
change (a section entering view, a route changing, an ability being
explained), and `prefers-reduced-motion` strips the motion back to instant
state changes everywhere it's checked.

## Performance

- Route-level code splitting (`React.lazy` per page) — the initial bundle is
  the shell, not every page.
- Images are served through `srcset` (portrait + downscaled variant) with
  `loading="lazy"` off the critical path.
- Video never preloads beyond `metadata`, uses a real poster frame, and only
  one instance plays at a time (see **Teaser Video System**).
- Zero UI/animation dependencies — `react`, `react-dom`, and
  `react-router-dom` are the entire runtime dependency list.
- `vite.config.ts` builds with `base: "./"`, so every asset resolves as a
  relative URL — the same build works unmodified from a domain root or a
  GitHub Pages project sub-path.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `<h1>` per
  route, real `<button>` / `<a>` elements — no clickable `<div>`s standing in
  for interactive controls.
- `alt` text on every meaningful image; decorative marks are `aria-hidden`.
- Focus is visible everywhere (`:focus-visible`), and the video modal traps
  focus while open and restores it to the trigger on close.
- `Escape` closes the video modal and the mobile menu.
- A skip-to-content link is the first focusable element on every page.
- `prefers-reduced-motion: reduce` collapses every animation to its resting
  state — the scroll-driven founding sequence included.

## Deployment

Repository: **[seune-h0203/cones](https://github.com/seune-h0203/cones)**
Live URL: **https://seune-h0203.github.io/cones/**

Build is fully static (Vite → `dist/`) and ships with
`.github/workflows/deploy.yml`, which builds and publishes to **GitHub
Pages** via `actions/deploy-pages` on every push to `main`.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc --noEmit + production build → dist/
npm run preview    # serve the production build locally
```

Repository setup, once, in **Settings → Pages → Source → GitHub Actions**.
No server configuration is required beyond that:

- `base: "./"` in `vite.config.ts` keeps every asset path relative, so the
  build is correct whether it's served from a domain root or a project
  sub-path — nothing to hand-edit per repository.
- `HashRouter` means GitHub Pages' static file server can serve any deep
  link or refresh without a custom 404/rewrite trick.

## Team 02

CONES is produced by **TEAM 02** — the same four people behind the artist
roster. Each member's production role and their on-site `ABILITY` are the
same mapping:

- **HYUN JIZEL** — MAIN PLANNER → `DESIGN`
- **HAM BOM** — MAIN DEVELOPER → `EXECUTE`
- **SERINA** — MAIN DESIGNER → `LEARN`
- **BAESAN** — MARKETING → `PREDICT`

CEO / DIRECTOR — 김남주
