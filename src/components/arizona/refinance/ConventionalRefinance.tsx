import { Helmet } from 'react-helmet-async';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export function ConventionalRefinance() {
  return (
    <>
      <Helmet>
        <title>Arizona Conventional Mortgage Refinance | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="Refinance your conventional mortgage in Arizona and save money. Lower your rate, eliminate PMI, or cash out equity. Fast approval with competitive rates for good credit." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona Conventional Mortgage Refinance</h1>
      </main>
      
      <Footer />
    </>
  );
}
