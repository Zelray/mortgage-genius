import { Helmet } from 'react-helmet-async';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function ArizonaUSDALoans() {
  return (
    <>
      <Helmet>
        <title>Arizona USDA Loans - 100% Financing Available | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="USDA loans in Arizona with 0% down payment for eligible rural and suburban properties. 100% financing with low rates. Check if your Arizona property qualifies today." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona USDA Loans</h1>
      </main>
      
      <Footer />
    </>
  );
}
