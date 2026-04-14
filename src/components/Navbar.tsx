import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/light-logo.png";

interface NavbarProps {
  onBookNow: () => void;
}

export const Navbar = ({ onBookNow }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Branches', href: '#branches' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#home" className="text-2xl font-bold text-teal-primary flex items-center gap-2">
  <img src={logo} alt="Dr. LB Dental Logo" className="w-20 h-20 object-contain" />
  <span className="hidden sm:block">Dr. LB Dental</span>
</a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-slate-600 hover:text-teal-primary font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={onBookNow}
              className="bg-teal-primary text-white px-6 py-2 rounded-full font-medium hover:bg-teal-dark transition-all shadow-md hover:shadow-lg">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-teal-primary p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
  <a
    key={link.name}
    href={link.href}
    onClick={(e) => {
      e.preventDefault();
      setIsOpen(false);
      setTimeout(() => {
        const target = document.querySelector(link.href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200); // wait for menu to close first
    }}
    className="block px-3 py-4 text-base font-medium text-slate-600 hover:text-teal-primary hover:bg-slate-50 rounded-md"
  >
    {link.name}
  </a>
))}
              <div className="pt-4 px-3">
                <button 
                  onClick={onBookNow}
                  className="w-full bg-teal-primary text-white px-6 py-3 rounded-full font-medium shadow-md">
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};