/**
 * ============================================================================
 * MORTGAGE GENIUS - MAIN APP COMPONENT
 * ============================================================================
 * $50K Production Website with Professional Features
 * 
 * TIER 1 FEATURES IMPLEMENTED:
 * ✅ Error Boundary - Graceful error handling
 * ✅ SEO Meta Tags - Search engine optimization
 * ✅ Accessibility - WCAG compliance (skip links, ARIA labels, keyboard nav)
 * ✅ Performance - Optimized images, fast loading
 * ✅ Quick Contact Form - Footer lead capture
 * 
 * TIER 2 FEATURES IMPLEMENTED:
 * ✅ Google Analytics & Tag Manager - Visitor tracking
 * ✅ Cookie Consent Banner - GDPR/CCPA compliance
 * ✅ Lead Capture System - Copper CRM + Database backup
 * ✅ Legal Pages - Privacy Policy, Terms of Service, Equal Housing, Sitemap
 * 
 * TIER 3 FEATURES IMPLEMENTED:
 * ✅ Admin Dashboard - Content management system
 * ✅ Blog System - Create/edit/publish articles
 * ✅ User Authentication - Admin login with Supabase
 * ✅ Image Upload - Supabase Storage integration
 * ✅ React Router - Multi-page navigation
 * 
 * NOTE FOR CODER: 
 * - Main content has id="main-content" for skip link functionality
 * - Main has tabIndex={-1} to allow programmatic focus
 * - All components should follow accessibility best practices
 * - Update Google Analytics IDs in GoogleAnalytics component
 * - Update Copper webhook URL in /supabase/functions/server/leads.tsx
 * - Default admin: admin@mortgagegenius.com (create via backend)
 * ============================================================================
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SEOHead } from './components/SEOHead';
import { SkipToContent } from './components/SkipToContent';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { CookieConsent } from './components/CookieConsent';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustIndicators } from './components/TrustIndicators';
import { StateSelection } from './components/StateSelection';
import { LoanProgramsGrid } from './components/LoanProgramsGrid';
import { MortgageCalculatorAccordion } from './components/MortgageCalculatorAccordion';
import { SocialProof } from './components/SocialProof';
import { AboutMortgageGenius } from './components/AboutMortgageGenius';
import { BlogPreview } from './components/BlogPreview';
import { CTABanner } from './components/CTABanner';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { BlogPostEditor } from './components/BlogPostEditor';
import { BlogPostView } from './components/BlogPostView';
import { HtmlSitemap } from './components/HtmlSitemap';
import { ScrollToTop } from './components/ScrollToTop';
import { TinaPage } from './components/TinaPage';
import { BuyersPrequalification } from './components/BuyersPrequalification';
import { ArizonaMortgageBroker } from './components/arizona/ArizonaMortgageBroker';
import { ArizonaPurchase } from './components/arizona/ArizonaPurchase';
import { FirstTimeHomebuyers } from './components/arizona/buyers/FirstTimeHomebuyers';
import { FHALoan } from './components/arizona/buyers/FHALoan';
import { ConventionalMortgage } from './components/arizona/buyers/ConventionalMortgage';
import { VALoanPurchase } from './components/arizona/buyers/VALoanPurchase';
import { USDALoan } from './components/arizona/buyers/USDALoan';
import { JumboLoan } from './components/arizona/buyers/JumboLoan';
import { ArizonaRefinance } from './components/arizona/ArizonaRefinance';
import { FHAStreamline } from './components/arizona/refinance/FHAStreamline';
import { JumboRefinance } from './components/arizona/refinance/JumboRefinance';
import { ConventionalRefinance } from './components/arizona/refinance/ConventionalRefinance';
import { ArizonaVALoans } from './components/arizona/ArizonaVALoans';
import { VAStreamline } from './components/arizona/va/VAStreamline';
import { ArizonaHELOC } from './components/arizona/ArizonaHELOC';
import { ArizonaJumboMortgage } from './components/arizona/ArizonaJumboMortgage';
import { ArizonaUSDALoans } from './components/arizona/ArizonaUSDALoans';
import { HELOC } from './components/HELOC';
import { RefinanceInfo } from './components/RefinanceInfo';
import { GoogleOAuth } from './components/GoogleOAuth';

// HomePage component - all the homepage sections
function HomePage() {
  return (
    <>
      <SkipToContent />
      <div className="min-h-screen bg-white">
        <Header />
        <main 
          id="main-content" 
          tabIndex={-1}
          role="main"
          className="focus:outline-none"
        >
          <HeroSection />
          <TrustIndicators />
          <StateSelection />
          <LoanProgramsGrid />
          <MortgageCalculatorAccordion />
          <SocialProof />
          <AboutMortgageGenius />
          <BlogPreview />
          <CTABanner />
        </main>
        <Footer />
      </div>
    </>
  );
}

// StandardPage component - for legal pages with header and footer
function StandardPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipToContent />
      <div className="min-h-screen bg-white">
        <Header />
        <main id="main-content" tabIndex={-1} role="main" className="focus:outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(
    () => sessionStorage.getItem('admin_token')
  );
  const [userRole, setUserRole] = useState<string>(
    () => sessionStorage.getItem('admin_role') || ''
  );
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const handleLoginSuccess = (token: string, role: string) => {
    setAccessToken(token);
    setUserRole(role);
    sessionStorage.setItem('admin_token', token);
    sessionStorage.setItem('admin_role', role);
  };

  const handleLogout = () => {
    setAccessToken(null);
    setUserRole('');
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_role');
  };

  const handleEditPost = (postId: string | null) => {
    setEditingPostId(postId);
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
        <SEOHead />
        <GoogleAnalytics 
          measurementId="G-XXXXXXXXXX"
          gtmId="GTM-XXXXXXX"
        />
        
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<HomePage />} />
          
          {/* Top-Level Pages */}
          <Route path="/prequal" element={<BuyersPrequalification />} />
          <Route path="/purchase" element={<TinaPage collection="loanPage" slug="purchase" />} />
          <Route path="/refinance" element={<TinaPage collection="loanPage" slug="refinance" />} />
          <Route path="/heloc" element={<HELOC />} />
          <Route path="/refinance-info" element={<RefinanceInfo />} />
          
          {/* Arizona Pages */}
          <Route path="/az-mortgage-broker" element={<ArizonaMortgageBroker />} />
          
          {/* Arizona Purchase Pages */}
          <Route path="/az/buyers" element={<ArizonaPurchase />} />
          <Route path="/az/buyers/first-time-homebuyers" element={<FirstTimeHomebuyers />} />
          <Route path="/az/buyers/fha-loan" element={<FHALoan />} />
          <Route path="/az/buyers/conventional-mortgage" element={<ConventionalMortgage />} />
          <Route path="/az/buyers/va-loan-purchase" element={<VALoanPurchase />} />
          <Route path="/az/buyers/usda-loan" element={<USDALoan />} />
          <Route path="/az/buyers/jumbo-loan" element={<JumboLoan />} />
          
          {/* Arizona Refinance Pages */}
          <Route path="/az/refi" element={<ArizonaRefinance />} />
          <Route path="/az/refi/refinance-fha-mortgage" element={<FHAStreamline />} />
          <Route path="/az/refi/refinance-my-jumbo" element={<JumboRefinance />} />
          <Route path="/az/refi/refinance-my-mortgage" element={<ConventionalRefinance />} />
          
          {/* Arizona VA Loans Pages */}
          <Route path="/az/va-loans" element={<ArizonaVALoans />} />
          <Route path="/az/va-loans/va-refinance" element={<VAStreamline />} />
          
          {/* Arizona Specialty Pages */}
          <Route path="/az/heloc" element={<ArizonaHELOC />} />
          <Route path="/az/jumbo-mortgage" element={<ArizonaJumboMortgage />} />
          <Route path="/az/usda-loans" element={<ArizonaUSDALoans />} />
          
          {/* Florida Pages */}
          <Route path="/fl-mortgage-broker" element={<TinaPage collection="statePage" slug="fl-mortgage-broker" />} />
          
          {/* Texas Pages */}
          <Route path="/tx-mortgage-broker" element={<TinaPage collection="statePage" slug="tx-mortgage-broker" />} />
          
          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<TinaPage collection="legalPage" slug="privacy-policy" />} />
          <Route path="/terms-of-service" element={<TinaPage collection="legalPage" slug="terms-of-service" />} />
          <Route path="/equal-housing-opportunity" element={<TinaPage collection="legalPage" slug="equal-housing-opportunity" />} />
          <Route 
            path="/sitemap" 
            element={
              <StandardPage>
                <HtmlSitemap />
              </StandardPage>
            } 
          />
          
          {/* Blog */}
          <Route 
            path="/resources/:slug" 
            element={
              <StandardPage>
                <BlogPostView 
                  slug={window.location.pathname.split('/resources/')[1] || ''} 
                />
              </StandardPage>
            } 
          />
          
          {/* Admin Routes - Protected by Google OAuth (@mortgagegenius.pro only) */}
          <Route 
            path="/admin" 
            element={
              <GoogleOAuth>
                {accessToken ? (
                  <AdminDashboard
                    accessToken={accessToken}
                    userRole={userRole}
                    onLogout={handleLogout}
                    onEditPost={handleEditPost}
                  />
                ) : (
                  <AdminLogin onLoginSuccess={handleLoginSuccess} />
                )}
              </GoogleOAuth>
            } 
          />
          <Route 
            path="/admin/editor" 
            element={
              <GoogleOAuth>
                {accessToken ? (
                  <BlogPostEditor
                    postId={editingPostId}
                    accessToken={accessToken}
                    onBack={() => window.history.back()}
                  />
                ) : (
                  <Navigate to="/admin" replace />
                )}
              </GoogleOAuth>
            } 
          />
        </Routes>
        
        <CookieConsent />
        <Toaster position="top-right" richColors />
      </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  );
}
