
import type { NextPage } from 'next';
import Head from 'next/head';
import { Hero, About, Testimonials, Services, Gallery, Contact, FAQs, Pricing, Map, Features } from '../components';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Alfa Grove - Home Care Services for Elderly People in Washington</title>
        <meta name='description' content='Alfa Grove provides home care services for elderly people in the state of Washington.' />
      </Head>
      <Hero />
      <About />
      <Testimonials />
      <Services />
      <Gallery />
      <Contact />
      <FAQs />
      <Pricing />
      <Map />
      <Features />
    </div>
  );
};

export default Home;
