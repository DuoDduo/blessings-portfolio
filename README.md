# Blessing James — Portfolio

Personal portfolio of **Blessing James**, full-stack developer and AI engineer.

**Live:** [blessings-portfolio.vercel.app](https://blessings-portfolio.vercel.app)

## What's inside

- **Hero & About**: who I am and what I build
- **Projects**: web, UI/UX and graphics work, filterable by category
- **GitHub Activity**: live stats from the GitHub REST API: public commits, PRs, repos, a 90-day activity heatmap and the top languages across my own (non-fork) repos
- **Skills**: grouped tech stack
- **Contact**

## Stack

React 19 · Vite 6 · Material UI icons · Vercel (hosting and analytics)

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
  portfolio.js         # all site content: projects, skills, links
  components/          # one folder per section (JSX + CSS)
  assets/              # images (WebP)
scripts/
  optimize-images.mjs  # converts new JPG/PNG assets to resized WebP
vercel.json            # security headers and asset caching
```

### Adding a project

1. Drop the screenshot (JPG or PNG) into `src/assets/projects/`.
2. Run `npm run optimize-images` to convert it to WebP (max 1600px wide).
3. Import it and add an entry to `projects` in `src/portfolio.js`. Only set `sourceCode` or `livePreview` when the link is real. Cards hide any button whose link is missing.

## Security

`vercel.json` sets a strict Content-Security-Policy, blocks framing (clickjacking), and sets HSTS, `nosniff`, Referrer-Policy and Permissions-Policy headers. The site has no backend and stores no secrets. GitHub data is fetched unauthenticated and cached in the browser for an hour to stay inside the API's rate limits.
