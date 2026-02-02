/**
 * ============================================================================
 * HEADER COMPONENT - $50K WEBSITE
 * ============================================================================
 * TIER 1 ACCESSIBILITY IMPROVEMENTS:
 * ✅ ARIA labels for all interactive elements
 * ✅ Semantic navigation landmarks
 * ✅ Keyboard navigation support
 * ✅ Screen reader friendly mobile menu toggle
 * ✅ Proper focus indicators
 * 
 * NOTE FOR CODER:
 * - All dropdowns are keyboard accessible (Tab + Enter)
 * - Mobile menu has proper ARIA attributes
 * - Logo link needs href="#" replaced with actual home URL
 * ============================================================================
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import logo from '../assets/mortgage-genius-logo.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      role="banner"
    >
      {/* Subtle Rising Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-[10%] w-1 h-1 bg-[#003366]/20 rounded-full animate-rise-slow" />
        <div className="absolute bottom-0 left-[25%] w-1.5 h-1.5 bg-[#10b981]/15 rounded-full animate-rise-slow animation-delay-1000" />
        <div className="absolute bottom-0 left-[40%] w-1 h-1 bg-[#003366]/15 rounded-full animate-rise-slow animation-delay-2000" />
        <div className="absolute bottom-0 left-[55%] w-1 h-1 bg-[#10b981]/20 rounded-full animate-rise-slow animation-delay-3000" />
        <div className="absolute bottom-0 left-[70%] w-1.5 h-1.5 bg-[#003366]/20 rounded-full animate-rise-slow animation-delay-1500" />
        <div className="absolute bottom-0 left-[85%] w-1 h-1 bg-[#10b981]/15 rounded-full animate-rise-slow animation-delay-2500" />
        <div className="absolute bottom-0 left-[15%] w-1 h-1 bg-[#003366]/15 rounded-full animate-rise-medium animation-delay-500" />
        <div className="absolute bottom-0 left-[60%] w-1 h-1 bg-[#10b981]/20 rounded-full animate-rise-medium animation-delay-3500" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-24 md:h-28 items-center justify-between">
          {/* Logo - Accessibility: Wrapped in link, proper alt text */}
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Mortgage Genius Home">
              <img 
                src={logo} 
                alt="Mortgage Genius" 
                className="w-[180px] sm:w-[220px] md:w-[250px] h-auto object-contain"
                style={{ 
                  imageRendering: 'crisp-edges',
                  filter: 'brightness(1.1) contrast(1.1)'
                }}
                width="250"
                height="auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Accessibility: Semantic nav tag, ARIA label */}
          <nav 
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            <Link 
              to="/" 
              className="text-sm text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 rounded"
            >
              Home
            </Link>
            
            {/* Purchase Dropdown - Accessibility: ARIA attributes, keyboard support */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('purchase')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 rounded px-2 py-1"
                aria-expanded={activeDropdown === 'purchase'}
                aria-haspopup="true"
                aria-label="Purchase options menu"
                onClick={() => setActiveDropdown(activeDropdown === 'purchase' ? null : 'purchase')}
              >
                Purchase <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'purchase' && (
                <div 
                  className="absolute top-full left-0 pt-2"
                  role="menu"
                  aria-label="Purchase loan options"
                >
                  <div className="w-56 bg-white rounded-lg shadow-xl border p-2 animate-in fade-in slide-in-from-top-2">
                  <a href="#" className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors focus:outline-none focus:bg-muted" role="menuitem">
                    General Info
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors focus:outline-none focus:bg-muted" role="menuitem">
                    FHA
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors focus:outline-none focus:bg-muted" role="menuitem">
                    VA
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors focus:outline-none focus:bg-muted" role="menuitem">
                    Conventional
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors focus:outline-none focus:bg-muted" role="menuitem">
                    Jumbo
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors focus:outline-none focus:bg-muted" role="menuitem">
                    USDA
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors focus:outline-none focus:bg-muted" role="menuitem">
                    First Time Homebuyers
                  </a>
                  </div>
                </div>
              )}
            </div>

            {/* Refinance Dropdown - Accessibility: ARIA attributes, keyboard support */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('refinance')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 rounded px-2 py-1"
                aria-expanded={activeDropdown === 'refinance'}
                aria-haspopup="true"
                aria-label="Refinance options menu"
                onClick={() => setActiveDropdown(activeDropdown === 'refinance' ? null : 'refinance')}
              >
                Refinance <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'refinance' && (
                <div 
                  className="absolute top-full left-0 pt-2"
                  role="menu"
                  aria-label="Refinance loan options"
                >
                  <div className="w-56 bg-white rounded-lg shadow-xl border p-2 animate-in fade-in slide-in-from-top-2">
                  <a href="/refinance-info" className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors focus:outline-none focus:bg-muted" role="menuitem">
                    General Info
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors focus:outline-none focus:bg-muted" role="menuitem">
                    Conventional
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors focus:outline-none focus:bg-muted" role="menuitem">
                    VA Streamline
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors focus:outline-none focus:bg-muted" role="menuitem">
                    FHA Streamline
                  </a>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/heloc" 
              className="text-sm text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 rounded"
            >
              HELOC
            </Link>
            <a 
              href="https://tinyurl.com/42xx3hzu" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 rounded"
            >
              Apply Online
            </a>
            <a 
              href="#" 
              className="text-sm text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 rounded"
            >
              Contact Us
            </a>
          </nav>

          {/* Client Login and Contact Info - Accessibility: Proper links, ARIA labels */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              className="bg-[#10b981] hover:bg-[#059669] text-white focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2"
              asChild
            >
              <a 
                href="https://mortgagegenius.morty.com/login" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Client Login"
              >
                Client Login
              </a>
            </Button>
            <a 
              href="tel:+13215550199" 
              className="flex items-center gap-1 text-sm text-[#003366] hover:text-[#10b981] transition-colors"
              aria-label="Call us at 321-555-0199"
            >
              <Phone className="w-4 h-4" />
              (321) 555-0199
            </a>
          </div>

          {/* Mobile Menu Button - Accessibility: ARIA labels, proper state */}
          <button
            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - Accessibility: Proper ID, ARIA role, semantic nav */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu" 
            className="md:hidden py-4 border-t animate-in slide-in-from-top-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-sm text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <div>
                <div className="font-semibold text-sm mb-2">Purchase</div>
                <div className="pl-4 flex flex-col gap-2">
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">General Info</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">FHA</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">VA</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">Conventional</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">Jumbo</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">USDA</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">First Time Homebuyers</a>
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm mb-2">Refinance</div>
                <div className="pl-4 flex flex-col gap-2">
                  <a href="/refinance-info" className="text-sm text-muted-foreground hover:text-primary">General Info</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">Conventional</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">VA Streamline</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">FHA Streamline</a>
                </div>
              </div>
              <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">
                HELOC
              </a>
              <a href="https://tinyurl.com/42xx3hzu" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:text-primary transition-colors">
                Apply Online
              </a>
              <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">
                Contact Us
              </a>
              <Button className="bg-[#10b981] hover:bg-[#059669] text-white w-full">
                <Phone className="w-4 h-4 mr-2" />
                (321) 555-0199
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}