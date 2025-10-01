use client;
import NavigationBar from '../../../components/NavigationBar';
import Footer from '../../../components/Footer';

export default function RootLayout({ children }) {
  return (
    <>
      <NavigationBar />
      {children}
      <Footer />
    </>
  );
}