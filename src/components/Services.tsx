import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { SERVICES } from '../constants';
import teethWhitening from '../assets/services/teeth-whitening.png'
import cosmeticDentistry  from '../assets/services/cosmetic-dentistry.png';
import oralSurgery from '../assets/services/oral-surgery.png';
import dentalImplants from '../assets/services/dental-implants.png';
import orthodontics from '../assets/services/orthodontics.png';
import tmjManagement from '../assets/services/tmj-management.png';


// TODO: replace `null` values with your imported image variables
const SERVICE_IMAGES: Record<string, string | null> = {
  'general-dentistry':   teethWhitening, // e.g. teethWhitening
  'cosmetic-dentistry':   cosmeticDentistry, // e.g. dentalImplants
  'oral-surgery': oralSurgery,
  'dental-implants': dentalImplants,
  'orthodontics': orthodontics,
  'tmj-management': tmjManagement,
};

// ─────────────────────────────────────────────────────────────────────────────
// Simple SVG placeholder rendered when no image is supplied for a service
// ─────────────────────────────────────────────────────────────────────────────
const ImagePlaceholder = ({ icon }: { icon?: React.ReactNode }) => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-teal-50">
    <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-500">
      {icon ?? <Icons.ImageOff size={28} />}
    </div>
    <span className="text-xs text-teal-400 font-medium tracking-wide uppercase">
      Image coming soon
    </span>
  </div>
);

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            What We Offer
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Our Specialized Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            We offer a comprehensive range of dental treatments using the latest technology
            to ensure the best results for our patients.
          </motion.p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = (Icons as any)[service.icon];

            // Resolve image: try by id, then by slugified title, fall back to null
            const imageUrl: string | null =
              SERVICE_IMAGES[service.id] ??
              SERVICE_IMAGES[service.title?.toLowerCase().replace(/\s+/g, '-')] ??
              null;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col"
              >
                {/* ── Image Area ── */}
                <div className="relative h-48 sm:h-44 lg:h-48 overflow-hidden">
                  {imageUrl ? (
                    <>
                      <img
                        src={imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <ImagePlaceholder
                      icon={IconComponent ? <IconComponent size={28} /> : undefined}
                    />
                  )}

                  {/* Icon badge — only shown when a real image is present */}
                  {imageUrl && (
                    <div className="absolute top-4 left-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-teal-600 shadow-sm">
                      {IconComponent && <IconComponent size={22} />}
                    </div>
                  )}
                </div>

                {/* ── Content Area ── */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <button className="mt-5 inline-flex items-center gap-2 text-teal-600 font-semibold text-sm hover:gap-3 transition-all duration-200 w-fit">
                    Learn More
                    <Icons.ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};