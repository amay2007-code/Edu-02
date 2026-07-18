// @ts-nocheck
import { useState } from "react";
import { useLanguage } from "../contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  BookOpen, 
  Users, 
  Award,
  AlertCircle,
  CheckCircle,
  IndianRupee,
  GraduationCap,
  CalendarDays,
  FileText,
  Target,
  Star,
  Zap,
  BookOpenCheck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Activity,
  BarChart3,
  PieChart,
  TrendingDown,
  User
} from "lucide-react";

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  });

  const studentInfo = {
    name: "Jane Doe",
    course: "BSc Computer Science",
    rollNumber: "S2510015",
    fatherName: "Mr. Robert Doe",
    phone: "+44 131 650 1000",
    email: "demo@ed.ac.uk",
    address: "Old College, South Bridge, Edinburgh EH8 9YL"
  };

  const currentAcademicYear = "2025-26";

  // Quick stats
  const quickStats = [
    {
      title: t("overall.grade"),
      value: "A+",
      subtitle: t("academic.performance"),
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100",
      trend: "+2 positions",
      onClick: () => onNavigate("examination-record")
    },
    {
      title: t("attendance"),
      value: "88%",
      subtitle: "168/190 days present",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      trend: "+2% this month",
      onClick: () => onNavigate("schedule")
    },
    {
      title: t("nav.fees"),
      value: "55%",
      subtitle: "₹32,333 " + t("pending.amount"),
      icon: IndianRupee,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      trend: t("payment.due") + " Dec 15, 2025",
      onClick: () => onNavigate("fees")
    },
    {
      title: t("assignments"),
      value: "75%",
      subtitle: "18/24 " + t("completed"),
      icon: BookOpenCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      trend: "6 " + t("pending"),
      onClick: () => onNavigate("schedule")
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      title: t("mathematics") + " " + t("assignment") + " " + t("submitted"),
      time: "2 hours ago",
      type: "assignment",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: t("physics") + " Lab Report " + t("due.date") + " Tomorrow",
      time: "4 hours ago",
      type: "reminder",
      icon: AlertCircle,
      color: "text-orange-600"
    },
    {
      title: t("nav.fees") + " " + t("payment.due"),
      time: "1 day ago",
      type: "payment",
      icon: CreditCard,
      color: "text-red-600"
    },
    {
      title: t("english") + " Essay " + t("grade") + " - A+",
      time: "2 days ago",
      type: "result",
      icon: Star,
      color: "text-blue-600"
    }
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      title: t("mathematics") + " " + t("exam.results"),
      date: "Dec 20, 2025",
      time: "10:00 AM",
      location: "Room 101",
      type: "exam",
      urgent: true
    },
    {
      title: "Physics Lab Report",
      date: "Dec 16, 2025",
      time: "11:59 PM",
      location: "Online Submission",
      type: "assignment",
      urgent: true
    },
    {
      title: "Fee Payment Due",
      date: "Dec 15, 2025",
      time: "5:00 PM",
      location: "Accounts Office",
      type: "payment",
      urgent: true
    },
    {
      title: "Data Structures Exhibition",
      date: "Dec 25, 2025",
      time: "9:00 AM",
      location: "School Auditorium",
      type: "event",
      urgent: false
    }
  ];

  // Subject performance
  const subjectPerformance = [
    { subject: t("mathematics"), grade: "A+", percentage: 95, color: "bg-green-500" },
    { subject: t("physics"), grade: "A", percentage: 88, color: "bg-blue-500" },
    { subject: t("chemistry"), grade: "A", percentage: 90, color: "bg-purple-500" },
    { subject: t("english"), grade: "A+", percentage: 92, color: "bg-indigo-500" },
    { subject: t("hindi"), grade: "A", percentage: 85, color: "bg-orange-500" },
    { subject: t("social.science"), grade: "A", percentage: 87, color: "bg-teal-500" }
  ];

  // Today's schedule
  const todaySchedule = [
    { time: "9:00 AM", subject: t("mathematics"), teacher: "Mrs. Sharma", room: "101", status: "completed" },
    { time: "10:00 AM", subject: t("physics"), teacher: "Mr. Gupta", room: "Lab-1", status: "completed" },
    { time: "11:30 AM", subject: t("english"), teacher: "Ms. Verma", room: "102", status: "ongoing" },
    { time: "1:00 PM", subject: t("chemistry"), teacher: "Dr. Patel", room: "Lab-2", status: "upcoming" },
    { time: "2:30 PM", subject: t("hindi"), teacher: "Mrs. Joshi", room: "103", status: "upcoming" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-amber-950/30 p-6 rounded-xl border border-amber-200 dark:border-amber-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback className="bg-gradient-to-br from-[#0F3235] to-[#C9A24B] text-white text-lg font-bold">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {t("dashboard.welcome")} 🎓
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {t("course")} {studentInfo.course} • {t("student.roll")} • {t("academic.year")}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {currentTime.toLocaleString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {t("app.title")}, Edinburgh
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              className="bg-white/80 hover:bg-white"
              onClick={() => onNavigate("personal-info")}
            >
              <User className="h-4 w-4 mr-2" />
              {t("nav.personal.info")}
            </Button>
            <Button 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg"
              onClick={() => onNavigate("schedule")}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              {t("today.schedule")}
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-all duration-200 cursor-pointer border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
            onClick={stat.onClick}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {stat.title}
              </CardTitle>
              <div className={`h-10 w-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.subtitle}</p>
              <div className="flex items-center mt-2">
                <span className={`text-xs ${stat.color} font-medium`}>{stat.trend}</span>
                <ArrowRight className="h-3 w-3 ml-auto text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                {t("today.schedule")}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {currentTime.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate("schedule")}
            >
{t("view.schedule")}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((class_item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    class_item.status === 'ongoing' ? 'bg-blue-50 border-blue-200 dark:bg-blue-950/30' :
                    class_item.status === 'completed' ? 'bg-green-50 border-green-200 dark:bg-green-950/30' :
                    'bg-gray-50 border-gray-200 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      class_item.status === 'ongoing' ? 'bg-blue-500' :
                      class_item.status === 'completed' ? 'bg-green-500' :
                      'bg-gray-400'
                    }`}></div>
                    <div>
                      <div className="font-medium text-sm">{class_item.subject}</div>
                      <div className="text-xs text-muted-foreground">
                        {class_item.teacher} • Room {class_item.room}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{class_item.time}</div>
                    <Badge 
                      variant={
                        class_item.status === 'ongoing' ? 'default' :
                        class_item.status === 'completed' ? 'secondary' :
                        'outline'
                      }
                      className="text-xs"
                    >
                      {class_item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
{t("upcoming.events")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.slice(0, 4).map((event, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border transition-colors cursor-pointer hover:shadow-sm ${
                    event.urgent ? 'bg-red-50 border-red-200 dark:bg-red-950/30' : 'bg-gray-50 border-gray-200 dark:bg-gray-800'
                  }`}
                  onClick={() => {
                    if (event.type === 'exam') onNavigate("examination-record");
                    else if (event.type === 'assignment') onNavigate("schedule");
                    else if (event.type === 'payment') onNavigate("fees");
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {event.date} • {event.time}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        📍 {event.location}
                      </div>
                    </div>
                    {event.urgent && (
                      <Badge variant="destructive" className="text-xs">
{t("urgent")}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-3"
              onClick={() => onNavigate("schedule")}
            >
              View All Events
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Subject Performance */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Subject Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground">Current semester grades</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{subject.percentage}%</span>
                      <Badge variant="secondary" className="text-xs">
                        {subject.grade}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={subject.percentage} className="h-2" />
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate("examination-record")}
            >
              View Detailed Results
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-sm transition-shadow">
                  <div className={`mt-0.5 ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Quick Actions
          </CardTitle>
          <p className="text-sm text-muted-foreground">Frequently used features</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 bg-white/80 hover:bg-white hover:shadow-md transition-all"
              onClick={() => {
                onNavigate("fees");
                toast.success("Opening fee payment portal - ₹32,333 pending");
              }}
            >
              <CreditCard className="h-6 w-6 text-amber-600" />
              <span className="text-sm font-medium">Pay Fees</span>
              <span className="text-xs text-muted-foreground">₹32,333 pending</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 bg-white/80 hover:bg-white hover:shadow-md transition-all"
              onClick={() => {
                onNavigate("examination-record");
                toast.success("Opening examination records - Overall Grade: A (84.6%)");
              }}
            >
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium">View Results</span>
              <span className="text-xs text-muted-foreground">Latest grades</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 bg-white/80 hover:bg-white hover:shadow-md transition-all"
              onClick={() => {
                onNavigate("resources");
                toast.success("Opening study resources - 25+ materials, 45+ videos available");
              }}
            >
              <BookOpen className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium">Study Materials</span>
              <span className="text-xs text-muted-foreground">Books & resources</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 bg-white/80 hover:bg-white hover:shadow-md transition-all"
              onClick={() => onNavigate("schedule")}
            >
              <Calendar className="h-6 w-6 text-purple-600" />
              <span className="text-sm font-medium">Class Schedule</span>
              <span className="text-xs text-muted-foreground">Today & upcoming</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}