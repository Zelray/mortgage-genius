import { Helmet } from 'react-helmet-async';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export function VALoanPurchase() {
  return (
    <>
      <Helmet>
        <title>Arizona VA Home Loans - 0% Down for Veterans | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="VA home loans in Arizona with 0% down payment for veterans and active military. No mortgage insurance, competitive rates, flexible credit requirements. Honor your service." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona VA Home Loans</h1>
      </main>
      
      <Footer />
    </>
  );
}
