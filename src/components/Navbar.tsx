import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, Menu, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';

interface MenuItem {
  title: string;
  items: string[];
}

const menuData: Record<string, MenuItem> = {
  academics: {
    title: 'Academics',
    items: ['Programs', 'Courses', 'Timetable', 'Examinations', 'Grades', 'Academic Calendar', 'Faculty Portal']
  },
  admissions: {
    title: 'Admissions',
    items: ['Apply', 'Admission Status', 'Required Documents', 'Scholarships', 'International Students', 'FAQs']
  },
  finance: {
    title: 'Finance',
    items: ['Tuition Fees', 'Online Payments', 'Receipts', 'Financial Aid', 'Scholarships', 'Payment History']
  },
  studentServices: {
    title: 'Student Services',
    items: ['Library', 'Hostel', 'Transport', 'Student ID', 'Certificates', 'Health Centre', 'Campus Events']
  },
  administration: {
    title: 'Administration',
    items: ['HR Portal', 'Staff Directory', 'Payroll', 'Leave Management', 'Reports', 'Analytics', 'User Roles']
  },
  support: {
    title: 'Support',
    items: ['Help Centre', 'Contact Support', 'Raise Ticket', 'Documentation', 'Live Chat']
  }
};

interface NavbarProps {
  onNavigate: (route: string) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, isAuthenticated, onLogout }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveAccordion, setMobileActiveAccordion] = useState<string | null>(null);
  
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Close menus on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (menuKey: string) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 150) as unknown as number;
  };

  // Keyboard navigation for dropdown accessibility
  const handleKeyDownMenu = (e: React.KeyboardEvent, menuKey: string) => {
    if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setActiveMenu(activeMenu === menuKey ? null : menuKey);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('/');
  };

  const handleDropdownItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Redirect to login/portal on click if not logged in, or scroll
    if (isAuthenticated) {
      onNavigate('/dashboard');
    } else {
      onNavigate('/login');
    }
    setActiveMenu(null);
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 h-20 bg-[#0F3235]/90 backdrop-blur-md border-b border-[#C9A24B]/35 flex items-center shadow-lg shadow-black/10 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        
        {/* Left Side: Brand Logo */}
        <a 
          href="#" 
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group shrink-0 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] rounded p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-[#C9A24B] text-[#0F3235] flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform duration-300">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-black tracking-tight text-white font-sans leading-tight">University of Edinburgh</span>
            <span className="text-[9px] font-bold text-[#DEC17E] uppercase tracking-widest leading-none mt-0.5 font-sans">Digital Campus</span>
          </div>
        </a>

        {/* Center: Tablet & Desktop Navigation Items */}
        <div className="hidden md:flex items-center gap-5 xl:gap-9 h-full">
          {Object.entries(menuData).map(([key, menu]) => (
            <div 
              key={key}
              onMouseEnter={() => handleMouseEnter(key)}
              onMouseLeave={handleMouseLeave}
              className="relative py-6"
            >
              <button
                aria-expanded={activeMenu === key}
                aria-haspopup="true"
                onKeyDown={(e) => handleKeyDownMenu(e, key)}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/90 hover:text-[#C9A24B] transition-colors focus:outline-none cursor-pointer"
              >
                <span>{menu.title}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === key ? 'rotate-180 text-[#C9A24B]' : 'text-white/40'}`} />
              </button>

              {/* Gold Underline Highlight */}
              <div className={`absolute bottom-4 left-0 right-0 h-[2px] bg-[#C9A24B] transform origin-left transition-transform duration-300 ${activeMenu === key ? 'scale-x-100' : 'scale-x-0'}`} />

              {/* Dropdown Menu Box */}
              <AnimatePresence>
                {activeMenu === key && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-60 bg-[#0F3235]/95 backdrop-blur-xl border border-[#3A7A80]/30 rounded-2xl shadow-2xl p-5 flex flex-col gap-2 z-50 text-left pointer-events-auto"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {menu.items.map((item, idx) => (
                      <a
                        key={idx}
                        href="#"
                        onClick={handleDropdownItemClick}
                        className="px-3.5 py-2.5 rounded-lg text-xs font-semibold text-white/80 hover:text-[#C9A24B] hover:bg-white/5 transition-all duration-200"
                      >
                        {item}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right Side Actions: Authenticated state detection */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <>
              {/* Dashboard Direct Shortcut */}
              <button 
                onClick={() => onNavigate('/dashboard')}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-[#C9A24B] hover:bg-[#DEC17E] text-[#0F3235] text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.03] active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#0F3235]" />
                <span>Dashboard</span>
              </button>
              
              {/* Logout Button */}
              <button 
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-transparent hover:bg-white/5 border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:scale-[1.03] active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
              >
                <LogOut className="w-3.5 h-3.5 text-white" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Login Link */}
              <button 
                onClick={() => onNavigate('/login')}
                className="text-xs font-bold uppercase tracking-wider text-white/95 hover:text-[#C9A24B] transition-colors cursor-pointer mr-2.5 focus:outline-none focus:ring-1 focus:ring-[#C9A24B] rounded px-2.5 py-1.5"
              >
                Login
              </button>
              
              {/* Book Demo Button */}
              <button 
                onClick={() => onNavigate('/login')} 
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#C9A24B] hover:bg-[#DEC17E] text-[#0F3235] text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.03] active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
              >
                <span>Book Demo</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0F3235]" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Side / Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full inset-x-0 bg-[#0F3235]/95 border-b border-[#3A7A80]/20 shadow-2xl backdrop-blur-xl flex flex-col px-6 py-5 gap-3 max-h-[80vh] overflow-y-auto"
          >
            {Object.entries(menuData).map(([key, menu]) => (
              <div key={key} className="border-b border-white/5 pb-2">
                <button
                  onClick={() => setMobileActiveAccordion(mobileActiveAccordion === key ? null : key)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white py-2"
                >
                  <span>{menu.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileActiveAccordion === key ? 'rotate-180 text-[#C9A24B]' : 'text-white/40'}`} />
                </button>
                
                {mobileActiveAccordion === key && (
                  <div className="pl-4 py-1.5 flex flex-col gap-2 text-left">
                    {menu.items.map((item, idx) => (
                      <a
                        key={idx}
                        href="#"
                        onClick={handleDropdownItemClick}
                        className="text-xs text-white/70 hover:text-[#C9A24B] py-1 transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isAuthenticated ? (
              <div className="flex flex-col gap-2 mt-2">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('/dashboard');
                  }}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C9A24B] text-[#0F3235] text-xs font-bold uppercase tracking-wider hover:bg-[#DEC17E] transition cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Student Dashboard</span>
                </button>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-transparent border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('/login');
                  }}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-transparent border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition cursor-pointer"
                >
                  Login
                </button>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('/login');
                  }}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C9A24B] text-[#0F3235] text-xs font-bold uppercase tracking-wider hover:bg-[#DEC17E] transition cursor-pointer"
                >
                  Book Live Demo
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
