/**
 * ============================================================================
 * FOOTER COMPONENT - $50K WEBSITE
 * ============================================================================
 * TIER 1 ADDITIONS:
 * ✅ Quick Contact Form - Simple lead capture (name + email)
 * ✅ Accessibility - ARIA labels, semantic HTML, keyboard navigation
 * ✅ Query String Navigation - Pre-fills contact page with user info
 * 
 * TIER 2 ADDITIONS:
 * ✅ Lead capture to Copper CRM + Database
 * ✅ Analytics tracking on form submission
 * ✅ Links to Privacy Policy and Terms
 * 
 * NOTE FOR CODER:
 * - Form sends lead to backend API and Copper CRM
 * - Also navigates to /contact page as backup
 * - Includes proper validation and accessibility attributes
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Send, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import logo from '../assets/mortgage-genius-logo.png';

export function Footer() {
  // ========== QUICK CONTACT FORM STATE ==========
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ========== PWA INSTALL STATE ==========
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if running in standalone mode (already installed)
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  /**
   * Handles PWA installation when user clicks install button
   */
  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for iOS or if prompt isn't available
      if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
        toast.info(
          <div>
            <p className="font-semibold mb-1">To add to home screen:</p>
            <ol className="text-sm space-y-1">
              <li>1. Tap the Share button (square with arrow)</li>
              <li>2. Scroll down and tap "Add to Home Screen"</li>
              <li>3. Tap "Add"</li>
            </ol>
          </div>,
          { duration: 10000 }
        );
      } else {
        toast.info('This app can be installed from your browser menu');
      }
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success('App installed successfully!');
      setIsInstalled(true);
    }
    
    // Clear the deferred prompt
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  /**
   * TIER 2: Handles form submission with lead capture
   * - Sends to backend API (saves to DB + sends to Copper)
   * - Tracks analytics event
   * - Navigates to contact page as fallback
   */
  const handleQuickContact = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      // ========== SEND LEAD TO BACKEND API ==========
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e8e0d145/leads`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            formType: 'quick_contact_footer',
            leadSource: 'website_footer',
            metadata: {
              page: window.location.pathname,
              referrer: document.referrer
            }
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        // Success!
        toast.success('Thank you! We will contact you within 24 hours.');
        
        // Track analytics event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            form_name: 'quick_contact_footer',
            form_location: 'footer'
          });
        }

        // Reset form
        setFormData({ name: '', email: '' });

        // Optional: Navigate to contact page
        setTimeout(() => {
          const params = new URLSearchParams({
            name: formData.name,
            email: formData.email,
            message: 'How can we help?'
          });
          window.location.href = `/contact?${params.toString()}`;
        }, 1500);

      } else {
        toast.error(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Footer form error:', error);
      toast.error('Failed to submit. Please call us at (321) 555-0199.');
      
      // Fallback to query string navigation
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        message: 'How can we help?'
      });
      window.location.href = `/contact?${params.toString()}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#003366] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {/* 
            ========================================================================
            COLUMN 1: Logo + Quick Contact Form
            ========================================================================
            TIER 1 ADDITION: Simple contact form for lead capture
            - Pre-fills contact page with user's name and email
            - Includes accessibility attributes (labels, ARIA, required fields)
            - Logo is full size, form has no background container
            ========================================================================
          */}
          <div>
            {/* Full Size Logo - Aligned with other column headings */}
            <div className="mb-4">
              <img 
                src={logo} 
                alt="Mortgage Genius" 
                className="w-[90%] h-auto brightness-0 invert" 
              />
            </div>
            
            {/* ========== QUICK CONTACT FORM (No container background) ========== */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Quick Contact</h4>
              <form 
                onSubmit={handleQuickContact} 
                className="space-y-2"
                aria-label="Quick contact form"
              >
                {/* Name Input */}
                <div>
                  <label htmlFor="footer-name" className="sr-only">
                    Your Name
                  </label>
                  <Input
                    id="footer-name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    aria-required="true"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-[#10b981] focus:ring-[#10b981] h-9 text-sm"
                  />
                </div>
                
                {/* Email Input */}
                <div>
                  <label htmlFor="footer-email" className="sr-only">
                    Your Email
                  </label>
                  <Input
                    id="footer-email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    aria-required="true"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-[#10b981] focus:ring-[#10b981] h-9 text-sm"
                  />
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white h-9 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Submit quick contact form"
                >
                  <Send className="w-3 h-3 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Get in Touch'}
                </Button>
              </form>
              <p className="text-xs text-white/50">
                We'll respond within 24 hours
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Loan Programs</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Calculator</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Apply Online</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Loan Programs */}
          <div>
            <h3 className="font-bold mb-4">Loan Programs</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">VA Loans</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">FHA Loans</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Conventional</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Jumbo Loans</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">USDA Loans</a></li>
              <li><a href="/refinance-info" className="text-white/70 hover:text-white transition-colors text-sm">Refinancing</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-bold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10b981]" />
                <div>
                  <div className="text-xs text-white/70">Call Us</div>
                  <a href="tel:3215550199" className="font-semibold hover:text-[#10b981] transition-colors text-sm">
                    (321) 555-0199
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10b981]" />
                <div>
                  <div className="text-xs text-white/70">Email Us</div>
                  <a href="mailto:info@mortgagegenius.pro" className="font-semibold hover:text-[#10b981] transition-colors text-sm">
                    info@mortgagegenius.pro
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10b981]" />
                <div>
                  <div className="text-xs text-white/70">Main Office</div>
                  <div className="text-sm">
                    123 Main Street<br />
                    Tampa, FL 33601
                  </div>
                </div>
              </li>
            </ul>
            
            {/* Social Media Icons - Moved from left column */}
            <div className="flex gap-2 mt-6">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <p>© 2025 Mortgage Genius. All rights reserved.</p>
              {/* TIER 2: Legal Pages */}
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/equal-housing-opportunity" className="hover:text-white transition-colors">Equal Housing Opportunity</Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
              <a href="https://www.nmlsconsumeraccess.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">NMLS Consumer Access</a>
            </div>
            <div className="flex items-center gap-4">
              {/* Install App Button */}
              {(isInstallable || (!isInstalled && !window.matchMedia('(display-mode: standalone)').matches)) && (
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  className="bg-[#10b981] hover:bg-[#059669] text-white text-xs h-8 px-3 flex items-center"
                  aria-label="Install Mortgage Genius app"
                >
                  <Smartphone className="w-3 h-3 mr-1.5" />
                  Save as App
                </Button>
              )}
              {/* Equal Housing Opportunity Logo */}
              <Link to="/equal-housing-opportunity" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 8v14h20V8L12 2zm0 2.5L19 8v11h-3v-6h-8v6H5V8l7-3.5zM9 14h6v5H9v-5z"/>
                </svg>
                <span className="text-xs">Equal Housing Lender | NMLS #2280851</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Disclosure */}
      <div className="bg-[#002244] py-3">
        <div className="container mx-auto px-4">
          <p className="text-xs text-white/50 text-center leading-relaxed">
            Michael George, NMLS #2280851. Rates and programs subject to change. Not a commitment to lend. All loans subject to credit approval.
          </p>
        </div>
      </div>
    </footer>
  );
}