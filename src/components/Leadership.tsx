import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { LEADERS } from '../constants';

export const Leadership = () => {
  return (
    <section id="about" className="py-24 bg-teal-soft/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Our Leadership
          </motion.h2>
          <div className="w-20 h-1.5 bg-teal-primary mx-auto rounded-full" />
        </div>

        <div className="flex justify-center">
          {LEADERS.map((leader) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white"
            >
              <div className="md:w-2/5 relative">
                <img 
                  src={leader.imageUrl} 
                  alt={leader.name} 
                  className="w-full h-full object-cover min-h-[300px]"
                  referrerPolicy="no-referrer"
                />
                {leader.isCeo && (
                  <div className="absolute top-6 left-6 bg-teal-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    CEO & FOUNDER
                  </div>
                )}
              </div>
              
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center relative">
                <Quote className="absolute top-8 right-8 text-teal-soft w-24 h-24 -z-0 opacity-50" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{leader.name}</h3>
                  <p className="text-teal-primary font-semibold text-lg mb-6">{leader.title}</p>
                  
                  <p className="text-xl text-slate-600 italic leading-relaxed mb-8">
                    "{leader.quote}"
                  </p>
                  
                  <div className="flex gap-4">
                    <button className="bg-teal-primary text-white px-6 py-2 rounded-full font-medium hover:bg-teal-dark transition-all">
                      Read Bio
                    </button>
                    <button className="border border-slate-200 text-slate-600 px-6 py-2 rounded-full font-medium hover:bg-slate-50 transition-all">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
