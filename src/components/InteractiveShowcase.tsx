import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Calendar, 
  Clock, 
  DollarSign, 
  BookOpen, 
  ShieldCheck,
  ArrowRight,
  Plus
} from 'lucide-react';
import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';

const studentGrowthData = [
  { month: 'Feb', value: 23100 },
  { month: 'Mar', value: 23900 },
  { month: 'Apr', value: 24500 },
  { month: 'May', value: 24800 },
  { month: 'Jun', value: 25000 },
];

export const InteractiveShowcase: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      id="features" 
      className="py-32 relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#EEF2FF]/30 to-[#F8FAFC] border-y border-slate-100"
    >
      {/* Background Soft Blue Blur Orbs & Grid Pattern */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[48rem] h-[48rem] bg-blue-400/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl pointer-events-none -z-10" />
      
      {/* Subtle grid lines background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 -z-20" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-24 flex flex-col items-center gap-3">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
            PLATFORM EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-950 font-sans tracking-tight leading-tight mt-2">
            Experience the University of Edinburgh ERP
          </h2>
          <p className="text-slate-500 text-base sm:text-lg mt-2 leading-relaxed font-medium">
            A unified dashboard where students, faculty, and administrators manage academics, attendance, fee payments, examinations, and campus services from one intelligent interface.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Features and Copy (40%) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              One Dashboard.<br />Every Campus Operation.
            </h3>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Experience how the University of Edinburgh ERP brings academics, attendance, finance, examinations, and student services together into one beautifully designed workspace.
            </p>

            {/* Feature Bullets with Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-4 mt-2">
              {[
                'Academics',
                'Attendance Tracking',
                'Fee Management',
                'Student Services',
                'Library',
                'Hostel',
                'Faculty Workspace'
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-slate-700 font-semibold text-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Explore Dashboard CTA */}
            <div className="mt-6">
              <a 
                href="#showcase"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all shadow-md"
              >
                <span>Explore Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Premium Mockup (60%) */}
          <div 
            className="lg:col-span-7 flex justify-center lg:justify-end"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              animate={isHovered ? { scale: 1.02, rotateY: 1 } : { scale: 1, rotateY: 0 }}
              className="relative w-full max-w-[620px] aspect-[4/3] rounded-3xl p-6 bg-slate-100/50 backdrop-blur-xl border border-white/50 shadow-2xl transition-shadow duration-300"
              style={{
                boxShadow: isHovered 
                  ? '0 35px 70px -15px rgba(0, 0, 0, 0.12)' 
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.08)'
              }}
            >
              
              {/* Internal Dashboard Frame */}
              <div className="w-full h-full bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden flex flex-col">
                
                {/* Mac Address Bar */}
                <div className="h-10 border-b border-slate-100 bg-slate-50/50 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100/80 rounded-md text-[10px] font-semibold text-slate-500 w-44 justify-center">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>erp.ed.ac.uk/dashboard</span>
                  </div>
                  <div className="w-10" />
                </div>

                {/* Dashboard grid */}
                <div className="flex-1 grid grid-cols-12 overflow-hidden">
                  
                  {/* Left Mini Sidebar */}
                  <div className="col-span-1 border-r border-slate-100 bg-slate-50/10 py-4 flex flex-col items-center gap-3.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-[11px] shadow-md shadow-blue-500/10">
                      U
                    </div>
                    <div className="flex-1 flex flex-col gap-3 mt-4">
                      {['Ac', 'At', 'Fi', 'Ss'].map((item, idx) => (
                        <div 
                          key={idx} 
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold transition-all ${
                            idx === 0 
                              ? 'bg-blue-50 text-blue-600 border border-blue-100/60' 
                              : 'text-slate-400 hover:bg-slate-50'
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Content Pane */}
                  <div className="col-span-11 p-4 flex flex-col gap-3.5">
                    
                    {/* Header */}
                    <div>
                      <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block text-left leading-none">University of Edinburgh ERP</span>
                      <h4 className="text-sm font-extrabold text-slate-900 text-left mt-1 leading-none">Campus Operations Center</h4>
                    </div>

                    {/* KPI row */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center gap-2 text-left">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider leading-none">Attendance</p>
                          <p className="text-xs font-bold text-slate-800 mt-1 leading-none">96.4%</p>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center gap-2 text-left">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider leading-none">Enrollment</p>
                          <p className="text-xs font-bold text-slate-800 mt-1 leading-none">25.0K</p>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center gap-2 text-left">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                          <CreditCard className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider leading-none">Fee target</p>
                          <p className="text-xs font-bold text-slate-800 mt-1 leading-none">98.9%</p>
                        </div>
                      </div>
                    </div>

                    {/* Chart Widget */}
                    <div className="h-28 bg-slate-50/20 border border-slate-100 rounded-xl p-2.5 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-[8px] font-bold mb-1">
                        <span className="text-slate-400 uppercase tracking-wider">STUDENT GROWTH CURVE</span>
                        <span className="text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded leading-none">+8.4% YoY</span>
                      </div>
                      <div className="flex-1 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={studentGrowthData} margin={{ top: 2, right: 2, left: -32, bottom: 0 }}>
                            <defs>
                              <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="#94A3B8" fontSize={8} tickLine={false} axisLine={false} />
                            <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={1.5} fillOpacity={1} fill="url(#glowGrad)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* ----- FLOATING GLASS WIDGETS ----- */}
              
              {/* Widget 1: Academics Today (Top Right Overlay) */}
              <motion.div 
                animate={isHovered ? { x: 10, y: -8 } : { x: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute -top-6 -right-8 w-[210px] bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl p-4 flex flex-col gap-2.5 z-20 text-left pointer-events-auto cursor-default"
              >
                <div className="flex items-center gap-2 text-slate-800 font-extrabold text-[10px]">
                  <div className="p-1 rounded bg-blue-100 text-blue-600">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span>Academics Today</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="border-l-2 border-blue-500 pl-2">
                    <p className="text-[10px] font-extrabold text-slate-700 leading-tight">Advanced Informatics</p>
                    <p className="text-[8px] text-slate-400 font-semibold mt-0.5">Appleton Tower • 10:00 AM</p>
                  </div>
                  <div className="border-l-2 border-emerald-500 pl-2">
                    <p className="text-[10px] font-extrabold text-slate-700 leading-tight">Exam: CS Theory</p>
                    <p className="text-[8px] text-slate-400 font-semibold mt-0.5">McEwan Hall • 02:00 PM</p>
                  </div>
                </div>
              </motion.div>

              {/* Widget 2: Quick Actions (Bottom Left Overlay) */}
              <motion.div 
                animate={isHovered ? { x: -8, y: 6 } : { x: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-8 -left-10 w-[200px] bg-slate-950/95 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl p-3 flex flex-col gap-2 z-20 text-left pointer-events-auto cursor-default text-white"
              >
                <p className="text-[8px] font-extrabold text-slate-400 tracking-wider uppercase px-1 leading-none">Quick Actions</p>
                <div className="flex flex-col gap-1.5 mt-1">
                  <button className="flex items-center justify-between text-[10px] font-bold py-1 px-1.5 rounded-lg hover:bg-white/10 transition text-left cursor-pointer">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-400" /> Log Attendance</span>
                    <Plus className="w-2.5 h-2.5 text-slate-400" />
                  </button>
                  <button className="flex items-center justify-between text-[10px] font-bold py-1 px-1.5 rounded-lg hover:bg-white/10 transition text-left cursor-pointer">
                    <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Collect Tuition</span>
                    <Plus className="w-2.5 h-2.5 text-slate-400" />
                  </button>
                  <button className="flex items-center justify-between text-[10px] font-bold py-1 px-1.5 rounded-lg hover:bg-white/10 transition text-left cursor-pointer">
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-amber-400" /> Reserve Library</span>
                    <Plus className="w-2.5 h-2.5 text-slate-400" />
                  </button>
                </div>
              </motion.div>

              {/* Widget 3: Assignments Graded (Bottom Right Overlay) */}
              <motion.div 
                animate={isHovered ? { x: 6, y: 8 } : { x: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-6 -right-6 w-[210px] bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl px-3 py-2.5 flex items-center gap-3 z-20 text-left pointer-events-auto cursor-default"
              >
                {/* Circular Progress */}
                <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="16" cy="16" r="13" stroke="#F1F5F9" strokeWidth="2.5" fill="transparent" />
                    <circle cx="16" cy="16" r="13" stroke="#2563EB" strokeWidth="2.5" fill="transparent" strokeDasharray="81" strokeDashoffset="20" />
                  </svg>
                  <span className="absolute text-[8px] font-bold text-slate-800">75%</span>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-800">Assignments Graded</p>
                  <p className="text-[8px] text-slate-400 font-semibold">12 out of 16 reviewed</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
