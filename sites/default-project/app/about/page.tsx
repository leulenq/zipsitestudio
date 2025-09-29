"use client";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import Image from 'next/image';

export default function About() {
  return (
    <div>
      <Navbar />
      <h1>About us</h1>
      <h2>Our story</h2>
      <ul>
        <li>Our team</li>
        <li>Our history</li>
      </ul>
      <CallToAction />
      <Image src="/image3.jpg" alt="Abstract background" width={400} height={300} />
      <Footer />
    </div>
  );
}