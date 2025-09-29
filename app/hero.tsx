import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url(/hero.jpg)' }}>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-75 z-0"></div>
      <div className="text-center z-10 z-10">
        <h1 className="text-5xl text-white leading-tight">Bespoke Garden Design for the Bluegrass Region</h1>
        <p className="text-2xl text-white mt-4">Who We Are: Introduction to Bluegrass Gardens</p>
        <p className="text-xl text-white mt-2">High-end residential and commercial properties, meticulous attention to detail and bespoke designs, sustainable practices.</p>
        <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded mt-8">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;