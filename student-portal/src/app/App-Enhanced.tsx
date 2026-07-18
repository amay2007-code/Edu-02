// @ts-nocheck
import { useState, useEffect } from "react";
import { LanguageProvider, useLanguage } from "./contexts/language-context";
import { Login } from "./components/auth/login";
import { AdminDashboard } from "./components/admin/admin-dashboard";
import { AuthService, HealthService } from "./utils/supabase/client";
import { toast } from "sonner";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from "./components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./components/ui/dialog";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Progress } from "./components/ui/progress";
import { 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  Settings, 
  LogOut,
  School,
  CreditCard,
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
  Home,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  BookOpenCheck,
  CalendarDays,
  IndianRupee,
  Download,
  HelpCircle,
  Languages,
  MessageCircle,
  Shield,
  Database,
  Wifi,
  WifiOff
} from "lucide-react";
import { Dashboard } from "./components/dashboard";
import { PersonalInfo } from "./components/personal-info";
import { ExaminationRecord } from "./components/examination-record";
import { Schedule } from "./components/schedule";
import { Resources } from "./components/resources";
import { Fees } from "./components/fees";
import { Settings as SettingsComponent } from "./components/settings";
import { AIChatbot } from "./components/ai-chatbot";
import { FloatingActionMenu } from "./components/floating-action-menu";
import { GlobalSearch } from "./components/global-search";

function AppContent() {
  const { t, language, setLanguage } = useLanguage();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [backendHealth, setBackendHealth] = useState<any>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Backend Connected", message: "Full-stack mode activated with Supabase", type: "success", unread: true },
    { id: 2, title: "Multi-project Ready", message: "Integration endpoints available for external projects", type: "info", unread: true },
    { id: 3, title: "Data Persistence", message: "All changes are now saved to database", type: "success", unread: false }
  ]);
  const [userProgress, setUserProgress] = useState({
    feesProgress: 55,
    attendanceProgress: 88,
    assignmentsProgress: 75
  });
  const [quickStats, setQuickStats] = useState({
    pendingFees: "₹32,333",
    nextExam: "Advanced Calculus - Dec 20",
    todayClasses: 4,
    unreadNotifications: 2
  });
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
    checkBackendHealth();
    
    // Set up online/offline listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkAuthStatus = () => {
    setIsLoading(true);
    try {
      const user = AuthService.getCurrentUser();
      const token = AuthService.getToken();
      
      if (user && token) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        toast.success(`Welcome back, ${user.name}!`);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkBackendHealth = async () => {
    try {
      const health = await HealthService.checkHealth();
      setBackendHealth(health);
      toast.success('🚀 Backend services connected successfully!');
    } catch (error) {
      console.error('Backend health check failed:', error);
      toast.error('Backend connection failed - operating in offline mode');
    }
  };

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setActiveSection(user.role === 'admin' ? 'admin-dashboard' : 'dashboard');
    toast.success(`🎉 Welcome, ${user.name}! Full-stack ERP is ready.`);
  };

  const handleSignOut = () => {
    AuthService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsSignOutDialogOpen(false);
    toast.success("Signed out successfully!");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            handleSectionChange('dashboard');
            toast.info('Keyboard shortcut: Alt+1 for Dashboard');
            break;
          case '2':
            event.preventDefault();
            handleSectionChange('personal-info');
            toast.info('Keyboard shortcut: Alt+2 for Profile');
            break;
          case '3':
            event.preventDefault();
            handleSectionChange('examination-record');
            toast.info('Keyboard shortcut: Alt+3 for Exams');
            break;
          case '4':
            event.preventDefault();
            handleSectionChange('schedule');
            toast.info('Keyboard shortcut: Alt+4 for Schedule');
            break;
          case '5':
            event.preventDefault();
            handleSectionChange('resources');
            toast.info('Keyboard shortcut: Alt+5 for Resources');
            break;
          case '6':
            event.preventDefault();
            handleSectionChange('fees');
            toast.info('Keyboard shortcut: Alt+6 for Fees');
            break;
          case '7':
            event.preventDefault();
            handleSectionChange('settings');
            toast.info('Keyboard shortcut: Alt+7 for Settings');
            break;
          case '8':
            if (currentUser?.role === 'admin') {
              event.preventDefault();
              handleSectionChange('admin-dashboard');
              toast.info('Keyboard shortcut: Alt+8 for Admin');
            }
            break;
          case 't':
            event.preventDefault();
            toggleDarkMode();
            break;
        }
      }
      
      // Ctrl+K for global search
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        const searchButton = document.querySelector('[title="Global Search (Ctrl+K)"]') as HTMLButtonElement;
        if (searchButton) {
          searchButton.click();
          toast.info('Global search opened - Ctrl+K');
        }
      }
      
      // Escape key to close any open dialogs
      if (event.key === 'Escape') {
        setIsChatbotOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentUser]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    toast.success(isDarkMode ? "Light mode activated" : "Dark mode activated");
  };

  // Handle section navigation
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    toast.info(`Navigated to ${getSectionTitle(sectionId)}`);
  };

  // Get section title
  const getSectionTitle = (sectionId: string) => {
    const titles = {
      "dashboard": t("nav.dashboard"),
      "personal-info": t("nav.personal.info"),
      "examination-record": t("nav.examination.record"),
      "schedule": t("nav.schedule"),
      "resources": t("nav.resources"),
      "fees": t("nav.fees"),
      "settings": t("nav.settings"),
      "admin-dashboard": "Admin Dashboard"
    };
    return titles[sectionId] || t("nav.dashboard");
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
            <School className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold">University of Edinburgh</h1>
            <p className="text-sm text-gray-600">Loading digital campus...</p>
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 bg-amber-500 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="h-2 w-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Navigation items with role-based access
  const navigationItems = [
    {
      title: t("nav.overview"),
      items: [
        {
          title: t("nav.dashboard"),
          icon: LayoutDashboard,
          id: "dashboard",
          badge: null,
          description: t("nav.dashboard")
        }
      ]
    },
    {
      title: t("nav.academic"),
      items: [
        {
          title: t("nav.personal.info"),
          icon: User,
          id: "personal-info",
          badge: null,
          description: t("nav.personal.info")
        },
        {
          title: t("nav.examination.record"),
          icon: GraduationCap,
          id: "examination-record",
          badge: notifications.filter(n => n.title.includes("Exam") && n.unread).length || null,
          description: t("nav.examination.record")
        },
        {
          title: t("nav.schedule"),
          icon: Calendar,
          id: "schedule",
          badge: notifications.filter(n => n.title.includes("Assignment") && n.unread).length || null,
          description: t("nav.schedule")
        },
        {
          title: t("nav.resources"),
          icon: BookOpen,
          id: "resources",
          badge: null,
          description: t("nav.resources")
        },
        {
          title: t("nav.fees"),
          icon: CreditCard,
          id: "fees",
          badge: notifications.filter(n => n.title.includes("Fee") && n.unread).length || null,
          description: t("nav.fees")
        }
      ]
    },
    {
      title: t("nav.system"),
      items: [
        {
          title: t("nav.settings"),
          icon: Settings,
          id: "settings",
          badge: null,
          description: t("nav.settings")
        },
        ...(currentUser?.role === 'admin' ? [{
          title: "Admin Dashboard",
          icon: Shield,
          id: "admin-dashboard",
          badge: null,
          description: "Administrative controls and analytics"
        }] : [])
      ]
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard onNavigate={handleSectionChange} />;
      case "personal-info":
        return <PersonalInfo />;
      case "examination-record":
        return <ExaminationRecord />;
      case "schedule":
        return <Schedule />;
      case "resources":
        return <Resources />;
      case "fees":
        return <Fees />;
      case "settings":
        return <SettingsComponent onThemeChange={toggleDarkMode} isDarkMode={isDarkMode} />;
      case "admin-dashboard":
        return currentUser?.role === 'admin' ? <AdminDashboard /> : <Dashboard onNavigate={handleSectionChange} />;
      default:
        return <Dashboard onNavigate={handleSectionChange} />;
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-border/40">
          <SidebarHeader className="border-b border-border/40 px-6 py-4 bg-[#0F3235]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A24B] text-[#0F3235] shadow-lg">
                <School className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-semibold text-white">{t("app.title")}</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4 py-2">

            {navigationItems.map((group, index) => (
              <SidebarGroup key={index}>
                <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">
                  {group.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => handleSectionChange(item.id)}
                          className={`group relative transition-all duration-200 ${
                            activeSection === item.id
                              ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border border-sidebar-border/40"
                              : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                          }`}
                          title={item.description}
                        >
                          <item.icon className="h-4 w-4 transition-colors" />
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant="destructive" className="ml-auto h-5 w-5 p-0 text-xs font-medium flex items-center justify-center">
                              {item.badge}
                            </Badge>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          
          <SidebarFooter className="border-t border-border/40 px-4 py-4 bg-sidebar/30">
            {/* Student Profile */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-sidebar-accent/20 rounded-lg border border-sidebar-border/40">
              <Avatar className="h-10 w-10 border-2 border-sidebar-border/40">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-[#C9A24B] text-[#0F3235] font-semibold">
                  {currentUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">{currentUser?.name}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">{currentUser?.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">{t("online")}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm h-9 hover:bg-sidebar-accent/60 transition-colors"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {isDarkMode ? t("light.mode") : t("dark.mode")}
              </Button>
              
              <Dialog open={isSignOutDialogOpen} onOpenChange={setIsSignOutDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-sm h-9 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("sign.out")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <LogOut className="h-5 w-5 text-red-600" />
                      {t("confirm.sign.out")}
                    </DialogTitle>
                    <DialogDescription>
                      Are you sure you want to sign out from the ERP system?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsSignOutDialogOpen(false)}>
                      {t("cancel")}
                    </Button>
                    <Button variant="destructive" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      {t("sign.out")}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 overflow-hidden bg-background">
          {/* Enhanced Header */}
          <header className="sticky top-0 z-20 border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="h-8 w-8" />
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold text-foreground">{getSectionTitle(activeSection)}</h1>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{t("academic.year")}</p>
                    {backendHealth && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Live Data
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Global Search */}
                <GlobalSearch onNavigate={handleSectionChange} />
                
                {/* Notifications */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="h-4 w-4" />
                      {unreadCount > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs font-medium flex items-center justify-center">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        System Notifications
                        {unreadCount > 0 && (
                          <Badge variant="secondary" className="ml-auto">
                            {unreadCount} new
                          </Badge>
                        )}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-lg border transition-colors ${
                            notif.unread ? 'bg-accent/50 border-accent' : 'bg-muted/30 border-border'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {notif.type === "success" && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                            {notif.type === "info" && <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />}
                            {notif.type === "warning" && <Clock className="h-4 w-4 text-amber-500 mt-0.5" />}
                            <div className="flex-1">
                              <p className="font-medium text-sm">{notif.title}</p>
                              <p className="text-xs text-muted-foreground">{notif.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>



                {/* AI Chatbot Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                  className={`relative ${isChatbotOpen ? 'bg-accent text-accent-foreground' : ''}`}
                  title="AI Assistant"
                >
                  <MessageCircle className="h-4 w-4" />
                  <Badge variant="secondary" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs font-medium flex items-center justify-center">
                    AI
                  </Badge>
                </Button>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </header>
          
          {/* Main Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSectionChange("dashboard")}
                  className="h-8 px-2 hover:bg-accent"
                >
                  <Home className="h-3 w-3 mr-1" />
                  {t("home")}
                </Button>
                <span>/</span>
                <span className="font-medium text-foreground">{getSectionTitle(activeSection)}</span>
              </div>

              {/* Main Content */}
              <div className="min-h-[calc(100vh-280px)]">
                {renderContent()}
              </div>
            </div>
          </div>
        </main>

        {/* Floating Action Menu */}
        <FloatingActionMenu 
          onNavigate={handleSectionChange}
          onOpenChatbot={() => setIsChatbotOpen(true)}
        />

        {/* AI Chatbot */}
        <AIChatbot 
          onNavigate={handleSectionChange}
          isOpen={isChatbotOpen}
          onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        />
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}