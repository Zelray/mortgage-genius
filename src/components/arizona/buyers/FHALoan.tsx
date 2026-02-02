import { Helmet } from 'react-helmet-async';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export function FHALoan() {
  return (
    <>
      <Helmet>
        <title>Arizona FHA Home Loans - 3.5% Down Payment | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="FHA home loans in Arizona with just 3.5% down payment. Perfect for buyers with lower credit scores or limited savings. Competitive rates and flexible guidelines." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona FHA Home Loans</h1>
      </main>
      
      <Footer />
    </>
  );
}
