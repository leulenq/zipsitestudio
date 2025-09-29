import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: '#0047AB', color: 'white' }}>
      <ul>
        <li><Link href="/">Hero</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/pricing">Pricing</Link></li>
      </ul>
    </nav>
  );
}