"use client";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import Image from 'next/image';

export default function Pricing() {
  return (
    <div>
      <Navbar />
      <h1>Our pricing</h1>
      <h2>Plans</h2>
      <ul>
        <li>Plan 1</li>
        <li>Plan 2</li>
      </ul>
      <CallToAction />
      <Image src="/image5.jpg" alt="Abstract background" width={400} height={300} />
      <Footer />
    </div>
  );
}