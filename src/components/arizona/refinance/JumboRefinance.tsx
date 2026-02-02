import { Helmet } from 'react-helmet-async';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export function JumboRefinance() {
  return (
    <>
      <Helmet>
        <title>Arizona Jumbo Mortgage Refinance | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="Refinance your Arizona jumbo mortgage with competitive rates. Lower payments on luxury homes in Scottsdale and Phoenix. Cash-out options up to $3 million available." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona Jumbo Mortgage Refinance</h1>
      </main>
      
      <Footer />
    </>
  );
}
