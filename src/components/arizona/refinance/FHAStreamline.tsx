import { Helmet } from 'react-helmet-async';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export function FHAStreamline() {
  return (
    <>
      <Helmet>
        <title>Arizona FHA Streamline Refinance - No Appraisal | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="FHA streamline refinance in Arizona with no appraisal required. Lower your rate and payment in as little as 30 days. Minimal documentation for existing FHA borrowers." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona FHA Streamline Refinance</h1>
      </main>
      
      <Footer />
    </>
  );
}
