use client;
import Image from 'next/image';

const Introduction = () => {
  return (
    <div>
      <h1>Welcome to our company</h1>
      <p>We&apos;re a professional and approachable team, here to help you with your needs.</p>
      <Image src='/hero-image.jpg' alt='Hero image' width={500} height={300} />
    </div>
  );
};

export default Introduction;