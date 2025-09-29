import React from 'react';
import Hero from './hero';
import FeatureCards from './feature-cards';
import Testimonials from './testimonials';
import Contact from './contact';
import Layout from './layout';

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <FeatureCards />
      <Testimonials />
      <Contact />
    </Layout>
  );
};

export default HomePage;