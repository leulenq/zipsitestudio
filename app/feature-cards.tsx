import React from 'react';
import Image from 'next/image';

const FeatureCards = () => {
  return (
    <section className="flex flex-wrap justify-center p-4">
      <div className="w-full md:w-1/3 xl:w-1/3 p-6">
        <div className="bg-white rounded shadow-md p-4">
          <Image src="/garden-design.jpg" alt="Garden Design" width={300} height={200} />
          <h2 className="text-lg font-bold mt-2">Garden Design</h2>
          <p className="text-md mt-2">On-site consultation, custom 3D design mockups, expert plant selection, professional installation.</p>
        </div>
      </div>
      <div className="w-full md:w-1/3 xl:w-1/3 p-6">
        <div className="bg-white rounded shadow-md p-4">
          <Image src="/hardscaping.jpg" alt="Hardscaping" width={300} height={200} />
          <h2 className="text-lg font-bold mt-2">Hardscaping</h2>
          <p className="text-md mt-2">Elegant stone patios, walkways, and retaining walls, high-quality materials like natural flagstone and classic brick.</p>
        </div>
      </div>
      <div className="w-full md:w-1/3 xl:w-1/3 p-6">
        <div className="bg-white rounded shadow-md p-4">
          <Image src="/lawn-maintenance.jpg" alt="Lawn Maintenance" width={300} height={200} />
          <h2 className="text-lg font-bold mt-2">Lawn & Grounds Maintenance</h2>
          <p className="text-md mt-2">Premium maintenance plans for residential and commercial properties, precision mowing, fertilization, aeration, and seasonal cleanup.</p>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;