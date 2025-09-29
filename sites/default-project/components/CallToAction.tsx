import Link from 'next/link';

export default function CallToAction() {
  return (
    <button style={{ backgroundColor: '#0047AB', color: 'white' }}>
      <Link href="/contact">Get in touch</Link>
    </button>
  );
}