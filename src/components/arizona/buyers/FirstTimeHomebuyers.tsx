import { Helmet } from 'react-helmet-async';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export function FirstTimeHomebuyers() {
  return (
    <>
      <Helmet>
        <title>First Time Homebuyer Programs in Arizona | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="First-time homebuyer programs in Arizona with low down payments and special financing. FHA loans with 3.5% down, USDA 0% down options. Start your homeownership journey." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>First Time Homebuyer Programs in Arizona</h1>
      </main>
      
      <Footer />
    </>
  );
}
