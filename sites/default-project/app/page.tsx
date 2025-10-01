use client;
import { Link } from 'next/navigation';
import CallToActionButton from '../../../components/CallToActionButton';
import HeroSection from '../../../components/HeroSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Link href="services">Services</Link>
      <Link href="about">About</Link>
      <Link href="contact">Contact</Link>
      <Link href="pricing">Pricing</Link>
      <CallToActionButton text='Get Started' />
    </>
  );
}