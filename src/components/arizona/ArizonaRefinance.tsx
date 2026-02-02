import { Helmet } from 'react-helmet-async';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function ArizonaRefinance() {
  return (
    <>
      <Helmet>
        <title>Arizona Mortgage Refinance - Lower Your Rate | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="Refinance your Arizona mortgage and lower your monthly payment. FHA streamline, VA IRRRL, conventional, and jumbo refinance options. No appraisal programs available." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona Mortgage Refinance</h1>
      </main>
      
      <Footer />
    </>
  );
}
