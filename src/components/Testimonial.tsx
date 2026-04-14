import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

export const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Patient Stories</h2>
          <p className="text-lg text-slate-600">Hear from our patients about their experiences at Dr. LB Dental Clinic.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col relative"
            >
              <Quote className="text-teal-soft absolute top-6 right-6 w-12 h-12 opacity-40" />
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} 
                  />
                ))}
              </div>
              
              <p className="text-slate-600 italic mb-8 flex-grow leading-relaxed">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-soft rounded-full flex items-center justify-center text-teal-primary font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-sm text-slate-500">Verified Patient</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
