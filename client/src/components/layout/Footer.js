// src/components/layout/Footer.js

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#2d2d42] shadow-md py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} NeoUni | Parallel Reality University
          </p>
        </div>
        <div className="flex space-x-4">
          <Link 
            href="/about"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-800 dark:hover:text-purple-400"
          >
            About
          </Link>
          <Link 
            href="/privacy"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-800 dark:hover:text-purple-400"
          >
            Privacy
          </Link>
          <Link 
            href="/terms"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-800 dark:hover:text-purple-400"
          >
            Terms
          </Link>
          <Link 
            href="/contact"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-800 dark:hover:text-purple-400"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}