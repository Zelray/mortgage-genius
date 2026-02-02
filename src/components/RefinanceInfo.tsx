import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Calculator, TrendingDown, ChevronDown, DollarSign, Clock, Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import * as RadixAccordion from '@radix-ui/react-accordion';
import refinanceHeroImage from '../../attached_assets/stock_images/happy_couple_homeown_c72ff8ac.jpg';

// Helper functions for formatting
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseCurrency = (value: string): number => {
  const numValue = value.replace(/[^0-9]/g, '');
  return parseInt(numValue) || 0;
};

export function RefinanceInfo() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#003366] to-[#1e40af] text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src={refinanceHeroImage}
              alt="Happy homeowners"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Refinance Your Mortgage
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Lower your rate, reduce your payment, or tap into your home's equity. 
                Explore your refinancing options today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://tinyurl.com/42xx3hzu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-[#10b981] text-white font-semibold rounded-lg hover:bg-[#059669] transition-all duration-300 text-center"
                >
                  Apply Now
                </a>
                <a 
                  href="tel:3215550199"
                  className="inline-block px-8 py-4 bg-white text-[#003366] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 text-center"
                >
                  Call (321) 555-0199
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-12 text-center">
              Why Refinance Your Mortgage?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border border-gray-200">
                <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center mb-6">
                  <TrendingDown className="w-8 h-8 text-[#10b981]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-4">Lower Your Rate</h3>
                <p className="text-gray-700 leading-relaxed">
                  Take advantage of today's rates to reduce your monthly payment and save thousands 
                  over the life of your loan.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 border border-gray-200">
                <div className="w-16 h-16 bg-[#003366]/10 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-[#003366]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-4">Shorten Your Term</h3>
                <p className="text-gray-700 leading-relaxed">
                  Pay off your mortgage faster by refinancing to a shorter term. Build equity 
                  quicker and save on interest.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 border border-gray-200">
                <div className="w-16 h-16 bg-[#6366f1]/10 rounded-full flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-[#6366f1]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-4">Cash-Out Equity</h3>
                <p className="text-gray-700 leading-relaxed">
                  Access your home's equity for home improvements, debt consolidation, or other 
                  financial goals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Refinance Information Section */}
        <div className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-8 text-center">
              Should I Refinance My Mortgage?
            </h2>

            <h3 className="text-2xl font-bold text-[#003366] mb-4">
              Top Reasons Homeowners Choose to Refinance
            </h3>
            
            <p className="text-gray-700 leading-relaxed mb-5">
              Refinancing a mortgage simply means replacing your current home loan with a new one—often with better terms. 
              Many homeowners think refinancing only makes sense to lower monthly payments or consolidate debt, and while 
              those are two of the most common reasons, there are several other benefits that can help you build wealth, 
              manage risk, and create financial flexibility.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              Below are the most popular reasons to refinance and how each can support your financial goals.
            </p>

            {/* Refinancing Reasons Accordion */}
            <Accordion type="single" collapsible className="mb-8">
              {/* Reason 1 */}
              <AccordionItem value="reason-1">
                <AccordionTrigger>
                  <h4 className="text-lg font-semibold text-[#003366]">1. Lower Your Monthly Payment</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <p className="text-gray-700 leading-relaxed mb-3">
                      One of the biggest motivations for refinancing is to reduce monthly housing costs. This typically happens 
                      when interest rates drop or when you choose a longer loan term.
                    </p>
                    <h5 className="text-base font-semibold text-[#003366] mb-2">How this helps:</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                      <li>Frees up monthly cash flow</li>
                      <li>Can make homeownership more affordable during tighter economic periods</li>
                      <li>Allows borrowers to redirect savings toward investing, college, retirement, or other goals</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      Even a small drop in interest rate can meaningfully reduce your payment over the life of your loan.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Reason 2 */}
              <AccordionItem value="reason-2">
                <AccordionTrigger>
                  <h4 className="text-lg font-semibold text-[#003366]">2. Consolidate High-Interest Debt</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Credit cards, medical bills, and personal loans often come with significantly higher rates compared to mortgages. 
                      A cash-out refinance allows homeowners to tap into built-up home equity and use it to pay off high-interest debt.
                    </p>
                    <h5 className="text-base font-semibold text-[#003366] mb-2">Benefits:</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                      <li>Lower overall interest cost</li>
                      <li>Simplified payments</li>
                      <li>Faster and more affordable path to becoming debt-free</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      For borrowers trying to get ahead on their finances, this can be a powerful tool—when used responsibly.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Reason 3 */}
              <AccordionItem value="reason-3">
                <AccordionTrigger>
                  <h4 className="text-lg font-semibold text-[#003366]">3. Shorten Your Loan Term (Build Equity Faster)</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Some homeowners refinance from a 30-year mortgage into a 15-year term. Even if the monthly payment increases 
                      slightly, the financial benefits can be substantial.
                    </p>
                    <h5 className="text-base font-semibold text-[#003366] mb-2">Why do it?</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                      <li>Pay off your home years sooner</li>
                      <li>Save tens of thousands in interest</li>
                      <li>Build equity at an accelerated rate</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      This option is ideal for those focused on long-term savings.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Reason 4 */}
              <AccordionItem value="reason-4">
                <AccordionTrigger>
                  <h4 className="text-lg font-semibold text-[#003366]">4. Switch From an Adjustable Rate (ARM) to a Fixed Rate</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <p className="text-gray-700 leading-relaxed mb-3">
                      An adjustable-rate mortgage can be helpful early on, but once the introductory period ends, rates may rise 
                      significantly. Refinancing into a fixed-rate loan protects you from future rate increases.
                    </p>
                    <h5 className="text-base font-semibold text-[#003366] mb-2">Benefits:</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                      <li>Payment stability</li>
                      <li>Predictable long-term costs</li>
                      <li>Reduced financial risk</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      This is especially appealing when interest rates are favorable.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Reason 5 */}
              <AccordionItem value="reason-5">
                <AccordionTrigger>
                  <h4 className="text-lg font-semibold text-[#003366]">5. Remove Private Mortgage Insurance (PMI)</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <p className="text-gray-700 leading-relaxed mb-3">
                      If you bought your home with less than 20% down, you may be paying PMI. Once your home value rises enough, 
                      refinancing can eliminate that extra monthly cost—sometimes saving hundreds each month.
                    </p>
                    <h5 className="text-base font-semibold text-[#003366] mb-2">Advantages:</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                      <li>Lower monthly payment</li>
                      <li>Keep more equity in your home</li>
                      <li>Reduce long-term expenses</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Reason 6 */}
              <AccordionItem value="reason-6">
                <AccordionTrigger>
                  <h4 className="text-lg font-semibold text-[#003366]">6. Tap Equity for Major Expenses</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <p className="text-gray-700 leading-relaxed mb-3">
                      In addition to debt consolidation, homeowners may use a cash-out refinance to access funds for:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                      <li>Home improvements or renovations</li>
                      <li>Education costs</li>
                      <li>Investment opportunities</li>
                      <li>Emergency expenses</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      When used wisely, accessing equity can help you strengthen your financial position.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Reason 7 */}
              <AccordionItem value="reason-7">
                <AccordionTrigger>
                  <h4 className="text-lg font-semibold text-[#003366]">7. Remove a Borrower From the Loan</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      Life happens—divorce, separation, or estate changes sometimes require a borrower to be added or removed. 
                      Refinancing ensures the loan terms reflect the new legal responsibility.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Reason 8 */}
              <AccordionItem value="reason-8">
                <AccordionTrigger>
                  <h4 className="text-lg font-semibold text-[#003366]">8. Improve Loan Quality (FHA → Conventional)</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      Some borrowers refinance to move from an FHA loan into a conventional loan to remove mortgage insurance, 
                      get better terms, or improve long-term structure.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Is Refinancing Right for You? Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#003366] mb-3">Is Refinancing Right for You?</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Refinancing isn't one-size-fits-all. The right choice depends on:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                <li>Current mortgage rate vs. market rates</li>
                <li>How long you plan to stay in the home</li>
                <li>Your financial goals (cash flow, debt elimination, equity growth)</li>
                <li>Credit profile</li>
                <li>Available home equity</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Talking with a mortgage professional can help you evaluate whether refinancing aligns with your long-term plan.
              </p>
            </div>

            {/* Final Thoughts */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#003366] mb-3">Final Thoughts</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                While lowering your payment and consolidating debt are two of the most common reasons to refinance, 
                homeowners have multiple strategies available to strengthen their financial position. Whether your goal 
                is long-term savings, stability, or flexibility, refinancing can be a powerful tool.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Before deciding, compare loan options, calculate potential savings, and consider how long you'll stay 
                in your home. With smart planning, refinancing can help you reduce costs, build wealth, and create 
                financial peace of mind.
              </p>
            </div>
          </div>
        </div>

        {/* Refinance Options */}
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h3 className="text-2xl md:text-3xl font-bold text-[#003366] mb-8 text-center">
              Refinance Options
            </h3>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h4 className="text-xl font-bold text-[#003366] mb-4">Rate-and-Term Refinance</h4>
                <p className="text-gray-700 mb-6">
                  The most common type of refinance. Replace your existing mortgage with a new one 
                  that has better terms.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Lower your interest rate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Change from ARM to fixed rate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Adjust your loan term</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Remove PMI if you have 20% equity</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h4 className="text-xl font-bold text-[#003366] mb-4">Cash-Out Refinance</h4>
                <p className="text-gray-700 mb-6">
                  Refinance for more than you owe and receive the difference in cash to use for 
                  any purpose.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Home improvements and renovations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Consolidate high-interest debt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Investment opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Emergency fund or college expenses</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-2xl md:text-3xl font-bold text-[#003366] mb-8 text-center">
              Refinance Questions
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <RadixAccordion.Root type="single" collapsible className="space-y-4">
                <RadixAccordion.Item value="q1" className="bg-white rounded-xl shadow-md overflow-hidden">
                  <RadixAccordion.Header>
                    <RadixAccordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group">
                      <h4 className="text-lg font-bold text-[#003366] pr-4">
                        When should I refinance my mortgage?
                      </h4>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                    </RadixAccordion.Trigger>
                  </RadixAccordion.Header>
                  <RadixAccordion.Content className="px-6 pb-6 pt-2 animate-accordion-down">
                    <p className="text-gray-700 leading-relaxed">
                      Consider refinancing when interest rates drop at least 0.5-1% below your current rate, 
                      your credit score has improved significantly, you want to change your loan term, or 
                      you need to access your home's equity. The rule of thumb is that refinancing makes 
                      sense if you can recoup closing costs within 2-3 years.
                    </p>
                  </RadixAccordion.Content>
                </RadixAccordion.Item>

                <RadixAccordion.Item value="q2" className="bg-white rounded-xl shadow-md overflow-hidden">
                  <RadixAccordion.Header>
                    <RadixAccordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group">
                      <h4 className="text-lg font-bold text-[#003366] pr-4">
                        How much does it cost to refinance?
                      </h4>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                    </RadixAccordion.Trigger>
                  </RadixAccordion.Header>
                  <RadixAccordion.Content className="px-6 pb-6 pt-2 animate-accordion-down">
                    <p className="text-gray-700 leading-relaxed">
                      Refinancing typically costs 2-5% of your loan amount in closing costs. This includes 
                      appraisal fees ($300-600), origination fees (0.5-1% of loan), title insurance, and 
                      other settlement costs. Some lenders offer no-closing-cost refinances with slightly 
                      higher interest rates.
                    </p>
                  </RadixAccordion.Content>
                </RadixAccordion.Item>

                <RadixAccordion.Item value="q3" className="bg-white rounded-xl shadow-md overflow-hidden">
                  <RadixAccordion.Header>
                    <RadixAccordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group">
                      <h4 className="text-lg font-bold text-[#003366] pr-4">
                        How long does refinancing take?
                      </h4>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                    </RadixAccordion.Trigger>
                  </RadixAccordion.Header>
                  <RadixAccordion.Content className="px-6 pb-6 pt-2 animate-accordion-down">
                    <p className="text-gray-700 leading-relaxed">
                      The refinancing process typically takes 30-45 days from application to closing. 
                      The timeline includes application processing (1-3 days), appraisal (1-2 weeks), 
                      underwriting (2-3 weeks), and closing preparation (3-5 days). Having all your 
                      documents ready can speed up the process.
                    </p>
                  </RadixAccordion.Content>
                </RadixAccordion.Item>

                <RadixAccordion.Item value="q4" className="bg-white rounded-xl shadow-md overflow-hidden">
                  <RadixAccordion.Header>
                    <RadixAccordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group">
                      <h4 className="text-lg font-bold text-[#003366] pr-4">
                        What credit score do I need?
                      </h4>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                    </RadixAccordion.Trigger>
                  </RadixAccordion.Header>
                  <RadixAccordion.Content className="px-6 pb-6 pt-2 animate-accordion-down">
                    <p className="text-gray-700 leading-relaxed">
                      Most lenders require a minimum credit score of 620 for conventional refinancing. 
                      However, to get the best rates, you'll typically need a score of 740 or higher. 
                      FHA refinances may be available with scores as low as 580, while VA and USDA 
                      refinances have more flexible credit requirements.
                    </p>
                  </RadixAccordion.Content>
                </RadixAccordion.Item>
              </RadixAccordion.Root>

              <RadixAccordion.Root type="single" collapsible className="space-y-4">
                <RadixAccordion.Item value="q5" className="bg-white rounded-xl shadow-md overflow-hidden">
                  <RadixAccordion.Header>
                    <RadixAccordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group">
                      <h4 className="text-lg font-bold text-[#003366] pr-4">
                        Can I refinance with negative equity?
                      </h4>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                    </RadixAccordion.Trigger>
                  </RadixAccordion.Header>
                  <RadixAccordion.Content className="px-6 pb-6 pt-2 animate-accordion-down">
                    <p className="text-gray-700 leading-relaxed">
                      While traditional refinancing requires positive equity, government programs like 
                      HARP (now expired) and its successors help underwater homeowners. FHA Streamline 
                      and VA IRRRL programs may allow refinancing with limited or negative equity if 
                      you're current on payments and meet other requirements.
                    </p>
                  </RadixAccordion.Content>
                </RadixAccordion.Item>

                <RadixAccordion.Item value="q6" className="bg-white rounded-xl shadow-md overflow-hidden">
                  <RadixAccordion.Header>
                    <RadixAccordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group">
                      <h4 className="text-lg font-bold text-[#003366] pr-4">
                        Should I pay points to lower my rate?
                      </h4>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                    </RadixAccordion.Trigger>
                  </RadixAccordion.Header>
                  <RadixAccordion.Content className="px-6 pb-6 pt-2 animate-accordion-down">
                    <p className="text-gray-700 leading-relaxed">
                      Paying discount points (1 point = 1% of loan amount) can lower your rate by 
                      0.125-0.25%. It makes sense if you plan to keep the loan long enough to recoup 
                      the cost through lower payments. Calculate your break-even point: divide the 
                      cost of points by your monthly savings to see how many months it takes to recover.
                    </p>
                  </RadixAccordion.Content>
                </RadixAccordion.Item>

                <RadixAccordion.Item value="q7" className="bg-white rounded-xl shadow-md overflow-hidden">
                  <RadixAccordion.Header>
                    <RadixAccordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group">
                      <h4 className="text-lg font-bold text-[#003366] pr-4">
                        What documents do I need?
                      </h4>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                    </RadixAccordion.Trigger>
                  </RadixAccordion.Header>
                  <RadixAccordion.Content className="px-6 pb-6 pt-2 animate-accordion-down">
                    <p className="text-gray-700 leading-relaxed">
                      You'll need recent pay stubs (30 days), W-2s (2 years), tax returns (2 years), 
                      bank statements (2-3 months), current mortgage statement, homeowners insurance 
                      declaration, and photo ID. Self-employed borrowers need additional documentation 
                      including profit/loss statements and business tax returns.
                    </p>
                  </RadixAccordion.Content>
                </RadixAccordion.Item>

                <RadixAccordion.Item value="q8" className="bg-white rounded-xl shadow-md overflow-hidden">
                  <RadixAccordion.Header>
                    <RadixAccordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group">
                      <h4 className="text-lg font-bold text-[#003366] pr-4">
                        Can I refinance multiple times?
                      </h4>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                    </RadixAccordion.Trigger>
                  </RadixAccordion.Header>
                  <RadixAccordion.Content className="px-6 pb-6 pt-2 animate-accordion-down">
                    <p className="text-gray-700 leading-relaxed">
                      There's no legal limit on how often you can refinance. However, most lenders 
                      require a "seasoning period" of 6-12 months between refinances. Cash-out 
                      refinances typically require 12 months. Keep in mind that each refinance 
                      involves closing costs, so frequent refinancing may not be cost-effective.
                    </p>
                  </RadixAccordion.Content>
                </RadixAccordion.Item>
              </RadixAccordion.Root>
            </div>
          </div>
        </div>

        {/* Calculators Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h3 className="text-2xl md:text-3xl font-bold text-[#003366] mb-8 text-center">
              Refinance Calculators
            </h3>

            {/* Calculators in Accordion */}
            <Accordion type="single" collapsible defaultValue="refinance" className="space-y-4">
              {/* Refinance Calculator */}
              <AccordionItem value="refinance" className="border rounded-lg bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-[#10b981]" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg">Refinance Savings Calculator</h4>
                      <p className="text-sm text-muted-foreground">See how much you could save by refinancing your mortgage</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <RefinanceCalculator />
                </AccordionContent>
              </AccordionItem>

              {/* Mortgage Payment Calculator */}
              <AccordionItem value="payment" className="border rounded-lg bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#003366]/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-[#003366]" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg">Mortgage Payment Calculator</h4>
                      <p className="text-sm text-muted-foreground">Calculate your new monthly mortgage payment</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <PaymentCalculator />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="relative overflow-hidden bg-gradient-to-r from-[#003366] to-[#1e40af] rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
              
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Refinance?</h3>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Take the first step towards better mortgage terms. Our experts are here to guide you through the process.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://tinyurl.com/42xx3hzu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-[#10b981] text-white font-semibold rounded-lg hover:bg-[#059669] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Start Your Application
                  </a>
                  <a 
                    href="/contact-us"
                    className="inline-block px-8 py-4 bg-white text-[#003366] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Talk to a Loan Officer
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

// PaymentCalculator Component (from MortgageCalculatorAccordion)
function PaymentCalculator() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(10500);
  const [downPaymentPercent, setDownPaymentPercent] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [propertyTax, setPropertyTax] = useState(300);
  const [homeInsurance, setHomeInsurance] = useState(150);
  const [hoaDues, setHoaDues] = useState(0);
  const [includePMI, setIncludePMI] = useState(true);

  const handleHomePriceChange = (newPrice: number) => {
    setHomePrice(newPrice);
    setDownPayment(Math.round(newPrice * (downPaymentPercent / 100)));
  };

  const handleDownPaymentChange = (newDownPayment: number) => {
    setDownPayment(newDownPayment);
    setDownPaymentPercent((newDownPayment / homePrice) * 100);
  };

  const calculate = () => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const downPaymentPercent = (downPayment / homePrice) * 100;
    let pmi = 0;
    if (includePMI && downPaymentPercent < 20) {
      pmi = (loanAmount * 0.005) / 12;
    }
    
    const totalMonthly = monthlyPI + pmi + propertyTax + homeInsurance + hoaDues;
    
    return {
      total: Math.round(totalMonthly),
      principalInterest: Math.round(monthlyPI),
      pmi: Math.round(pmi),
      taxes: propertyTax,
      insurance: homeInsurance,
      hoa: hoaDues,
      loanAmount: Math.round(loanAmount)
    };
  };

  const result = calculate();
  
  const chartData = [
    { name: 'P&I', value: result.principalInterest, color: '#0ea5e9' },
    { name: 'Taxes', value: result.taxes, color: '#10b981' },
    { name: 'Insurance', value: result.insurance, color: '#f59e0b' },
    ...(result.hoa > 0 ? [{ name: 'HOA', value: result.hoa, color: '#8b5cf6' }] : []),
    ...(result.pmi > 0 ? [{ name: 'PMI', value: result.pmi, color: '#ec4899' }] : [])
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-6">
      {/* Left Column - Inputs */}
      <div>
        <Card className="p-6 bg-gray-50/50 border-gray-200 shadow-sm">
          <div className="space-y-6">
            {/* Home Price with Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label className="text-sm font-medium text-gray-700">Home price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                  <Input
                    type="text"
                    value={formatNumber(homePrice)}
                    onChange={(e) => handleHomePriceChange(parseCurrency(e.target.value))}
                    className="pl-10 w-36 text-right bg-white border-gray-300 font-medium"
                  />
                </div>
              </div>
              <Slider
                value={[homePrice]}
                onValueChange={([value]: number[]) => handleHomePriceChange(value)}
                min={50000}
                max={2000000}
                step={10000}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>

            {/* Down Payment with Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label className="text-sm font-medium text-gray-700">Down payment</Label>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                    <Input
                      type="text"
                      value={formatNumber(downPayment)}
                      onChange={(e) => handleDownPaymentChange(parseCurrency(e.target.value))}
                      className="pl-10 w-28 text-right bg-white border-gray-300 font-medium"
                    />
                  </div>
                  <span className="text-sm text-gray-600 font-medium min-w-[48px] text-right">
                    {downPaymentPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
              <Slider
                value={[downPayment]}
                onValueChange={([value]: number[]) => handleDownPaymentChange(Math.min(value, homePrice * 0.5))}
                min={0}
                max={homePrice * 0.5}
                step={1000}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>

            {/* Loan Term */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Loan term</Label>
              <Select value={loanTerm.toString()} onValueChange={(v: string) => setLoanTerm(parseInt(v))}>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interest Rate with Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label className="text-sm font-medium text-gray-700">Interest rate</Label>
                <div className="relative">
                  <Input
                    type="text"
                    value={interestRate.toFixed(2)}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                    className="w-24 text-right bg-white border-gray-300 pr-8 font-medium"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">%</span>
                </div>
              </div>
              <Slider
                value={[interestRate]}
                onValueChange={([value]: number[]) => setInterestRate(value)}
                min={3}
                max={10}
                step={0.125}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>

            {/* Show Assumptions Toggle */}
            <div className="flex items-center justify-between py-2">
              <Label className="text-sm font-medium text-gray-700">Include taxes & insurance</Label>
              <Switch
                checked={showAssumptions}
                onCheckedChange={setShowAssumptions}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            {/* Additional Costs (collapsible) */}
            {showAssumptions && (
              <div className="space-y-4 pt-2 border-t">
                <div className="flex justify-between items-center">
                  <Label className="text-sm text-gray-600">Property tax/month</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                    <Input
                      type="text"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(parseInt(e.target.value) || 0)}
                      className="pl-10 w-24 text-right bg-white border-gray-300"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Label className="text-sm text-gray-600">Home insurance/month</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                    <Input
                      type="text"
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(parseInt(e.target.value) || 0)}
                      className="pl-10 w-24 text-right bg-white border-gray-300"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Label className="text-sm text-gray-600">HOA dues/month</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                    <Input
                      type="text"
                      value={hoaDues}
                      onChange={(e) => setHoaDues(parseInt(e.target.value) || 0)}
                      className="pl-10 w-24 text-right bg-white border-gray-300"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-600">Include PMI</Label>
                  <Switch
                    checked={includePMI}
                    onCheckedChange={setIncludePMI}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Right Column - Results */}
      <div>
        <Card className="bg-gradient-to-br from-blue-50 via-white to-blue-50 border-0 shadow-lg p-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">Estimated Monthly Payment</p>
            <p className="text-5xl font-bold text-[#003366]">
              ${formatNumber(result.total)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Loan amount: ${formatNumber(result.loanAmount)}
            </p>
          </div>

          {/* Payment Breakdown Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({name, value}: {name: string, value: number}) => `${name}: $${value}`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown Details */}
          <div className="mt-6 space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Principal & Interest</span>
              <span className="font-semibold">${formatNumber(result.principalInterest)}</span>
            </div>
            {showAssumptions && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Property Tax</span>
                  <span className="font-semibold">${formatNumber(result.taxes)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Home Insurance</span>
                  <span className="font-semibold">${formatNumber(result.insurance)}</span>
                </div>
                {result.hoa > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">HOA Dues</span>
                    <span className="font-semibold">${formatNumber(result.hoa)}</span>
                  </div>
                )}
                {result.pmi > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">PMI</span>
                    <span className="font-semibold">${formatNumber(result.pmi)}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-6 pt-6 border-t space-y-3">
            <a 
              href="https://tinyurl.com/42xx3hzu" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#10b981] text-white font-semibold py-3 rounded-lg hover:bg-[#059669] transition-colors text-center block"
            >
              Apply Now
            </a>
            <a 
              href="/contact-us"
              className="w-full bg-white text-[#003366] font-semibold py-3 rounded-lg border-2 border-[#003366] hover:bg-gray-50 transition-colors text-center block"
            >
              Talk to a Loan Officer
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}

// RefinanceCalculator Component (from MortgageCalculatorAccordion)
function RefinanceCalculator() {
  const [remainingBalance, setRemainingBalance] = useState(150000);
  const [currentRate, setCurrentRate] = useState(8.00);
  const [currentPayment, setCurrentPayment] = useState(1075);
  const [remainingTerm, setRemainingTerm] = useState(20);
  
  const [newLoanAmount, setNewLoanAmount] = useState(150000);
  const [newRate, setNewRate] = useState(6.0);
  const [newTerm, setNewTerm] = useState(30);
  const [closingCosts, setClosingCosts] = useState(3500);

  const calculate = () => {
    const newMonthlyRate = newRate / 100 / 12;
    const newNumPayments = newTerm * 12;
    const remainingPayments = remainingTerm * 12;
    
    const newMonthlyPayment = newLoanAmount * 
      (newMonthlyRate * Math.pow(1 + newMonthlyRate, newNumPayments)) / 
      (Math.pow(1 + newMonthlyRate, newNumPayments) - 1);
    
    const monthlySavings = currentPayment - newMonthlyPayment;
    const breakEvenMonths = closingCosts / Math.max(monthlySavings, 1);
    
    const currentTotalPayments = currentPayment * remainingPayments;
    const newTotalPayments = newMonthlyPayment * newNumPayments;
    const totalSavings = currentTotalPayments - newTotalPayments - closingCosts;
    
    return {
      newPayment: Math.round(newMonthlyPayment),
      monthlySavings: Math.round(monthlySavings),
      breakEvenMonths: Math.round(breakEvenMonths),
      totalSavings: Math.round(totalSavings),
      currentTotal: Math.round(currentTotalPayments),
      newTotal: Math.round(newTotalPayments + closingCosts)
    };
  };

  const result = calculate();
  const isWorthRefinancing = result.monthlySavings > 0 && result.breakEvenMonths < 60;

  return (
    <div className="space-y-8 mt-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Current Loan Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Current Loan Information</h3>
          <Card className="p-6 bg-gray-50/50 border-gray-200">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <Label className="text-sm font-medium text-gray-700">Remaining balance</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                    <Input
                      type="text"
                      value={formatNumber(remainingBalance)}
                      onChange={(e) => setRemainingBalance(parseCurrency(e.target.value))}
                      className="pl-10 w-36 text-right bg-white border-gray-300 font-medium"
                    />
                  </div>
                </div>
                <Slider
                  value={[remainingBalance]}
                  onValueChange={([value]: number[]) => setRemainingBalance(value)}
                  min={50000}
                  max={1000000}
                  step={5000}
                  className="[&_[role=slider]]:bg-primary"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <Label className="text-sm font-medium text-gray-700">Current rate</Label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={currentRate.toFixed(2)}
                      onChange={(e) => setCurrentRate(parseFloat(e.target.value) || 0)}
                      className="w-24 text-right bg-white border-gray-300 pr-8 font-medium"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">%</span>
                  </div>
                </div>
                <Slider
                  value={[currentRate]}
                  onValueChange={([value]: number[]) => setCurrentRate(value)}
                  min={3}
                  max={12}
                  step={0.125}
                  className="[&_[role=slider]]:bg-primary"
                />
              </div>

              <div className="flex justify-between items-baseline">
                <Label className="text-sm font-medium text-gray-700">Current payment</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                  <Input
                    type="text"
                    value={formatNumber(currentPayment)}
                    onChange={(e) => setCurrentPayment(parseCurrency(e.target.value))}
                    className="pl-10 w-36 text-right bg-white border-gray-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Remaining term</Label>
                <Select value={remainingTerm.toString()} onValueChange={(v: string) => setRemainingTerm(parseInt(v))}>
                  <SelectTrigger className="bg-white border-gray-300 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        {/* New Loan Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">New Loan Information</h3>
          <Card className="p-6 bg-gray-50/50 border-gray-200">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <Label className="text-sm font-medium text-gray-700">New loan amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                    <Input
                      type="text"
                      value={formatNumber(newLoanAmount)}
                      onChange={(e) => setNewLoanAmount(parseCurrency(e.target.value))}
                      className="pl-10 w-36 text-right bg-white border-gray-300 font-medium"
                    />
                  </div>
                </div>
                <Slider
                  value={[newLoanAmount]}
                  onValueChange={([value]: number[]) => setNewLoanAmount(value)}
                  min={50000}
                  max={1000000}
                  step={5000}
                  className="[&_[role=slider]]:bg-primary"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <Label className="text-sm font-medium text-gray-700">New rate</Label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={newRate.toFixed(2)}
                      onChange={(e) => setNewRate(parseFloat(e.target.value) || 0)}
                      className="w-24 text-right bg-white border-gray-300 pr-8 font-medium"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">%</span>
                  </div>
                </div>
                <Slider
                  value={[newRate]}
                  onValueChange={([value]: number[]) => setNewRate(value)}
                  min={3}
                  max={12}
                  step={0.125}
                  className="[&_[role=slider]]:bg-primary"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">New term</Label>
                <Select value={newTerm.toString()} onValueChange={(v: string) => setNewTerm(parseInt(v))}>
                  <SelectTrigger className="bg-white border-gray-300 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <Label className="text-sm font-medium text-gray-700">Closing costs</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                    <Input
                      type="text"
                      value={formatNumber(closingCosts)}
                      onChange={(e) => setClosingCosts(parseCurrency(e.target.value))}
                      className="pl-10 w-36 text-right bg-white border-gray-300 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Results Section */}
      <Card className={`p-6 ${isWorthRefinancing ? 'bg-gradient-to-br from-green-50 to-white border-green-200' : 'bg-gradient-to-br from-orange-50 to-white border-orange-200'}`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Refinance Analysis</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">New Payment</p>
            <p className="text-2xl font-bold text-[#003366]">${formatNumber(result.newPayment)}</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Monthly Savings</p>
            <p className={`text-2xl font-bold ${result.monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${formatNumber(Math.abs(result.monthlySavings))}
            </p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Break-Even</p>
            <p className="text-2xl font-bold text-[#003366]">
              {result.monthlySavings > 0 ? `${result.breakEvenMonths} mo` : 'N/A'}
            </p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Savings</p>
            <p className={`text-2xl font-bold ${result.totalSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${formatNumber(Math.abs(result.totalSavings))}
            </p>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-white p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Total Cost Comparison</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Current Loan', value: result.currentTotal },
                { name: 'New Loan', value: result.newTotal }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: number) => `$${formatNumber(value)}`} />
                <Bar dataKey="value" fill="#0097A7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendation */}
        <div className={`mt-6 p-4 rounded-lg ${isWorthRefinancing ? 'bg-green-100 border border-green-300' : 'bg-orange-100 border border-orange-300'}`}>
          <div className="flex items-start gap-3">
            {isWorthRefinancing ? (
              <>
                <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-800">Refinancing Recommended</p>
                  <p className="text-sm text-green-700 mt-1">
                    You could save ${formatNumber(result.monthlySavings)} per month and break even in {result.breakEvenMonths} months.
                    Total savings over the life of the loan: ${formatNumber(result.totalSavings)}.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">!</div>
                <div>
                  <p className="font-semibold text-orange-800">Consider Waiting</p>
                  <p className="text-sm text-orange-700 mt-1">
                    {result.monthlySavings <= 0 
                      ? "The new rate isn't low enough to provide monthly savings."
                      : `It would take ${result.breakEvenMonths} months to break even, which may be too long.`}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <a 
            href="https://tinyurl.com/42xx3hzu"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#10b981] text-white font-semibold py-3 rounded-lg hover:bg-[#059669] transition-colors text-center block"
          >
            Start Application
          </a>
          <a 
            href="/contact-us"
            className="w-full bg-white text-[#003366] font-semibold py-3 rounded-lg border-2 border-[#003366] hover:bg-gray-50 transition-colors text-center block"
          >
            Get Expert Advice
          </a>
        </div>
      </Card>
    </div>
  );
}