/**
 * ============================================================================
 * SKIP TO CONTENT LINK - $50K WEBSITE REQUIREMENT
 * ============================================================================
 * Purpose: Accessibility feature for keyboard and screen reader users
 * Added: TIER 1 - WCAG 2.1 Level A requirement
 * 
 * What it does:
 * - Provides a hidden link that appears when user presses Tab
 * - Allows keyboard users to skip navigation and jump to main content
 * - Required for ADA compliance and WCAG accessibility standards
 * 
 * How it works:
 * - Hidden by default (off-screen)
 * - Appears at top of page when focused with keyboard
 * - Clicking it focuses the main content area
 * 
 * Benefits:
 * - Better accessibility for disabled users
 * - Legal compliance (ADA)
 * - Improved keyboard navigation experience
 * ============================================================================
 */

export function SkipToContent() {
  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkipToContent}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#003366] focus:text-white focus:rounded-lg focus:shadow-xl focus:ring-4 focus:ring-[#10b981] focus:outline-none transition-all"
    >
      Skip to main content
    </a>
  );
}

/**
 * ============================================================================
 * ACCESSIBILITY UTILITY CLASSES REFERENCE
 * ============================================================================
 * 
 * Used in this component:
 * - sr-only: Screen reader only (visually hidden but readable by assistive tech)
 * - focus:not-sr-only: Becomes visible when focused
 * - focus:absolute: Positioned at top of page when visible
 * - focus:ring-4: Strong focus indicator for visibility
 * 
 * Best Practices:
 * 1. All interactive elements need visible focus indicators
 * 2. Skip links should be first focusable element on page
 * 3. Main content needs id="main-content" and tabindex="-1"
 * 4. Color contrast must meet WCAG AA standards (4.5:1 for normal text)
 * 
 * ============================================================================
 */
