import React, { useState, useEffect } from 'react';
import { X, User, Phone, Calendar, Clock, MapPin, CheckCircle, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Branch data ──────────────────────────────────────────────────────────────
const BRANCHES = [
  { id: 'makati',      name: 'Makati',      address: '123 Ayala Ave, Makati City' },
  { id: 'bgc',         name: 'BGC',         address: '5th Ave, Bonifacio Global City' },
  { id: 'quezon-city', name: 'Quezon City', address: '15 Katipunan Ave, QC' },
  { id: 'mandaluyong', name: 'Mandaluyong', address: '2 Shaw Blvd, Mandaluyong' },
  { id: 'pasig',       name: 'Pasig',       address: '88 Ortigas Ave, Pasig City' },
  { id: 'las-pinas',   name: 'Las Piñas',   address: '10 Alabang-Zapote Rd' },
  { id: 'muntinlupa',  name: 'Muntinlupa',  address: '30 National Rd, Muntinlupa' },
];

// ─── Services — add/remove freely here ───────────────────────────────────────
const SERVICES = [
  { id: 'cleaning',       label: 'Cleaning',           emoji: '🦷' },
  { id: 'braces',         label: 'Braces',              emoji: '😬' },
  { id: 'whitening',      label: 'Whitening',           emoji: '✨' },
  { id: 'extraction',     label: 'Extraction',          emoji: '🩺' },
  { id: 'rootcanal',      label: 'Root Canal',          emoji: '💉' },
  { id: 'filling',        label: 'Filling',             emoji: '🔧' },
  { id: 'veneer',         label: 'Veneers',             emoji: '💎' },
  { id: 'implant',        label: 'Implant',             emoji: '🔩' },
  { id: 'retainer',       label: 'Retainer',            emoji: '📎' },
  { id: 'xray',           label: 'X-Ray',               emoji: '🔬' },
  { id: 'checkup',        label: 'Check-up',            emoji: '🏥' },
  { id: 'denture',        label: 'Denture',             emoji: '🦴' },
];

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM',  '1:30 PM',
  '2:00 PM',  '2:30 PM',  '3:00 PM',  '3:30 PM',
  '4:00 PM',  '4:30 PM',
];

// ─── Types ────────────────────────────────────────────────────────────────────
export interface BookProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  phone:    string;
  branch:   string;
  date:     string;
  timeSlot: string;
}

interface FormErrors {
  fullName?:  string;
  phone?:     string;
  branch?:    string;
  services?:  string;
  date?:      string;
  timeSlot?:  string;
}

// ─── Book component ───────────────────────────────────────────────────────────
export const Book = ({ isOpen, onClose }: BookProps) => {
  const [confirmed,       setConfirmed]       = useState(false);
  const [isSubmitting,    setIsSubmitting]     = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [form, setForm] = useState<FormState>({
    fullName: '', phone: '', branch: '', date: '', timeSlot: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setConfirmed(false);
        setIsSubmitting(false);
        setSelectedServices([]);
        setForm({ fullName: '', phone: '', branch: '', date: '', timeSlot: '' });
        setErrors({});
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    if (errors.services) setErrors((prev) => ({ ...prev, services: undefined }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.fullName.trim())        e.fullName = 'Please enter your full name.';
    if (!form.phone.trim())           e.phone    = 'Please enter your phone number.';
    if (!form.branch)                 e.branch   = 'Please select a branch.';
    if (selectedServices.length === 0) e.services = 'Please select at least one service.';
    if (!form.date)                   e.date     = 'Please choose a date.';
    if (!form.timeSlot)               e.timeSlot = 'Please choose a time slot.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    // TODO: send { ...form, services: selectedServices } to your backend
    await new Promise((r) => setTimeout(r, 900));
    setIsSubmitting(false);
    setConfirmed(true);
  };

  const setField = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors])
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const today          = new Date().toISOString().split('T')[0];
  const selectedBranch = BRANCHES.find((b) => b.id === form.branch);
  const serviceLabels  = selectedServices.map(
    (id) => SERVICES.find((s) => s.id === id)?.label ?? id
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="book-backdrop"
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="book-modal"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.95, y: 16  }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          >
            <div
              className="pointer-events-auto w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Teal header */}
              <div className="bg-teal-500 px-6 py-5 flex items-center justify-between shrink-0">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Book Appointment
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Close booking modal"
                  className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1">
                <AnimatePresence mode="wait">
                  {confirmed ? (
                    <ConfirmationScreen
                      key="confirmed"
                      branch={selectedBranch?.name ?? ''}
                      services={serviceLabels}
                      date={form.date}
                      timeSlot={form.timeSlot}
                      onClose={onClose}
                    />
                  ) : (
                    <motion.div
                      key="form"
                      className="px-6 py-6 space-y-3 bg-slate-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{   opacity: 0 }}
                    >
                      {/* Full Name */}
                      <InputField
                        icon={<User size={18} className="text-slate-400 shrink-0" />}
                        type="text"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={setField('fullName')}
                        error={errors.fullName}
                      />

                      {/* Phone */}
                      <InputField
                        icon={<Phone size={18} className="text-slate-400 shrink-0" />}
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={setField('phone')}
                        error={errors.phone}
                      />

                      {/* Branch */}
                      <SelectField
                        icon={<MapPin size={18} className="text-slate-400 shrink-0" />}
                        placeholder="Select Branch"
                        value={form.branch}
                        onChange={setField('branch')}
                        error={errors.branch}
                      >
                        {BRANCHES.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name} — {b.address}
                          </option>
                        ))}
                      </SelectField>

                      {/* ── Services multi-select ── */}
                      <div>
                        <div className={`bg-white rounded-xl border px-4 pt-3 pb-3 transition-colors ${
                          errors.services ? 'border-red-300 bg-red-50/40' : 'border-slate-200'
                        }`}>
                          {/* Label row */}
                          <div className="flex items-center gap-2 mb-2.5">
                            <Stethoscope size={18} className="text-slate-400 shrink-0" />
                            <span className="text-sm text-slate-400">
                              Services
                              {selectedServices.length > 0 && (
                                <span className="ml-1.5 text-teal-600 font-medium">
                                  ({selectedServices.length} selected)
                                </span>
                              )}
                            </span>
                          </div>

                          {/* Chip grid */}
                          <div className="flex flex-wrap gap-2">
                            {SERVICES.map((svc) => {
                              const active = selectedServices.includes(svc.id);
                              return (
                                <button
                                  key={svc.id}
                                  type="button"
                                  onClick={() => toggleService(svc.id)}
                                  className={`
                                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                                    border transition-all duration-150 select-none
                                    ${active
                                      ? 'bg-teal-500 border-teal-500 text-white shadow-sm scale-[1.03]'
                                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50'
                                    }
                                  `}
                                >
                                  <span>{svc.emoji}</span>
                                  {svc.label}
                                  {active && (
                                    <span className="ml-0.5 text-white/80 text-[10px]">✓</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        {errors.services && (
                          <p className="text-xs text-red-500 mt-1 ml-1">{errors.services}</p>
                        )}
                      </div>

                      {/* Date + Time */}
                      <div className="flex gap-3">
                        <div className="flex-1 min-w-0">
                          <InputField
                            icon={<Calendar size={18} className="text-slate-400 shrink-0" />}
                            type="date"
                            placeholder="Date"
                            value={form.date}
                            onChange={setField('date')}
                            error={errors.date}
                            min={today}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <SelectField
                            icon={<Clock size={18} className="text-slate-400 shrink-0" />}
                            placeholder="Time Slot"
                            value={form.timeSlot}
                            onChange={setField('timeSlot')}
                            error={errors.timeSlot}
                          >
                            {TIME_SLOTS.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </SelectField>
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="
                          w-full bg-teal-500 hover:bg-teal-600 active:scale-[0.98]
                          text-white font-bold py-3.5 rounded-xl mt-1
                          transition-all duration-150 shadow-sm
                          disabled:opacity-60 disabled:cursor-not-allowed
                          flex items-center justify-center gap-2
                        "
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </button>

                      <p className="text-center text-xs text-slate-400 pt-1">
                        We'll call you to confirm your appointment.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── InputField ───────────────────────────────────────────────────────────────
interface InputFieldProps {
  icon:        React.ReactNode;
  type:        string;
  placeholder: string;
  value:       string;
  onChange:    (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?:      string;
  min?:        string;
}

const InputField = ({ icon, type, placeholder, value, onChange, error, min }: InputFieldProps) => (
  <div>
    <div className={`flex items-center gap-3 bg-white rounded-xl px-4 py-3 border transition-colors ${
      error ? 'border-red-300 bg-red-50/40' : 'border-slate-200 focus-within:border-teal-400'
    }`}>
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
  </div>
);

// ─── SelectField ──────────────────────────────────────────────────────────────
interface SelectFieldProps {
  icon:        React.ReactNode;
  placeholder: string;
  value:       string;
  onChange:    (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?:      string;
  children:    React.ReactNode;
}

const SelectField = ({ icon, placeholder, value, onChange, error, children }: SelectFieldProps) => (
  <div>
    <div className={`flex items-center gap-3 bg-white rounded-xl px-4 py-3 border transition-colors ${
      error ? 'border-red-300 bg-red-50/40' : 'border-slate-200 focus-within:border-teal-400'
    }`}>
      {icon}
      <select
        value={value}
        onChange={onChange}
        className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 outline-none appearance-none cursor-pointer"
      >
        <option value="" disabled>{placeholder}</option>
        {children}
      </select>
    </div>
    {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
  </div>
);

// ─── ConfirmationScreen ───────────────────────────────────────────────────────
interface ConfirmationProps {
  branch:   string;
  services: string[];
  date:     string;
  timeSlot: string;
  onClose:  () => void;
}

const ConfirmationScreen = ({ branch, services, date, timeSlot, onClose }: ConfirmationProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0  }}
    className="px-6 py-10 flex flex-col items-center text-center gap-3 bg-slate-50"
  >
    <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center">
      <CheckCircle size={36} className="text-teal-500" strokeWidth={1.5} />
    </div>
    <h3 className="text-lg font-bold text-slate-800">Request Received!</h3>

    {/* Summary card */}
    <div className="w-full bg-white rounded-xl border border-slate-200 px-4 py-3 text-left space-y-2 mt-1">
      <SummaryRow label="Branch"   value={branch} />
      <SummaryRow label="Services" value={services.join(', ')} />
      {date && (
        <SummaryRow
          label="Date"
          value={new Date(date + 'T00:00').toLocaleDateString('en-PH', {
            month: 'long', day: 'numeric', year: 'numeric',
          })}
        />
      )}
      {timeSlot && <SummaryRow label="Time" value={timeSlot} />}
    </div>

    <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
      We'll call you to confirm the details of your appointment.
    </p>

    <button
      onClick={onClose}
      className="mt-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-2.5 rounded-xl transition-colors text-sm"
    >
      Done
    </button>
  </motion.div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-2 text-sm">
    <span className="text-slate-400 w-16 shrink-0">{label}</span>
    <span className="text-slate-700 font-medium">{value}</span>
  </div>
);