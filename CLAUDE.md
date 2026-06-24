# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static marketing landing page for **ReciPics**, an AI-powered iOS cooking app
(App Store: `id6740248018`). The site is plain HTML/CSS/JS with **no build step** —
files are served exactly as written.

## Running locally

There is no bundler, package manager, or dev server config. Open `index.html`
directly in a browser, or serve the directory statically:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deployment

GitHub Pages serves the repo root directly. `CNAME` pins the custom domain
(`recipics.app`). Pushing to the deployment branch publishes the site as-is —
there is no compile/transform stage, so what's committed is what ships.

## Architecture

Four standalone HTML pages, each linking the shared `style.css`:

- `index.html` — the main landing page (hero, how-it-works, features, testimonials, footer)
- `contact-page.html`, `privacy-page.html`, `terms-page.html` — secondary pages,
  linked from the footer. These carry small page-specific `<style>` blocks inline
  in `<head>` for their unique elements (e.g. the contact form).

Shared assets:

- `style.css` — all global styling. The design system lives as CSS custom
  properties in `:root` (brand palette `--primary-*`, `--accent-green`,
  `--accent-blue`, text colors, shadow scale). Change colors/spacing there, not inline.
- `main.js` — all interactivity for `index.html`: Lucide icon init, AOS scroll
  animations, mouse-following 3D parallax on the hero image, custom smooth-scroll
  for `#anchor` links, feature-tab switching, the testimonial carousel, and a
  toast notification helper. Most handlers guard on element existence
  (`if (el) {...}`), so the same script can be reused across pages without errors.
- `resources/` — images and icons.

### External dependencies (CDN, no local install)

Loaded via `<script>`/`<link>` tags, so any version change is a CDN URL edit:

- **Lucide** — icons, referenced as `<i data-lucide="name">`; call
  `lucide.createIcons()` after adding icons dynamically.
- **AOS** — scroll-reveal animations via `data-aos="..."` attributes.
- **simpleParallax** — hero image parallax.
- **Google Fonts** — Poppins (body) and Agbalumo, imported at the top of `style.css`.

### The `src/` directory is NOT the live site

`src/` (`App.tsx`, `main.tsx`, `index.css`) is an abandoned React + Vite +
Tailwind scaffold with no `package.json` or config to build it. It does not ship
and is unrelated to the static site. Make site changes in the root HTML/CSS/JS
files, not in `src/`.

## Conventions

- The repo is named `geniChefLanding` and the app was **rebranded from GeniChef
  to ReciPics**. Use "ReciPics" in user-facing copy; the contact email is
  `hello@genichef.app`. Watch for stale brand references when editing.
- Branches are prefixed with their issue number (e.g. `142-rebranding`).
- PRs target the `develop` branch.
