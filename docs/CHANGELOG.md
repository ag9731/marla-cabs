# Changelog

All notable changes to this project will be documented in this file.

## [Phase 0 - Unreleased]

### Added
- Integrated Supabase (`@supabase/supabase-js`, `@supabase/ssr`).
- Created Supabase client/server utility architecture (`src/lib/supabase`).
- Configured `.env.local` and `.env.example` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Created `/supabase-test` route to successfully verify backend connection.
- Created complete documentation suite (AGENTS.md, PROJECT_CONTEXT.md, ARCHITECTURE.md, etc.)
- Scaffolding for header and footer components.
- Services Dropdown in Header.
- Implementation of Home Page with 10 modular sections.
- Services Data Module (`src/content/services.ts`).
- Dynamic Routing for Service Pages (`/services/[slug]`).
- Fleet Page (`/fleet`) with detailed vehicle specifications.
- About Page (`/about`) with company story and safety commitment.
- Travel Blog (`/blog` and `/blog/[slug]`) with 6 full-length SEO articles.
- Booking and Contact Form (`/book`, `/contact`) with Zod validation and EmailJS.
- Floating Action Buttons for quick Call, WhatsApp, and Instagram links.

### Changed
- Updated Next.js configuration to allow Unsplash remote images.
- Overhauled content across all pages for SEO and conversion.
- Removed reliance on external Unsplash image URLs due to 404/breakage risks, substituting them with high-quality, highly-realistic local AI-generated images across Fleet, Destinations, and Hero sections.
- Updated Popular Routes on the Home Page to highlight Bangalore-centric destinations using beautiful local destination photography.
- Updated Fleet Page to showcase exactly 6 specific car models (Sedan, Ertiga, Innova Crysta, Toyota Hybrid, Tempo Traveller, Urbania) with accurate pricing based on the provided tariff card.
- Updated Service Pages (Outstation, Local City) to include Bangalore-specific popular destinations, correct pricing data, and proper rendering of destination image cards.
