import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';

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
  research: {
    title: 'Research',
    items: ['Research Centres', 'Publications', 'Grants & Funding', 'Postgraduate Research', 'Research Ethics', 'Innovation Hub']
  },
  global: {
    title: 'Global',
    items: ['International Students', 'Study Abroad', 'Exchange Programmes', 'Global Partnerships', 'Visa & Immigration']
  },
  community: {
    title: 'Community',
    items: ['Student Union', 'Societies & Clubs', 'Alumni Network', 'Campus Events', 'Volunteering', 'Sports & Recreation']
  },
  about: {
    title: 'About',
    items: ['Our History', 'Leadership', 'Campus & Facilities', 'Contact Us', 'Sustainability', 'Careers']
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
      className="fixed top-0 inset-x-0 z-[9999] transition-all duration-300"
    >
      {/* Main Navbar Bar — official UoE style gradient */}
      <div 
        className="w-full h-[64px] flex items-center"
        style={{
          background: 'linear-gradient(135deg, #1a3a3a 0%, #1e4d4d 35%, #3a7a72 70%, #5a9a8a 100%)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 w-full flex items-center justify-between">
          
          {/* Left Side: UoE Crest + University Name */}
          <a 
            href="#" 
            onClick={handleLogoClick}
            className="flex items-center gap-3 group shrink-0 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] rounded p-0.5"
          >
            {/* UoE Crest - SVG recreation of the official shield */}
            <div className="w-[38px] h-[38px] shrink-0">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Shield outline */}
                <path d="M20 2L4 10V22C4 30.5 11 37 20 38C29 37 36 30.5 36 22V10L20 2Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.2"/>
                {/* Cross */}
                <line x1="20" y1="8" x2="20" y2="34" stroke="white" strokeWidth="1.5" strokeOpacity="0.7"/>
                <line x1="8" y1="18" x2="32" y2="18" stroke="white" strokeWidth="1.5" strokeOpacity="0.7"/>
                {/* Inner details */}
                <circle cx="13" cy="13" r="2.5" fill="white" fillOpacity="0.5"/>
                <circle cx="27" cy="13" r="2.5" fill="white" fillOpacity="0.5"/>
                <circle cx="13" cy="26" r="2.5" fill="white" fillOpacity="0.5"/>
                <circle cx="27" cy="26" r="2.5" fill="white" fillOpacity="0.5"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-light text-white leading-tight tracking-wide">The University</span>
              <span className="text-[13px] font-semibold text-white uppercase tracking-[0.15em] leading-tight">of Edinburgh</span>
            </div>
          </a>

          {/* Center: Desktop Navigation Items — matching UoE style */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 h-full">
            {Object.entries(menuData).map(([key, menu]) => (
              <div 
                key={key}
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
                className="relative h-[64px] flex items-center"
              >
                <button
                  aria-expanded={activeMenu === key}
                  aria-haspopup="true"
                  onKeyDown={(e) => handleKeyDownMenu(e, key)}
                  className={`flex items-center gap-1 text-[13px] font-medium tracking-wide px-3 xl:px-4 h-full transition-colors focus:outline-none cursor-pointer ${
                    activeMenu === key 
                      ? 'text-white bg-white/10' 
                      : 'text-white/90 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{menu.title}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMenu === key ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu Box */}
                <AnimatePresence>
                  {activeMenu === key && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-56 bg-white rounded-b-lg shadow-xl border border-gray-100 flex flex-col py-2 z-50 text-left pointer-events-auto"
                      onMouseEnter={() => handleMouseEnter(key)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {menu.items.map((item, idx) => (
                        <a
                          key={idx}
                          href="#"
                          onClick={handleDropdownItemClick}
                          className="px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:text-[#1a3a3a] hover:bg-gray-50 transition-all duration-150"
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

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => onNavigate('/dashboard')}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white text-[#1a3a3a] text-[13px] font-semibold hover:bg-gray-100 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-transparent border border-white/40 text-white text-[13px] font-medium hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('/login')}
                  className="text-[13px] font-medium text-white/90 hover:text-white transition-colors cursor-pointer px-3 py-1.5 focus:outline-none"
                >
                  Login
                </button>
                <button 
                  onClick={() => onNavigate('/login')} 
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white text-[#1a3a3a] text-[13px] font-semibold hover:bg-gray-100 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg text-white hover:bg-white/10 transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Side / Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full inset-x-0 bg-white shadow-2xl flex flex-col px-5 py-4 gap-1 max-h-[80vh] overflow-y-auto border-t border-gray-100"
          >
            {Object.entries(menuData).map(([key, menu]) => (
              <div key={key} className="border-b border-gray-100 pb-1">
                <button
                  onClick={() => setMobileActiveAccordion(mobileActiveAccordion === key ? null : key)}
                  className="w-full flex items-center justify-between text-[13px] font-semibold text-[#1a3a3a] py-3 cursor-pointer"
                >
                  <span>{menu.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform text-gray-400 ${mobileActiveAccordion === key ? 'rotate-180 text-[#1a3a3a]' : ''}`} />
                </button>
                
                {mobileActiveAccordion === key && (
                  <div className="pl-4 pb-2 flex flex-col gap-1 text-left">
                    {menu.items.map((item, idx) => (
                      <a
                        key={idx}
                        href="#"
                        onClick={(e) => {
                          handleDropdownItemClick(e);
                          setMobileMenuOpen(false);
                        }}
                        className="text-[13px] text-gray-600 hover:text-[#1a3a3a] py-1.5 transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isAuthenticated ? (
              <div className="flex flex-col gap-2 mt-3 pt-2">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('/dashboard');
                  }}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#1a3a3a] text-white text-[13px] font-semibold hover:bg-[#2a5a5a] transition cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Student Dashboard</span>
                </button>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-transparent border border-gray-200 text-[#1a3a3a] text-[13px] font-semibold hover:bg-gray-50 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-3 pt-2">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('/login');
                  }}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-transparent border border-gray-200 text-[#1a3a3a] text-[13px] font-semibold hover:bg-gray-50 transition cursor-pointer"
                >
                  Login
                </button>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('/login');
                  }}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#1a3a3a] text-white text-[13px] font-semibold hover:bg-[#2a5a5a] transition cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
