import { Link } from 'react-router-dom';

export function HtmlSitemap() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#003366] to-[#1e40af] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
          <p className="text-white/80">Navigate our complete website directory</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Main Pages */}
          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Main Pages</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#10b981] hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/prequal" className="text-[#10b981] hover:underline">Get Pre-Qualified</Link>
              </li>
              <li>
                <a href="https://tinyurl.com/42xx3hzu" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">Apply Online</a>
              </li>
              <li>
                <a href="https://mortgagegenius.morty.com/login" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">Client Login</a>
              </li>
              <li>
                <Link to="/admin" className="text-[#10b981] hover:underline">Employee Login</Link>
              </li>
            </ul>
          </div>

          {/* General Loan Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-4">General Loan Info</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/purchase" className="text-[#10b981] hover:underline">Purchase a Home</Link>
              </li>
              <li>
                <Link to="/refinance-info" className="text-[#10b981] hover:underline">Refinance Your Mortgage</Link>
              </li>
              <li>
                <Link to="/heloc" className="text-[#10b981] hover:underline">Home Equity Line of Credit (HELOC)</Link>
              </li>
            </ul>
          </div>

          {/* Arizona - Main */}
          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Arizona Loans</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/az-mortgage-broker" className="text-[#10b981] hover:underline">Arizona Mortgage Loans</Link>
              </li>
              <li>
                <Link to="/az/buyers" className="text-[#10b981] hover:underline">Arizona Purchase Loans</Link>
              </li>
              <li>
                <Link to="/az/refi" className="text-[#10b981] hover:underline">Arizona Refinance</Link>
              </li>
              <li>
                <Link to="/az/va-loans" className="text-[#10b981] hover:underline">Arizona VA Loans</Link>
              </li>
              <li>
                <Link to="/az/heloc" className="text-[#10b981] hover:underline">Arizona HELOC</Link>
              </li>
              <li>
                <Link to="/az/jumbo-mortgage" className="text-[#10b981] hover:underline">Arizona Jumbo Loans</Link>
              </li>
              <li>
                <Link to="/az/usda-loans" className="text-[#10b981] hover:underline">Arizona USDA Loans</Link>
              </li>
            </ul>
          </div>

          {/* Arizona Purchase */}
          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Arizona Purchase</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/az/buyers/first-time-homebuyers" className="text-[#10b981] hover:underline">First-Time Homebuyers</Link>
              </li>
              <li>
                <Link to="/az/buyers/fha-loan" className="text-[#10b981] hover:underline">FHA Home Loans</Link>
              </li>
              <li>
                <Link to="/az/buyers/conventional-mortgage" className="text-[#10b981] hover:underline">Conventional Mortgages</Link>
              </li>
              <li>
                <Link to="/az/buyers/va-loan-purchase" className="text-[#10b981] hover:underline">VA Home Loans</Link>
              </li>
              <li>
                <Link to="/az/buyers/usda-loan" className="text-[#10b981] hover:underline">USDA Home Loans</Link>
              </li>
              <li>
                <Link to="/az/buyers/jumbo-loan" className="text-[#10b981] hover:underline">Jumbo Home Loans</Link>
              </li>
            </ul>
          </div>

          {/* Arizona Refinance */}
          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Arizona Refinance</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/az/refi/refinance-fha-mortgage" className="text-[#10b981] hover:underline">FHA Streamline Refinance</Link>
              </li>
              <li>
                <Link to="/az/refi/refinance-my-mortgage" className="text-[#10b981] hover:underline">Conventional Refinance</Link>
              </li>
              <li>
                <Link to="/az/refi/refinance-my-jumbo" className="text-[#10b981] hover:underline">Jumbo Refinance</Link>
              </li>
              <li>
                <Link to="/az/va-loans/va-refinance" className="text-[#10b981] hover:underline">VA Streamline (IRRRL)</Link>
              </li>
            </ul>
          </div>

          {/* Florida Loans */}
          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Florida Loans</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/fl-mortgage-broker" className="text-[#10b981] hover:underline">Florida Mortgage Loans</Link>
              </li>
            </ul>
          </div>

          {/* Texas Loans */}
          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Texas Loans</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/tx-mortgage-broker" className="text-[#10b981] hover:underline">Texas Mortgage Loans</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Resources</h2>
            <ul className="space-y-2">
              <li className="text-gray-600">Blog articles are accessible from the homepage</li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Legal & Compliance</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-[#10b981] hover:underline">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-[#10b981] hover:underline">Terms of Service</Link>
              </li>
              <li>
                <Link to="/equal-housing-opportunity" className="text-[#10b981] hover:underline">Equal Housing Opportunity</Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-[#10b981] hover:underline">Sitemap</Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#003366] mb-3">Need Help?</h3>
            <p className="text-gray-700 mb-4">
              If you can't find what you're looking for, please contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:3215550199" 
                className="inline-flex items-center justify-center px-6 py-3 bg-[#10b981] text-white rounded-lg hover:bg-[#0ea270] transition-colors"
              >
                Call (321) 555-0199
              </a>
              <a 
                href="https://tinyurl.com/42xx3hzu" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#003366] text-[#003366] rounded-lg hover:bg-[#003366] hover:text-white transition-colors"
              >
                Start Your Application
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
