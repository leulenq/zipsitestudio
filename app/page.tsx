"use client";
import Image from 'next/image'; import { use client } from 'react'; export default function Page() { return ( <div> <Image src='/hero.jpg' alt='Hero Image' width={500} height={300} /> <h1>Welcome to our company</h1> <p>Let&apos;s talk!</p> </div> ); }
