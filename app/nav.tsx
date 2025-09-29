import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <nav className="flex justify-between p-4 bg-white">
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="Bluegrass Gardens Logo" className="w-32"/>
        </a>
      </Link>
      <ul className="hidden md:flex items-center space-x-4">
        <li>
          <Link href="/services">
            <a>Services</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
      <button className="md:hidden flex justify-end items-center p-2 border border-gray-200 rounded">
        <FontAwesomeIcon icon={faBars} className="text-lg"/>
      </button>
    </nav>
  );
};

export default Nav;