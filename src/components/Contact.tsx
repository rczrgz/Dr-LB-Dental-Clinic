import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, Clock, MapPin } from 'lucide-react';

const BRANCHES = [
  {
    name: 'Amang Rodriguez',
    area: 'Pasig',
    address: 'Amang Rodriguez Ave, Pasig City',
    mapUrl: 'https://www.google.com/maps/search/Dr+LB+Dental+Clinic+Amang+Rodriguez+Pasig',
    embedUrl: 'https://www.google.com/maps?q=Amang+Rodriguez+Ave,+Pasig+City&output=embed',
  },
  {
    name: 'Pasig Blvd',
    area: 'Pasig',
    address: 'Pasig Blvd, Pasig City',
    mapUrl: 'https://www.google.com/maps/search/Dr+LB+Dental+Clinic+Pasig+Blvd',
    embedUrl: 'https://www.google.com/maps?q=Pasig+Boulevard,+Pasig+City&output=embed',
  },
  {
    name: 'Mandaluyong',
    area: 'Mandaluyong',
    address: 'Mandaluyong City',
    mapUrl: 'https://www.google.com/maps/search/Dr+LB+Dental+Clinic+Mandaluyong',
    embedUrl: 'https://www.google.com/maps?q=Mandaluyong+City&output=embed',
  },
  {
    name: 'Congressional Ave',
    area: 'Quezon City',
    address: 'Congressional Ave, Quezon City',
    mapUrl: 'https://www.google.com/maps/search/Dr+LB+Dental+Clinic+Congressional+Ave+Quezon+City',
    embedUrl: 'https://www.google.com/maps?q=Congressional+Ave,+Quezon+City&output=embed',
  },
  {
    name: 'Regalado Ave Fairview',
    area: 'Quezon City',
    address: 'Regalado Ave, Fairview, Quezon City',
    mapUrl: 'https://www.google.com/maps/search/Dr+LB+Dental+Clinic+Regalado+Fairview+Quezon+City',
    embedUrl: 'https://www.google.com/maps?q=Regalado+Ave,+Fairview,+Quezon+City&output=embed',
  },
  {
    name: 'Malanday',
    area: 'Marikina',
    address: 'Malanday, Marikina City',
    mapUrl: 'https://www.google.com/maps/search/Dr+LB+Dental+Clinic+Malanday+Marikina',
    embedUrl: 'https://www.google.com/maps?q=Malanday,+Marikina+City&output=embed',
  },
  {
    name: 'Parang',
    area: 'Marikina',
    address: 'Unit 5, 2nd Floor GTI Bldg., B.G. Molina St., Brgy. Parang, Marikina City',
    mapUrl: 'https://www.google.com/maps/search/Dr+LB+Dental+Clinic+Parang+Marikina',
    embedUrl: 'https://www.google.com/maps?q=B.G.+Molina+St,+Parang,+Marikina+City&output=embed',
  },
  {
    name: 'Tanauan',
    area: 'Batangas',
    address: 'Tanauan, Batangas',
    mapUrl: 'https://www.google.com/maps/search/Dr+LB+Dental+Clinic+Tanauan+Batangas',
    embedUrl: 'https://www.google.com/maps?q=Tanauan,+Batangas&output=embed',
  },
];

export const Contact = () => {
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[6]); // Parang default

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            <p className="text-lg text-slate-600 mb-10">
              Have questions or ready to book your appointment? Reach out to us
              and our friendly team will assist you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-teal-soft rounded-2xl flex items-center justify-center text-teal-primary shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Call Us</h4>
                  <p className="text-slate-600">+63 995 466 6672</p>
                  <p className="text-slate-600">727-516-23</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-teal-soft rounded-2xl flex items-center justify-center text-teal-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                  <p className="text-slate-600">hello@drlbdental.com</p>
                  <p className="text-slate-600">support@drlbdental.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-teal-soft rounded-2xl flex items-center justify-center text-teal-primary shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Clinic Hours</h4>
                  <p className="text-slate-600">Mon – Sun: 9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Branch Map Selector */}
            <div className="mt-12">
              {/* Branch Pills */}
              <div className="mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-teal-primary shrink-0" />
                <p className="text-sm font-semibold text-slate-700">Select a branch to view on map</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {BRANCHES.map((branch) => (
                  <button
                    key={branch.name}
                    onClick={() => setSelectedBranch(branch)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      selectedBranch.name === branch.name
                        ? 'bg-teal-primary text-white border-teal-primary shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-teal-primary hover:text-teal-primary'
                    }`}
                  >
                    {branch.name}
                  </button>
                ))}
              </div>

              {/* Selected Branch Info */}
              <div className="flex items-start gap-2 mb-3">
                <MapPin size={14} className="text-teal-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-800">{selectedBranch.name} — {selectedBranch.area}</p>
                  <p className="text-xs text-slate-500">{selectedBranch.address}</p>
                </div>
              </div>

              {/* Map Embed */}
              <div className="rounded-3xl overflow-hidden h-64 shadow-inner border border-slate-100 relative">
                <iframe
                  key={selectedBranch.name}
                  src={selectedBranch.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <a
                  href={selectedBranch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 font-bold text-teal-primary text-sm hover:bg-teal-soft transition-colors whitespace-nowrap"
                >
                  <MapPin size={16} />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Preferred Branch</label>
                <select className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/20 outline-none transition-all appearance-none">
                  <option>Select a branch</option>
                  {BRANCHES.map((b) => (
                    <option key={b.name}>{b.name} — {b.area}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/20 outline-none transition-all"
                />
              </div>

              <button className="w-full flex items-center justify-center gap-3 bg-teal-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-teal-dark transition-all shadow-lg hover:shadow-teal-primary/30 transform hover:-translate-y-1">
                Send Message
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};