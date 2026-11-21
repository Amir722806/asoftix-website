# ASoftix Website

Company website for ASoftix, built in React + Vite from `ASoftix_Website_Blueprint.pdf`, with an admin panel
for updating the content.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5190   (admin: http://localhost:5190/admin)
npm run build    # production build in dist/
```

Create `.env.local` with at least:

```
ADMIN_PASSWORD=choose-a-strong-password
```

The `/api` functions run inside the Vite dev server, so the contact form and admin panel work locally.
Locally, content and inquiries are stored as JSON in `.data/` (git-ignored).

## Pages

| Route | Page |
|---|---|
| `/` | Home: hero, trust strip, services, featured work, why ASoftix, process, team intro, CTA |
| `/services` | Live services, planned services, FAQ |
| `/portfolio`, `/portfolio/:slug` | Filterable projects and case studies with screenshot gallery |
| `/about`, `/team`, `/contact`, `/privacy` | Company, team profiles, inquiry form, privacy notice |
| `/admin` | Admin panel (password protected) |

Light / dark mode: the toggle in the header. The site follows the visitor's system setting until they choose.

## Admin panel (`/admin`)

- **Team**: members, photos (uploaded images are resized in the browser), bio, skills, experience
- **Projects**: case studies, screenshots, featured on homepage, demo / repo links
- **Services**: live vs planned, deliverables, example project
- **Homepage**: "Why ASoftix", process steps, FAQ, technology strip
- **Settings & colours**: company details, contact info, social links, brand colours (presets or custom)
- **Inquiries**: every contact-form submission, with status (New / Contacted / Quoted / Won / Closed)
- **Overview**: counts, backup download / restore, reset to original content

Edits are kept as a draft until **Save & publish**. The defaults live in `src/data/`; saved edits are stored
on top of them, so "Reset to original" always works.

## API (`/api`, Vercel serverless functions)

| Endpoint | Purpose |
|---|---|
| `POST /api/contact` | Validates the inquiry on the server, saves it to the inbox, emails it via Resend when configured. Honeypot + rate limit. |
| `POST /api/login` | Admin password → signed token (12 h). Rate limited. |
| `GET/PUT/DELETE /api/content` | Read content (public) / save / reset (admin) |
| `GET/PATCH/DELETE /api/inquiries` | Admin inbox |

## Deploying on Vercel

Environment variables (Project → Settings → Environment Variables):

| Variable | Needed for |
|---|---|
| `ADMIN_PASSWORD` | Admin login |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Saving admin edits and inquiries. Add **Upstash Redis** from the Vercel Marketplace (Storage tab); it sets these automatically. |
| `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` | Optional: email every inquiry to your inbox |

Without the storage variables the public site still works with the default content, but admin saves and
form submissions return an error (the form then offers an "Open in email app" fallback).

## Brand

- Logo files: `public/brand/` (`asoftix-mark.svg`, `asoftix-logo-dark.svg`, `asoftix-logo-light.svg`)
- Social preview image: `public/brand/og-image.png`

## Project screenshots

`public/projects/<slug>/` holds screenshots captured from the running apps (Alif Electrical, Commerce
Platform, Book Shop). The Routine App (Flutter) still uses an illustration until phone screenshots are added
through the admin panel.

## Before launch

- [ ] Confirm the domain, then update it in Admin → Settings, `public/robots.txt` and `public/sitemap.xml`
- [ ] Use a business email instead of the personal Gmail
- [ ] Set a strong `ADMIN_PASSWORD` on Vercel
- [ ] Have the privacy notice reviewed
