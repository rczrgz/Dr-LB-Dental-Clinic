import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import { GALLERY_IMAGES } from '../constants';

export const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Clinic Gallery</h2>
          <p className="text-lg text-slate-600">Take a virtual tour of our modern facilities and advanced equipment.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
              onClick={() => setSelectedImg(img)}
            >
              <img 
                src={img} 
                alt={`Clinic ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-teal-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 p-3 rounded-full text-teal-primary shadow-xl">
                  <Maximize2 size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-teal-primary transition-colors p-2"
              onClick={() => setSelectedImg(null)}
            >
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImg}
              alt="Clinic Preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
