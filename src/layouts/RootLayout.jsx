import Navbar from './Navbar';
import Footer from './Footer';

/**
 * RootLayout – wraps every page with the shared Navbar and Footer.
 */
export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
