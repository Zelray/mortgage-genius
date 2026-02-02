/**
 * ============================================================================
 * COOKIE CONSENT BANNER - TIER 2
 * ============================================================================
 * Purpose: GDPR and CCPA compliance for cookie usage
 * Required for: Any website using cookies/tracking (Google Analytics, etc.)
 * 
 * Features:
 * - Appears on first visit
 * - Remembers user choice (localStorage)
 * - Links to Privacy Policy
 * - Customizable cookie preferences
 * - Compliant with EU GDPR and California CCPA
 * 
 * How it works:
 * - Shows banner on first visit
 * - User can Accept All, Reject All, or Customize
 * - Choice is saved in localStorage
 * - Google Analytics only loads if user accepts
 * 
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface CookiePreferences {
  necessary: boolean;      // Always true (required for website to function)
  analytics: boolean;      // Google Analytics
  marketing: boolean;      // Marketing cookies (future use)
  preferences: boolean;    // User preference cookies
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // ========== CHECK IF USER HAS ALREADY MADE A CHOICE ==========
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
      // First visit - show banner after 1 second delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(cookieConsent);
        setPreferences(saved);
      } catch (e) {
        console.error('Error loading cookie preferences:', e);
      }
    }
  }, []);

  // ========== SAVE PREFERENCES AND HIDE BANNER ==========
  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);

    // Initialize Google Analytics if accepted (no reload needed)
    if (prefs.analytics && typeof window !== 'undefined' && (window as any).gtag) {
      console.log('Analytics enabled via cookie consent');
    }
  };

  // ========== ACCEPT ALL COOKIES ==========
  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  // ========== REJECT ALL (EXCEPT NECESSARY) ==========
  const rejectAll = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  // ========== SAVE CUSTOM PREFERENCES ==========
  const saveCustom = () => {
    savePreferences(preferences);
  };

  // Don't show if user has already made a choice
  if (!showBanner) return null;

  return (
    <>
      {/* ========== COOKIE CONSENT BANNER ========== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[#003366] shadow-2xl animate-in slide-in-from-bottom-5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            {/* Cookie Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#003366] rounded-full flex items-center justify-center">
                <Cookie className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Message */}
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">
                We Value Your Privacy
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use cookies to enhance your browsing experience, provide personalized content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                You can customize your preferences or learn more in our{' '}
                <a 
                  href="/privacy-policy" 
                  className="text-[#10b981] hover:underline font-semibold"
                >
                  Privacy Policy
                </a>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button
                onClick={() => setShowSettings(true)}
                variant="outline"
                className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
              >
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
              <Button
                onClick={rejectAll}
                variant="outline"
                className="border-gray-300"
              >
                Reject All
              </Button>
              <Button
                onClick={acceptAll}
                className="bg-[#10b981] hover:bg-[#059669] text-white"
              >
                Accept All
              </Button>
            </div>

            {/* Close Button (Mobile) */}
            <button
              onClick={rejectAll}
              className="absolute top-2 right-2 md:hidden p-2 text-gray-400 hover:text-gray-600"
              aria-label="Close cookie banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========== COOKIE SETTINGS DIALOG ========== */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#003366] flex items-center gap-2">
              <Cookie className="w-6 h-6" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. You can enable or disable different types of cookies below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Necessary Cookies (Always On) */}
            <div className="border-b pb-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Necessary Cookies
                  </h4>
                  <p className="text-sm text-gray-600">
                    These cookies are essential for the website to function properly. 
                    They enable basic features like page navigation and access to secure areas.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                    Always Active
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="border-b pb-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Analytics Cookies
                  </h4>
                  <p className="text-sm text-gray-600">
                    These cookies help us understand how visitors interact with our website by 
                    collecting and reporting information anonymously. We use Google Analytics.
                  </p>
                </div>
                <label className="ml-4 relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#10b981]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10b981]"></div>
                </label>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="border-b pb-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Marketing Cookies
                  </h4>
                  <p className="text-sm text-gray-600">
                    These cookies track your online activity to help advertisers deliver more 
                    relevant advertising or to limit how many times you see an ad.
                  </p>
                </div>
                <label className="ml-4 relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#10b981]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10b981]"></div>
                </label>
              </div>
            </div>

            {/* Preference Cookies */}
            <div className="pb-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Preference Cookies
                  </h4>
                  <p className="text-sm text-gray-600">
                    These cookies enable the website to remember your preferences (such as your 
                    username, language, or region) to provide a more personalized experience.
                  </p>
                </div>
                <label className="ml-4 relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#10b981]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10b981]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
            <Button
              onClick={rejectAll}
              variant="outline"
              className="flex-1"
            >
              Reject All
            </Button>
            <Button
              onClick={saveCustom}
              className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white"
            >
              Save Preferences
            </Button>
            <Button
              onClick={acceptAll}
              className="flex-1 bg-[#003366] hover:bg-[#002244] text-white"
            >
              Accept All
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * ============================================================================
 * USAGE INSTRUCTIONS FOR CODER
 * ============================================================================
 * 
 * 1. Add to App.tsx:
 *    import { CookieConsent } from './components/CookieConsent';
 *    
 *    // In your App component:
 *    <CookieConsent />
 * 
 * 2. Check cookie preferences before loading analytics:
 *    const cookieConsent = localStorage.getItem('cookieConsent');
 *    if (cookieConsent) {
 *      const prefs = JSON.parse(cookieConsent);
 *      if (prefs.analytics) {
 *        // Load Google Analytics
 *      }
 *    }
 * 
 * 3. Update GoogleAnalytics.tsx to check consent:
 *    - Only load if user has accepted analytics cookies
 *    - Check localStorage before initializing GA
 * 
 * 4. Provide way for users to change preferences later:
 *    - Add "Cookie Settings" link in footer
 *    - Shows the same dialog
 * 
 * ============================================================================
 */
