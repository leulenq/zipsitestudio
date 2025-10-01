use client;
import { Image } from 'next/image';

export default function Footer() {
  return (
    <footer>
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      &copy; 2024
    </footer>
  );
}