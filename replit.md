# Mortgage Genius - Replit Project Documentation

## 🚨 AGENT INSTRUCTIONS - READ FIRST

### Context Management Protocol
Every Replit Agent session MUST follow these rules to maintain efficient context:

1. **CHECK CHANGELOG.md FIRST** - Read the changelog to understand recent changes
2. **UPDATE BOTH FILES** after significant work:
   - Add entries to CHANGELOG.md with date, category, and details
   - Update this replit.md file: 
     - REMOVE outdated "Recent Changes" that are > 7 days old
     - CONSOLIDATE repetitive information
     - ADD new architectural decisions or patterns
3. **KEEP REPLIT.MD LEAN** - This file should be a reference, not a history book
4. **USE CHANGELOG FOR HISTORY** - All historical changes go in CHANGELOG.md

### Critical User Preferences
- **Language:** Explain everything in simple terms (14-year-old level) - user is an attorney but prefers non-technical language
- **Design:** Match designs EXACTLY as provided (no interpretations or "improvements")
- **Admin Access:** Only @mortgagegenius.pro emails via Google OAuth
- **Current Priority:** Rent vs Buy Calculator needs refinement

### 🚨 CRITICAL FAQ DESIGN REQUIREMENTS - MUST READ

#### FAQ Visual Design Standards (Used on ALL pages with FAQs)
The user has SPECIFIC requirements for ALL FAQ sections across the entire website:

1. **BACKGROUND:** 
   - Dark cyberpunk-inspired gradient: `linear-gradient(135deg, #0a0e27 0%, #1a1f3a 25%, #0f172a 50%, #1e1b4b 75%, #0a0e27 100%)`
   - Subtle gradient swirls overlay with purple/blue/indigo circles at 10-30% opacity
   - Professional dark theme - NOT psychedelic, just sophisticated depth

2. **QUESTION TEXT (Headers):**
   - **COLOR:** WHITE - NOT blue, NOT dark gray - MUST BE WHITE
   - **FONT WEIGHT:** Bold (font-bold)
   - **SIZE:** text-lg (1.125rem)
   - Questions must stand out clearly against dark background

3. **ANSWER TEXT (Content):**
   - **COLOR:** WHITE - NOT gray, NOT dark - MUST BE WHITE 
   - **FONT WEIGHT:** Semibold (font-semibold / 600) - NOT normal, NOT medium
   - **LINE HEIGHT:** Relaxed (1.75)
   - Maximum readability is critical

4. **ACCORDION CONTAINERS:**
   - Background: White at 90% opacity (`bg-white/90`)
   - Backdrop blur effect (`backdrop-blur-md`)
   - Strong shadows (`shadow-2xl`)
   - Subtle border (`border-white/10`)

5. **ANIMATIONS:**
   - Open: 300ms with cubic-bezier easing
   - Close: 200ms with cubic-bezier easing
   - Smooth but snappy - not slow, not instant

6. **HOVER EFFECTS:**
   - White overlay at 10% opacity on hover
   - NO blue tints or colors

#### Global CSS Classes Available (in src/styles/globals.css)
```css
.faq-section-dark         /* Dark gradient background */
.faq-gradient-swirls      /* Swirl overlay container */
.faq-swirl-1/2/3         /* Individual swirl elements */
.faq-heading             /* White heading text */
.faq-accordion-item      /* Glass-effect accordion container */
.faq-question-trigger    /* Question button */
.faq-question-text       /* White question text */
.faq-chevron            /* Rotating arrow icon */
.faq-answer-content      /* Answer container */
.faq-answer-text         /* White semibold answer text */
.animate-accordion-down   /* Opening animation */
.animate-accordion-up     /* Closing animation */
```

#### Implementation Example for New FAQ Pages:
```jsx
<div className="faq-section-dark py-16">
  <div className="faq-gradient-swirls">
    <div className="faq-swirl-1" />
    <div className="faq-swirl-2" />
    <div className="faq-swirl-3" />
  </div>
  <div className="container mx-auto px-4 max-w-6xl relative z-10">
    <h2 className="faq-heading">Frequently Asked Questions</h2>
    <RadixAccordion.Item className="faq-accordion-item">
      <RadixAccordion.Trigger className="faq-question-trigger">
        <h3 className="faq-question-text">Question here?</h3>
        <ChevronDown className="faq-chevron" />
      </RadixAccordion.Trigger>
      <RadixAccordion.Content className="faq-answer-content animate-accordion-down">
        <p className="faq-answer-text">Answer here with white text and semibold weight.</p>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  </div>
</div>
```

⚠️ **NEVER** use dark text on dark backgrounds - the user specifically requires white text for visibility
⚠️ **ALWAYS** use semibold font weight for answers - not medium, not normal
⚠️ **MAINTAIN** the cyberpunk gradient theme across all FAQ sections

## Overview

Mortgage Genius is a professional mortgage broker website, developed with React, TypeScript, and Vite. Its primary purpose is to provide a comprehensive solution for mortgage brokers, featuring a modern, accessible user interface. Key capabilities include lead capture, a blog system for content marketing, and an administrative dashboard for content management. The project aims to offer a robust online presence, streamline client interactions, and support business growth through effective digital tools.

## Current State (See CHANGELOG.md for history)

### Content Management Structure
- **TinaCMS Pages:** State pages, legal pages, loan type pages (stored as MDX in `content/` folder)
- **React Components:** Interactive calculators, pre-qualification forms, HELOC page (cornerstone template), HTML sitemap
- **Admin Access:** Google OAuth restricted to @mortgagegenius.pro domain (awaiting credentials)
- **Cornerstone Template:** HELOC page serves as template with typewriter effect, particle animation, and comprehensive SEO markup

## System Architecture

### UI/UX Decisions
The project emphasizes a modern, professional, and accessible user experience, adhering to WCAG 2.1 Level AA compliance. This includes keyboard navigation support and a design built with Tailwind CSS v4 and Radix UI for accessible component primitives. The site features various marketing pages, legal disclosures, and interactive elements like calculators.

### Technical Implementations
The frontend is built using React 18 and TypeScript with Vite as the build tool. React Router DOM handles client-side navigation. Data visualization is managed with Recharts. Form management uses React Hook Form.

### Feature Specifications
- **Core Functionality:** Error boundary for graceful error handling, comprehensive SEO meta tags, Google Analytics 4 integration, and GDPR/CCPA compliant cookie consent.
- **Lead Management:** Integrated lead capture forms with planned Copper CRM integration.
- **Content Management:** An admin dashboard with authentication for blog post CRUD operations using a WordPress-style editor, image upload system, and per-post SEO management. TinaCMS is integrated for headless content management, storing content as MDX/JSON files with a visual editor.
- **Interactive Tools:** Includes interactive calculators for Home Equity, Debt Consolidation, and HELOC Payments, featuring real-time updates and Recharts visualizations.
- **Legal & Compliance:** Dedicated pages for Privacy Policy, Terms of Service, Equal Housing Opportunity, and an HTML Sitemap.
- **SEO & Localization:** Extensive SEO optimization with dynamic meta tag management via `react-helmet-async`. Supports localized content for various states (e.g., Arizona, Florida, Texas) with state-specific pages and content.

### System Design Choices
The application is structured as a frontend-heavy web application optimized for Replit's environment. The file structure organizes components, styles, utilities, and backend edge functions separately. The project leverages a component-based architecture for modularity and reusability. Deployment is configured for Replit's autoscale feature, suitable for static/frontend applications.

## External Dependencies

- **Supabase:** Used for backend services including:
    - **Supabase Edge Functions:** Deno-based functions within `src/supabase/functions/` for backend logic, utilizing Hono framework.
    - **Supabase Auth:** Authentication system.
    - **Supabase Storage:** Image uploads.
    - **KV Store:** PostgreSQL-backed data storage.
- **Google Analytics 4:** For website analytics.
- **Copper CRM:** Planned integration for lead management.
- **Morty Application:** External link for online loan applications.