# Agent Instructions (AGENTS.md)

This file contains rules and guidelines for any AI agent or developer contributing to this project.

## General Principles
- **Source of Truth**: The repository documentation (`docs/`) must be treated as the source of truth, not the AI chat history.
- **Continuous Updates**: Maintain and update `docs/DEVELOPMENT_STATUS.md` and `docs/CHANGELOG.md` continuously.
- **Accuracy**: Do not falsely mark features as completed.

## Design & UI Guidelines
- Follow the guidelines in `docs/DESIGN_SYSTEM.md`.
- **Images**:
  - Do NOT use random images from Google search.
  - Only use free, commercially usable images from Unsplash (preferred), Pexels, or Pixabay.
  - For every image, add a comment in the code with the source URL and photographer credit.
  - Use Next.js `<Image>` component with proper width, height, and descriptive `alt` text.
  - Prefer high-quality images of modern cars, Indian cities/airports, professional drivers, families, corporate travellers, and wedding cars.

## Architecture & Code Rules
- Follow the guidelines in `docs/ARCHITECTURE.md`.
- **Tech Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase.
- **Authentication**: Admin authentication is handled by Supabase Auth using the SSR `@supabase/ssr` package. Route protection is enforced in `src/proxy.ts`. Server Actions are used for login (`/admin/login/actions.ts`) and logout (`/admin/actions.ts`). No public registration page exists.
- **Admin Authorization**: Authentication does NOT grant admin rights automatically. The system uses a Database Role Table pattern (`public.admin_users`). The user's UUID (`auth.users.id`) is explicitly whitelisted in this table. Middleware (`src/lib/supabase/middleware.ts`) queries this table server-side to enforce authorization, redirecting unauthorized authenticated users to `/admin/unauthorized`. RLS on `admin_users` prevents normal users from seeing or modifying admin lists.
- **Admin Shell/Layout**: The admin area (`/admin`) is completely isolated from the public website layout using Next.js Route Groups. The public pages (and Header/Footer) live inside `src/app/(public)`, while the admin sidebar shell lives in `src/app/admin/layout.tsx`. Do NOT put public headers into `/admin`.
- **Blog Database Security**: The blog uses `public.blog_posts`, `public.blog_categories`, and `public.blog_tags`. Strict Row Level Security (RLS) is applied to all tables. Public read access is strictly limited to published posts and categories/tags linked to published posts. All modifications (INSERT/UPDATE/DELETE) require admin authorization, which is enforced at the database level using a `SECURITY DEFINER` function `is_admin()` that checks the `admin_users` table. The source of truth for the schema is in `supabase/migrations/0001_blog_schema.sql`.
- **Blog CMS UI**: All CMS forms utilize React Hook Form, and all database mutations are handled by Next.js Server Actions (e.g. `src/lib/actions/blog.ts`). Server Actions strictly validate payloads using Zod and explicitly re-verify `is_admin` authorization server-side before executing mutations. The `author_id` is securely derived from `supabase.auth.getUser()` and never accepted from the client.
- **Supabase Connectivity Testing**: The `/supabase-test` route verifies backend connectivity. Do not create dummy tables or disable RLS for this. Querying a non-existent table and receiving a PostgREST error `PGRST205` ("Could not find the table in the schema cache") is the preferred, secure method of proving the network connection and keys are valid.
- **Components**: Prefer Server Components where possible. Create reusable components.
- **Forms**: Use React Hook Form + Zod for validation.
- **Email**: Use EmailJS for form submissions (Phase 0).

## Content & SEO
- Follow the guidelines in `docs/CONTENT_PLAN.md`.
- Content must feel human-written, natural, helpful, and sales-oriented.
- Proper heading hierarchy (H1 → H2 → H3) and SEO metadata (Title, Description, Open Graph, JSON-LD) on every page.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
