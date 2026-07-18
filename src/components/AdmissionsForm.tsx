import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, ChevronRight, Phone, Mail, Building, User } from 'lucide-react';
import { demoFormSchema } from '../types';
import type { DemoFormData } from '../types';

export const AdmissionsForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
  });

  const onSubmit = (data: DemoFormData) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Form data submitted:', data);
      setLoading(false);
      setIsSubmitted(true);
      reset();
    }, 1500);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl p-8 border border-white/60 shadow-xl bg-white/85 backdrop-blur-md">
      
      {/* Decorative backdrop elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#1F5359]/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C9A24B]/5 rounded-full blur-2xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1F5359]/10 text-[#1F5359] border border-[#1F5359]/20">
                <Calendar className="w-3.5 h-3.5" /> Book Demo
              </span>
              <h3 className="text-2xl font-black text-[#12201F] mt-3">Schedule a Private Demo</h3>
              <p className="text-[#7C8E8D] text-sm mt-1.5 font-medium">
                See how Edinburgh's Digital Campus can transform your campus. Speak with our product team.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#12201F] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    {...register('name')}
                    className={`w-full pl-10 pr-4 py-3 bg-white/80 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/20 transition-all ${
                      errors.name ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-[#C9A24B] focus:ring-[#C9A24B]/20'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-[#12201F] uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <Building className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. School of Informatics"
                    {...register('department')}
                    className={`w-full pl-10 pr-4 py-3 bg-white/80 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/20 transition-all ${
                      errors.department ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-[#C9A24B] focus:ring-[#C9A24B]/20'
                    }`}
                  />
                </div>
                {errors.department && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.department.message}</p>
                )}
              </div>

              {/* Grid: Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#12201F] uppercase tracking-wider mb-1.5">
                    University Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      placeholder="username@ed.ac.uk"
                      {...register('email')}
                      className={`w-full pl-10 pr-4 py-3 bg-white/80 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/20 transition-all ${
                        errors.email ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-[#C9A24B] focus:ring-[#C9A24B]/20'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-[#12201F] uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      {...register('phone')}
                      className={`w-full pl-10 pr-4 py-3 bg-white/80 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/20 transition-all ${
                        errors.phone ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-[#C9A24B] focus:ring-[#C9A24B]/20'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#12201F] uppercase tracking-wider mb-1.5">
                  Message / Special Requirements (Optional)
                </label>
                <textarea
                  placeholder="Tell us about your campus size, current tools, and what you are looking to achieve..."
                  rows={3}
                  {...register('message')}
                  className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/20 focus:border-[#C9A24B] transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-[#12201F] font-bold bg-[#C9A24B] hover:bg-[#DEC17E] shadow-lg shadow-black/5 active:scale-[0.98] transition-all disabled:opacity-50 pointer-events-auto cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#12201F] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Confirm Live Demo Session</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center py-10"
          >
            <div className="w-16 h-16 rounded-full bg-[#DEC17E]/20 border border-[#DEC17E]/30 flex items-center justify-center text-[#C9A24B] mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#12201F]">Demo Scheduled!</h3>
            <p className="text-[#7C8E8D] text-sm max-w-sm mt-3 leading-relaxed font-medium">
              We've received your request. An enterprise implementation consultant will reach out to you at the email provided within 1 business hour to share calendar invites.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-8 px-6 py-2.5 bg-[#0F3235] text-white rounded-xl text-xs font-bold hover:bg-[#1F5359] transition active:scale-[0.98] cursor-pointer"
            >
              Submit Another Request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
