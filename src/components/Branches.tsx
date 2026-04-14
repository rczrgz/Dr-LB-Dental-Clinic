import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Facebook, ExternalLink } from 'lucide-react';
import { BRANCHES } from '../constants';

export const Branches = () => {
  return (
    <section id="branches" className="py-24 bg-white bg-marble">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Visit Our Branches
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Find a Dr. LB Dental Clinic near you. We have 6 modern locations across the country 
            ready to serve you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANCHES.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-slate-100 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={branch.imageUrl} 
                  alt={branch.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-teal-primary text-white p-2 rounded-full shadow-lg">
                  <MapPin size={20} />
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{branch.name}</h3>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-start gap-3 text-slate-600">
                    <MapPin size={18} className="text-teal-primary shrink-0 mt-1" />
                    <span className="text-sm">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone size={18} className="text-teal-primary shrink-0" />
                    <span className="text-sm font-medium">{branch.phone}</span>
                  </div>
                </div>

                <a 
                  href={branch.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-slate-50 text-slate-700 hover:bg-teal-primary hover:text-white py-3 rounded-xl font-semibold transition-all border border-slate-200"
                >
                  <Facebook size={18} />
                  View Facebook Page
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
