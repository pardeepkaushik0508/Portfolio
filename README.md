# Pardeep Kaushik — Portfolio

Production-ready personal portfolio for **Pardeep Kaushik**, built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion and a single Resend-powered contact API route.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Resend (contact form)
- Lucide React
- next/font (Space Grotesk + Manrope)
- React Three Fiber / Drei (lazy-loaded hero visual)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended for production | Canonical site URL (no trailing slash), e.g. `https://yourdomain.com` |
| `RESEND_API_KEY` | Required for contact form delivery | Server-only Resend API key |
| `CONTACT_FROM_EMAIL` | Required for contact form delivery | Verified sender, e.g. `Portfolio <onboarding@resend.dev>` |
| `CONTACT_TO_EMAIL` | Optional | Defaults to `pardeepkaushik0508@gmail.com` |

The contact API will return a clear error if Resend is unconfigured. It never reports a fake success.

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Project structure

```text
src/
  app/                 # layout, page, SEO routes, contact API
  components/
    layout/            # header, footer, floats, progress
    sections/          # page sections
    ui/                # shared UI
    motion/            # reveal helpers
  data/                # content source of truth
  lib/                 # utils, validation, analytics, Resend
  types/
public/
  images/              # profile + project previews
  resume/              # PDF download
```

## Resume

- Download Resume: `/resume/pardeep-kaushik-full-stack.pdf`

## VPS deployment (Nginx + PM2)

1. Build on the server (or CI):

```bash
npm ci
npm run build
```

2. Start with PM2:

```bash
pm2 start npm --name "pardeep-portfolio" -- start
pm2 save
```

3. Example Nginx reverse proxy:

```nginx
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

4. Add SSL (Certbot), set production env vars, and point DNS `A`/`AAAA` records to the VPS.

5. Confirm:

- Homepage loads over HTTPS
- Resume PDFs download
- Contact form returns success only when Resend is configured
- WhatsApp, email, LinkedIn and GitHub links work

## Notes

- Content is driven from `src/data/*` — avoid hardcoding personal details in components.
- The 3D hero scene is lazy-loaded and disabled on smaller / low-performance devices.
- Prefer `prefers-reduced-motion` safe interactions throughout.
