/**
 * ============================================================================
 * SEO HEAD COMPONENT - $50K WEBSITE REQUIREMENT
 * ============================================================================
 * Purpose: Provides comprehensive SEO meta tags for search engines & social media
 * Added: TIER 1 - Critical for Google rankings and social sharing
 * 
 * What it does:
 * - Sets page title, description, and keywords
 * - Adds Open Graph tags for Facebook/LinkedIn sharing
 * - Adds Twitter Card tags for Twitter sharing
 * - Includes canonical URL for SEO
 * - Sets viewport and mobile optimization tags
 * 
 * Benefits:
 * - Better Google search rankings
 * - Beautiful previews when shared on social media
 * - Mobile-friendly designation in search results
 * 
 * TODO for coder: 
 * - Update the SITE_URL constant with your production domain
 * - Add actual logo URL to og:image
 * - Consider making this dynamic for different pages
 * ============================================================================
 */

import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export function SEOHead({
  title = 'Mortgage Genius - Expert Home Loans in AZ, TX & FL | NMLS #2280851',
  description = 'Get pre-approved in 24 hours! Expert mortgage lending for VA, FHA, Conventional & Jumbo loans in Arizona, Texas, and Florida. Licensed broker with $500M+ funded.',
  keywords = 'mortgage broker, home loans, VA loans, FHA loans, conventional loans, Arizona mortgage, Texas mortgage, Florida mortgage, mortgage calculator, home financing, pre-approval',
  ogImage = 'https://yourdomain.com/og-image.jpg', // TODO: Replace with actual logo/preview image
  ogType = 'website',
  canonicalUrl
}: SEOHeadProps) {
  
  // Production domain
  const SITE_URL = 'https://mortgagegenius.pro';
  const fullCanonicalUrl = canonicalUrl || SITE_URL;

  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (selector: string, content: string, attribute: string = 'content') => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const attrName = selector.includes('property=') ? 'property' : 'name';
        const attrValue = selector.match(/["']([^"']+)["']/)?.[1];
        if (attrValue) {
          element.setAttribute(attrName, attrValue);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Set or update link tags (canonical)
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // ============== BASIC SEO META TAGS ==============
    setMetaTag('meta[name="description"]', description);
    setMetaTag('meta[name="keywords"]', keywords);
    setMetaTag('meta[name="author"]', 'Mortgage Genius');
    setMetaTag('meta[name="robots"]', 'index, follow');
    
    // Mobile optimization
    setMetaTag('meta[name="viewport"]', 'width=device-width, initial-scale=1, maximum-scale=5');
    setMetaTag('meta[name="theme-color"]', '#003366');

    // ============== OPEN GRAPH (Facebook, LinkedIn) ==============
    setMetaTag('meta[property="og:title"]', title);
    setMetaTag('meta[property="og:description"]', description);
    setMetaTag('meta[property="og:image"]', ogImage);
    setMetaTag('meta[property="og:url"]', fullCanonicalUrl);
    setMetaTag('meta[property="og:type"]', ogType);
    setMetaTag('meta[property="og:site_name"]', 'Mortgage Genius');
    setMetaTag('meta[property="og:locale"]', 'en_US');

    // ============== TWITTER CARD TAGS ==============
    setMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', title);
    setMetaTag('meta[name="twitter:description"]', description);
    setMetaTag('meta[name="twitter:image"]', ogImage);
    // TODO: Add your Twitter handle
    // setMetaTag('meta[name="twitter:site"]', '@MortgageGenius');
    // setMetaTag('meta[name="twitter:creator"]', '@MortgageGenius');

    // ============== CANONICAL URL ==============
    setLinkTag('canonical', fullCanonicalUrl);

    // ============== BUSINESS/SCHEMA INFO ==============
    setMetaTag('meta[name="geo.region"]', 'US-AZ;US-TX;US-FL');
    setMetaTag('meta[name="geo.placename"]', 'Arizona, Texas, Florida');

  }, [title, description, keywords, ogImage, ogType, fullCanonicalUrl]);

  // This component doesn't render anything visible
  return null;
}

/**
 * ============================================================================
 * STRUCTURED DATA (JSON-LD) - For Rich Search Results
 * ============================================================================
 * Purpose: Helps Google show rich snippets in search results
 * 
 * TODO for coder: Add this structured data script tag to your index.html or
 * create a separate component to inject it. This tells Google about your business.
 * 
 * Example structured data for a Financial Service:
 * 
 * <script type="application/ld+json">
 * {
 *   "@context": "https://schema.org",
 *   "@type": "FinancialService",
 *   "name": "Mortgage Genius",
 *   "description": "Expert mortgage lending services",
 *   "url": "https://mortgagegenius.com",
 *   "logo": "https://mortgagegenius.com/logo.png",
 *   "image": "https://mortgagegenius.com/og-image.jpg",
 *   "telephone": "+1-234-567-8900",
 *   "priceRange": "$$",
 *   "address": {
 *     "@type": "PostalAddress",
 *     "addressCountry": "US",
 *     "addressRegion": "AZ"
 *   },
 *   "areaServed": [
 *     {
 *       "@type": "State",
 *       "name": "Arizona"
 *     },
 *     {
 *       "@type": "State", 
 *       "name": "Texas"
 *     },
 *     {
 *       "@type": "State",
 *       "name": "Florida"
 *     }
 *   ],
 *   "aggregateRating": {
 *     "@type": "AggregateRating",
 *     "ratingValue": "4.9",
 *     "reviewCount": "250"
 *   }
 * }
 * </script>
 * 
 * ============================================================================
 */
