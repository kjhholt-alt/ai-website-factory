# N16 Soccer Training - Website

Production website for **N16 Soccer Training**, an indoor youth soccer training facility in East Moline, IL.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Database**: Prisma + SQLite
- **Email**: Resend (confirmation emails, broadcast messages)
- **Validation**: Zod + React Hook Form
- **Deployment**: Vercel

## Features

- **Data-driven configuration** — entire site branded via `site.json`
- **Multi-step registration form** — 6 steps with Zod validation (camp selection, parent info, player info, emergency contact, waiver, review)
- **Admin dashboard** — password-protected, registration stats, searchable table, CSV export, broadcast messaging
- **SEO optimized** — sitemap, robots.txt, Open Graph, Twitter cards
- **Legal pages** — Terms of Service, Privacy Policy (auto-populated with business info)
- **Dark mode** — black & gold theme matching N16 branding
- **Mobile responsive** — works on all device sizes
- **Photo gallery** — coach headshot, team photos
- **Confirmation emails** — sent via Resend on registration

## Quick Start

```bash
npm install
npx prisma db push
npm run seed
npm run dev
```

## Configuration

All site branding is controlled by `site.json`:
- Business name, tagline, description
- Logo image, colors (black/gold)
- Contact info (phone, email, address)
- Programs/services with pricing
- Testimonials, features
- Coach bio and photo
- Photo gallery
- SEO metadata
- Admin credentials
- Registration waiver text

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | No | Resend API key for confirmation emails |
| `RESEND_FROM_EMAIL` | No | Sender email address |
| `NEXT_PUBLIC_SITE_URL` | No | Production URL for SEO |

## Deployment

Deploy to Vercel:
```bash
git push origin main
# Vercel auto-deploys from GitHub
```

## Project Structure

```
site.json              # All site configuration
src/
  app/
    page.tsx           # Homepage (hero, features, coach, programs, gallery, testimonials, contact)
    register/page.tsx  # Multi-step registration form
    admin/page.tsx     # Admin dashboard
    terms/page.tsx     # Terms of Service
    privacy/page.tsx   # Privacy Policy
    layout.tsx         # Root layout (navbar, footer, toaster)
    api/
      register/        # POST registration
      admin/           # Admin login, stats, registrations, messages
  components/
    navbar.tsx         # Fixed header with logo
    footer.tsx         # Footer with links
    ui/                # shadcn/ui components
    register/          # Step components for registration form
  lib/
    site-config.ts     # Typed config loader
    schemas.ts         # Zod validation schemas
    prisma.ts          # Prisma client
    admin-auth.ts      # Admin authentication
  public/
    images/            # Logo, coach headshot, team photos
```
