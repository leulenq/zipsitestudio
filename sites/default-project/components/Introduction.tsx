use client;
import Image from 'next/image';

export default function Introduction() {
  return (
    <section>
      <h1>Welcome to our company&amp;apos;s website</h1>
      <Image src='/logo.png' alt='Company Logo' width={100} height={100} />
      <p>We provide high-quality services to our clients.</p>
    </section>
  );
}