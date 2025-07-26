import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-6 py-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Logo or App Name */}
        <div>
          <h1 className="text-white text-2xl font-bold mb-2">StackIt</h1>
          <p className="text-sm">Ask, learn, and share knowledge freely.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-white text-sm font-semibold mb-3">Navigation</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/questions" className="hover:text-white">Questions</Link></li>
            <li><Link to="/ask-question" className="hover:text-white">Ask Question</Link></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h2 className="text-white text-sm font-semibold mb-3">About</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Our Mission</a></li>
            <li><a href="#" className="hover:text-white">Team</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
          </ul>
        </div>

        {/* Social or Contact */}
        <div>
          <h2 className="text-white text-sm font-semibold mb-3">Connect</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:hello@stackit.com" className="hover:text-white">Email Us</a></li>
            <li><a href="#" className="hover:text-white">Twitter</a></li>
            <li><a href="#" className="hover:text-white">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} StackIt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
