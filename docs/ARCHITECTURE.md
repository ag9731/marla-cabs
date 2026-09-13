# Architecture

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI primitives)
- React Hook Form + Zod
- EmailJS (Client-side email sending for Phase 0)
- Framer Motion

## Directory Structure
```
app/               # Next.js App Router (pages, layouts, error, loading, not-found)
components/        # React components
  ├── ui/          # shadcn/ui components
  ├── layout/      # Header, Footer
  └── shared/      # Reusable domain components (Cards, Forms, Sections)
lib/               # Utility functions (utils.ts, email.ts)
types/             # TypeScript definitions
content/           # Markdown or MDX for blog posts (or static data arrays)
docs/              # Project documentation
public/            # Static assets (images, fonts, favicon)
```

## Routing Strategy
- `/`: Home
- `/services`: Services overview
- `/services/[slug]`: Individual service details
- `/fleet`: Fleet overview
- `/about`: Company information
- `/blog`: Blog listing
- `/blog/[slug]`: Individual blog posts
- `/book`, `/contact`: Enquiry/Booking form
- `/privacy-policy`, `/terms-and-conditions`: Legal documents
- `/thank-you`: Post-booking confirmation page

## State Management
- Local component state via `useState`.
- Form state via `react-hook-form`.
- No global state management library required for Phase 0.
