# Design Guidelines: Chetan Gabhane Professional Portfolio Website

## Design Approach

**Selected Approach:** Reference-Based Design inspired by professional author portfolios (Tim Ferriss, Seth Godin) and executive thought leader websites (Simon Sinek, Gary Vaynerchuk)

**Key Principles:**
- Professional authority and credibility through clean, sophisticated design
- Content hierarchy that emphasizes books and thought leadership
- Trust-building through consistent branding and polished presentation
- Strategic use of whitespace to create breathing room and focus

---

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Navy Blue: 210 75% 20% (brand authority, trust)
- Deep Charcoal: 0 0% 10% (text, headers)
- Crisp White: 0 0% 100% (backgrounds, clarity)

**Accent Colors:**
- Slate Blue: 210 30% 45% (secondary buttons, links)
- Light Gray: 210 15% 95% (section backgrounds)
- Warm Gray: 0 0% 60% (body text, subtle elements)

**Dark Mode:**
- Background: 210 25% 8%
- Surface: 210 20% 12%
- Text: 0 0% 95%
- Primary: 210 80% 60%

### B. Typography

**Font Families:**
- Headers: 'Georgia', 'Palatino', serif (classic, authoritative)
- Body: 'Inter', 'Helvetica Neue', sans-serif (clean, readable)
- Accents: 'Merriweather', serif (pull quotes, emphasis)

**Type Scale:**
- Hero Headline: text-5xl to text-6xl (48-60px), font-bold
- Section Headers: text-3xl to text-4xl (30-36px), font-semibold
- Subsections: text-xl to text-2xl (20-24px), font-medium
- Body: text-base to text-lg (16-18px), leading-relaxed
- Captions: text-sm (14px), text-slate-600

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Component spacing: gap-8, gap-12 between major elements
- Content spacing: space-y-6 for vertical rhythm

**Container Widths:**
- Full sections: max-w-7xl (1280px)
- Content sections: max-w-5xl (1024px)
- Reading content: max-w-3xl (768px)
- Tight content: max-w-2xl (672px)

### D. Component Library

**Navigation:**
- Sticky header with backdrop blur (backdrop-blur-md bg-navy-900/90)
- Horizontal navigation with hover underline effects
- Mobile: Hamburger menu with slide-in overlay

**Hero Section:**
- Split layout: 60/40 text-to-image ratio on desktop
- Professional headshot on right (rounded-lg, subtle shadow)
- Two-button CTA layout (primary + secondary actions)
- Height: min-h-[85vh] for impact without forcing 100vh

**Books Showcase:**
- 2-column grid on desktop (grid-cols-1 md:grid-cols-2)
- Book covers with subtle hover lift effect (transform hover:scale-105)
- Book details below cover: title, subtitle, CTA button
- White/light background for contrast

**Blog Section:**
- Card-based layout with 1-column on mobile, potentially 2-column on larger screens
- Article preview cards with: title, date, excerpt, "Read More" link
- Alternating card backgrounds for visual rhythm

**Press Kit:**
- Multi-column asset grid (grid-cols-2 lg:grid-cols-3)
- Download buttons for headshots, bio PDFs, speaking topics
- Speaking topics as elegant list with check icons or bullets

**Newsletter Subscription:**
- Centered section with contrasting background (light slate)
- Single-line form: email input + subscribe button
- Subtle note about integration placeholder
- Width: max-w-2xl centered

**Footer:**
- Dark background (bg-slate-900)
- Centered copyright and professional title
- Social links if available (LinkedIn, etc.)

### E. Imagery & Visual Elements

**Images Required:**

1. **Hero Section:**
   - Professional headshot of Chetan Gabhane (high-quality, business casual/professional attire)
   - Dimensions: 400x500px, rounded corners, subtle shadow
   - Placement: Right side of hero on desktop, centered below text on mobile

2. **Book Covers:**
   - "Reverse Engineering with Terraform" - technical, modern design
   - "Navigating VMware Turmoil in the Broadcom Era" - enterprise, strategic aesthetic
   - Dimensions: 300x450px (portrait), sharp quality

3. **Press Kit Assets:**
   - Two professional headshots (formal and casual business)
   - Both images: 400x400px, high resolution

**Visual Treatment:**
- Subtle shadows: shadow-lg, shadow-xl for elevation
- Border radius: rounded-lg (8px) for images, rounded-md (6px) for cards
- Minimal use of gradients - only for subtle overlays if needed
- Icons: Use Heroicons (outline style) for minimal, professional iconography

### F. Interactive Elements

**Buttons:**
- Primary: Navy background, white text, rounded-md, px-6 py-3
- Secondary: Slate outline, navy text, hover fills with slate
- All buttons: transition-all duration-200 for smooth interactions

**Cards:**
- Subtle hover elevation: hover:shadow-xl transition-shadow
- Border: border border-slate-200 (light mode)
- Background: bg-white with hover:bg-slate-50

**Links:**
- Inline: text-navy-600 underline-offset-4 hover:underline
- Navigation: no underline default, underline on hover

**Forms:**
- Input fields: border-slate-300, focus:ring-2 focus:ring-navy-500
- Consistent padding: px-4 py-3
- Placeholder text: text-slate-400

### G. Animations

**Minimal, Purpose-Driven:**
- Smooth scroll behavior for anchor links
- Fade-in on scroll for section reveals (subtle, once per page load)
- Button hover scale: hover:scale-105 for book covers only
- No carousel animations, no distracting parallax effects

---

## Page-Specific Layouts

**Homepage:** Hero → About → Books (2-col) → Insights (list) → Newsletter (centered) → Contact → Footer

**Blog Listing:** Small hero banner → Article cards (1-2 columns) → Pagination

**Individual Blog Post:** Small hero → Single column content (max-w-3xl) → Back to blog link

**Press Kit:** Small hero → Bio section → Headshots (2-col) → Books (2-col) → Speaking Topics (list) → Contact

---

## Responsive Behavior

- Mobile: Single column, stacked navigation, full-width components
- Tablet (md): 2-column where appropriate, adjusted spacing
- Desktop (lg): Full multi-column layouts, optimal spacing
- All breakpoints: Maintain readability and visual hierarchy