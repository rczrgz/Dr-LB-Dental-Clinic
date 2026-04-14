import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight} from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/dental-hero/1920/1080" 
          alt="Modern Dental Clinic" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-teal-soft/30" />
      </div>

      {/* Floating Shapes */}
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-64 h-64 bg-teal-primary/5 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-10 w-96 h-96 bg-teal-primary/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-teal-primary uppercase bg-teal-soft rounded-full">
              Premium Dental Care
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
              Your Smile, <br />
              <span className="text-teal-primary">Our Priority</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
              Experience advanced dental care with comfort and precision. 
              We combine cutting-edge technology with a gentle touch to give you the smile you deserve.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 bg-teal-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-dark transition-all shadow-xl hover:shadow-teal-primary/20 transform hover:-translate-y-1">
                Book Appointment
                <ChevronRight size={20} />
              </button>
              <button className="flex items-center justify-center gap-2 bg-white text-teal-primary border-2 border-teal-primary/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-soft transition-all transform hover:-translate-y-1">
                View Services
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 flex items-center gap-8"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="Patient" 
                  className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">5,000+ Happy Patients</p>
              <div className="flex text-yellow-400">
                {'★'.repeat(5)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
