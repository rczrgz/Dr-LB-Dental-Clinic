import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Branches } from './components/Branches';
import { Leadership } from './components/Leadership';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonial';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone } from 'lucide-react';
import { AiChat } from './components/AiChat';

export default function App() {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen bg-white selection:bg-teal-primary selection:text-white">
      <Navbar onBookNow={() => setShowBookingModal(true)} />

      <main>
        <Hero />
        <Services />
        <Branches />
        <Leadership />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
<AiChat/>
      <Footer />

      {/* Appointment Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowBookingModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-teal-primary p-6 text-white flex justify-between items-center">
                <h3 className="text-2xl font-bold">Book Appointment</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-teal-primary outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-teal-primary outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="date" 
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-teal-primary outline-none"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <select className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-teal-primary outline-none appearance-none">
                        <option>Time Slot</option>
                        <option>09:00 AM</option>
                        <option>11:00 AM</option>
                        <option>02:00 PM</option>
                        <option>04:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-teal-primary text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-teal-dark transition-all">
                  Confirm Booking
                </button>
                <p className="text-center text-sm text-slate-500">
                  We'll call you to confirm your appointment.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}