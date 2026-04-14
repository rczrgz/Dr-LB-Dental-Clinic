import React from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, Clock, MapPin } from 'lucide-react';

export const Contact = () => {
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
                  <p className="text-slate-600">+63 917 123 4567</p>
                  <p className="text-slate-600">+63 2 8888 9999</p>
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
                  <p className="text-slate-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p className="text-slate-600">Sun: By Appointment Only</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 rounded-3xl overflow-hidden h-64 shadow-inner bg-slate-100 relative group">
              <img 
                src="https://picsum.photos/seed/map/800/400" 
                alt="Map Location" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-teal-primary">
                  <MapPin size={20} />
                  Open in Google Maps
                </div>
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
                  <option>Quezon City</option>
                  <option>Makati</option>
                  <option>BGC</option>
                  <option>Alabang</option>
                  <option>Pasig</option>
                  <option>Cebu</option>
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
