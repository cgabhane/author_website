# Chetan Gabhane Professional Portfolio Website

## Overview

This is a professional portfolio website for Chetan Gabhane, a Cloud & AI Evangelist, Author, and Strategic Advisor. The site showcases his published works, thought leadership content, speaking topics, and provides contact information for media inquiries and consulting opportunities. Built as a full-stack application with a React frontend and Express backend, it emphasizes clean, sophisticated design inspired by professional author portfolios.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for the UI layer
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query** for server state management and data fetching

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for styling with custom theme configuration
- **Design tokens** defined in CSS variables for consistent theming
- Custom color palette: Navy Blue primary, Deep Charcoal text, accent colors for secondary elements
- Typography system: Georgia/Palatino serifs for headers, Inter sans-serif for body text
- Supports both light and dark modes

**Component Architecture**
- Page components: `Home`, `Blog`, `BlogPost`, `PressKit`, `NotFound`
- Reusable components: `Hero`, `About`, `Books`, `Insights`, `Newsletter`, `Contact`, `Navigation`, `Footer`
- UI primitives in `components/ui/` directory (buttons, cards, dialogs, forms, etc.)
- Component examples in `components/examples/` for development reference

**Styling Approach**
- Utility-first with Tailwind CSS
- Custom CSS variables for theme colors and spacing
- Responsive design with mobile-first approach
- Hover and active state utilities (`hover-elevate`, `active-elevate-2`)
- Consistent border radius system (lg: 9px, md: 6px, sm: 3px)

### Backend Architecture

**Server Framework**
- **Express.js** as the web server
- **TypeScript** for type safety
- Custom middleware for request logging and error handling
- Development and production build configurations

**Development vs Production**
- Development: Vite dev server integrated with Express middleware
- Production: Static file serving from `dist/public`
- Hot Module Replacement (HMR) in development via Vite
- Replit-specific plugins for development banner and error overlay

**API Structure**
- Routes defined in `server/routes.ts` (currently minimal, ready for expansion)
- All API routes prefixed with `/api`
- Error handling middleware catches and formats errors

**Storage Layer**
- Abstracted storage interface (`IStorage`) for future database integration
- In-memory storage implementation (`MemStorage`) for development
- User model defined with `id`, `username`, `password` fields
- Ready for Drizzle ORM integration with PostgreSQL (schema defined but not yet connected)

### Data Storage

**Planned Database**
- **PostgreSQL** via Neon serverless
- **Drizzle ORM** for type-safe database queries
- Schema defined in `shared/schema.ts`
- Migration configuration in `drizzle.config.ts`
- Currently using in-memory storage until database is provisioned

**Data Models**
- Users table with UUID primary keys
- Zod schemas for validation via `drizzle-zod`
- Shared types between frontend and backend via `@shared` path alias

### External Dependencies

**Core Libraries**
- `@neondatabase/serverless` - PostgreSQL database connection
- `drizzle-orm` & `drizzle-zod` - ORM and schema validation
- `react-hook-form` & `@hookform/resolvers` - Form handling and validation
- `zod` - Runtime type validation

**UI Component Libraries**
- `@radix-ui/*` - Headless UI component primitives (accordion, dialog, dropdown, tooltip, etc.)
- `class-variance-authority` - Type-safe variant styling
- `cmdk` - Command menu component
- `embla-carousel-react` - Carousel/slider functionality
- `lucide-react` - Icon library

**Development Tools**
- `@replit/vite-plugin-*` - Replit-specific development enhancements
- `esbuild` - Fast JavaScript bundler for production builds
- `tsx` - TypeScript execution for development

**Build & Bundling**
- Vite handles client-side bundling
- esbuild bundles server-side code for production
- Path aliases: `@/` for client, `@shared/` for shared code, `@assets/` for static assets

**Static Assets**
- Profile images and book covers stored in `attached_assets/`
- Legacy HTML/CSS files preserved as design references
- Images imported via Vite's asset handling

**Third-Party Services**
- **Resend** - Email notifications for appointment bookings (optional, app works without it)
- Newsletter signup (toast notification placeholder, ready for email service integration)
- External book purchase links (Amazon, etc.)
- Social media links (LinkedIn, email contact)

## Deployment Configuration

### Coolify Deployment (Hostinger VPS)
- **Platform**: Coolify v4.0.0-beta.434
- **Server**: Hostinger VPS (72.60.202.209)
- **Domain**: chetangabhane.in (custom domain configured)
- **Deployment URL**: wo0woocog8cscoo8kkwo888w.72.60.202.209.sslip.io
- **Auto-deploy**: Webhook configured for `main` branch pushes
- **GitHub Repository**: cgabhane/author_website

### Docker Configuration
- **Multi-stage build**: Builder stage + production stage
- **Base Image**: node:20-alpine
- **Port**: 5000 (bound to 0.0.0.0)
- **Health Check**: GET /api/health endpoint
- **Environment**: NODE_ENV=production

### Build Process
1. **Client Build**: `npx vite build` → outputs to `dist/public`
2. **Server Build**: 
   - `esbuild server/index.ts` with `--external:./vite.js --external:./static.js`
   - `esbuild server/static.ts` → outputs to `dist/static.js`
3. **Production**: Node ESM with explicit `.js` extensions in dynamic imports

### Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)
- `RESEND_API_KEY` - Optional email service API key (app works without it)

### Key Technical Decisions
- **esbuild external flags**: Prevents bundling local modules (`./vite.js`, `./static.js`)
- **ESM compatibility**: Explicit `.js` extensions required for dynamic imports in Node ESM
- **Graceful degradation**: Resend email client is optional - app starts and works without API key
- **Static file serving**: Production uses Express static middleware instead of Vite