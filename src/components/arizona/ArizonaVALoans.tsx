import { Helmet } from 'react-helmet-async';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function ArizonaVALoans() {
  return (
    <>
      <Helmet>
        <title>Arizona VA Loans for Veterans and Military | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="VA loans in Arizona for veterans, active military, and eligible spouses. 0% down payment, no PMI, competitive rates. Purchase and refinance options with your VA benefits." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona VA Loans</h1>
      </main>
      
      <Footer />
    </>
  );
}
