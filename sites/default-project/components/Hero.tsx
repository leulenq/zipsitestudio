use client;
import Image from 'next/image';

export default function Hero() {
  return (
    <section>
      <h1>Introduction</h1>
      <h2>Key Services</h2>
      <ul>
        <li>Benefit 1</li>
        <li>Benefit 2</li>
        <li>Benefit 3</li>
      </ul>
      <Image src="/hero-image.jpg" alt="Hero image" width={100} height={100} />
    </section>
  );
}