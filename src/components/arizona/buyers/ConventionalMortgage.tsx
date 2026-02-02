import { Helmet } from 'react-helmet-async';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export function ConventionalMortgage() {
  return (
    <>
      <Helmet>
        <title>Arizona Conventional Mortgage Loans | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="Conventional home loans in Arizona with as little as 3% down. No mortgage insurance with 20% down. Great rates for buyers with good credit. Get pre-qualified today." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona Conventional Mortgage Loans</h1>
      </main>
      
      <Footer />
    </>
  );
}
