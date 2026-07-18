import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  CalendarRange, 
  Banknote, 
  Users2, 
  FileSpreadsheet, 
  MessageSquare, 
  BarChart3, 
  BookOpen, 
  Bus, 
  Home, 
  Boxes, 
  Cpu, 
  Layers, 
  Lock, 
  RefreshCw, 
  Zap, 
  ArrowRight, 
  Check, 
  Star, 
  Cloud, 
  ChevronDown, 
  Briefcase, 
  ShieldCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as ChartTooltip, 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer
} from 'recharts';

import { HeroCarousel } from './HeroCarousel/HeroCarousel';
import { AdmissionsForm } from './AdmissionsForm';
import { InteractiveShowcase } from './InteractiveShowcase';
import { Navbar } from './Navbar';
import type { FeatureItem, TestimonialItem, FaqItem, BlogPost } from '../types';

// DATA DEFINITIONS

const featuresData: FeatureItem[] = [
  { id: 'unified', title: 'Unified Experience', description: 'Academics, financials, and logs integrated into one secure portal. Zero tab clutter.', icon: 'Layers' },
  { id: 'roles', title: 'Role Based Dashboards', description: 'Tailored interfaces with customized permissions models for students, teachers, and admins.', icon: 'Users2' },
  { id: 'automation', title: 'Task Automation', description: 'Automated late billing triggers, attendance notifications, and report card compilations.', icon: 'RefreshCw' },
  { id: 'analytics', title: 'Predictive Insights', description: 'Understand student drop-out risks, collection patterns, and grade distributions with statistical tools.', icon: 'BarChart3' },
];

const testimonialsData: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Dr. Elizabeth Fraser',
    role: 'Vice-Principal (Academic)',
    organization: 'University of Edinburgh',
    review: 'The smart redesign of Edinburgh\'s digital platform transformed our registry workflows. Course registration times fell by 82% and student dashboards have become the central hub for learning records.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop'
  },
  {
    id: 'test-2',
    name: 'Prof. Alistair Woodward',
    role: 'Director of Informatics',
    organization: 'University of Edinburgh',
    review: 'Our faculty members no longer wrestle with fragmented attendance files. The system integrates Shibboleth and geo-fenced lab registers natively, giving us 100% telemetry logs.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop'
  },
  {
    id: 'test-3',
    name: 'Fiona Macpherson',
    role: 'Student Representative Council',
    organization: 'University of Edinburgh',
    review: 'Edinburgh\'s digital campus gives us a single login interface for course selection, fees, and exam results. It feels extremely premium and runs beautifully on our smartphones.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'
  }
];

const faqData: FaqItem[] = [
  { id: 'faq-1', question: 'How secure is the Edinburgh digital campus platform?', answer: 'Edinburgh\'s digital platform uses industry-leading security profiles. It is fully GDPR compliant, supports Shibboleth Single Sign-On (SSO), and encrypts database clusters with AES-256 both in transit and at rest.' },
  { id: 'faq-2', question: 'Does the system integrate with existing learning tools like Moodle?', answer: 'Yes. The system features deep REST API hooks that synchronize user enrollment, assignments, grade marks, and schedule calendars with Moodle, MS Teams, and Zoom classrooms.' },
  { id: 'faq-3', question: 'What is the implementation timeline for a college within the university?', answer: 'An enterprise deployment typically requires 4–6 weeks. This includes database migration audits, SSO configurations, user provisioning, and staff validation sessions.' },
  { id: 'faq-4', question: 'Can students check their class schedules and pay fees on their mobile devices?', answer: 'Yes. The entire platform features a mobile-responsive interface. Students can access class schedules, biometric attendance status, assignments, grades, and fee payments from any mobile browser.' },
];

const blogData: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How AI Improves Student Experience and Academic Success Metrics',
    category: 'Productivity & AI',
    readTime: '6 min read',
    date: 'July 15, 2026',
    excerpt: 'Analyzing how machine learning pipelines help faculty identify students at academic risk and customize tutoring systems.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop'
  },
  {
    id: 'blog-2',
    title: 'Digital Campus Transformation: Unifying Legacy Platforms at Scale',
    category: 'Infrastructure',
    readTime: '8 min read',
    date: 'June 30, 2026',
    excerpt: 'A blueprint detailing how universities can replace fragmented legacy databases with one unified Academic Operating System.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop'
  },
  {
    id: 'blog-3',
    title: 'Reducing Administrative Work Through Trigger-Based Automations',
    category: 'Automation',
    readTime: '5 min read',
    date: 'May 20, 2026',
    excerpt: 'Explore best practices for automated fee reminder triggers, automated attendance registers, and digital grading pipelines.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop'
  }
];

const integrationsList = [
  { name: 'Google Workspace', icon: 'G', category: 'Productivity' },
  { name: 'Microsoft 365', icon: 'M', category: 'Collaboration' },
  { name: 'Zoom Education', icon: 'Z', category: 'Online Lectures' },
  { name: 'Slack Campus', icon: 'S', category: 'Communication' },
  { name: 'Stripe Payments', icon: 'St', category: 'Billing Gateways' },
  { name: 'Razorpay Billing', icon: 'R', category: 'Regional Tuition' },
  { name: 'Firebase Sync', icon: 'Fb', category: 'Database Real-time' },
  { name: 'AWS Cloud', icon: 'A', category: 'Secure Infrastructure' }
];

const academicPerformanceData = [
  { dept: 'Informatics', math: 88, science: 86, reading: 91 },
  { dept: 'CS Theory', math: 85, science: 89, reading: 84 },
  { dept: 'Engineering', math: 89, science: 91, reading: 88 },
  { dept: 'Business', math: 92, science: 88, reading: 89 },
];

const departmentDistributionData = [
  { name: 'Science & Eng', value: 11200, color: '#0F3235' },
  { name: 'Medicine & Vet', value: 6800, color: '#1F5359' },
  { name: 'Arts, Hum & Social', value: 7000, color: '#C9A24B' },
];

// STUDENT JOURNEY DATA
const journeySteps = [
  { step: '01', title: 'Apply', subtitle: 'Digital admission forms' },
  { step: '02', title: 'Admission', subtitle: 'Automated credit matches' },
  { step: '03', title: 'Enrollment', subtitle: 'SSO account allocation' },
  { step: '04', title: 'Attend Classes', subtitle: 'Biometric telemetry logs' },
  { step: '05', title: 'Pay Fees', subtitle: 'One-click billing gateway' },
  { step: '06', title: 'Take Exams', subtitle: 'Instant grading registers' },
  { step: '07', title: 'Graduate', subtitle: 'Secure digital transcripts' },
];

export const LandingPage: React.FC = () => {
  // Navigation & Scroll states
  // Interactive UI states
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  // Dynamic Lucide rendering helper
  const renderIcon = (name: string, className: string = "w-6 h-6") => {
    const iconsMap: Record<string, React.ComponentType<any>> = {
      GraduationCap, CalendarRange, Banknote, Users2, FileSpreadsheet,
      MessageSquare, BarChart3, BookOpen, Bus, Home, Boxes, Cpu, Zap, Lock, RefreshCw, Cloud, Layers, Briefcase
    };
    const Component = iconsMap[name] || GraduationCap;
    return <Component className={className} />;
  };

  return (
    <div className="relative min-h-screen bg-[#F4F1E8] text-[#12201F] selection:bg-[#C9A24B] selection:text-[#12201F]">
      
      {/* ----------------- BACKGROUND SHIMMER & GRADIENT WRAPPERS ----------------- */}
      <div className="absolute top-0 inset-x-0 h-[900px] bg-gradient-to-b from-[#DEC17E]/10 via-[#F4F1E8] to-transparent pointer-events-none -z-10" />
      
      {/* Floating Animated Mesh Orbs */}
      <div className="absolute top-24 left-[10%] w-[32rem] h-[32rem] bg-gradient-to-r from-[#1F5359]/5 to-[#3A7A80]/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none -z-10" />
      <div className="absolute top-[600px] right-[5%] w-[40rem] h-[40rem] bg-gradient-to-r from-[#C9A24B]/5 to-[#DEC17E]/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none -z-10" />
      <div className="absolute bottom-[1000px] left-[15%] w-[36rem] h-[36rem] bg-gradient-to-r from-[#1F5359]/5 to-[#C9A24B]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      
      {/* ----------------- STICKY GLASS NAVBAR ----------------- */}
      <Navbar />

      {/* ----------------- HERO SECTION CAROUSEL ----------------- */}
      <HeroCarousel />

      {/* ----------------- INTERACTIVE WORKSPACE SHOWCASE ----------------- */}
      <InteractiveShowcase />

      {/* ----------------- WHY CHOOSE OUR PLATFORM (TWO COLUMN) ----------------- */}
      <section className="py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Smart Interactive Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#1F5359]/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
            <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#C9A24B]/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

            <div className="w-full max-w-[420px] rounded-3xl p-6 bg-[#0F3235] border border-[#1F5359]/30 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#DEC17E]/5 rounded-full blur-2xl animate-pulse" />
              
              <div className="flex items-center justify-between border-b border-[#1F5359]/30 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C9A24B] animate-ping" />
                  <span className="text-[10px] font-bold tracking-widest text-[#7C8E8D] uppercase">Academic Cluster</span>
                </div>
                <span className="text-[10px] font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded">Security Tier I</span>
              </div>

              {/* Stacked interactive rows */}
              <div className="flex flex-col gap-3">
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C9A24B]/15 text-[#C9A24B] flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-white">MFA single sign-on</p>
                      <p className="text-[9px] text-[#7C8E8D]">Shibboleth & Azure AD</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#C9A24B]">Active</span>
                </div>

                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <Cloud className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-white">AWS Live Sync</p>
                      <p className="text-[9px] text-[#7C8E8D]">Edinburgh Data Node</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400">Synced</span>
                </div>

                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#3A7A80]/15 text-[#3A7A80] flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-white">End-to-End Encryption</p>
                      <p className="text-[9px] text-[#7C8E8D]">TLS 1.3 compliance</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#3A7A80]">Locked</span>
                </div>
              </div>

              {/* System Latency graph */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-[10px] text-[#7C8E8D] font-bold mb-2">
                  <span>LATENCY SPEED LOG</span>
                  <span>9.2ms (OK)</span>
                </div>
                <div className="h-10 flex items-end gap-1.5">
                  {[12, 14, 18, 10, 14, 22, 28, 16, 12, 10, 8, 14, 12, 10, 6, 8].map((val, idx) => (
                    <div 
                      key={idx} 
                      className="flex-1 bg-gradient-to-t from-[#1F5359] to-[#3A7A80] rounded-t-[2px]" 
                      style={{ height: `${val * 3}%` }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Features List */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="mb-4">
              <span className="text-xs font-bold text-[#1F5359] uppercase tracking-widest bg-[#1F5359]/10 px-3 py-1 rounded-full border border-[#1F5359]/20">Why Choose Edinburgh's Platform</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12201F] mt-3 font-sans tracking-tight">
                Designed to Power High-Growth Organizations
              </h2>
              <p className="text-[#7C8E8D] text-base mt-2 font-medium">
                Combining a modern interface with the data security of global banking standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuresData.map((feat) => (
                <div key={feat.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1F5359]/10 border border-[#1F5359]/20 flex items-center justify-center text-[#1F5359] shrink-0 shadow-sm">
                    {renderIcon(feat.icon, "w-4.5 h-4.5")}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#12201F] mb-1">{feat.title}</h4>
                    <p className="text-sm text-[#7C8E8D] leading-relaxed font-medium">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- STUDENT JOURNEY SECTION ----------------- */}
      <section className="py-24 relative overflow-hidden bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-[#1F5359] uppercase tracking-widest bg-[#1F5359]/10 px-3 py-1 rounded-full border border-[#1F5359]/20">Journey map</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12201F] font-sans tracking-tight">
              The Digital Student Journey
            </h2>
            <p className="text-[#7C8E8D] text-base mt-2 font-medium">
              Follow the streamlined flow of academic actions managed securely by Edinburgh's digital platform.
            </p>
          </div>

          {/* Journey Steps Track */}
          <div className="relative mt-8">
            {/* Horizontal line for desktop */}
            <div className="absolute top-10 left-12 right-12 h-0.5 bg-gradient-to-r from-[#1F5359] via-[#C9A24B] to-[#3A7A80] -z-10 hidden xl:block opacity-20" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-7 gap-6">
              {journeySteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center xl:items-start text-center xl:text-left group relative">
                  <div className="w-20 h-20 rounded-full bg-[#F4F1E8] border-2 border-slate-200 flex items-center justify-center text-[#12201F] text-lg font-extrabold mb-5 shadow-sm group-hover:border-[#C9A24B] group-hover:shadow-md transition-all relative">
                    <span className="bg-gradient-to-tr from-[#1F5359] to-[#C9A24B] bg-clip-text text-transparent">{step.step}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#12201F] mb-1 group-hover:text-[#1F5359] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#7C8E8D] font-semibold leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- ANALYTICS DETAILED CHARTS SECTION ----------------- */}
      <section id="analytics" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-[#1F5359] uppercase tracking-widest bg-[#1F5359]/10 px-3 py-1 rounded-full border border-[#1F5359]/20">Campus Insights</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12201F] font-sans tracking-tight">
              Real-Time Campus Analytics
            </h2>
            <p className="text-[#7C8E8D] text-base mt-2 font-medium">
              Detailed statistics illustrating enrollment ranges, financial collected balances, and average performance standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Chart 1: Performance */}
            <div className="p-6 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl text-left shadow-sm">
              <h4 className="text-base font-bold text-[#12201F] mb-1 font-sans">Academic Performance Level by School</h4>
              <p className="text-xs text-[#7C8E8D] font-semibold mb-6">Subject averages matching final evaluation indices</p>
              
              <div className="h-64 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={academicPerformanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <XAxis dataKey="dept" stroke="#7C8E8D" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis stroke="#7C8E8D" fontSize={9} tickLine={false} axisLine={false} domain={[50, 100]} />
                    <ChartTooltip />
                    <Bar dataKey="math" fill="#1F5359" name="Mathematics" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="science" fill="#3A7A80" name="Informatics" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="reading" fill="#C9A24B" name="Literature" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Enrollment Pie */}
            <div className="p-6 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl text-left shadow-sm">
              <h4 className="text-base font-bold text-[#12201F] mb-1 font-sans">Student Enrollment Distribution</h4>
              <p className="text-xs text-[#7C8E8D] font-semibold mb-6">Allocation registers across college disciplines</p>
              
              <div className="h-64 flex flex-col sm:flex-row items-center justify-around gap-6 text-xs">
                <div className="w-44 h-44 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {departmentDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex flex-col gap-3 flex-1 w-full">
                  {departmentDistributionData.map((dept, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-200/50 pb-2 text-[13px] font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                        <span className="text-[#7C8E8D]">{dept.name}</span>
                      </div>
                      <span className="text-[#12201F]">{dept.value.toLocaleString()} students</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ----------------- TESTIMONIALS SECTION ----------------- */}
      <section className="py-24 relative overflow-hidden bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-[#1F5359] uppercase tracking-widest bg-[#1F5359]/10 px-3 py-1 rounded-full border border-[#1F5359]/20">Endorsements</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12201F] font-sans tracking-tight">
              Trusted by the University of Edinburgh Leaders
            </h2>
            <p className="text-[#7C8E8D] text-base mt-2 font-medium">
              Discover how campus automation redesign transforms outcomes for students, teachers, and administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonialsData.map((test) => (
              <div 
                key={test.id}
                className="rounded-2xl p-6 bg-[#F4F1E8]/40 border border-slate-200/60 flex flex-col justify-between hover:shadow-xl hover:border-[#DEC17E]/50 transition-all duration-300 group"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-500 mb-5">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-[#12201F] text-sm leading-relaxed italic mb-6">
                    "{test.review}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-slate-200/60 pt-4 mt-2">
                  <img 
                    src={test.avatar} 
                    alt={test.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow group-hover:scale-105 transition-transform" 
                  />
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-[#12201F]">{test.name}</h4>
                    <p className="text-[11px] font-semibold text-[#7C8E8D] uppercase tracking-wider mt-0.5 font-sans">
                      {test.role} • <span className="text-[#1F5359]">{test.organization}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- INTEGRATIONS GRID SECTION ----------------- */}
      <section id="integrations" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side info */}
            <div className="lg:col-span-5 flex flex-col gap-5 text-left">
              <span className="text-xs font-bold text-[#1F5359] uppercase tracking-widest bg-[#1F5359]/10 px-3 py-1 rounded-full border border-[#1F5359]/20">Global Connect</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12201F] font-sans tracking-tight">
                Integrate with Your Current Tech Stack
              </h2>
              <p className="text-[#7C8E8D] text-base leading-relaxed font-medium">
                Connect your campus database with local productivity portals, email tools, online classes, and international billing methods automatically.
              </p>
              
              <div className="mt-2 flex flex-col gap-2.5">
                {[
                  'Developer REST APIs & Webhooks',
                  'OAuth 2.0 Single Sign-on integration',
                  'Bidirectional database sync protocols'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#12201F]">
                    <div className="w-5 h-5 rounded-full bg-[#1F5359]/10 border border-[#1F5359]/20 flex items-center justify-center text-[#1F5359] shadow-sm">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side logos grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {integrationsList.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 bg-white border border-slate-200/60 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
                  >
                    {/* Simulated Logo circle */}
                    <div className="w-12 h-12 rounded-xl bg-[#F4F1E8] border border-slate-200/60 text-slate-700 flex items-center justify-center font-extrabold mb-3 group-hover:bg-[#1F5359]/10 group-hover:text-[#1F5359] transition-colors shadow-sm">
                      {item.icon}
                    </div>
                    <p className="text-xs font-extrabold text-[#12201F]">{item.name}</p>
                    <p className="text-[9px] font-semibold text-[#7C8E8D] uppercase tracking-widest mt-0.5">{item.category}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- FAQ COLLAPSIBLE ACCORDION SECTION ----------------- */}
      <section id="support" className="py-24 bg-white border-y border-slate-200/60 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-[#1F5359] uppercase tracking-widest bg-[#1F5359]/10 px-3 py-1 rounded-full border border-[#1F5359]/20">Support Portal</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12201F] font-sans tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[#7C8E8D] text-base mt-2 font-medium">
              Answers to common inquiries regarding the smart digital campus experience redesign.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqData.map((faq) => (
              <div 
                key={faq.id}
                className="rounded-2xl border border-slate-200 bg-[#F4F1E8]/30 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-[#12201F] hover:text-[#1F5359] transition"
                >
                  <span className="text-[15px] sm:text-base leading-snug">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      activeFaq === faq.id ? 'rotate-180 text-[#1F5359]' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {activeFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-[#7C8E8D] leading-relaxed border-t border-slate-100 text-left font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- CAMPUS INSIGHTS (BLOG) SECTION ----------------- */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-[#1F5359] uppercase tracking-widest bg-[#1F5359]/10 px-3 py-1 rounded-full border border-[#1F5359]/20">Campus Insights</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12201F] font-sans tracking-tight">
              Resources & Transformation Guides
            </h2>
            <p className="text-[#7C8E8D] text-base mt-2 font-medium">
              Stay updated with campus transformation blueprints and productivity tips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogData.map((post) => (
              <article 
                key={post.id}
                className="group rounded-2xl overflow-hidden bg-white border border-slate-200/50 flex flex-col hover:shadow-xl hover:border-[#DEC17E]/50 hover:bg-white transition-all duration-300 text-left"
              >
                {/* Article Cover */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur text-[#12201F] shadow-sm border border-white/50">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-base font-bold text-[#12201F] group-hover:text-[#1F5359] transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-[#7C8E8D] leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#7C8E8D] group-hover:text-[#1F5359] transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- CONTACT SECTION ----------------- */}
      <section id="contact" className="py-24 bg-white border-t border-slate-200/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side copy */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <span className="text-xs font-bold text-[#1F5359] uppercase tracking-widest bg-[#1F5359]/10 px-3 py-1 rounded-full border border-[#1F5359]/20">Connect with Us</span>
              <h2 className="text-4xl font-extrabold text-[#12201F] font-sans tracking-tight leading-tight">
                Experience the Future of the University of Edinburgh Digital Campus
              </h2>
              <p className="text-[#7C8E8D] text-base leading-relaxed font-medium">
                Connect with our implementation leads. We provide tailored pricing documents, dedicated campus sandboxes, and data security worksheets.
              </p>
              
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#1F5359]/10 border border-[#1F5359]/20 flex items-center justify-center text-[#1F5359] shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#12201F]">Custom Campus Sandbox</h4>
                    <p className="text-xs text-[#7C8E8D] mt-0.5 font-medium">Explore our features with loaded mock records customized to your curriculum models.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#3A7A80]/10 border border-[#3A7A80]/20 flex items-center justify-center text-[#3A7A80] shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#12201F]">SOC2 & GDPR Compliance Logs</h4>
                    <p className="text-xs text-[#7C8E8D] mt-0.5 font-medium">Get immediate copies of compliance logs, penetration report sheets, and SLA certificates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="lg:col-span-6">
              <AdmissionsForm />
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- FOOTER SECTION ----------------- */}
      <motion.footer 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#0F3235] text-white pt-24 pb-10 border-t border-[#C9A24B]/35 relative overflow-hidden z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F5359]/10 to-transparent pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#1F5359]/20 text-left">
            
            {/* Column 1: Brand details (col-span-4) */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9A24B] text-[#0F3235] flex items-center justify-center font-bold shadow-md shadow-black/10">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-white leading-none">University of Edinburgh</h3>
                  <span className="text-[10px] font-bold text-[#DEC17E] uppercase tracking-widest leading-none mt-1.5 block">Smart Digital Campus Experience</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium mt-2 max-w-sm italic">
                "Reimagining the future of campus management through intuitive, accessible, and intelligent digital experiences."
              </p>
            </div>

            {/* Column 2: Quick Links (col-span-2) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#DEC17E] mb-5 font-sans">Quick Links</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-300 font-bold">
                {['Home', 'Features', 'Academics', 'Admissions', 'Finance', 'Student Services', 'Support'].map((link) => (
                  <li key={link}>
                    <a 
                      href={link === 'Home' ? '#' : `#${link.toLowerCase().replace(' ', '-')}`}
                      className="hover:text-[#C9A24B] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C9A24B] rounded px-1 -mx-1"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Project Info (col-span-2) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#DEC17E] mb-5 font-sans">Project Information</h4>
              <div className="flex flex-col gap-3.5 text-xs text-slate-300 font-semibold">
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider leading-none">Institution</p>
                  <p className="text-white font-bold mt-1.5 leading-none">University of Edinburgh</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider leading-none">Prototype</p>
                  <p className="text-white font-bold mt-1.5 leading-none">Smart Digital Campus Experience</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider leading-none">Type</p>
                  <p className="text-white font-bold mt-1.5 leading-none">Hackathon Prototype</p>
                </div>
              </div>
            </div>

            {/* Column 4: Cards (col-span-4) */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              
              {/* Card 1: Hackathon Submission */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A24B]/40 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md group">
                <div className="flex items-center justify-between mb-3.5">
                  <h5 className="text-xs font-black uppercase tracking-wider text-[#DEC17E]">Hackathon Submission</h5>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#C9A24B]/10 border border-[#C9A24B] text-[9px] font-extrabold text-[#C9A24B] tracking-wider uppercase animate-pulse shadow-[0_0_8px_rgba(201,162,75,0.2)]">
                    EDU-02
                  </span>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-slate-400 font-bold tracking-wider leading-none">Problem Statement</p>
                  <p className="text-[11px] text-slate-200 mt-2 leading-relaxed font-semibold">
                    Reimagine the user experience of existing college ERP systems by creating a unified and intuitive interface for academics, attendance, fee management, and student services.
                  </p>
                </div>
              </div>

              {/* Card 2: Team */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A24B]/40 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
                <h5 className="text-xs font-black uppercase tracking-wider text-[#DEC17E] mb-1">Team</h5>
                <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-3">Designed & Developed By</p>
                <div className="flex flex-wrap gap-2">
                  {['Amay', 'Madhur', 'Mohin'].map((name) => (
                    <span 
                      key={name}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C9A24B]/40 hover:bg-[#C9A24B]/10 hover:text-white transition-all text-xs font-bold text-slate-300 shadow-sm cursor-default"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom copyright bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 font-semibold gap-4 font-sans text-center md:text-left">
            <p>© 2026 Smart Digital Campus Experience. Created for Hackathon Problem Statement <span className="text-[#C9A24B]">EDU-02</span>.</p>
            <div className="flex items-center gap-1.5">
              <span>Built with ❤️ by Team</span>
              <span className="text-white font-bold">Amay • Madhur • Mohin</span>
            </div>
          </div>
        </div>
      </motion.footer>

    </div>
  );
};
