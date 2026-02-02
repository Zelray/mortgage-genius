/**
 * ============================================================================
 * GOOGLE ANALYTICS & TAG MANAGER - TIER 2
 * ============================================================================
 * Purpose: Track website visitors, conversions, and user behavior
 * 
 * What this does:
 * - Loads Google Analytics 4 (GA4)
 * - Loads Google Tag Manager (GTM) for advanced tracking
 * - Tracks page views automatically
 * - Provides functions for tracking custom events
 * 
 * Setup Instructions for Coder:
 * 1. Get your GA4 Measurement ID from Google Analytics
 *    - Format: G-XXXXXXXXXX
 *    - Find it: Admin > Data Streams > Web > Measurement ID
 * 
 * 2. Get your GTM Container ID (optional but recommended)
 *    - Format: GTM-XXXXXXX
 *    - Find it: Admin > Container ID
 * 
 * 3. Update the IDs below (lines 50-51)
 * 
 * Events You Can Track:
 * - Form submissions (contact, quick contact, calculator)
 * - Button clicks (phone, apply now, get started)
 * - Calculator usage
 * - State selections
 * - Loan program views
 * - Blog post views
 * 
 * ============================================================================
 */

import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  /** Your GA4 Measurement ID (e.g., G-XXXXXXXXXX) */
  measurementId?: string;
  /** Your GTM Container ID (e.g., GTM-XXXXXXX) - Optional */
  gtmId?: string;
}

export function GoogleAnalytics({ 
  measurementId = 'G-XXXXXXXXXX',  // TODO: Replace with your GA4 Measurement ID
  gtmId = 'GTM-XXXXXXX'            // TODO: Replace with your GTM Container ID
}: GoogleAnalyticsProps) {

  useEffect(() => {
    // Only load in production or if explicitly enabled
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics disabled in development mode');
      console.log('Set NODE_ENV=production to enable tracking');
      return;
    }

    // ========== LOAD GOOGLE TAG MANAGER ==========
    if (gtmId && gtmId !== 'GTM-XXXXXXX') {
      // GTM Script
      const gtmScript = document.createElement('script');
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(gtmScript);

      // GTM NoScript (for users with JS disabled)
      const gtmNoScript = document.createElement('noscript');
      gtmNoScript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.insertBefore(gtmNoScript, document.body.firstChild);

      console.log('✅ Google Tag Manager loaded:', gtmId);
    }

    // ========== LOAD GOOGLE ANALYTICS 4 ==========
    if (measurementId && measurementId !== 'G-XXXXXXXXXX') {
      // GA4 Script
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(gaScript);

      // GA4 Config
      const gaConfigScript = document.createElement('script');
      gaConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          page_path: window.location.pathname,
          send_page_view: true
        });
      `;
      document.head.appendChild(gaConfigScript);

      // Make gtag available globally for custom event tracking
      (window as any).gtag = function() {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push(arguments);
      };

      console.log('✅ Google Analytics loaded:', measurementId);
    }
  }, [measurementId, gtmId]);

  // This component doesn't render anything
  return null;
}

/**
 * ============================================================================
 * CUSTOM EVENT TRACKING FUNCTIONS
 * ============================================================================
 * Use these functions throughout your app to track user interactions
 * ============================================================================
 */

/**
 * Track a custom event in Google Analytics
 * @param eventName - Name of the event (e.g., 'contact_form_submit')
 * @param eventParams - Additional parameters (e.g., { form_type: 'quick_contact' })
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
    console.log('📊 Event tracked:', eventName, eventParams);
  } else if (process.env.NODE_ENV === 'development') {
    console.log('📊 Event (dev mode):', eventName, eventParams);
  }
}

/**
 * Track form submission
 * @param formName - Name/type of form (e.g., 'quick_contact', 'calculator', 'contact')
 * @param formData - Optional form data to include
 */
export function trackFormSubmit(formName: string, formData?: Record<string, any>) {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData
  });
}

/**
 * Track button/link clicks
 * @param buttonName - Name of button (e.g., 'call_now', 'apply_online')
 * @param location - Where on page (e.g., 'header', 'footer', 'hero')
 */
export function trackButtonClick(buttonName: string, location?: string) {
  trackEvent('button_click', {
    button_name: buttonName,
    location
  });
}

/**
 * Track phone call clicks
 */
export function trackPhoneClick(location: string = 'unknown') {
  trackEvent('phone_click', {
    location,
    phone_number: '(321) 555-0199'
  });
}

/**
 * Track loan program views
 * @param programName - Name of loan program (e.g., 'VA', 'FHA', 'Conventional')
 */
export function trackLoanProgramView(programName: string) {
  trackEvent('loan_program_view', {
    program_name: programName
  });
}

/**
 * Track calculator usage
 * @param calculatorData - Calculator inputs/results
 */
export function trackCalculatorUse(calculatorData: Record<string, any>) {
  trackEvent('calculator_use', calculatorData);
}

/**
 * Track state selection
 * @param state - Selected state (AZ, TX, FL)
 */
export function trackStateSelection(state: string) {
  trackEvent('state_selection', {
    state
  });
}

/**
 * ============================================================================
 * USAGE EXAMPLES FOR CODER
 * ============================================================================
 * 
 * Import the tracking functions:
 * import { trackFormSubmit, trackButtonClick, trackPhoneClick } from './components/GoogleAnalytics';
 * 
 * Example 1: Track form submission
 * const handleSubmit = (e) => {
 *   e.preventDefault();
 *   trackFormSubmit('quick_contact', { name, email });
 *   // ... rest of form logic
 * };
 * 
 * Example 2: Track phone button click
 * <Button onClick={() => trackPhoneClick('header')}>
 *   <Phone /> Call Now
 * </Button>
 * 
 * Example 3: Track Apply Now button
 * <Button onClick={() => trackButtonClick('apply_now', 'hero')}>
 *   Apply Now
 * </Button>
 * 
 * Example 4: Track loan program card click
 * <div onClick={() => trackLoanProgramView('VA Loan')}>
 *   {/* VA Loan card content *\/}
 * </div>
 * 
 * Example 5: Track state selection
 * <button onClick={() => {
 *   setSelectedState('AZ');
 *   trackStateSelection('AZ');
 * }}>
 *   Arizona
 * </button>
 * 
 * ============================================================================
 */
