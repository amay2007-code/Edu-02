import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Lock, Mail, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
  onNavigateHome: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Please fill in all fields.');
      triggerShake();
      return;
    }

    const isValidCreds =
      (identifier.trim() === 'student' && password === '123456') ||
      (identifier.trim() === 'demo@ed.ac.uk' && password === '123456');

    if (!isValidCreds) {
      setErrorMessage('Invalid Student ID / Email or Password. Try the demo credentials.');
      triggerShake();
      return;
    }

    // Success flow
    setIsLoading(true);
    setTimeout(() => {
      const mockUser = {
        id: 'demo-student-id',
        email: identifier.includes('@') ? identifier : 'demo@ed.ac.uk',
        name: 'Jane Doe',
        role: 'student'
      };

      // Set localStorage session
      localStorage.setItem('rps_user', JSON.stringify(mockUser));
      localStorage.setItem('rps_token', 'demo-mock-jwt-token');

      onLoginSuccess(mockUser);
    }, 1500); // 1.5s simulated loading delay
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] text-[#12201F] flex items-center justify-center relative px-6 py-16 overflow-hidden">
      
      {/* Decorative Background Mesh elements for visual continuity */}
      <div className="absolute top-24 left-[10%] w-[30rem] h-[30rem] bg-gradient-to-r from-[#1F5359]/10 to-[#3A7A80]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-24 right-[10%] w-[30rem] h-[30rem] bg-gradient-to-r from-[#C9A24B]/10 to-[#DEC17E]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Main Login container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1F5359] hover:text-[#0F3235] transition-colors mb-6 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#C9A24B] rounded px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        {/* Premium Glassmorphic Login Card */}
        <motion.div 
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-[#0F3235] border border-[#3A7A80]/30 rounded-3xl shadow-2xl p-8 backdrop-blur-lg flex flex-col text-left relative overflow-hidden"
        >
          {/* Subtle gold glow inside */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C9A24B]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Heading / Logo */}
          <div className="flex flex-col items-center text-center mb-8 pb-6 border-b border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-[#C9A24B] text-[#0F3235] flex items-center justify-center font-bold shadow-lg shadow-black/10 mb-3.5">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-white font-sans">University of Edinburgh</h1>
            <span className="text-[10px] font-bold text-[#DEC17E] uppercase tracking-widest leading-none mt-1.5 block">Smart Digital Campus</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-rose-200">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Identifier input */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#DEC17E] mb-2">
                Student ID / University Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="student or name@ed.ac.uk"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-[#3A7A80]/30 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] transition-all font-medium"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#DEC17E]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => toastWarning()}
                  className="text-[10px] font-extrabold uppercase tracking-wider text-[#DEC17E]/60 hover:text-[#C9A24B] transition-colors focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-[#3A7A80]/30 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                className="w-4 h-4 rounded bg-white/5 border border-[#3A7A80]/35 text-[#C9A24B] focus:ring-[#C9A24B] focus:ring-offset-[#0F3235] focus:outline-none"
              />
              <label htmlFor="remember_me" className="ml-2.5 text-xs text-slate-300 font-bold select-none cursor-pointer">
                Remember Me
              </label>
            </div>

            {/* Login button / loading experience */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#C9A24B] hover:bg-[#DEC17E] text-[#0F3235] text-xs font-extrabold uppercase tracking-widest shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-80"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#0F3235]" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          {/* Demo Credentials Help Card */}
          <div className="mt-8 pt-5 border-t border-white/10 text-xs">
            <span className="font-bold text-[#DEC17E] uppercase tracking-wider block mb-2.5 text-[9px]">Demo Access Credentials</span>
            <div className="bg-white/5 rounded-xl p-3.5 border border-white/5 flex flex-col gap-2 font-medium text-slate-300">
              <div className="flex justify-between">
                <span>Student ID:</span>
                <span className="font-mono text-white bg-white/10 px-1.5 py-0.5 rounded text-[11px]">student</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-mono text-white bg-white/10 px-1.5 py-0.5 rounded text-[11px]">demo@ed.ac.uk</span>
              </div>
              <div className="flex justify-between">
                <span>Password:</span>
                <span className="font-mono text-white bg-white/10 px-1.5 py-0.5 rounded text-[11px]">123456</span>
              </div>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
};

const toastWarning = () => {
  alert('Self-service password recovery is disabled in this demonstration sandbox. Please use the default demo credentials provided at the bottom of the card.');
};
