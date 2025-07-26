'use client';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full px-6 md:px-16 lg:px-36 py-4 bg-black/40 backdrop-blur-md border-b border-white/10 shadow-md">
  <div className="w-full flex items-center justify-between">
    
    {/* Left: Logo */}
    <Link to="/" className="flex-shrink-0">
      <img src={logo} alt="Logo" className="h-24 object-scale-down transition-transform duration-300 hover:scale-105" />
    </Link>

    {/* Center: Nav Links (use hidden on mobile) */}
    <div className="hidden md:flex gap-8 text-white font-medium items-center justify-center">
  <Link
    to="/"
    className={`transition-transform group hover:scale-105 ${
      location.pathname === '/' ? 'text-blue-400 font-bold' : 'hover:text-blue-400'
    }`}
  >
    Home
  </Link>
  <Link
    to="/questions"
    className={`transition-transform group hover:scale-105 ${
      location.pathname === '/questions' ? 'text-blue-400 font-bold' : 'hover:text-blue-400'
    }`}
  >
    Questionnaire
  </Link>
  <Link
    to="/ask-question"
    className={`transition-transform group hover:scale-105 ${
      location.pathname === '/ask-question' ? 'text-blue-400 font-bold' : 'hover:text-blue-400'
    }`}
  >
    Ask Question
  </Link>
</div>


    {/* Right: User/Login + Mobile Menu */}
    <div className="flex items-center gap-4">
      {!user ? (
        <button onClick={openSignIn} className="px-4 py-1.5 sm:px-6 sm:py-2 bg-blue-400 text-white rounded-full font-semibold hover:bg-blue-400-dull transition transform hover:scale-105">
          Login
        </button>
      ) : (
        <UserButton />
      )}
      {/* Mobile Menu Icon */}
      <MenuIcon className="md:hidden w-8 h-8 text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
    </div>
  </div>

  {/* Mobile Nav Drawer */}
  <div className={`fixed top-0 right-0 h-screen w-3/4 max-w-xs bg-black/90 z-40 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
    <XIcon className="absolute top-6 right-6 w-6 h-6 text-white cursor-pointer" onClick={() => setIsOpen(false)} />
    <div className="flex flex-col items-center justify-center gap-8 pt-20">
      <Link to="/" onClick={() => setIsOpen(false)} className="text-white hover:text-blue-400 transition-transform hover:scale-105">Home</Link>
      <Link to="/questions" onClick={() => setIsOpen(false)} className="text-white hover:text-blue-400 transition-transform hover:scale-105">Questionnaire</Link>
      <Link to="/ask-question" onClick={() => setIsOpen(false)} className="text-white hover:text-blue-400 transition-transform hover:scale-105">Ask Question</Link>
    </div>
  </div>
</div>

  );
};

export default Navbar;
