import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import StudentPortalApp from '../student-portal/src/app/App-Enhanced';
import { Toaster } from 'sonner';

function App() {
  const [route, setRoute] = useState<string>(() => window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('rps_user') && !!localStorage.getItem('rps_token');
  });

  // Client-side router history synchronization
  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newRoute: string) => {
    window.history.pushState(null, '', newRoute);
    setRoute(newRoute);

    // Dynamic body classes to prevent theme collisions
    if (newRoute === '/dashboard') {
      document.body.classList.add('dashboard-active');
    } else {
      document.body.classList.remove('dashboard-active');
    }
  };

  // Sync auth state on mount and updates
  useEffect(() => {
    const user = localStorage.getItem('rps_user');
    const token = localStorage.getItem('rps_token');
    setIsAuthenticated(!!user && !!token);

    // Set initial route classes
    if (window.location.pathname === '/dashboard') {
      document.body.classList.add('dashboard-active');
    } else {
      document.body.classList.remove('dashboard-active');
    }
  }, [route]);

  const handleLoginSuccess = (user: any) => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('rps_user');
    localStorage.removeItem('rps_token');
    setIsAuthenticated(false);
    navigate('/');
    // Force a page reload to cleanly tear down the student portal context
    window.location.reload();
  };

  // Route protection
  useEffect(() => {
    if (route === '/dashboard' && !isAuthenticated) {
      navigate('/login');
    }
  }, [route, isAuthenticated]);

  return (
    <>
      <Toaster position="top-right" richColors />
      {route === '/login' ? (
        <Login onLoginSuccess={handleLoginSuccess} onNavigateHome={() => navigate('/')} />
      ) : route === '/dashboard' ? (
        <div className="student-portal-root">
          <StudentPortalApp />
        </div>
      ) : (
        <LandingPage 
          onNavigate={navigate} 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 
        />
      )}
    </>
  );
}

export default App;
