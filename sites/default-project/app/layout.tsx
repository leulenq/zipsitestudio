use client;
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Default Project</title>
        <meta name="description" content="Default Project Description" />
        <meta name="keywords" content="default project, keywords" />
      </head>
      <body>
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}