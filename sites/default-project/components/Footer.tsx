import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#8e24aa', color: 'white', textAlign: 'center' }}>
      <p>&copy; 2024 Our Company</p>
      <ul>
        <li><Link href="/">Hero</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/pricing">Pricing</Link></li>
      </ul>
    </footer>
  );
}