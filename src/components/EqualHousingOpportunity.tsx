import React from 'react';

export function EqualHousingOpportunity() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#003366] to-[#1e40af] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Equal Housing Opportunity</h1>
          <p className="text-white/80">Our Commitment to Fair Lending</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="#003366"/>
                <path d="M50 20L70 40H60V70H40V40H30L50 20Z" fill="white"/>
                <rect x="42" y="50" width="16" height="20" fill="#003366"/>
              </svg>
              <div>
                <h2 className="text-2xl font-bold text-[#003366] mb-2">Equal Housing Lender</h2>
                <p className="text-gray-600">Committed to Fair and Equal Access to Housing Credit</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mortgage Genius is committed to ensuring that all persons have equal access to housing and housing-related services 
              without regard to race, color, religion, sex, handicap, familial status, national origin, or any other characteristic 
              protected by law.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are an Equal Housing Lender and comply with all applicable federal, state, and local fair lending laws, including 
              the Fair Housing Act, the Equal Credit Opportunity Act (ECOA), and the Community Reinvestment Act (CRA).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Protected Classes</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under federal law, it is illegal to discriminate in any aspect of a credit transaction on the basis of:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Race or color</li>
              <li>National origin</li>
              <li>Religion</li>
              <li>Sex (including sexual orientation and gender identity)</li>
              <li>Marital status</li>
              <li>Age (provided the applicant has the capacity to contract)</li>
              <li>Receipt of income from any public assistance program</li>
              <li>Good faith exercise of any right under the Consumer Credit Protection Act</li>
              <li>Disability or handicap</li>
              <li>Familial status (having children under the age of 18)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As a mortgage loan applicant, you have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Have your application considered based on the merits of your credit and financial capacity</li>
              <li>Receive equal treatment in all phases of the lending process</li>
              <li>Be informed of the action taken on your loan application within 30 days</li>
              <li>Receive a written explanation if your application is denied</li>
              <li>Receive a copy of your appraisal report</li>
              <li>File a complaint if you believe you have been discriminated against</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Fair Lending Practices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mortgage Genius is committed to the following fair lending practices:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Marketing our services to all segments of the communities we serve</li>
              <li>Providing equal service and assistance to all prospective borrowers</li>
              <li>Applying consistent underwriting standards and loan terms</li>
              <li>Maintaining fair and objective property valuation standards</li>
              <li>Providing equal access to credit throughout all markets we serve</li>
              <li>Training our staff on fair lending compliance and best practices</li>
              <li>Monitoring our lending practices to ensure compliance with fair lending laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#003366] mb-4">How to File a Complaint</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you believe you have been discriminated against by Mortgage Genius or any other lender, you may file a complaint with:
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">U.S. Department of Housing and Urban Development (HUD)</h3>
              <p className="text-gray-700 mb-2">
                <strong>Office of Fair Housing and Equal Opportunity</strong><br />
                451 7th Street S.W.<br />
                Washington, DC 20410
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> <a href="tel:1-800-669-9777" className="text-[#10b981] hover:underline">1-800-669-9777</a> (Voice)<br />
                <strong>TTY:</strong> <a href="tel:1-800-927-9275" className="text-[#10b981] hover:underline">1-800-927-9275</a>
              </p>
              <p className="text-gray-700">
                <strong>Website:</strong> <a href="https://www.hud.gov/fairhousing" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">www.hud.gov/fairhousing</a>
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Consumer Financial Protection Bureau (CFPB)</h3>
              <p className="text-gray-700 mb-2">
                P.O. Box 4503<br />
                Iowa City, Iowa 52244
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> <a href="tel:1-855-411-2372" className="text-[#10b981] hover:underline">1-855-411-CFPB (2372)</a><br />
                <strong>TTY/TDD:</strong> <a href="tel:1-855-729-2372" className="text-[#10b981] hover:underline">1-855-729-2372</a>
              </p>
              <p className="text-gray-700">
                <strong>Website:</strong> <a href="https://www.consumerfinance.gov/complaint/" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">www.consumerfinance.gov/complaint</a>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Licensing Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Mortgage Genius</strong><br />
              NMLS #2280851<br />
              Licensed Mortgage Broker
            </p>
            <p className="text-gray-700 leading-relaxed">
              Licensed in FL, AZ, TX and additional states. Verify our licensing at{' '}
              <a 
                href="http://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/2280851" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#10b981] hover:underline"
              >
                NMLS Consumer Access
              </a>.
            </p>
          </section>

          <section className="mb-8 bg-[#003366] text-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p className="mb-4">
              If you have questions about our fair lending practices or equal housing opportunity policies, 
              please contact us directly.
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
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#003366] rounded-lg hover:bg-gray-100 transition-colors"
              >
                Apply Online
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
