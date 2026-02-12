# AI Website Factory - Client Intake Form

Fill this out for each new client. Copy `site.json`, replace all values, and the entire site updates automatically.

---

## Business Information

- **Business Name:**
- **Tagline (short):**
- **Description (2-3 sentences):**
- **Logo Text (abbreviation):**
- **Logo Icon (Lucide icon name):**

## Branding

- **Primary Color (hex):**
- **Secondary Color (hex):**
- **Accent Color (hex):**
- **Font:** (default: Inter)

## Contact Info

- **Phone:**
- **Email:**
- **Address:**
- **Google Maps URL:**

## Social Links

- **Instagram:**
- **Facebook:**
- **Twitter/X:**
- **YouTube:**

## Services/Programs

For each service, provide:

| Field | Value |
|-------|-------|
| ID (slug) | |
| Name | |
| Description | |
| Dates | |
| Time | |
| Ages | |
| Skill Level | |
| Price | |
| Max Capacity | |
| Location | |

(Repeat for each service)

## Testimonials (2-4)

| Name | Role | Text | Rating (1-5) |
|------|------|------|-------------|
| | | | |
| | | | |
| | | | |

## Features/Selling Points (4)

| Title | Description | Icon (Lucide) |
|-------|-------------|---------------|
| | | |
| | | |
| | | |
| | | |

## Registration Settings

- **Waiver Text:** (full liability/release language)
- **Required Fields:** (usually all - parent, player, emergency)

## Admin

- **Admin Email:**
- **Admin Password:**

## SEO

- **Page Title:**
- **Meta Description:**
- **Keywords (comma-separated):**

---

## Setup Checklist

1. [ ] Fill out this form completely
2. [ ] Copy `site.json` and replace all values
3. [ ] Run `npx prisma db push` to create database
4. [ ] Run `npm run seed` to verify database works
5. [ ] Run `npm run dev` and test all pages
6. [ ] Set environment variables (RESEND_API_KEY, NEXT_PUBLIC_SITE_URL)
7. [ ] Deploy to Vercel
8. [ ] Configure custom domain
9. [ ] Test registration flow end-to-end
10. [ ] Send client login credentials for admin dashboard
