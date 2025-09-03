import React from 'react';

export default function Header({ onNavigate }) {
  return (
    <header className="fixed top-0 left-0 w-full bg-slate-900 text-white p-4 shadow-md z-20">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold font-sans">
          Chemistry Problem Archive
        </h1>
        <div className="flex space-x-4">
          <a
            href="#"
            onClick={() => onNavigate('home')}
            className="hover:text-gray-300 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            onClick={() => onNavigate('problems')}
            className="hover:text-gray-300 transition-colors"
          >
            Problems
          </a>
          <a
            href="#"
            onClick={() => onNavigate('learn')}
            className="hover:text-gray-300 transition-colors"
          >
            Learn
          </a>
        </div>
      </nav>
    </header>
  );
}
