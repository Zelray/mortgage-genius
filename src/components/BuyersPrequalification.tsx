import { Helmet } from 'react-helmet-async';
import { Header } from './Header';
import { Footer } from './Footer';

export function BuyersPrequalification() {
  return (
    <>
      <Helmet>
        <title>Get Pre-Qualified for Your Mortgage | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="Get pre-qualified for your home loan in minutes. Fast, free mortgage pre-qualification with expert guidance. Start your homebuying journey with confidence today." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Get Pre-Qualified for Your Mortgage</h1>
      </main>
      
      <Footer />
    </>
  );
}
