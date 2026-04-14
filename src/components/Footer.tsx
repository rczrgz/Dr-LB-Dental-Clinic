import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';
import { CLINIC_NAME } from '../constants';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
                <img 
                    src="/src/assets/dark-logo.png" 
                    alt="Dr. LB Dental Logo" 
                    className="w-20 h-20 object-contain"
                />
                <span className="text-2xl font-bold text-white">{CLINIC_NAME}</span>
                </div>
            <p className="text-slate-400 leading-relaxed">
              Providing premium dental care with comfort and precision since 2010. 
              Your smile is our greatest achievement.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-primary hover:text-white transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Branches', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-teal-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-4">
              {['General Dentistry', 'Cosmetic Dentistry', 'Oral Surgery', 'Dental Implants', 'Orthodontics'].map((item) => (
                <li key={item}>
                  <a href="#services" className="hover:text-teal-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-6">Subscribe to get the latest dental tips and offers.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-teal-primary outline-none transition-all"
              />
              <button className="w-full bg-teal-primary text-white py-3 rounded-xl font-bold hover:bg-teal-dark transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <p>© 2026 {CLINIC_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> for your smile
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-teal-primary">Privacy Policy</a>
            <a href="#" className="hover:text-teal-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
