import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { SERVICES } from '../constants';

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Our Specialized Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            We offer a comprehensive range of dental treatments using the latest technology 
            to ensure the best results for our patients.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = (Icons as any)[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
              >
                <div className="w-14 h-14 bg-teal-soft rounded-xl flex items-center justify-center text-teal-primary mb-6 group-hover:bg-teal-primary group-hover:text-white transition-colors">
                  {IconComponent && <IconComponent size={32} />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
                <button className="mt-6 text-teal-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <Icons.ArrowRight size={18} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
