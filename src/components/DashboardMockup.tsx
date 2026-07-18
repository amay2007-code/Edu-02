import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  CreditCard,
  DollarSign,
  ShieldCheck,
  Plus,
  BookOpen,
  Clock,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

// Data for charts
const studentGrowthData = [
  { month: 'Jan', students: 22000 },
  { month: 'Feb', students: 23100 },
  { month: 'Mar', students: 23900 },
  { month: 'Apr', students: 24500 },
  { month: 'May', students: 24800 },
  { month: 'Jun', students: 25000 },
];



export const DashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'activity'>('analytics');

  return (
    <div className="relative w-full max-w-[620px] aspect-[4/3] rounded-3xl p-6 glass-panel shadow-2xl border border-white/40 overflow-visible group select-none">
      
      {/* Dynamic Animated Background Mesh Circles (behind the mockup) */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      {/* Main Dashboard Window Frame */}
      <div className="w-full h-full bg-white/90 rounded-2xl border border-slate-100 shadow-xl overflow-hidden flex flex-col">
        
        {/* Header/Mac-style Window controls */}
        <div className="h-11 border-b border-slate-100 bg-slate-50/50 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100/80 rounded-lg text-[11px] font-semibold text-slate-500 w-52 justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>portal.ed.ac.uk/dashboard</span>
          </div>

          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Mock App Content */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden">
          
          {/* Navigation Sidebar (mini) */}
          <div className="col-span-1 border-r border-slate-100 bg-slate-50/20 py-4 flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
              U
            </div>
            <div className="flex-1 flex flex-col gap-3 mt-4">
              {['Ac', 'At', 'Fi', 'Ss'].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold transition-all ${
                    idx === 0 
                      ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="w-6 h-6 rounded-full bg-slate-200" />
          </div>

          {/* Main Dashboard Area */}
          <div className="col-span-11 p-4 flex flex-col gap-4 overflow-y-auto">
            
            {/* Title / Tab Selector */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none">University of Edinburgh</span>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">Campus Operations Center</h3>
              </div>
              <div className="flex bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`px-2 py-1 rounded-md transition-all ${
                    activeTab === 'analytics' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Analytics
                </button>
                <button 
                  onClick={() => setActiveTab('activity')}
                  className={`px-2 py-1 rounded-md transition-all ${
                    activeTab === 'activity' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Activity
                </button>
              </div>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[9px] font-semibold text-slate-400 truncate">Attendance</p>
                  <p className="text-xs font-bold text-slate-800">96.4%</p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[9px] font-semibold text-slate-400 truncate">Enrollment</p>
                  <p className="text-xs font-bold text-slate-800">25.0K</p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <CreditCard className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[9px] font-semibold text-slate-400 truncate">Fee Status</p>
                  <p className="text-xs font-bold text-slate-800">98.9%</p>
                </div>
              </div>
            </div>

            {/* Content Widget (Active Tab) */}
            <div className="h-[130px] bg-slate-50/30 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
              {activeTab === 'analytics' ? (
                <>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student growth curve</span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
                      +8.4% YoY
                    </span>
                  </div>
                  <div className="flex-1 w-full text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={studentGrowthData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#94A3B8" fontSize={8} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(255, 255, 255, 0.95)', 
                            border: '1px solid #E2E8F0',
                            borderRadius: '8px',
                            fontSize: '9px'
                          }} 
                        />
                        <Area type="monotone" dataKey="students" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#growthGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 overflow-y-auto">
                  <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 tracking-wider">
                    <span>RECENT CAMPUS ACTIVITIES</span>
                    <Activity className="w-3 h-3 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 text-[10px]">
                    <span className="font-semibold text-slate-700">Informatics attendance logged</span>
                    <span className="text-slate-400">10 mins ago</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 text-[10px]">
                    <span className="font-semibold text-slate-700">Exam schedules published (Arts)</span>
                    <span className="text-slate-400">1 hour ago</span>
                  </div>
                  <div className="flex items-center justify-between py-1 text-[10px]">
                    <span className="font-semibold text-slate-700">Term 2 tuition invoices distributed</span>
                    <span className="text-slate-400">3 hours ago</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* FLOATING CARD 1: Academics / Today's Classes & Exam Schedule */}
      <motion.div 
        initial={{ x: 50, y: -20, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
        className="absolute top-16 -right-16 w-52 bg-white/95 rounded-2xl border border-slate-100 shadow-xl p-4 animate-float pointer-events-auto"
      >
        <div className="flex items-center gap-2 text-slate-800 font-bold text-[11px] mb-3">
          <div className="p-1 rounded bg-blue-100 text-blue-600">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <span>Academics Today</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="border-l-2 border-indigo-500 pl-2">
            <p className="text-[10px] font-extrabold text-slate-700 leading-tight">Advanced Informatics</p>
            <p className="text-[8px] text-slate-400 font-semibold mt-0.5">Appleton Tower • 10:00 AM</p>
          </div>
          <div className="border-l-2 border-emerald-500 pl-2">
            <p className="text-[10px] font-extrabold text-slate-700 leading-tight">Exam: CS Theory</p>
            <p className="text-[8px] text-slate-400 font-semibold mt-0.5">McEwan Hall • 02:00 PM</p>
          </div>
        </div>
      </motion.div>

      {/* FLOATING CARD 2: Quick Actions / Tasks */}
      <motion.div 
        initial={{ x: -60, y: 60, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
        className="absolute -bottom-10 -left-12 bg-slate-900 text-white rounded-2xl shadow-xl p-3 flex flex-col gap-2 w-48 border border-slate-800 animate-float-slow pointer-events-auto"
      >
        <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase px-1">Quick Actions</p>
        <div className="flex flex-col gap-1">
          <button className="flex items-center justify-between text-[10px] font-bold py-1 px-1.5 rounded-lg hover:bg-white/10 transition text-left">
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-sky-400" /> Log Attendance</span>
            <Plus className="w-2.5 h-2.5 text-slate-400" />
          </button>
          <button className="flex items-center justify-between text-[10px] font-bold py-1 px-1.5 rounded-lg hover:bg-white/10 transition text-left">
            <span className="flex items-center gap-1.5"><DollarSign className="w-3 h-3 text-emerald-400" /> Collect Tuition</span>
            <Plus className="w-2.5 h-2.5 text-slate-400" />
          </button>
          <button className="flex items-center justify-between text-[10px] font-bold py-1 px-1.5 rounded-lg hover:bg-white/10 transition text-left">
            <span className="flex items-center gap-1.5"><BookOpen className="w-3 h-3 text-amber-400" /> Reserve Library</span>
            <Plus className="w-2.5 h-2.5 text-slate-400" />
          </button>
        </div>
      </motion.div>

      {/* FLOATING CARD 3: Notifications / Progress Rings */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute -bottom-8 right-6 bg-white/95 rounded-xl border border-slate-100 shadow-lg px-3.5 py-2.5 flex items-center gap-3 animate-float-reverse pointer-events-auto"
      >
        {/* Progress Ring mockup */}
        <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="18" cy="18" r="14" stroke="#F1F5F9" strokeWidth="3" fill="transparent" />
            <circle cx="18" cy="18" r="14" stroke="#2563EB" strokeWidth="3" fill="transparent" strokeDasharray="88" strokeDashoffset="26" />
          </svg>
          <span className="absolute text-[8px] font-bold text-slate-800">75%</span>
        </div>
        <div>
          <p className="text-[10px] font-extrabold text-slate-800">Assignments Graded</p>
          <p className="text-[8px] text-slate-400 font-semibold">12 out of 16 reviewed</p>
        </div>
      </motion.div>
    </div>
  );
};
