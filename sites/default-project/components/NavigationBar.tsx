use client;
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav>
      <Link href='/'>Hero</Link>
      <Link href='/services'>Services</Link>
      <Link href='/about'>About</Link>
      <Link href='/contact'>Contact</Link>
      <Link href='/pricing'>Pricing</Link>
    </nav>
  );
}