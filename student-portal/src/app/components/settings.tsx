import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { toast } from "sonner";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Mail,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Monitor,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  Info,
  Building2,
  Zap,
  Award,
  Users,
  Target,
  Lightbulb
} from "lucide-react";

interface SettingsProps {
  onThemeChange?: () => void;
  isDarkMode?: boolean;
}

export function Settings({ onThemeChange, isDarkMode }: SettingsProps = {}) {
  const { language, setLanguage, t } = useLanguage();
  const [profileData, setProfileData] = useState({
    displayName: "Arjun Singh",
    username: "arjun.singh",
    email: "arjun.singh@rps.edu.in",
    phone: "+91 9876543210",
    bloodGroup: "O+",
    fatherName: "Mr. Rajesh Singh",
    motherName: "Mrs. Sunita Singh",
    address: "45 Shastri Nagar, Jaipur, Rajasthan 302016"
  });

  const [preferences, setPreferences] = useState({
    timezone: "ist",
    language: language,
    theme: "light",
    fontSize: "medium",
    compactMode: false,
    showPerformanceCharts: true,
    showQuickActions: true,
    showUpcomingEvents: true
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    gradeUpdates: true,
    assignmentReminders: true,
    examNotifications: true,
    scheduleChanges: true,
    emailDigest: "daily"
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "school",
    contactInfo: false,
    academicPerformance: false,
    activityStatus: true,
    analyticsTracking: true,
    performanceData: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Detect unsaved changes and persist settings
  useEffect(() => {
    const timer = setTimeout(() => {
      setUnsavedChanges(false);
      // Save to localStorage for persistence
      localStorage.setItem('rps-settings', JSON.stringify({
        profileData,
        preferences,
        notifications,
        privacy
      }));
    }, 100);

    return () => clearTimeout(timer);
  }, [profileData, preferences, notifications, privacy]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('rps-settings');
    if (savedSettings) {
      try {
        const data = JSON.parse(savedSettings);
        if (data.profileData) setProfileData(data.profileData);
        if (data.preferences) {
          setPreferences(data.preferences);
          // Apply saved preferences
          if (data.preferences.theme && data.preferences.theme !== 'light') {
            applyTheme(data.preferences.theme);
          }
          if (data.preferences.fontSize && data.preferences.fontSize !== 'medium') {
            applyFontSize(data.preferences.fontSize);
          }
          if (data.preferences.compactMode) {
            applyCompactMode(data.preferences.compactMode);
          }
        }
        if (data.notifications) setNotifications(data.notifications);
        if (data.privacy) setPrivacy(data.privacy);
      } catch (error) {
        console.error('Error loading saved settings:', error);
      }
    }
  }, []);

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
    
    // Handle language change specifically
    if (field === 'language') {
      setLanguage(value);
      toast.success(t("success.saved"));
    } else if (field === 'showPerformanceCharts') {
      toast.success(`Performance charts ${value ? 'enabled' : 'disabled'}`);
    } else if (field === 'showQuickActions') {
      toast.success(`Quick actions panel ${value ? 'enabled' : 'disabled'}`);
    } else if (field === 'showUpcomingEvents') {
      toast.success(`Upcoming events widget ${value ? 'enabled' : 'disabled'}`);
    } else if (field === 'timezone') {
      toast.success(`Timezone updated to ${value.toUpperCase()}`);
    } else {
      toast.success(`${field.replace(/([A-Z])/g, ' $1').trim()} updated`);
    }
  };

  const handleNotificationChange = (field: string, value: any) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
    toast.success(`Notification preference updated`);
  };

  const handlePrivacyChange = (field: string, value: any) => {
    setPrivacy(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
    toast.success(`Privacy setting updated`);
  };

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate required fields
      if (!profileData.displayName || !profileData.email) {
        toast.error("Display name and email are required");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profileData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      // Phone validation
      const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
      if (profileData.phone && !phoneRegex.test(profileData.phone.replace(/\s/g, ''))) {
        toast.error("Please enter a valid Indian phone number");
        return;
      }

      setUnsavedChanges(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async () => {
    if (!passwordData.currentPassword) {
      toast.error("Current password is required");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error("Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    const data = {
      profile: profileData,
      preferences,
      notifications,
      privacy,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rajasthan-public-school-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Settings data exported successfully!");
  };

  const resetSettings = () => {
    setPreferences({
      timezone: "ist",
      language: "hi",
      theme: "light",
      fontSize: "medium",
      compactMode: false,
      showPerformanceCharts: true,
      showQuickActions: true,
      showUpcomingEvents: true
    });
    
    setNotifications({
      email: true,
      push: true,
      sms: false,
      gradeUpdates: true,
      assignmentReminders: true,
      examNotifications: true,
      scheduleChanges: true,
      emailDigest: "daily"
    });

    setPrivacy({
      profileVisibility: "school",
      contactInfo: false,
      academicPerformance: false,
      activityStatus: true,
      analyticsTracking: true,
      performanceData: false
    });

    // Reset visual preferences
    document.documentElement.style.setProperty('--font-size', '16px');
    document.documentElement.classList.remove('compact-mode', 'dark');
    document.documentElement.classList.add('light');

    toast.success("All settings reset to defaults");
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            
            if (data.profile) {
              setProfileData(data.profile);
            }
            if (data.preferences) {
              setPreferences(data.preferences);
              // Apply imported preferences
              if (data.preferences.theme) {
                applyTheme(data.preferences.theme);
              }
              if (data.preferences.fontSize) {
                applyFontSize(data.preferences.fontSize);
              }
              if (data.preferences.compactMode !== undefined) {
                applyCompactMode(data.preferences.compactMode);
              }
            }
            if (data.notifications) {
              setNotifications(data.notifications);
            }
            if (data.privacy) {
              setPrivacy(data.privacy);
            }
            
            toast.success("Settings imported successfully!");
          } catch (error) {
            toast.error("Invalid settings file. Please check the file format.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const applyTheme = (theme: string) => {
    document.documentElement.classList.remove('light', 'dark');
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.add(isDark ? 'dark' : 'light');
    } else {
      document.documentElement.classList.add(theme);
    }
    handlePreferenceChange('theme', theme);
    
    // Call the parent theme change handler if provided
    if (onThemeChange) {
      onThemeChange();
    }
    
    toast.success(`Theme changed to ${theme === 'system' ? 'system preference' : theme} mode`);
  };

  const applyFontSize = (fontSize: string) => {
    const fontSizeMap = {
      'small': '14px',
      'medium': '16px',
      'large': '18px',
      'extra-large': '20px'
    };
    
    document.documentElement.style.setProperty('--font-size', fontSizeMap[fontSize] || '16px');
    handlePreferenceChange('fontSize', fontSize);
    toast.success(`Font size changed to ${fontSize}`);
  };

  const applyCompactMode = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add('compact-mode');
    } else {
      document.documentElement.classList.remove('compact-mode');
    }
    handlePreferenceChange('compactMode', enabled);
    toast.success(`Compact mode ${enabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences - Rajasthan Institute of Technology.</p>
        </div>
        <div className="flex gap-2">
          {unsavedChanges && (
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Discard Changes
            </Button>
          )}
          <Button variant="outline" onClick={importData}>
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>
          <Button variant="outline" onClick={exportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
                {unsavedChanges && (
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                    Unsaved changes
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name *</Label>
                  <Input 
                    id="displayName" 
                    value={profileData.displayName}
                    onChange={(e) => handleProfileChange('displayName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={profileData.username}
                    onChange={(e) => handleProfileChange('username', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select 
                    value={profileData.bloodGroup} 
                    onValueChange={(value) => handleProfileChange('bloodGroup', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input id="rollNumber" value="2025-10-015" disabled />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3>Family Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Father's Name</Label>
                    <Input 
                      id="fatherName" 
                      value={profileData.fatherName}
                      onChange={(e) => handleProfileChange('fatherName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherName">Mother's Name</Label>
                    <Input 
                      id="motherName" 
                      value={profileData.motherName}
                      onChange={(e) => handleProfileChange('motherName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={profileData.address}
                    onChange={(e) => handleProfileChange('address', e.target.value)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3>Academic Preferences</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={preferences.timezone}
                      onValueChange={(value) => handlePreferenceChange('timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      value={preferences.language}
                      onValueChange={(value) => handlePreferenceChange('language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hi">हिंदी (Operating Systems)</SelectItem>
                        <SelectItem value="en">Technical Communication</SelectItem>
                        <SelectItem value="raj">राजस्थानी (Rajasthani)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={resetSettings}>
                  Reset to Defaults
                </Button>
                <Button onClick={saveProfile} disabled={isLoading || !unsavedChanges}>
                  {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Password & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="currentPassword" 
                    type={showPassword.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                  >
                    {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input 
                    id="newPassword" 
                    type={showPassword.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                  >
                    {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type={showPassword.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                  >
                    {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={updatePassword} disabled={isLoading}>
                  {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.email} 
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.push} 
                    onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.sms} 
                    onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Academic Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Grade Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when grades are posted
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.gradeUpdates} 
                    onCheckedChange={(checked) => handleNotificationChange('gradeUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Assignment Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Reminders for upcoming assignments
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.assignmentReminders} 
                    onCheckedChange={(checked) => handleNotificationChange('assignmentReminders', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Exam Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Alerts for upcoming exams
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.examNotifications} 
                    onCheckedChange={(checked) => handleNotificationChange('examNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Schedule Changes</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified of class schedule changes
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.scheduleChanges} 
                    onCheckedChange={(checked) => handleNotificationChange('scheduleChanges', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Notification Frequency</h3>
                <div className="space-y-2">
                  <Label>Email Digest</Label>
                  <Select 
                    value={notifications.emailDigest}
                    onValueChange={(value) => handleNotificationChange('emailDigest', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Control who can see your profile information
                    </p>
                  </div>
                  <Select 
                    value={privacy.profileVisibility}
                    onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="school">School Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Contact Information</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your contact details
                    </p>
                  </div>
                  <Switch 
                    checked={privacy.contactInfo}
                    onCheckedChange={(checked) => handlePrivacyChange('contactInfo', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Academic Performance</Label>
                    <p className="text-sm text-muted-foreground">
                      Share your grades and performance with study groups
                    </p>
                  </div>
                  <Switch 
                    checked={privacy.academicPerformance}
                    onCheckedChange={(checked) => handlePrivacyChange('academicPerformance', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activity Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Show when you're online or active
                    </p>
                  </div>
                  <Switch 
                    checked={privacy.activityStatus}
                    onCheckedChange={(checked) => handlePrivacyChange('activityStatus', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Data & Analytics</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics Tracking</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve the platform with usage analytics
                    </p>
                  </div>
                  <Switch 
                    checked={privacy.analyticsTracking}
                    onCheckedChange={(checked) => handlePrivacyChange('analyticsTracking', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Performance Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Share anonymous performance data for research
                    </p>
                  </div>
                  <Switch 
                    checked={privacy.performanceData}
                    onCheckedChange={(checked) => handlePrivacyChange('performanceData', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Account Actions</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={exportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Export My Data
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive" onClick={() => {
                          toast.error("Account deletion requires administrator approval");
                        }}>
                          Delete Account
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose your preferred theme
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent ${preferences.theme === 'light' ? 'bg-accent ring-2 ring-primary' : ''}`}
                      onClick={() => applyTheme('light')}
                    >
                      <Sun className="h-8 w-8" />
                      <span className="text-sm">Light</span>
                    </div>
                    <div 
                      className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent ${preferences.theme === 'dark' ? 'bg-accent ring-2 ring-primary' : ''}`}
                      onClick={() => applyTheme('dark')}
                    >
                      <Moon className="h-8 w-8" />
                      <span className="text-sm">Dark</span>
                    </div>
                    <div 
                      className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent ${preferences.theme === 'system' ? 'bg-accent ring-2 ring-primary' : ''}`}
                      onClick={() => applyTheme('system')}
                    >
                      <Monitor className="h-8 w-8" />
                      <span className="text-sm">System</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label>Font Size</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Adjust the text size for better readability
                    </p>
                    <Select 
                      value={preferences.fontSize}
                      onValueChange={(value) => applyFontSize(value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="extra-large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Reduce spacing for more content on screen
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.compactMode}
                      onCheckedChange={(checked) => applyCompactMode(checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3>Dashboard Customization</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Performance Charts</Label>
                      <p className="text-sm text-muted-foreground">
                        Display grade trends and performance metrics
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.showPerformanceCharts}
                      onCheckedChange={(checked) => handlePreferenceChange('showPerformanceCharts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Quick Actions Panel</Label>
                      <p className="text-sm text-muted-foreground">
                        Show frequently used actions on dashboard
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.showQuickActions}
                      onCheckedChange={(checked) => handlePreferenceChange('showQuickActions', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Upcoming Events Widget</Label>
                      <p className="text-sm text-muted-foreground">
                        Display upcoming assignments and exams
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.showUpcomingEvents}
                      onCheckedChange={(checked) => handlePreferenceChange('showUpcomingEvents', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                About StudIQ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200 dark:border-blue-800/30">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">StudIQ Technologies</h3>
                  <p className="text-gray-600 dark:text-gray-300">Educational Technology Solutions</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  About Our Company
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>StudIQ is an innovative educational technology startup founded in 2025, dedicated to revolutionizing the learning experience through cutting-edge digital solutions.</p>
                  <p>As a fresh startup, we specialize in developing comprehensive Education Management Systems (EMS) that empower schools, colleges, and educational institutions across India.</p>
                  <p>Our flagship product, the StudIQ ERP Platform, is rapidly gaining traction with 50+ educational institutions already trusting our innovative solutions for efficient student management.</p>
                  <p>We have established strategic partnerships with state governments, including our prestigious collaboration with the Government of Rajasthan for digital transformation in public schools.</p>
                  <p>Our dynamic team of 25+ passionate developers, educators, and designers work around the clock to create intuitive, user-friendly interfaces that enhance educational outcomes.</p>
                  <p>StudIQ's startup mission is to democratize quality education through technology, making advanced learning tools accessible to students from all backgrounds and regions across India.</p>
                  <p>Despite being a new company, we have already initiated pilot projects in 5 states, with a strong focus on rural and underserved communities that need technological advancement.</p>
                  <p>Our AI-powered analytics and machine learning algorithms help educators track student progress, identify learning patterns, and deliver personalized educational experiences.</p>
                  <p>As a security-conscious startup, StudIQ follows industry-best practices for data protection and implements robust privacy protocols to safeguard student and institutional information.</p>
                  <p>With dedicated 16/7 technical support and multilingual interfaces supporting Operating Systems, Technical Communication, and regional languages, we ensure exceptional user experience for all our stakeholders.</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Our Mission
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    To democratize quality education through technology, making learning accessible, engaging, and effective for every student in India and beyond.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-600" />
                    Our Vision
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    To become the leading EdTech platform that empowers educational institutions with cutting-edge technology and data-driven insights.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Key Features & Services
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <span>Student Information Management</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span>Academic Performance Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                    <span>Fee Management & Online Payments</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                    <span>Professor-Parent Communication</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                    <span>Attendance Management</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 bg-teal-500 rounded-full"></div>
                    <span>Digital Learning Resources</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>studiqedu25@support.in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <span>+91 8092007098</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>www.studiq.in</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Application Information</h3>
                <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Version:</span> 1.0.0
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span> January 2025
                  </div>
                  <div>
                    <span className="font-medium">Platform:</span> Rajasthan Institute of Technology ERP
                  </div>
                  <div>
                    <span className="font-medium">License:</span> Startup Edition
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <p className="text-xs text-muted-foreground">
                  © 2025 StudIQ Technologies Pvt. Ltd. All rights reserved.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}