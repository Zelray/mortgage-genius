import { Helmet } from 'react-helmet-async';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function ArizonaHELOC() {
  return (
    <>
      <Helmet>
        <title>Arizona Home Equity Loans and HELOCs | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="Access your home equity with a HELOC or home equity loan in Arizona. Low rates for debt consolidation, home improvements, or major expenses. Tap into your equity today." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona Home Equity Loans and HELOCs</h1>
      </main>
      
      <Footer />
    </>
  );
}
