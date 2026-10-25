# Blessing James — Portfolio

Personal portfolio of **Blessing James**, full-stack developer and AI/ML engineer.

**Live:** [blessings-portfolio.vercel.app](https://blessings-portfolio.vercel.app) · **Design system:** `/design`

## What's inside

- **Hero**: positioning plus a decision trace, the site's signature component
- **Selected work**: AI/ML projects, each marked solo or team (with my role)
- **About**: bio and three evidence-backed skill pillars
- **More work**: websites, interface design and graphics
- **GitHub**: live public stats and top languages across my own (non-fork) repos
- **Contact**

## Stack

React 19 · Vite 6 · self-hosted Schibsted Grotesk and JetBrains Mono · react-icons · Vercel (hosting and analytics)

## Design system

"Blueprint", documented live at `/design`. Tokens are in `src/styles/tokens.css` (primitives → semantic, light and dark themes). Components are in `src/components/ui/` and use only semantic tokens.

## Running locally

```bash
npm install
npm run dev        # start the dev server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
npm run lint       # ESLint
```

## Project structure

```
src/
  portfolio.js         # all site content: bio, pillars, projects, links
  sections/            # page sections (Sections.jsx + sections.css)
  components/ui/       # design system components
  styles/              # tokens.css (design tokens) and base.css
  pages/               # /design reference page
  assets/              # images (WebP)
scripts/
  optimize-images.mjs  # converts new JPG/PNG assets to resized WebP
vercel.json            # security headers and asset caching
```

### Adding a project

1. Drop the screenshot (JPG or PNG) into `src/assets/projects/`.
2. Run `npm run optimize-images` to convert it to WebP (max 1600px wide).
3. Import it and add an entry to `projects` in `src/portfolio.js`. Only set `sourceCode` or `livePreview` when the link is real; cards hide any link that is missing. For group work, set `team: true` and `role` to what you personally built.

## Security

`vercel.json` sets a strict Content-Security-Policy, blocks framing (clickjacking), and sets HSTS, `nosniff`, Referrer-Policy and Permissions-Policy headers. The site has no backend and stores no secrets. GitHub data is fetched unauthenticated and cached in the browser for an hour to stay inside the API's rate limits.
