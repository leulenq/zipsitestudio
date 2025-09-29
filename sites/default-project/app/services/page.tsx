"use client";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import Image from 'next/image';

export default function Services() {
  return (
    <div>
      <Navbar />
      <h1>Our Services</h1>
      <h2>What we offer</h2>
      <ul>
        <li>Service 1</li>
        <li>Service 2</li>
      </ul>
      <CallToAction />
      <Image src="/image2.jpg" alt="Abstract background" width={400} height={300} />
      <Footer />
    </div>
  );
}