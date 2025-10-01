use client;
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav style={{
      backgroundColor: '#3498db',
      color: 'white',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <li><Link href="/">Hero</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/pricing">Pricing</Link></li>
      </ul>
    </nav>
  );
}