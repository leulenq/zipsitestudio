"use client";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Introducing our services</h1>
      <h2>Get in touch</h2>
      <ul>
        <li>Our mission</li>
        <li>Our values</li>
      </ul>
      <CallToAction />
      <Image src="/image1.jpg" alt="Abstract background" width={400} height={300} />
      <Footer />
    </div>
  );
}