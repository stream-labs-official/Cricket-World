'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#1a1a1a] border-b border-gray-800 h-16 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold text-white hover:text-gray-300 transition-colors flex items-center gap-2"
        >
          <span className="text-red-500">Cricket</span>
          <span>World</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/admin" 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors font-medium"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}
