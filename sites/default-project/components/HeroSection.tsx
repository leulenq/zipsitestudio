use client;
import { Image } from 'next/image';

export default function HeroSection() {
  return (
    <section>
      <h1>Introduction</h1>
      <h2>Services Overview</h2>
      <ul>
        <li>Key Service 1</li>
        <li>Key Service 2</li>
        <li>Key Service 3</li>
      </ul>
      <Image src="/hero-image.png" alt="Hero Image" width={1000} height={500} />
    </section>
  );
}