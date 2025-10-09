# Chetan Gabhane Professional Portfolio Website

## Overview
This project is Chetan Gabhane's professional portfolio, showcasing his work as a Cloud & AI Evangelist, Author, and Strategic Advisor. It features his publications, thought leadership, speaking topics, and contact information. The site is a full-stack application with a React frontend and Express backend, designed to be clean and sophisticated, drawing inspiration from professional author portfolios. The business vision is to establish a strong online presence, enhance his personal brand, and generate leads for media inquiries and consulting opportunities.

## User Preferences
- **Communication style**: Simple, everyday language.
- **Professional Context**: Working professional - Substack writing and author work are side hustles. Must avoid conflict of interest with day job.
- **Content Guidelines**: 
  - Use general frameworks and educational content (not employer-specific data)
  - Keep examples anonymized or hypothetical
  - Focus on thought leadership, not consulting during work hours
  - Time-efficient strategies for side hustle (limited hours available)

## System Architecture

### Frontend
- **Frameworks**: React 18 with TypeScript, Vite for bundling.
- **Routing**: Wouter for client-side navigation.
- **Data Fetching**: TanStack Query for server state management.
- **UI/UX**:
    - **Component Library**: shadcn/ui built on Radix UI.
    - **Styling**: Tailwind CSS with custom themes (Navy Blue, Deep Charcoal), responsive design, light/dark mode.
    - **Typography**: Georgia/Palatino for headers, Inter for body text.
- **Component Structure**: Organized into page components (Home, Blog) and reusable components (Hero, Navigation).

### Backend
- **Framework**: Express.js with TypeScript.
- **Development**: Vite dev server integration with HMR.
- **API**: Minimal API routes prefixed with `/api`, includes error handling.
- **Storage**: Abstracted storage interface, currently using in-memory storage, planned for PostgreSQL with Drizzle ORM.

### Data Storage
- **Planned Database**: PostgreSQL via Neon serverless.
- **ORM**: Drizzle ORM for type-safe queries.
- **Schema**: Defined in `shared/schema.ts`, includes Users table with Zod validation.

### SEO Optimization
- **Components**: `SEO.tsx` for dynamic meta tags (Open Graph, Twitter Cards), `StructuredData.tsx` for Schema.org JSON-LD (Person, Article, Book, Organization schemas), `Analytics.tsx` for Google Analytics 4 and LinkedIn Insight Tag.
- **Files**: `sitemap.xml` and `robots.txt` in `public` directory.
- **Strategy**: Focus on rich snippets, keyword targeting, and social media sharing optimization with minimal performance impact.

### Deployment
- **Platform**: Coolify v4.0.0-beta.434 on Hostinger VPS.
- **Containerization**: Docker multi-stage build using `node:20-alpine`, exposing port 5000.
- **Build Process**: Vite for client, esbuild for server, targeting Node ESM.
- **Environment Variables**: `PORT`, `NODE_ENV`, `RESEND_API_KEY`.

## External Dependencies

### Core Libraries
- `@neondatabase/serverless`: PostgreSQL connection.
- `drizzle-orm`, `drizzle-zod`: ORM and schema validation.
- `react-hook-form`, `@hookform/resolvers`, `zod`: Form handling and validation.

### UI Components
- `@radix-ui/*`: Headless UI primitives.
- `class-variance-authority`: Type-safe variant styling.
- `cmdk`: Command menu.
- `embla-carousel-react`: Carousel.
- `lucide-react`: Icons.

### Development Tools
- `@replit/vite-plugin-*`: Replit-specific enhancements.
- `esbuild`: JavaScript bundler.
- `tsx`: TypeScript execution.

### Third-Party Services
- **Resend**: Optional email notifications (for appointment bookings).
- **Substack**: RSS feed integration for "Latest Insights" section (https://chetangabhane.substack.com), with backend caching and fallback logic.
- **Google Analytics 4**: For website analytics.
- **LinkedIn Insight Tag**: For B2B tracking and retargeting.