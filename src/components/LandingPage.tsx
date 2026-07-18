import React, { useState, useEffect } from 'react';
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
  Menu, 
  X, 
  ChevronDown, 
  Briefcase, 
  ShieldCheck, 
  Activity, 
  FileText
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import { HeroCarousel } from './HeroCarousel/HeroCarousel';
import { AdmissionsForm } from './AdmissionsForm';
import { InteractiveShowcase } from './InteractiveShowcase';
import type { FeatureItem, TestimonialItem, FaqItem, BlogPost } from '../types';

// DATA DEFINITIONS



const featuresData: FeatureItem[] = [
  { id: 'unified', title: 'Unified Experience', description: 'Academics, financials, and logs integrated into one secure portal. Zero tab clutter.', icon: 'Layers' },
  { id: 'roles', title: 'Role Based Dashboards', description: 'Tailored interfaces with customized permissions models for students, teachers, and admins.', icon: 'Users2' },
  { id: 'automation', title: 'Task Automation', description: 'Automated late billing triggers, attendance notifications, and report card compilations.', icon: 'RefreshCw' },
  { id: 'cloud', title: 'Cloud Sync Telemetry', description: 'Instance updates distributed instantly across regional nodes in less than 50 milliseconds.', icon: 'Cloud' },
  { id: 'security', title: 'Secure Authentication', description: 'Single Sign-on (SSO) gateway compliance with MFA, SAML, OIDC, and SOC2 directives.', icon: 'Lock' },
  { id: 'student-first', title: 'Student First Design', description: 'Simple, responsive portals that allow students to clear fees and check rosters on any device.', icon: 'Award' },
  { id: 'alerts', title: 'Real-Time Notifications', description: 'Keep students and parents informed via auto-triggered email, WhatsApp, and SMS alerts.', icon: 'Zap' },
  { id: 'analytics', title: 'Smart Analytics', description: 'Extract real-time department insights, student outcomes, and budget forecasts in one click.', icon: 'Cpu' },
];

const testimonialsData: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Prof. Sir Peter Mathieson',
    role: 'Principal & Vice-Chancellor',
    organization: 'University of Edinburgh',
    review: 'This ERP experience redesign has unified our disparate campus systems. Admin overhead decreased by 40% in our first semester. Our faculty can now focus fully on teaching and research.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'test-2',
    name: 'Dr. Elspeth Davies',
    role: 'Dean of Science & Engineering',
    organization: 'School of Informatics',
    review: 'Managing course registration rosters for thousands of students was historically complex. With role-based dashboards, grades distributions, and live attendance metrics, administration takes minutes, not days.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'test-3',
    name: 'Callum Murray',
    role: 'Student Representative',
    organization: 'Edinburgh University Students\' Association',
    review: 'SSO access allows me to register for classes, review my coursework schedule, request hostel repairs, and pay my tuition fees with a single click. It is simple, modern, and beautiful.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face'
  }
];

const faqData: FaqItem[] = [
  { id: 'faq-1', question: 'How long does the campus-wide migration process take?', answer: 'Our dedicated migration team can transition a standard campus of 25,000 students in 4 to 6 weeks. We build custom ETL scripts to map your historical student, staff, grades, and accounting records with zero data loss.' },
  { id: 'faq-2', question: 'Does it integrate with our existing single sign-on (SSO) systems?', answer: 'Yes. The University of Edinburgh ERP supports native integration with Microsoft Azure AD, Shibboleth, Okta, and Google Workspace using SAML 2.0 and OpenID Connect (OIDC).' },
  { id: 'faq-3', question: 'What security standards do you maintain for academic data protection?', answer: 'We maintain bank-grade security protocols. Our infrastructure is fully SOC2 Type II audited, GDPR compliant, and FERPA aligned. All database cells are encrypted using AES-256 at rest and TLS 1.3 in transit.' },
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

// CHART DATA FOR DEEP DIVE SECTION
const feeCollectionData = [
  { term: 'Term 1', target: 540000, collected: 538000 },
  { term: 'Term 2', target: 680000, collected: 655000 },
  { term: 'Term 3', target: 820000, collected: 812000 },
  { term: 'Term 4', target: 950000, collected: 939000 },
];

const academicPerformanceData = [
  { dept: 'Informatics', math: 88, science: 86, reading: 91 },
  { dept: 'CS Theory', math: 85, science: 89, reading: 84 },
  { dept: 'Engineering', math: 89, science: 91, reading: 88 },
  { dept: 'Business', math: 92, science: 88, reading: 89 },
];

const departmentDistributionData = [
  { name: 'Science & Eng', value: 11200, color: '#2563EB' },
  { name: 'Medicine & Vet', value: 6800, color: '#4F46E5' },
  { name: 'Arts, Hum & Social', value: 7000, color: '#0EA5E9' },
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive UI states
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeTabShowcase, setActiveTabShowcase] = useState<'student' | 'faculty' | 'admin'>('student');
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-blue-500 selection:text-white">
      
      {/* ----------------- BACKGROUND SHIMMER & GRADIENT WRAPPERS ----------------- */}
      <div className="absolute top-0 inset-x-0 h-[900px] bg-gradient-to-b from-[#EEF2FF] via-[#F8FAFC] to-transparent pointer-events-none -z-10" />
      
      {/* Floating Animated Mesh Orbs */}
      <div className="absolute top-24 left-[10%] w-[32rem] h-[32rem] bg-gradient-to-r from-blue-400/10 to-sky-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none -z-10" />
      <div className="absolute top-[600px] right-[5%] w-[40rem] h-[40rem] bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none -z-10" />
      <div className="absolute bottom-[1000px] left-[15%] w-[36rem] h-[36rem] bg-gradient-to-r from-blue-300/10 to-indigo-300/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ----------------- STICKY GLASS NAVBAR ----------------- */}
      <nav 
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass-navbar py-3 shadow-lg shadow-slate-100/30' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all">
              <GraduationCap className="w-5.5 h-5.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">University of Edinburgh</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">ERP Platform</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-7">
            <a href="#features" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition">Features</a>
            <a href="#academics" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition">Academics</a>
            <a href="#attendance" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition">Attendance</a>
            <a href="#finance" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition">Finance</a>
            <a href="#services" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition">Student Services</a>
            <a href="#support" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition">Support</a>
          </div>

          {/* Navbar Actions */}
          <div className="hidden xl:flex items-center gap-4">
            <a href="#contact" className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition">Contact Sales</a>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-slate-800 transition active:scale-[0.98]"
            >
              <span>Book Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden absolute top-full inset-x-0 bg-white/95 border-b border-slate-100 shadow-xl backdrop-blur-xl flex flex-col px-6 py-5 gap-4"
            >
              {['Features', 'Academics', 'Attendance', 'Finance', 'Student Services', 'Support'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-wider text-slate-700 py-1.5 hover:text-blue-600 transition"
                >
                  {item}
                </a>
              ))}
              <div className="h-px bg-slate-100 my-1" />
              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-slate-800 transition"
              >
                Book Live Demo
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ----------------- HERO SECTION CAROUSEL ----------------- */}
      <HeroCarousel />

      {/* ----------------- FEATURES CARD GRID SECTION ----------------- */}
      {/* ----------------- INTERACTIVE WORKSPACE SHOWCASE ----------------- */}
      <InteractiveShowcase />

      {/* ----------------- WHY CHOOSE OUR ERP (TWO COLUMN) ----------------- */}
      <section className="py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Smart Interactive Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
            <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

            <div className="w-full max-w-[420px] rounded-3xl p-6 bg-slate-900 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/5 rounded-full blur-2xl animate-pulse" />
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Academic Cluster</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Security Tier I</span>
              </div>

              {/* Stacked interactive rows */}
              <div className="flex flex-col gap-3">
                <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">MFA single sign-on</p>
                      <p className="text-[9px] text-slate-400">Shibboleth & Azure AD</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-400">Active</span>
                </div>

                <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50/10 text-emerald-400 flex items-center justify-center">
                      <Cloud className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">AWS Live Sync</p>
                      <p className="text-[9px] text-slate-400">Edinburgh Data Node</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400">Synced</span>
                </div>

                <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50/10 text-indigo-400 flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">End-to-End Encryption</p>
                      <p className="text-[9px] text-slate-400">TLS 1.3 compliance</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-400">Locked</span>
                </div>
              </div>

              {/* System Latency graph */}
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-2">
                  <span>LATENCY SPEED LOG</span>
                  <span>9.2ms (OK)</span>
                </div>
                <div className="h-10 flex items-end gap-1.5">
                  {[12, 14, 18, 10, 14, 22, 28, 16, 12, 10, 8, 14, 12, 10, 6, 8].map((val, idx) => (
                    <div 
                      key={idx} 
                      className="flex-1 bg-gradient-to-t from-blue-600 to-sky-400 rounded-t-[2px]" 
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
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Why Choose Edinburgh ERP</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 font-sans tracking-tight">
                Designed to Power High-Growth Organizations
              </h2>
              <p className="text-slate-500 text-base mt-2 font-medium">
                Combining a modern interface with the data security of global banking standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuresData.map((feat) => (
                <div key={feat.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                    {renderIcon(feat.icon, "w-4.5 h-4.5")}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{feat.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- INTERACTIVE DASHBOARD SHOWCASE ----------------- */}
      <section id="showcase" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 flex flex-col items-center gap-3">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Live Experience</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">
              Interactive Dashboard Preview
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Select a persona role to inspect their personalized digital campus metrics.
            </p>

            {/* Segment Controls */}
            <div className="flex bg-slate-100 p-1 rounded-2xl text-xs sm:text-sm font-semibold mt-6 shadow-inner">
              <button 
                onClick={() => setActiveTabShowcase('student')}
                className={`px-5 py-2.5 rounded-xl transition-all ${
                  activeTabShowcase === 'student' 
                    ? 'bg-white text-slate-950 shadow-md shadow-slate-200/50' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Student Dashboard
              </button>
              <button 
                onClick={() => setActiveTabShowcase('faculty')}
                className={`px-5 py-2.5 rounded-xl transition-all ${
                  activeTabShowcase === 'faculty' 
                    ? 'bg-white text-slate-950 shadow-md shadow-slate-200/50' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Faculty Dashboard
              </button>
              <button 
                onClick={() => setActiveTabShowcase('admin')}
                className={`px-5 py-2.5 rounded-xl transition-all ${
                  activeTabShowcase === 'admin' 
                    ? 'bg-white text-slate-950 shadow-md shadow-slate-200/50' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Administrator Dashboard
              </button>
            </div>
          </div>

          {/* Interactive Showcase Windows */}
          <div className="rounded-3xl border border-slate-100 shadow-xl overflow-hidden bg-slate-50 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {activeTabShowcase === 'student' && (
                <motion.div
                  key="student"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left"
                >
                  {/* Student Left: Quick Cards */}
                  <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Active Session</span>
                          <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">Callum Murray • BSc Computer Science</h4>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">Term 3</span>
                      </div>

                      {/* KPI row */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">CGPA</p>
                          <p className="text-lg font-black text-slate-800 mt-1">3.82<span className="text-slate-400 text-xs font-semibold">/4.00</span></p>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Attendance</p>
                          <p className="text-lg font-black text-slate-800 mt-1">96.4%</p>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Fees Status</p>
                          <p className="text-lg font-black text-emerald-600 mt-1">Cleared</p>
                        </div>
                      </div>

                      {/* Lists */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3">Upcoming Classes Today</h5>
                          <div className="flex flex-col gap-2.5">
                            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-lg border border-slate-100 text-xs font-semibold text-slate-700">
                              <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-blue-500" /> Informatics Lab</span>
                              <span className="text-slate-400">10:00 AM</span>
                            </div>
                            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-lg border border-slate-100 text-xs font-semibold text-slate-700">
                              <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-blue-500" /> Calculus II Lecture</span>
                              <span className="text-slate-400">01:30 PM</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3">Active Assignments</h5>
                          <div className="flex flex-col gap-2.5">
                            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-lg border border-slate-100 text-xs font-semibold text-slate-700">
                              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-amber-500" /> CS lab assignment 3</span>
                              <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">Pending</span>
                            </div>
                            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-lg border border-slate-100 text-xs font-semibold text-slate-700">
                              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-emerald-500" /> Math homework 4</span>
                              <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">Graded</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-bold text-slate-500">
                      <span>Library: 2 items checked out • No overdue fees.</span>
                      <a href="#contact" className="text-blue-600 hover:underline">View Student Record →</a>
                    </div>
                  </div>

                  {/* Student Right: Explainer */}
                  <div className="lg:col-span-4 flex flex-col justify-between bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                        <Users2 className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold">Unified Student Portal</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        One dashboard to register for courses, track biometric attendance counters, view transcripts, and complete tuition payments in one click.
                      </p>
                      <div className="flex flex-col gap-2 mt-2">
                        {['Single Sign-on (SSO) integration', 'Direct receipt WhatsApp delivery', 'Hostel lodging room allocator'].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 pt-4 border-t border-slate-800 text-[10px] font-bold text-slate-500 tracking-wider">
                      STUDENT JOURNEY COMPLIANT
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTabShowcase === 'faculty' && (
                <motion.div
                  key="faculty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left"
                >
                  {/* Faculty Left: Quick Cards */}
                  <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Active Faculty Profile</span>
                          <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">Dr. Elspeth Davies • School of Informatics</h4>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">Lecturer</span>
                      </div>

                      {/* KPI row */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Today's Lectures</p>
                          <p className="text-lg font-black text-slate-800 mt-1">3 scheduled</p>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Pending Attendance</p>
                          <p className="text-lg font-black text-rose-500 mt-1">1 class</p>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Papers to Grade</p>
                          <p className="text-lg font-black text-slate-800 mt-1">12 essays</p>
                        </div>
                      </div>

                      {/* Lists */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3">Lectures Roster</h5>
                          <div className="flex flex-col gap-2.5">
                            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-lg border border-slate-100 text-xs font-semibold text-slate-700">
                              <span>CS Theory (Appleton 3)</span>
                              <span className="text-slate-400">11:00 AM</span>
                            </div>
                            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-lg border border-slate-100 text-xs font-semibold text-slate-700">
                              <span>MSc Seminar (Appleton 5)</span>
                              <span className="text-slate-400">03:30 PM</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3">Grants & Research</h5>
                          <div className="flex flex-col gap-2.5">
                            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-lg border border-slate-100 text-xs font-semibold text-slate-700">
                              <span>Quantum Computing Trust</span>
                              <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">Approved</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-bold text-slate-500">
                      <span>Roster checks synced directly with biometric gates.</span>
                      <a href="#contact" className="text-blue-600 hover:underline">Open Faculty Hub →</a>
                    </div>
                  </div>

                  {/* Faculty Right: Explainer */}
                  <div className="lg:col-span-4 flex flex-col justify-between bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold">Faculty Workspace</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Allow faculty members to log registers in a single tap, track grading outcomes, request research grants, and audit leave metrics.
                      </p>
                      <div className="flex flex-col gap-2 mt-2">
                        {['Biometric sync attendance logs', 'Custom syllabus planners', 'One-click payroll distribution'].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 pt-4 border-t border-slate-800 text-[10px] font-bold text-slate-500 tracking-wider">
                      FACULTY EMPOWERMENT INLINE
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTabShowcase === 'admin' && (
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left"
                >
                  {/* Admin Left: Recharts Area Chart & Stats */}
                  <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Platform Administration</span>
                          <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">Central Management Center</h4>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">Super Admin</span>
                      </div>

                      {/* Chart container */}
                      <div className="h-44 text-xs mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={feeCollectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="adminTargetGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="adminCollectedGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="term" stroke="#64748B" fontSize={9} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748B" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                            <ChartTooltip />
                            <Area type="monotone" dataKey="target" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#adminTargetGrad)" />
                            <Area type="monotone" dataKey="collected" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#adminCollectedGrad)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* KPI counts */}
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Admissions</p>
                          <p className="text-base font-extrabold text-slate-800 mt-0.5">25,480</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Revenue YTD</p>
                          <p className="text-base font-extrabold text-slate-800 mt-0.5">$24.2M</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Attendance</p>
                          <p className="text-base font-extrabold text-slate-800 mt-0.5">95.8%</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Support Requests</p>
                          <p className="text-base font-extrabold text-slate-800 mt-0.5">14 pending</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-bold text-slate-500">
                      <span>Lighthouse core web vitals check: 99% performance score.</span>
                      <a href="#contact" className="text-blue-600 hover:underline">Launch System Control →</a>
                    </div>
                  </div>

                  {/* Admin Right: Explainer */}
                  <div className="lg:col-span-4 flex flex-col justify-between bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                        <Boxes className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold">Administrator Console</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Audit financial balances, monitor department metrics, verify hardware status, and manage role-based permission grids from a unified dashboard.
                      </p>
                      <div className="flex flex-col gap-2 mt-2">
                        {['SOC2 audit trails compliance', 'Procurement purchase orders', 'SSO OIDC federation configurations'].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 pt-4 border-t border-slate-800 text-[10px] font-bold text-slate-500 tracking-wider">
                      ENTERPRISE CONTROL LEVEL
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ----------------- STUDENT JOURNEY SECTION ----------------- */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Journey map</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">
              The Digital Student Journey
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Follow the streamlined flow of academic actions managed securely by Edinburgh ERP.
            </p>
          </div>

          {/* Journey Steps Track */}
          <div className="relative mt-8">
            {/* Horizontal line for desktop */}
            <div className="absolute top-12 left-12 right-12 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 -z-10 hidden xl:block opacity-30" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-7 gap-6">
              {journeySteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center xl:items-start text-center xl:text-left group relative">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-200/80 flex items-center justify-center text-slate-800 text-lg font-extrabold mb-5 shadow-sm group-hover:border-blue-600 group-hover:shadow-md transition-all relative">
                    <span className="bg-gradient-to-tr from-blue-600 to-indigo-600 bg-clip-text text-transparent">{step.step}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- ANALYTICS DETAILED CHARTS SECTION ----------------- */}
      <section id="analytics" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Campus Insights</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">
              Real-Time Campus Analytics Showrooms
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Detailed statistics illustrating enrollment ranges, financial collected balances, and average performance standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Chart 1: Performance */}
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left">
              <h4 className="text-base font-bold text-slate-950 mb-1">Academic Performance Level by School</h4>
              <p className="text-xs text-slate-400 font-semibold mb-6">Subject averages matching final evaluation indices</p>
              
              <div className="h-64 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={academicPerformanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <XAxis dataKey="dept" stroke="#64748B" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={9} tickLine={false} axisLine={false} domain={[50, 100]} />
                    <ChartTooltip />
                    <Bar dataKey="math" fill="#2563EB" name="Mathematics" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="science" fill="#22C55E" name="Informatics" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="reading" fill="#4F46E5" name="Literature" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Enrollment Pie */}
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left">
              <h4 className="text-base font-bold text-slate-950 mb-1">Student Enrollment Distribution</h4>
              <p className="text-xs text-slate-400 font-semibold mb-6">Allocation registers across college disciplines</p>
              
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
                        <span className="text-slate-600">{dept.name}</span>
                      </div>
                      <span className="text-slate-800">{dept.value} students</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ----------------- TESTIMONIALS SECTION ----------------- */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Endorsements</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">
              Trusted by the University of Edinburgh Leaders
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Discover how campus automation redesign transforms outcomes for students, teachers, and administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonialsData.map((test) => (
              <div 
                key={test.id}
                className="rounded-2xl p-6 bg-white border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:border-blue-100/50 transition-all duration-300 group"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-500 mb-5">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                    "{test.review}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-2">
                  <img 
                    src={test.avatar} 
                    alt={test.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow group-hover:scale-105 transition-transform" 
                  />
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-slate-900">{test.name}</h4>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                      {test.role} • <span className="text-blue-600">{test.organization}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- INTEGRATIONS GRID SECTION ----------------- */}
      <section id="integrations" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side info */}
            <div className="lg:col-span-5 flex flex-col gap-5 text-left">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Global Connect</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">
                Integrate with Your Current Tech Stack
              </h2>
              <p className="text-slate-500 text-base leading-relaxed font-medium">
                Connect your campus database with local productivity portals, email tools, online classes, and international billing methods automatically.
              </p>
              
              <div className="mt-2 flex flex-col gap-2.5">
                {[
                  'Developer REST APIs & Webhooks',
                  'OAuth 2.0 Single Sign-on integration',
                  'Bidirectional database sync protocols'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
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
                    className="p-5 bg-[#F8FAFC] border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
                  >
                    {/* Simulated Logo circle */}
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 text-slate-700 flex items-center justify-center font-extrabold mb-3 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-sm">
                      {item.icon}
                    </div>
                    <p className="text-xs font-extrabold text-slate-800">{item.name}</p>
                    <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">{item.category}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- FAQ COLLAPSIBLE ACCORDION SECTION ----------------- */}
      <section id="support" className="py-24 overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Support Portal</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-base mt-2">
              Answers to common inquiries regarding the smart ERP experience redesign.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqData.map((faq) => (
              <div 
                key={faq.id}
                className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-slate-900 hover:text-blue-600 transition"
                >
                  <span className="text-[15px] sm:text-base leading-snug">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      activeFaq === faq.id ? 'rotate-180 text-blue-600' : ''
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
                      <div className="px-6 pb-5 pt-1 text-sm text-slate-500 leading-relaxed border-t border-slate-50 text-left">
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
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Campus Insights</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">
              Resources & Transformation Guides
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Stay updated with campus transformation blueprints and productivity tips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogData.map((post) => (
              <article 
                key={post.id}
                className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex flex-col hover:shadow-xl hover:border-blue-100/50 hover:bg-white transition-all duration-300 text-left"
              >
                {/* Article Cover */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur text-slate-700 shadow-sm border border-white/50">
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
                    
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
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
      <section id="contact" className="py-24 relative overflow-hidden bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side copy */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Connect with Us</span>
              <h2 className="text-4xl font-extrabold text-slate-950 font-sans tracking-tight leading-tight">
                Experience the Future of the University of Edinburgh ERP
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Connect with our implementation leads. We provide tailored pricing documents, dedicated campus sandboxes, and data security worksheets.
              </p>
              
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Custom Campus Sandbox</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Explore our features with loaded mock records customized to your curriculum models.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">SOC2 & GDPR Compliance Logs</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Get immediate copies of compliance logs, penetration report sheets, and SLA certificates.</p>
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
      <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-16 border-b border-slate-800">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 flex flex-col gap-5 text-left">
              <a href="#" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-base font-extrabold tracking-tight text-white">University of Edinburgh ERP</span>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Redesigning college ERP operations through a unified experience for academics, attendance, financials, and campus services.
              </p>
              
              {/* Social links */}
              <div className="flex items-center gap-4 mt-2">
                {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((social) => (
                  <a key={social} href="#" className="text-xs font-bold text-slate-500 hover:text-white transition">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="text-left">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">Support</h4>
              <div className="flex flex-col gap-2.5 text-xs text-slate-500">
                <a href="#" className="hover:text-white transition">Help Desk</a>
                <a href="#" className="hover:text-white transition">IT System Status</a>
                <a href="#" className="hover:text-white transition">Admin Portal</a>
                <a href="#" className="hover:text-white transition">SSO Login Guide</a>
              </div>
            </div>

            <div className="text-left">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">Resources</h4>
              <div className="flex flex-col gap-2.5 text-xs text-slate-500">
                <a href="#" className="hover:text-white transition">Guides & Blueprints</a>
                <a href="#" className="hover:text-white transition">Research Journals</a>
                <a href="#" className="hover:text-white transition">API references</a>
                <a href="#" className="hover:text-white transition">Library OPAC</a>
              </div>
            </div>

            <div className="text-left">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">Legal</h4>
              <div className="flex flex-col gap-2.5 text-xs text-slate-500">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
                <a href="#" className="hover:text-white transition">GDPR Compliance</a>
                <a href="#" className="hover:text-white transition">FERPA Directives</a>
              </div>
            </div>

            {/* Newsletter column */}
            <div className="lg:col-span-2 flex flex-col gap-4 text-left">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Newsletter</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Sign up for weekly product updates, feature highlights, and academic guides.
              </p>
              
              {/* Form inputs */}
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="username@ed.ac.uk"
                  className="bg-slate-800 border border-slate-700/80 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-xs font-bold text-white shrink-0">
                  Join
                </button>
              </div>
            </div>

          </div>

          {/* Bottom metadata */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 font-semibold gap-4">
            <p>© 2026 University of Edinburgh ERP. Redesigned Smart Campus Operations.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policies</a>
              <a href="#" className="hover:text-white transition">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition">SLA Terms</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
