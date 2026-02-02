import { Helmet } from 'react-helmet-async';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export function JumboLoan() {
  return (
    <>
      <Helmet>
        <title>Arizona Jumbo Home Loans for Luxury Properties | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="Jumbo home loans in Arizona for properties over $766,550. Competitive rates on luxury homes in Scottsdale, Paradise Valley, and Phoenix. Low down payment options available." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona Jumbo Home Loans</h1>
      </main>
      
      <Footer />
    </>
  );
}
