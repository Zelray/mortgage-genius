import { Helmet } from 'react-helmet-async';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export function VAStreamline() {
  return (
    <>
      <Helmet>
        <title>Arizona VA Streamline Refinance (IRRRL) | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="VA IRRRL streamline refinance in Arizona with no appraisal needed. Lower your VA loan rate and payment fast. Minimal paperwork for eligible veterans and military members." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona VA Streamline Refinance (IRRRL)</h1>
      </main>
      
      <Footer />
    </>
  );
}
