"use client";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import Image from 'next/image';

export default function Contact() {
  return (
    <div>
      <Navbar />
      <h1>Get in touch</h1>
      <h2>Contact us</h2>
      <ul>
        <li>Phone number</li>
        <li>Email</li>
      </ul>
      <CallToAction />
      <Image src="/image4.jpg" alt="Abstract background" width={400} height={300} />
      <Footer />
    </div>
  );
}