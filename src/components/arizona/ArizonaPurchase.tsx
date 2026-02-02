import { Helmet } from 'react-helmet-async';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function ArizonaPurchase() {
  return (
    <>
      <Helmet>
        <title>Arizona Home Purchase Loans | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="Buy a home in Arizona with FHA, VA, conventional, USDA, or jumbo loans. Expert guidance for first-time buyers and move-up homeowners. Apply for pre-approval now." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona Home Purchase Loans</h1>
      </main>
      
      <Footer />
    </>
  );
}
