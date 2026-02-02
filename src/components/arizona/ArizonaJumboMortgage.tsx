import { Helmet } from 'react-helmet-async';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function ArizonaJumboMortgage() {
  return (
    <>
      <Helmet>
        <title>Arizona Jumbo Mortgage Loans for Luxury Homes | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="Jumbo mortgages in Arizona for luxury properties over $766,550. Financing for upscale homes in Scottsdale, Paradise Valley, Carefree, and Phoenix. Competitive jumbo rates." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona Jumbo Mortgage Loans</h1>
      </main>
      
      <Footer />
    </>
  );
}
