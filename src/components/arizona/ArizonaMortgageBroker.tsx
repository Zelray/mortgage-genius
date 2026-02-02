import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, MapPin, TrendingUp, Shield } from 'lucide-react';

// Import Arizona images
import azFlag from '../../../attached_assets/stock_images/arizona_state_flag_fe37bd55.jpg';
import phoenixSkyline from '../../../attached_assets/stock_images/phoenix_arizona_skyl_06166dec.jpg';
import azDesert from '../../../attached_assets/stock_images/arizona_desert_lands_23b1f0f3.jpg';

export function ArizonaMortgageBroker() {
  return (
    <>
      <Helmet>
        <title>Arizona Mortgage Loans | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="Arizona mortgage broker offering FHA, VA, conventional, USDA, and jumbo loans. Licensed in AZ with competitive rates for purchase and refinance. Get pre-approved today." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section with Animated Background */}
        <div className="relative overflow-hidden">
          {/* Animated Gradient Background with Fluid Blobs - Same as HomePage */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#1e40af] to-[#6366f1]">
            {/* Animated Blob 1 - Teal */}
            <div className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            
            {/* Animated Blob 2 - Purple */}
            <div className="absolute top-0 -right-20 w-96 h-96 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
            
            {/* Animated Blob 3 - Green */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-[#10b981] to-[#34d399] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
            
            {/* Animated Blob 4 - Orange */}
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-reverse" />
          </div>

          {/* Gradient Mesh Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/50 via-transparent to-transparent" />
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 animate-grid-flow" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-[10%] w-2 h-2 bg-white/30 rounded-full animate-float" />
            <div className="absolute top-40 left-[25%] w-3 h-3 bg-white/20 rounded-full animate-float animation-delay-1000" />
            <div className="absolute top-32 left-[40%] w-2 h-2 bg-white/25 rounded-full animate-float animation-delay-2000" />
            <div className="absolute top-60 left-[55%] w-2 h-2 bg-white/30 rounded-full animate-float animation-delay-3000" />
            <div className="absolute top-28 left-[70%] w-3 h-3 bg-white/20 rounded-full animate-float animation-delay-1500" />
            <div className="absolute top-48 left-[85%] w-2 h-2 bg-white/25 rounded-full animate-float animation-delay-2500" />
            <div className="absolute top-36 left-[15%] w-2 h-2 bg-white/20 rounded-full animate-float animation-delay-500" />
            <div className="absolute top-56 left-[60%] w-2 h-2 bg-white/30 rounded-full animate-float animation-delay-3500" />
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-4 py-16 max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Arizona Mortgage Loans
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up animation-delay-200">
              Welcome to Arizona's trusted mortgage partner. Whether you're purchasing your first home in Phoenix, 
              refinancing in Tucson, or securing a vacation property in Sedona, we're here to help you navigate 
              Arizona's dynamic real estate market with competitive rates and personalized service.
            </p>
          </div>
        </div>

        {/* Loan Programs Section - NOW FIRST */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
                Arizona Mortgage Loan Programs
              </h2>
              <p className="text-gray-600 text-base max-w-3xl mx-auto mb-4">
                Explore our comprehensive range of mortgage solutions designed specifically for Arizona homebuyers 
                and homeowners. Click each section to learn more and find the right loan for your needs.
              </p>
              <p className="text-gray-600 text-base max-w-3xl mx-auto leading-relaxed">
                As a licensed mortgage broker in the State of Arizona, we work with multiple lenders to find you 
                the best rates and terms for your unique situation. Our expertise covers all major Arizona markets 
                including Phoenix, Tucson, Mesa, Chandler, Scottsdale, Glendale, Gilbert, Tempe, and beyond.
              </p>
            </div>

            <Accordion.Root type="single" collapsible className="space-y-6">
              {/* Purchase Loans Accordion */}
              <Accordion.Item 
                value="purchase" 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in-up animation-delay-200"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 pr-4">
                      <h3 className="text-xl md:text-2xl font-bold text-[#003366] mb-1">Arizona Home Purchase Loans</h3>
                      <p className="text-gray-600 text-sm md:text-base">Find the perfect financing for your Arizona dream home</p>
                    </div>
                    <ChevronDown className="w-6 h-6 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 md:px-8 pb-8 pt-2 animate-accordion-down">
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      Buying a home in Arizona? We offer a full suite of purchase loan programs tailored to different 
                      buyer profiles, from first-timers to luxury home buyers. Our Arizona home purchase loans include 
                      low down payment options, flexible credit requirements, and competitive rates across all price ranges.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link 
                      to="/az/buyers/first-time-homebuyers"
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:from-blue-100 hover:to-green-100 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold text-gray-900">First-Time Homebuyer Programs</span>
                      <ChevronDown className="w-5 h-5 text-[#10b981] -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                    <Link 
                      to="/az/buyers/fha-loan"
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:from-blue-100 hover:to-green-100 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold text-gray-900">FHA Home Loans</span>
                      <ChevronDown className="w-5 h-5 text-[#10b981] -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                    <Link 
                      to="/az/buyers/conventional-mortgage"
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:from-blue-100 hover:to-green-100 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold text-gray-900">Conventional Mortgages</span>
                      <ChevronDown className="w-5 h-5 text-[#10b981] -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                    <Link 
                      to="/az/buyers/va-loan-purchase"
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:from-blue-100 hover:to-green-100 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold text-gray-900">VA Home Loans</span>
                      <ChevronDown className="w-5 h-5 text-[#10b981] -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                    <Link 
                      to="/az/buyers/usda-loan"
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:from-blue-100 hover:to-green-100 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold text-gray-900">USDA Rural Home Loans</span>
                      <ChevronDown className="w-5 h-5 text-[#10b981] -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                    <Link 
                      to="/az/buyers/jumbo-loan"
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:from-blue-100 hover:to-green-100 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold text-gray-900">Jumbo Home Loans</span>
                      <ChevronDown className="w-5 h-5 text-[#10b981] -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Refinance Loans Accordion */}
              <Accordion.Item 
                value="refinance" 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in-up animation-delay-400"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 pr-4">
                      <h3 className="text-xl md:text-2xl font-bold text-[#003366] mb-1">Arizona Mortgage Refinance</h3>
                      <p className="text-gray-600 text-sm md:text-base">Lower your rate, reduce payments, or tap into equity</p>
                    </div>
                    <ChevronDown className="w-6 h-6 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 md:px-8 pb-8 pt-2 animate-accordion-down">
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      Arizona homeowners can benefit from refinancing to secure lower interest rates, reduce monthly payments, 
                      shorten loan terms, or access home equity for improvements and debt consolidation. We offer streamlined 
                      refinance options that minimize paperwork and closing costs, as well as full documentation refinances 
                      for cash-out scenarios.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link 
                      to="/az/refi/refinance-my-mortgage"
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:from-blue-100 hover:to-green-100 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold text-gray-900">Conventional Refinance</span>
                      <ChevronDown className="w-5 h-5 text-[#10b981] -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                    <Link 
                      to="/az/refi/refinance-fha-mortgage"
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:from-blue-100 hover:to-green-100 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold text-gray-900">FHA Streamline Refinance</span>
                      <ChevronDown className="w-5 h-5 text-[#10b981] -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                    <Link 
                      to="/az/refi/refinance-my-jumbo"
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:from-blue-100 hover:to-green-100 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold text-gray-900">Jumbo Refinance</span>
                      <ChevronDown className="w-5 h-5 text-[#10b981] -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                    <Link 
                      to="/az/va-loans/va-refinance"
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:from-blue-100 hover:to-green-100 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold text-gray-900">VA Streamline (IRRRL)</span>
                      <ChevronDown className="w-5 h-5 text-[#10b981] -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* HELOC Accordion */}
              <Accordion.Item 
                value="heloc" 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in-up animation-delay-600"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 pr-4">
                      <h3 className="text-xl md:text-2xl font-bold text-[#003366] mb-1">Home Equity Loans & HELOCs</h3>
                      <p className="text-gray-600 text-sm md:text-base">Access your Arizona home's equity for any purpose</p>
                    </div>
                    <ChevronDown className="w-6 h-6 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 md:px-8 pb-8 pt-2 animate-accordion-down">
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      Arizona's growing home values create opportunities to tap into your equity for home improvements, 
                      debt consolidation, education expenses, or other financial goals. Choose from fixed-rate home equity 
                      loans or flexible home equity lines of credit (HELOCs) with competitive rates and terms designed for 
                      Arizona homeowners.
                    </p>
                  </div>
                  <Link 
                    to="/az/heloc"
                    className="inline-flex items-center justify-between px-8 py-5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg hover:from-[#0ea270] hover:to-[#047857] transition-all duration-300 group shadow-lg hover:shadow-xl"
                  >
                    <span className="font-semibold text-lg">Explore Arizona HELOC Options</span>
                    <ChevronDown className="w-5 h-5 -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>

        {/* Arizona's Growing Real Estate Market - NOW SECOND */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-8 text-center animate-fade-in-up">
              Arizona's Growing Real Estate Market
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="flex flex-col items-start space-y-4 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up animation-delay-200">
                <div className="w-14 h-14 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center shadow-md">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">Strong Market Growth</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Arizona consistently ranks among the fastest-growing states for population and housing demand, 
                    driven by favorable weather, business opportunities, and quality of life.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up animation-delay-400">
                <div className="w-14 h-14 bg-gradient-to-br from-[#003366] to-[#1e40af] rounded-lg flex items-center justify-center shadow-md">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">Diverse Communities</h3>
                  <p className="text-gray-600 leading-relaxed">
                    From urban centers to quiet suburbs and retirement communities, Arizona offers diverse 
                    housing options to fit every lifestyle and budget across all 15 counties.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up animation-delay-600">
                <div className="w-14 h-14 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center shadow-md">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">Regulated & Protected</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Arizona mortgage lending is regulated by the{' '}
                    <a 
                      href="https://dfi.az.gov/" 
                      target="_blank" 
                      rel="dofollow noopener noreferrer"
                      className="text-[#10b981] hover:text-[#059669] underline font-medium transition-colors"
                    >
                      Arizona Department of Financial Institutions
                    </a>
                    , ensuring consumer protection and fair lending practices.
                  </p>
                </div>
              </div>
            </div>

            {/* Arizona Mortgage Information Paragraph */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-10 animate-fade-in-up">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={azFlag} 
                  alt="arizona-flag" 
                  title="arizona-flag"
                  className="w-32 h-24 object-cover rounded-lg shadow-md flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    As a licensed mortgage broker serving the Grand Canyon State, we understand the unique characteristics 
                    of Arizona's diverse real estate landscape. From the bustling Phoenix metropolitan area—the nation's 
                    5th largest city—to Tucson's historic neighborhoods, Flagstaff's mountain communities, and the growing 
                    retirement havens of Prescott and Sedona, each Arizona market presents distinct opportunities for homebuyers 
                    and homeowners. Our expertise in Arizona-specific loan programs, including first-time homebuyer assistance 
                    through the Arizona Housing Finance Authority, down payment assistance programs, and energy-efficient 
                    mortgage options for desert-climate homes, ensures you receive financing tailored to Arizona's unique environment.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src={phoenixSkyline} 
                        alt="Phoenix Arizona downtown skyline showing urban growth and real estate development opportunities" 
                        title="Phoenix Arizona Skyline - Urban Real Estate Market"
                        className="w-full h-48 object-cover rounded-lg shadow-md mb-3"
                      />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Phoenix and the surrounding Valley of the Sun continue to attract thousands of new residents annually, 
                        creating robust demand for both purchase and refinance mortgages across all price ranges.
                      </p>
                    </div>
                    
                    <div>
                      <img 
                        src={azDesert} 
                        alt="Arizona desert landscape with saguaro cactus and mountain views typical of Arizona residential properties" 
                        title="Arizona Desert Landscape - Natural Beauty and Home Values"
                        className="w-full h-48 object-cover rounded-lg shadow-md mb-3"
                      />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Arizona's stunning natural beauty—from desert vistas to mountain ranges—enhances property values and 
                        quality of life, making it one of the most desirable states for relocation and real estate investment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 rounded-xl p-8 shadow-lg animate-fade-in-up animation-delay-800">
              <h3 className="font-bold text-2xl text-gray-900 mb-4">Arizona Homebuyer Resources</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Whether you're a first-time homebuyer or experienced investor, these Arizona resources can help you 
                make informed decisions:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#10b981] mr-2 text-xl">•</span>
                  <span>
                    <a 
                      href="https://housing.az.gov/" 
                      target="_blank" 
                      rel="dofollow noopener noreferrer"
                      className="text-[#10b981] hover:text-[#059669] underline font-semibold transition-colors"
                    >
                      Arizona Department of Housing
                    </a>
                    {' '}- State housing programs and assistance
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#10b981] mr-2 text-xl">•</span>
                  <span>
                    <a 
                      href="https://www.azhousing.gov/" 
                      target="_blank" 
                      rel="dofollow noopener noreferrer"
                      className="text-[#10b981] hover:text-[#059669] underline font-semibold transition-colors"
                    >
                      Arizona Housing Finance Authority
                    </a>
                    {' '}- Down payment assistance and first-time homebuyer programs
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#10b981] mr-2 text-xl">•</span>
                  <span>
                    <a 
                      href="https://azre.gov/" 
                      target="_blank" 
                      rel="dofollow noopener noreferrer"
                      className="text-[#10b981] hover:text-[#059669] underline font-semibold transition-colors"
                    >
                      Arizona Department of Real Estate
                    </a>
                    {' '}- Licensed real estate professionals and consumer protection
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#10b981] mr-2 text-xl">•</span>
                  <span>
                    <a 
                      href="https://www.azmag.gov/" 
                      target="_blank" 
                      rel="dofollow noopener noreferrer"
                      className="text-[#10b981] hover:text-[#059669] underline font-semibold transition-colors"
                    >
                      Maricopa Association of Governments
                    </a>
                    {' '}- Regional planning and demographic data for Phoenix metro
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="relative overflow-hidden bg-gradient-to-r from-[#003366] to-[#1e40af] rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl animate-fade-in-up">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10b981]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Whether you're buying, refinancing, or tapping into your home's equity, our Arizona mortgage experts 
                  are here to guide you through every step with personalized service and competitive rates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/prequal"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#10b981] text-white rounded-lg hover:bg-[#0ea270] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Get Pre-Qualified Now
                  </Link>
                  <a
                    href="tel:3215550199"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#003366] rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Call (321) 555-0199
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
