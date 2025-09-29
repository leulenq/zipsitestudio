import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  return (
    <section className="flex flex-wrap justify-center p-4">
      <div className="w-full md:w-1/3 xl:w-1/3 p-6">
        <div className="bg-white rounded shadow-md p-4">
          <Image src="/testimonial-1.jpg" alt="Testimonial 1" width={100} height={100} className="rounded-full"/>
          <p className="text-md mt-2">Bluegrass Gardens did an amazing job with our garden design and installation. We couldn't be happier with the result!</p>
          <p className="text-md mt-2">- John D.</p>
        </div>
      </div>
      <div className="w-full md:w-1/3 xl:w-1/3 p-6">
        <div className="bg-white rounded shadow-md p-4">
          <Image src="/testimonial-2.jpg" alt="Testimonial 2" width={100} height={100} className="rounded-full"/>
          <p className="text-md mt-2">The team at Bluegrass Gardens was professional, courteous, and very knowledgeable. They exceeded our expectations in every way.</p>
          <p className="text-md mt-2">- Jane S.</p>
        </div>
      </div>
      <div className="w-full md:w-1/3 xl:w-1/3 p-6">
        <div className="bg-white rounded shadow-md p-4">
          <Image src="/testimonial-3.jpg" alt="Testimonial 3" width={100} height={100} className="rounded-full"/>
          <p className="text-md mt-2">We've been using Bluegrass Gardens for our lawn maintenance and have been very impressed with their attention to detail and dedication to sustainability.</p>
          <p className="text-md mt-2">- Bob T.</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;