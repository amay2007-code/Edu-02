import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { School, Eye, EyeOff, LogIn, AlertCircle, Database, RefreshCw, CheckCircle } from 'lucide-react';
import { AuthService, HealthService } from '../../utils/supabase/client';

interface LoginProps {
  onLoginSuccess: (user: any, token: string) => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [demoDataStatus, setDemoDataStatus] = useState<'unknown' | 'ready' | 'needed'>('unknown');

  // Check if demo data is initialized on mount
  useEffect(() => {
    checkDemoDataStatus();
  }, []);

  const checkDemoDataStatus = async () => {
    try {
      await HealthService.checkHealth();
      setDemoDataStatus('unknown');
    } catch (error) {
      console.error('Could not check demo data status:', error);
      setDemoDataStatus('unknown');
    }
  };

  const handleInitializeDemoData = async () => {
    setIsInitializing(true);
    setError('');
    
    try {
      toast.info('Initializing demo accounts...', {
        description: 'This may take 10-15 seconds. Please wait...'
      });

      const result = await HealthService.initializeDemoData();
      
      if (result.success) {
        setDemoDataStatus('ready');
        toast.success('Demo accounts created successfully!', {
          description: 'You can now login with the demo credentials below.'
        });
      } else {
        throw new Error(result.error || 'Initialization failed');
      }
    } catch (err: any) {
      console.error('Demo data initialization error:', err);
      const errorMessage = err.message || 'Failed to initialize demo data';
      setError(errorMessage);
      toast.error('Initialization failed', {
        description: errorMessage
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call real backend authentication
      const result = await AuthService.login(formData.email, formData.password);
      
      toast.success(`Welcome back, ${result.user.name}!`, {
        description: 'Login successful. Loading your dashboard...'
      });

      // Pass user data and token to parent component
      onLoginSuccess(result.user, result.access_token);
    } catch (err: any) {
      let errorMessage = err.message || 'Login failed. Please check your credentials.';
      
      // Provide helpful error messages
      if (errorMessage.includes('Invalid login') || errorMessage.includes('Invalid credentials') || errorMessage.includes('invalid_credentials')) {
        errorMessage = 'Invalid email or password. Use the demo credentials below, or click "Initialize Demo Accounts" first.';
        setDemoDataStatus('needed');
      } else if (errorMessage.includes('Email not confirmed') || errorMessage.includes('not confirmed')) {
        errorMessage = 'Email not confirmed. Please click "Initialize Demo Accounts" again to recreate the accounts.';
        setDemoDataStatus('needed');
      } else if (errorMessage.includes('User not found') || errorMessage.includes('profile not found')) {
        errorMessage = 'User account not found. Please initialize demo accounts first.';
        setDemoDataStatus('needed');
      } else if (errorMessage.includes('Network') || errorMessage.includes('fetch') || errorMessage.includes('Failed to fetch')) {
        errorMessage = 'Cannot reach Supabase. Your project may be paused — go to supabase.com/dashboard, find the project, and click "Restore project".';
      } else if (errorMessage.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again.';
      }
      
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <School className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Rajasthan Institute of Technology</h1>
          <p className="text-sm text-gray-600">राजस्थान पब्लिक स्कूल</p>
          <p className="text-xs text-gray-500">ERP Management System</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
              <LogIn className="h-5 w-5" />
              Sign In
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the ERP system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="text-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="h-11"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    className="h-11 pr-10"
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Credentials - always visible */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-amber-800">Demo Credentials</p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  <div>
                    <p className="font-medium text-gray-700">Admin:</p>
                    <p className="text-gray-500 break-all">admin@rps.rajasthan.gov.in</p>
                    <p className="text-gray-500">admin123</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Student:</p>
                    <p className="text-gray-500 break-all">arjun.singh@rps.edu.in</p>
                    <p className="text-gray-500">student123</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Professor:</p>
                    <p className="text-gray-500 break-all">teacher@rps.rajasthan.gov.in</p>
                    <p className="text-gray-500">teacher123</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Parent:</p>
                    <p className="text-gray-500 break-all">parent@rps.edu.in</p>
                    <p className="text-gray-500">parent123</p>
                  </div>
                </div>
              </div>

              {demoDataStatus !== 'ready' && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 text-center">
                    First time? Create the demo accounts before signing in.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-10 border-amber-300 text-amber-700 hover:bg-amber-50"
                    onClick={handleInitializeDemoData}
                    disabled={isInitializing}
                  >
                    {isInitializing ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Creating accounts...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Initialize Demo Accounts
                      </div>
                    )}
                  </Button>
                </div>
              )}

              {demoDataStatus === 'ready' && (
                <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  Accounts initialized — you can now sign in
                </div>
              )}
            </div>

            {/* Help Text */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Contact your school administrator if you need help accessing your account
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>© 2025 Rajasthan Institute of Technology - Government of Rajasthan</p>
          <p>Secure ERP System • Version 2.0</p>
        </div>
      </div>
    </div>
  );
}
