import { Helmet } from 'react-helmet-async';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export function USDALoan() {
  return (
    <>
      <Helmet>
        <title>Arizona USDA Home Loans - 0% Down Payment | Mortgage Genius Has Low Rates</title>
        <meta 
          name="description" 
          content="USDA home loans in Arizona with 0% down payment for rural and suburban properties. No mortgage insurance, income limits apply. 100% financing for eligible buyers." 
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        <h1>Arizona USDA Home Loans</h1>
      </main>
      
      <Footer />
    </>
  );
}
