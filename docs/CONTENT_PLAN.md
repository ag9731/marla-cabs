# Content & SEO Plan

## Content Strategy
- **Tone:** Professional, warm, trustworthy, benefit-focused.
- **Quality:** Must feel human-written, natural, and helpful. Avoid generic AI fluff.
- **Local Context:** Include realistic Indian market pricing, cities, and scenarios.

## Page Content Guidelines
- **Home:** Strong headlines, trust elements (stats), service previews, car showcases, testimonials.
- **Services Pages:** 400–700 words each explaining benefits, inclusions, use cases, pricing guidance, and FAQs.
- **Blog:** 6–8 comprehensive posts (800–1200 words). High-value topics (e.g., airport transfer tips, choosing outstation cabs, wedding transportation).

## SEO Best Practices
- **Metadata:** Every page must have unique `title`, `description`, and Open Graph tags using Next.js Metadata API.
- **Headings:** Proper hierarchy (`h1` -> `h2` -> `h3`). One `h1` per page.
- **Keywords:** Include relevant local keywords naturally (cab booking, airport taxi, outstation cab).
- **Structured Data (JSON-LD):**
  - `Organization` and `LocalBusiness` on the Home page.
  - `Article` on Blog post pages.
- **Crawling:** Generate `sitemap.ts` and `robots.ts`.
- **Performance:** Optimize images and leverage Next.js Server Components for Core Web Vitals.
