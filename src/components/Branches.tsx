import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Facebook, Sparkles } from 'lucide-react';
import { BRANCHES } from '../constants';

const CITIES = ['All', 'Pasig', 'Marikina', 'Quezon City', 'Batangas'] as const;
type City = typeof CITIES[number];

const CITY_MAP: Record<string, City> = {
  '1': 'Pasig',
  '2': 'Pasig',
  '3': 'Quezon City',
  '4': 'Quezon City',
  '5': 'Marikina',
  '6': 'Marikina',
  '7': 'Batangas',
};

const STATS = [
  {
    value: '7+',
    label: 'Branches',
    sub: 'Nationwide',
  },
  {
    value: '2020',
    label: 'Founded',
    sub: 'Trusted since',
  },
  {
    value: '100%',
    label: 'Recommend',
    sub: 'Top branches',
  },
];

export const Branches = () => {
  const [activeCity, setActiveCity] = useState<City>('All');

  const filtered = BRANCHES.filter(
    (b) => activeCity === 'All' || CITY_MAP[b.id] === activeCity
  );

  return (
    <section
      id="branches"
      className="relative py-8 bg-gradient-to-b from-white via-slate-50 to-teal-50/30 overflow-hidden"
    >
      {/* Decorative Blur */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-6"
          >
            <Sparkles size={14} />
            Our Locations
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight"
          >
            Find a branch
            <span className="block bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
              near you
            </span>
          </motion.h2>

          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Experience premium wellness care across Metro Manila and Batangas.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 md:mt-12 max-w-3xl mx-auto">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl md:rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-lg p-3 sm:p-5"
              >
                <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                  {stat.value}
                </h3>

                <p className="text-[10px] sm:text-sm font-semibold text-slate-700 mt-1">
                  {stat.label}
                </p>

                <p className="text-[9px] sm:text-xs text-slate-400 leading-tight">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center flex-wrap gap-3 mb-14">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCity === city
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300 hover:text-teal-700'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-52 overflow-hidden">
                {branch.imageUrl ? (
                  <img
                    src={branch.imageUrl}
                    alt={branch.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-teal-50 flex items-center justify-center">
                    <MapPin className="text-teal-300" size={36} />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {CITY_MAP[branch.id]}
                </span>
              </div>

              <div className="p-6">

                <h3 className="text-xl font-semibold text-slate-900 mt-2 mb-4">
                  {branch.name}
                </h3>

                <div className="space-y-3 text-slate-500 mb-6">
                  <div className="flex gap-3">
                    <MapPin size={16} className="text-teal-500 mt-1 shrink-0" />
                    <span className="text-sm">{branch.address}</span>
                  </div>

                  <div className="flex gap-3">
                    <Phone size={16} className="text-teal-500 shrink-0" />
                    <span className="text-sm">{branch.phone}</span>
                  </div>
                </div>

                <a
                  href={branch.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 hover:bg-teal-600 hover:text-white transition-all font-medium"
                >
                  <Facebook size={16} />
                  Visit Facebook Page
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            No branches found in this area.
          </div>
        )}
      </div>
    </section>
  );
};