# VOYAGE — Journeys Beyond the Ordinary

> **Private villas, hidden trails and tables set just for you.** A cinematic, editorial travel experience built to feel like it was written around your life.

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.3-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-customization">Customization</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## Overview

**VOYAGE** (`voyage-cinematic` v1.0.0) is a premium single-page travel landing experience inspired by editorial magazines (Cereal, Kinfolk) and luxury hospitality sites. It showcases curated destinations and bookable journeys with cinematic scroll storytelling.

No backend — all data is local mock data. Perfect as a portfolio piece, Figma-to-code demo, or starter for a full booking platform.

> *“Where silence speaks loudest”* — Private, paced, and precisely arranged.

**Design principles:**
- Editorial, not e-commerce — whitespace, serif headlines, mono kickers
- Cinematic motion — GSAP ScrollTrigger once-only reveals + desktop scrub parallax
- Mobile-first performance — `matchMedia` disables parallax on mobile
- Mock checkout — client-side pricing only

---

## Quick Start

**Prerequisites:** Node.js >= 18, npm / yarn / pnpm

```bash
# 1. Clone
git clone <your-repo-url>
cd voyage-cinematic

# 2. Install
npm install

# 3. Dev server -> http://localhost:5173
npm run dev

# 4. Production build
npm run build

# 5. Preview build
npm run preview
```

| Script | Description |
|---|---|
| `npm run dev` | Vite dev server with HMR on port 5173 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve `dist/` locally |

---

## Features

### Sections

| Section | Anchor | Highlights |
|---|---|---|
| **Hero** | — | 100svh cinematic bg, 1.6s GSAP timeline, yPercent parallax, SearchBar, avatar stack |
| **Destinations** | `#destinations` | 3-col masonry (6 cards, row-span-2 on 0 & 3), hover scale, stagger reveal |
| **The Voyage Standard** | `#experiences` | Editorial 3-col value prop (DESIGN / CARE) |
| **Journeys** | `#journeys` | Filterable grid + category pills, re-stagger on filter |
| **Stats** | — | 4 metrics with IntersectionObserver + useCountUp |
| **Traveler Notes** | `#journal` | Dark carousel, GSAP crossfade + Ken Burns |
| **Final Call CTA** | — | Split 2-col + featured Amalfi card + parallax |
| **Footer** | — | 4-col + newsletter + GSAP stagger |

### Interactions

- **Navbar** — transparent -> `bg-parchment/85 backdrop-blur-xl` after 40px (`useScrolled`); mobile AnimatePresence overlay with stagger.
- **SearchBar** — destination, dates, traveler +/- stepper, journey-type dropdown -> filters `allTrips` via `useMemo`, scrolls to `#journeys`.
- **Destination Detail** — modal with framer fade + GSAP scale/y intro; highlights, stats, BOOK -> BookingDrawer.
- **Trip Detail** — full-page overlay, sticky price card, gallery (1 large + 2 stacked), itinerary timeline, included/excluded.
- **Booking Drawer** — right slide `[0.22,1,0.36,1]`, room tiers (Classic/Suite/Villa), extras (yacht/photo/spa), 6% insurance, 8% tax, live total, 2.1s success screen.
- **Filtering** — pills `All/Luxury/Nature/Culture/Adventure/Beach` + SearchBar cross-filter; empty-state message.

---

## Tech Stack

| Layer | Library | Purpose |
|---|---|---|
| **Build** | Vite 5.4 + @vitejs/plugin-react | ESM dev & build |
| **UI** | React 18.3 | Components, hooks (useLayoutEffect for GSAP) |
| **Styling** | Tailwind 3.4 + PostCSS + Autoprefixer | Utility classes, custom theme |
| **Animation** | GSAP 3.15 + ScrollTrigger | Timelines, scrub parallax, matchMedia, gsap.context |
| **Transitions** | Framer Motion 11.3 | AnimatePresence (modals/drawer/mobile nav) |
| **Icons** | Lucide React 0.438 | Stroke icons |
| **Fonts** | Google Fonts | Cormorant Garamond (display), Inter (sans), IBM Plex Mono (mono) |
| **Images** | Unsplash CDN (w=800-1920&q=80) | Eager/lazy + decoding async |

### Tailwind Theme (`tailwind.config.js`)

```js
colors: {
  ink: '#0F0F0E',       // primary text / dark bg
  charcoal: '#1A1A18',
  stone: '#8A8580',     // muted mono labels
  sand: '#F4F1EC',      // card bg
  parchment: '#FDFCF8', // page bg
  brass: '#C2A27A',     // accent
  moss: '#2D332E',
}
fontFamily: {
  display: ['Cormorant Garamond','serif'],
  sans: ['Inter','system-ui','sans-serif'],
  mono: ['IBM Plex Mono','monospace'],
}
```

---

## Project Structure

```
voyage-cinematic/
├── public/
├── src/
│   ├── App.jsx                  # state (destDetail/tripDetail/booking/search), GSAP, filtered logic
│   ├── main.jsx                 # ReactDOM.createRoot + StrictMode
│   ├── index.css                # @tailwind + global (scroll, selection, scrollbar)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchBar.jsx
│   │   ├── DestinationCard.jsx
│   │   ├── TripCard.jsx
│   │   ├── DestinationDetail.jsx
│   │   ├── TripDetail.jsx
│   │   ├── BookingDrawer.jsx    # slide pricing calculator
│   │   └── SafeImage.jsx        # fallback + fade-in
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── DestinationsSection.jsx
│   │   ├── TripsSection.jsx
│   │   ├── StatsSection.jsx
│   │   └── Testimonials.jsx
│   ├── data/
│   │   ├── mockData.js          # 6 destinations
│   │   ├── trips.js             # t1-t3 (Santorini, Swiss Alps, Bali)
│   │   └── trips-extra.js       # t4-t6 (Kyoto, Iceland, Amalfi) + testimonials
│   ├── hooks/
│   │   └── useScroll.js         # useScrolled + useCountUp
│   └── utils/
│       └── gsap.js              # registerPlugin, refreshAfterImages, defaults
├── index.html
├── vite.config.js               # plugins: [react()], port 5173
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── dist/                        # build output
```

---

## Data Model

### Destination (`src/data/mockData.js`)

```js
{
  id: 'santorini',
  name: 'Santorini', country: 'Greece', region: 'Cyclades',
  image, thumb, description, longDescription,
  price: 2840, rating: 4.9, reviews: 412,
  bestTime: 'Apr — Oct', duration: '5–8 days',
  highlights: ['Caldera sunset sail', ...],
  category: 'Romantic', coordinates: '36.3932° N, 25.4615° E'
}
// 6 entries: santorini, swiss-alps, bali, kyoto, iceland, amalfi
```

### Trip (`src/data/trips.js` + `trips-extra.js`)

```js
{
  id: 't1', title: 'Santorini & Milos: Caldera Light',
  destination: 'Santorini', destinationId: 'santorini',
  category: 'Luxury' | 'Nature' | 'Culture' | 'Adventure' | 'Beach',
  duration: '7 days / 6 nights', days: 7, price: 4840,
  rating: 4.9, reviews: 84,
  image, gallery: [3 urls],
  description, availability, included: [], excluded: [],
  itinerary: [{ day, title, desc }],
  hotel: 'Canaves Oia — Private Pool Suite',
  activities: ['Sunset Sailing', ...]
}
```

---

## Animation System

All scroll animations use `gsap.context` + `ctx.revert()` in `useLayoutEffect` for safe cleanup.

- **Global defaults:** `ease: 'power3.out'`, `duration: 0.9` in `src/utils/gsap.js`
- **Helpers:** `refreshAfterImages(container)` waits for all img load/error then `ScrollTrigger.refresh()` (+1400ms fallback); `refreshScrollTrigger()` debounced 120ms
- **Patterns:**
  - `gsap.from('.class', { y, opacity, stagger, scrollTrigger: { trigger, start: 'top 82%', once: true }})`
  - `gsap.to(img, { yPercent: -6, scrub: 1.2 })` inside `gsap.matchMedia('(min-width: 1024px)')` — desktop-only
  - `gsap.timeline` in `Hero.jsx` — eyebrow -> headline -> paragraph -> CTA -> meta -> search

> Framer is kept for mount/unmount (`AnimatePresence`) only — GSAP handles all scroll/scrub to avoid conflicts.

---

## Search and Filter Logic (`src/App.jsx`)

```js
const allTrips = [...baseTrips, ...extraTrips] // 6 trips
const filtered = useMemo(() => {
  if (!search) return allTrips
  return allTrips.filter(t => {
    // dest substring (case-insensitive) on t.destination
    // type === category exact match (unless "Any Journey")
  })
}, [search])
// TripsSection further filters by pill:
const byPill = active === 'All' ? trips : trips.filter(t => t.category === active)
```

Extend by wiring `dates` to a date picker — `BookingDrawer` already does `trip.price * travelers`.

---

## Booking Pricing (`src/components/BookingDrawer.jsx`)

```
base    = trip.price * travelers
roomFee = { classic:0, suite:420, villa:980 }[room]
exTotal = sum(selected: yacht 650, photo 380, spa 290)
insFee  = ins ? round(base * 0.06) : 0
taxes   = round((base + roomFee + exTotal) * 0.08)
total   = base + roomFee + exTotal + insFee + taxes
```

Confirmation shows `REF: VYG-XXXXX` and auto-closes after 2100ms.

---

## Customization

**Colors / fonts** — edit `tailwind.config.js` `theme.extend.colors` / `fontFamily` and `src/index.css` body font.

**Add a destination** — append to `destinations` in `src/data/mockData.js`, then add a matching trip in `trips.js` with the same `destinationId`.

**Add a category** — add to `filters` in `src/sections/TripsSection.jsx` and `tripOptions` in `src/components/SearchBar.jsx` (case-sensitive).

**Swap images** — replace `image`/`thumb`/`gallery` URLs; fallbacks point to `photo-1507525428034` by default.

---

## Responsive

- Tailwind `sm` 640px, `lg` 1024px
- Hero `h-[100svh]` + `min-h-[640px]` for mobile chrome
- SearchBar: `flex-col` -> `flex-row rounded-full` on `lg`
- Destinations: `grid-cols-1` -> `lg:grid-cols-3` + `auto-rows-[360px]` + `row-span-2` talls
- Trips: `grid-cols-1` -> `sm:grid-cols-2` -> `lg:grid-cols-3`
- Parallax disabled via `matchMedia` + CSS `will-change: auto` fallback

---

## Deployment

**Vercel (recommended)**
```bash
npm i -g vercel
vercel --prod
# or connect GitHub repo -> auto-detects Vite (build: vite build, output: dist)
```

**Netlify** — Build: `npm run build` — Publish: `dist`

**GitHub Pages**
```bash
npm run build
# add base: '/<repo-name>/' in vite.config.js
npm i -D gh-pages
npm run deploy
```

---

## Performance Notes

- `loading=eager` only on Hero bg; rest `lazy`; all `decoding=async`
- `gsap.context` cleanup prevents leaks; `ScrollTrigger.refresh()` after images prevents misalignment
- `will-change-transform` only during animation (mobile fallback `auto`)

---

## Roadmap

- [ ] Real date picker (react-day-picker) + availability calendar
- [ ] Persist booking (localStorage / Supabase / Stripe mock)
- [ ] react-router deep links (`/destinations/santorini`)
- [ ] CMS (Sanity/Contentful) for destinations/trips
- [ ] vite-plugin-image-optimizer
- [ ] Tests (vitest + @testing-library/react) for filter & pricing
- [ ] a11y audit (focus trap in modals, aria-*)

---

## Contributing

PRs welcome! For major changes open an issue first.

```bash
git checkout -b feat/your-feature
git commit -m "feat: your feature"
git push origin feat/your-feature
```

---

## License

MIT — free for portfolio, client work, or learning. Unsplash images are commercially usable; verify hotlinking vs self-hosting for production.

---

## Acknowledgments

- Photos: [Unsplash](https://unsplash.com/)
- Type: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Inter](https://rsms.me/inter/), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
- Motion: [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) + [Framer Motion](https://www.framer.com/motion/)
- Icons: [Lucide](https://lucide.dev/)

---

<p align="center">
  <strong>VOYAGE</strong> — <em>Curated journeys for those who travel not to see more, but to feel more.</em><br/>
  <sub>EST. 2018 • WORLDWIDE • Built with care</sub>
</p>

