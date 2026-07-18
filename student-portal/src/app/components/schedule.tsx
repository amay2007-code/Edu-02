import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/language-context";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, User, BookOpen, AlertCircle, Download, FileText, Printer, CalendarPlus, Bell, CheckCircle, Share2, Star, Gift, Sparkles } from "lucide-react";

export function Schedule() {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [reminders, setReminders] = useState<any[]>([]);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [currentReminderItem, setCurrentReminderItem] = useState<any>(null);
  const [reminderTime, setReminderTime] = useState("1");
  const [reminderUnit, setReminderUnit] = useState("hours");
  const [reminderMethod, setReminderMethod] = useState("notification");
  const [assignmentList, setAssignmentList] = useState([
    {
      subject: "Advanced Calculus",
      title: "Chapter 8 Exercise Problems",
      dueDate: "Dec 5, 2024",
      status: "pending",
      priority: "high"
    },
    {
      subject: "Technical Communication",
      title: "Essay on Environmental Protection",
      dueDate: "Dec 8, 2024",
      status: "in-progress",
      priority: "medium"
    },
    {
      subject: "Data Structures",
      title: "Physics Lab Report",
      dueDate: "Dec 3, 2024",
      status: "completed",
      priority: "low"
    },
    {
      subject: "Social Data Structures",
      title: "Indian History Timeline",
      dueDate: "Dec 10, 2024",
      status: "pending",
      priority: "medium"
    }
  ]);

  // Scotland Bank Holidays for 2025
  const holidays = [
    // January 2025
    { date: new Date(2025, 0, 1), name: "New Year's Day", type: "national", description: "Scotland Bank Holiday" },
    { date: new Date(2025, 0, 2), name: "2nd January Bank Holiday", type: "regional", description: "Scotland Bank Holiday" },
    
    // April 2025
    { date: new Date(2025, 3, 18), name: "Good Friday", type: "national", description: "Scotland Bank Holiday" },
    { date: new Date(2025, 3, 21), name: "Easter Monday", type: "national", description: "Scotland Bank Holiday" },
    
    // May 2025
    { date: new Date(2025, 4, 5), name: "Early May Bank Holiday", type: "national", description: "Scotland Bank Holiday" },
    { date: new Date(2025, 4, 26), name: "Spring Bank Holiday", type: "national", description: "Scotland Bank Holiday" },
    
    // August 2025
    { date: new Date(2025, 7, 4), name: "Summer Bank Holiday", type: "regional", description: "Scotland Bank Holiday" },
    
    // December 2025
    { date: new Date(2025, 11, 1), name: "St Andrew's Day", type: "regional", description: "Scottish National Day" },
    { date: new Date(2025, 11, 25), name: "Christmas Day", type: "national", description: "Scotland Bank Holiday" },
    { date: new Date(2025, 11, 26), name: "Boxing Day", type: "national", description: "Scotland Bank Holiday" },
    
    // August 2025
    { date: new Date(2025, 7, 15), name: "Independence Day", type: "national", description: "स्वतंत्रता दिवस" },
    { date: new Date(2025, 7, 16), name: "Janmashtami", type: "religious", description: "जन्माष्टमी" },
    
    // September 2025
    { date: new Date(2025, 8, 7), name: "Ganesh Chaturthi", type: "religious", description: "गणेश चतुर्थी" },
    
    // October 2025
    { date: new Date(2025, 9, 2), name: "Gandhi Jayanti", type: "national", description: "गांधी जयंती" },
    { date: new Date(2025, 9, 12), name: "Dussehra", type: "religious", description: "दशहरा" },
    { date: new Date(2025, 9, 20), name: "Karva Chauth", type: "regional", description: "करवा चौथ" },
    
    // November 2025
    { date: new Date(2025, 10, 1), name: "Diwali", type: "national", description: "दीवाली" },
    { date: new Date(2025, 10, 2), name: "Govardhan Puja", type: "religious", description: "गोवर्धन पूजा" },
    { date: new Date(2025, 10, 3), name: "Bhai Dooj", type: "religious", description: "भाई दूज" },
    { date: new Date(2025, 10, 5), name: "Guru Nanak Jayanti", type: "religious", description: "गुरु नानक जयंती" },
    
    // December 2025
    { date: new Date(2025, 11, 25), name: "Christmas Day", type: "national", description: "क्रिसमस" }
  ];

  const getHolidayForDate = (date: Date) => {
    return holidays.find(holiday => 
      holiday.date.getDate() === date.getDate() &&
      holiday.date.getMonth() === date.getMonth() &&
      holiday.date.getFullYear() === date.getFullYear()
    );
  };

  const getHolidayTypeColor = (type: string) => {
    switch (type) {
      case 'national': return 'bg-red-100 text-red-800 border-red-200';
      case 'religious': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'regional': return 'bg-green-100 text-green-800 border-green-200';
      case 'state': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUpcomingHolidays = () => {
    const today = new Date();
    const upcoming = holidays
      .filter(holiday => holiday.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
    return upcoming;
  };
  const weeklySchedule = [
    {
      day: "Monday",
      classes: [
        {
          time: "08:00 AM - 08:45 AM",
          subject: "Advanced Calculus",
          code: "MATH-10",
          instructor: "Mrs. Meera Gupta",
          room: "Room 101",
          type: "Theory"
        },
        {
          time: "08:45 AM - 09:30 AM",
          subject: "Technical Communication",
          code: "ENG-10",
          instructor: "Mrs. Sarah Wilson",
          room: "Room 205",
          type: "Theory"
        },
        {
          time: "09:50 AM - 10:35 AM",
          subject: "Data Structures",
          code: "SCI-10",
          instructor: "Mr. Amit Singh",
          room: "Lab-1",
          type: "Practical"
        },
        {
          time: "10:35 AM - 11:20 AM",
          subject: "Operating Systems",
          code: "HIN-10",
          instructor: "Mrs. Priya Sharma",
          room: "Room 203",
          type: "Theory"
        }
      ]
    },
    {
      day: "Tuesday",
      classes: [
        {
          time: "08:00 AM - 08:45 AM",
          subject: "Social Data Structures",
          code: "SSC-10",
          instructor: "Mr. Raj Kumar",
          room: "Room 102",
          type: "Theory"
        },
        {
          time: "08:45 AM - 09:30 AM",
          subject: "Advanced Calculus",
          code: "MATH-10",
          instructor: "Mrs. Meera Gupta",
          room: "Room 101",
          type: "Theory"
        },
        {
          time: "09:50 AM - 10:35 AM",
          subject: "Technical Communication",
          code: "ENG-10",
          instructor: "Mrs. Sarah Wilson",
          room: "Room 205",
          type: "Theory"
        },
        {
          time: "10:35 AM - 11:20 AM",
          subject: "Data Structures",
          code: "SCI-10",
          instructor: "Mr. Amit Singh",
          room: "Room 304",
          type: "Theory"
        }
      ]
    },
    {
      day: "Wednesday",
      classes: [
        {
          time: "08:00 AM - 08:45 AM",
          subject: "Operating Systems",
          code: "HIN-10",
          instructor: "Mrs. Priya Sharma",
          room: "Room 203",
          type: "Theory"
        },
        {
          time: "08:45 AM - 09:30 AM",
          subject: "Advanced Calculus",
          code: "MATH-10",
          instructor: "Mrs. Meera Gupta",
          room: "Room 101",
          type: "Theory"
        },
        {
          time: "09:50 AM - 10:35 AM",
          subject: "Social Data Structures",
          code: "SSC-10",
          instructor: "Mr. Raj Kumar",
          room: "Room 102",
          type: "Theory"
        },
        {
          time: "10:35 AM - 11:20 AM",
          subject: "Physical Education",
          code: "PE-10",
          instructor: "Mr. Sports Professor",
          room: "Playground",
          type: "Activity"
        }
      ]
    },
    {
      day: "Thursday",
      classes: [
        {
          time: "08:00 AM - 08:45 AM",
          subject: "Technical Communication",
          code: "ENG-10",
          instructor: "Mrs. Sarah Wilson",
          room: "Room 205",
          type: "Theory"
        },
        {
          time: "08:45 AM - 09:30 AM",
          subject: "Data Structures",
          code: "SCI-10",
          instructor: "Mr. Amit Singh",
          room: "Room 304",
          type: "Theory"
        },
        {
          time: "09:50 AM - 10:35 AM",
          subject: "Advanced Calculus",
          code: "MATH-10",
          instructor: "Mrs. Meera Gupta",
          room: "Room 101",
          type: "Theory"
        },
        {
          time: "10:35 AM - 11:20 AM",
          subject: "Computer Data Structures",
          code: "CS-10",
          instructor: "Mr. Tech Professor",
          room: "Computer Lab",
          type: "Practical"
        }
      ]
    },
    {
      day: "Friday",
      classes: [
        {
          time: "08:00 AM - 08:45 AM",
          subject: "Social Data Structures",
          code: "SSC-10",
          instructor: "Mr. Raj Kumar",
          room: "Room 102",
          type: "Theory"
        },
        {
          time: "08:45 AM - 09:30 AM",
          subject: "Operating Systems",
          code: "HIN-10",
          instructor: "Mrs. Priya Sharma",
          room: "Room 203",
          type: "Theory"
        },
        {
          time: "09:50 AM - 10:35 AM",
          subject: "Art & Craft",
          code: "ART-10",
          instructor: "Mrs. Art Professor",
          room: "Art Room",
          type: "Activity"
        }
      ]
    }
  ];

  const upcomingExams = [
    {
      subject: "Advanced Calculus",
      date: "Dec 20, 2024",
      time: "10:00 AM - 01:00 PM",
      room: "Exam Hall A",
      type: "Term End Exam"
    },
    {
      subject: "Data Structures",
      date: "Dec 22, 2024",
      time: "10:00 AM - 01:00 PM",
      room: "Exam Hall B",
      type: "Term End Exam"
    },
    {
      subject: "Technical Communication",
      date: "Dec 24, 2024",
      time: "10:00 AM - 01:00 PM",
      room: "Exam Hall A",
      type: "Term End Exam"
    }
  ];



  const getTypeColor = (type: string) => {
    switch (type) {
      case "Theory": return "bg-blue-100 text-blue-800";
      case "Practical": return "bg-green-100 text-green-800";
      case "Activity": return "bg-purple-100 text-purple-800";
      case "Project": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const downloadSchedulePDF = () => {
    const scheduleHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Weekly Schedule - University of Edinburgh</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #C9A24B; padding-bottom: 20px; }
        .school-name { font-size: 28px; font-weight: bold; color: #0F3235; margin-bottom: 5px; }
        .school-address { font-size: 14px; color: #666; margin-bottom: 10px; }
        .schedule-title { font-size: 22px; font-weight: bold; margin: 20px 0; }
        .day-schedule { margin: 20px 0; break-inside: avoid; }
        .day-header { background: #fef3c7; padding: 10px; font-weight: bold; font-size: 18px; border-radius: 8px; margin-bottom: 10px; }
        .class-item { border: 1px solid #ddd; padding: 12px; margin: 8px 0; border-radius: 6px; }
        .class-title { font-weight: bold; margin-bottom: 5px; }
        .class-details { font-size: 12px; color: #666; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="school-name">University of Edinburgh</div>
        <div class="school-address">Old College, South Bridge, Edinburgh EH8 9YL<br>Phone: +44 131 650 1000 | Email: contact@ed.ac.uk</div>
      </div>
      
      <div class="schedule-title">WEEKLY CLASS SCHEDULE - BSc CS Year 2</div>
      <div style="text-align: center; margin-bottom: 20px; color: #666;">Student: Jane Doe | Academic Year: 2025-26</div>
      
      ${weeklySchedule.map(day => `
        <div class="day-schedule">
          <div class="day-header">${day.day}</div>
          ${day.classes.length === 0 ? '<p style="text-align: center; color: #999; padding: 20px;">No classes scheduled</p>' : 
            day.classes.map(cls => `
              <div class="class-item">
                <div class="class-title">${cls.subject} (${cls.code})</div>
                <div class="class-details">
                  <strong>Time:</strong> ${cls.time}<br>
                  <strong>Instructor:</strong> ${cls.instructor}<br>
                  <strong>Room:</strong> ${cls.room}<br>
                  <strong>Type:</strong> ${cls.type}
                </div>
              </div>
            `).join('')
          }
        </div>
      `).join('')}
      
      <div class="footer">
        This is an official schedule from the University of Edinburgh.<br>
        Generated on ${new Date().toLocaleDateString('en-GB')}<br>
      </div>
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(scheduleHTML);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
    toast.success("Weekly schedule downloaded successfully!");
  };

  const downloadExamSchedulePDF = () => {
    const examHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Exam Schedule - Rajasthan Institute of Technology</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #d97706; padding-bottom: 20px; }
        .school-name { font-size: 28px; font-weight: bold; color: #d97706; margin-bottom: 5px; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th, .table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .table th { background-color: #fef3c7; font-weight: bold; }
        .exam-row { background-color: #f9f9f9; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="school-name">Rajasthan Institute of Technology</div>
        <div style="color: #d97706; font-weight: bold; margin-top: 10px;">राजस्थान पब्लिक स्कूल</div>
        <h2>EXAMINATION SCHEDULE</h2>
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          ${upcomingExams.map(exam => `
            <tr class="exam-row">
              <td><strong>${exam.subject}</strong></td>
              <td>${exam.date}</td>
              <td>${exam.time}</td>
              <td>${exam.room}</td>
              <td>${exam.type}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div style="margin: 20px 0; padding: 15px; background: #fef3c7; border-radius: 8px;">
        <h3>Important Instructions:</h3>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Students must report 30 minutes before the exam</li>
          <li>Bring your admit card and school ID</li>
          <li>Mobile phones are strictly prohibited</li>
          <li>Use only black/blue pen for writing</li>
        </ul>
      </div>
      
      <div class="footer">
        This is an official exam schedule from Rajasthan Institute of Technology.<br>
        For any queries, contact the examination office.<br>
        <strong>जय राजस्थान!</strong>
      </div>
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(examHTML);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
    toast.success("Exam schedule downloaded successfully!");
  };

  const setReminder = (item: any, type: string) => {
    setCurrentReminderItem({ ...item, type });
    setReminderDialogOpen(true);
  };

  const createReminder = () => {
    if (!currentReminderItem) return;

    const reminderTimeValue = parseInt(reminderTime);
    const reminderDate = new Date();
    
    // Calculate reminder time based on the event date
    if (currentReminderItem.date) {
      const eventDate = new Date(currentReminderItem.date);
      switch (reminderUnit) {
        case 'minutes':
          reminderDate.setTime(eventDate.getTime() - (reminderTimeValue * 60 * 1000));
          break;
        case 'hours':
          reminderDate.setTime(eventDate.getTime() - (reminderTimeValue * 60 * 60 * 1000));
          break;
        case 'days':
          reminderDate.setTime(eventDate.getTime() - (reminderTimeValue * 24 * 60 * 60 * 1000));
          break;
      }
    } else if (currentReminderItem.dueDate) {
      const dueDate = new Date(currentReminderItem.dueDate);
      switch (reminderUnit) {
        case 'minutes':
          reminderDate.setTime(dueDate.getTime() - (reminderTimeValue * 60 * 1000));
          break;
        case 'hours':
          reminderDate.setTime(dueDate.getTime() - (reminderTimeValue * 60 * 60 * 1000));
          break;
        case 'days':
          reminderDate.setTime(dueDate.getTime() - (reminderTimeValue * 24 * 60 * 60 * 1000));
          break;
      }
    }

    const newReminder = {
      id: Date.now(),
      item: currentReminderItem,
      reminderDate,
      method: reminderMethod,
      isActive: true,
      created: new Date()
    };

    setReminders(prev => [...prev, newReminder]);

    // Simulate setting up the reminder
    if (reminderMethod === 'notification') {
      // Request notification permission if not already granted
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
      
      // Set up the reminder notification
      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification(`Reminder: ${currentReminderItem.title || currentReminderItem.subject}`, {
            body: `Don't forget about your ${currentReminderItem.type}!`,
            icon: '/icon.png',
            tag: `reminder-${newReminder.id}`
          });
        }
        toast.info(`Reminder triggered for ${currentReminderItem.title || currentReminderItem.subject}!`);
      }, Math.max(1000, reminderDate.getTime() - Date.now())); // Minimum 1 second for demo
    }

    setReminderDialogOpen(false);
    toast.success(
      `Reminder set for ${currentReminderItem.title || currentReminderItem.subject} - ${reminderTimeValue} ${reminderUnit} before the event via ${reminderMethod}`
    );
  };

  const markComplete = (assignmentIndex: number) => {
    setAssignmentList(prev => prev.map((assignment, index) => 
      index === assignmentIndex 
        ? { ...assignment, status: "completed" }
        : assignment
    ));
    toast.success(`Assignment marked as completed!`);
  };

  const shareSchedule = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Class Schedule',
        text: 'Check out my weekly class schedule from Rajasthan Institute of Technology',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Schedule link copied to clipboard!");
    }
  };

  const addToCalendar = (event: any, type: string) => {
    // Generate calendar event data
    const startDate = new Date(event.date || new Date());
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours later
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Rajasthan Institute of Technology//Schedule//EN
BEGIN:VEVENT
UID:${Date.now()}@rps.edu.in
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.subject || event.title}
DESCRIPTION:${type === 'exam' ? event.type : event.description || 'Class session'}
LOCATION:${event.room || 'Rajasthan Institute of Technology'}
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rps-${type}-${event.subject || event.title}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success(`${event.subject || event.title} added to calendar!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Schedule & Calendar</h1>
          <p className="text-muted-foreground">View your class schedule, upcoming exams, and assignment deadlines.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            shareSchedule();
            toast.success("Share functionality activated!");
          }}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" onClick={() => {
            downloadSchedulePDF();
            toast.info("Preparing your schedule download...");
          }}>
            <Download className="mr-2 h-4 w-4" />
            Download Schedule
          </Button>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="exams">Upcoming Exams</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="holidays">Holiday Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
          <div className="grid gap-4">
            {weeklySchedule.map((day) => (
              <Card key={day.day}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {day.day}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {day.classes.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No classes scheduled</p>
                  ) : (
                    <div className="space-y-4">
                      {day.classes.map((cls, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{cls.subject}</h4>
                              <Badge className={getTypeColor(cls.type)}>
                                {cls.type}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {cls.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {cls.room}
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {cls.instructor}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="text-xs text-muted-foreground">{cls.code}</div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                addToCalendar(cls, 'class');
                                toast.success(`${cls.subject} class added to calendar!`);
                              }}
                              title={`Add ${cls.subject} to calendar`}
                            >
                              <CalendarPlus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exams" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Upcoming Examinations
              </CardTitle>
              <Button variant="outline" onClick={() => {
                downloadExamSchedulePDF();
                toast.info("Generating exam schedule PDF...");
              }}>
                <Download className="mr-2 h-4 w-4" />
                Download Exam Schedule
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingExams.map((exam, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium">{exam.subject}</div>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {exam.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {exam.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exam.room}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{exam.type}</Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setReminder(exam, 'exam')}
                        title={`Set reminder for ${exam.subject} exam`}
                      >
                        <Bell className="mr-1 h-3 w-3" />
                        Set Reminder
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          addToCalendar(exam, 'exam');
                          toast.success(`${exam.subject} exam added to calendar!`);
                        }}
                        title={`Add ${exam.subject} exam to calendar`}
                      >
                        <CalendarPlus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Assignment Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignmentList.map((assignment, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium">{assignment.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {assignment.subject} • Due: {assignment.dueDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status.replace('-', ' ')}
                      </Badge>
                      <Badge variant="outline" className={
                        assignment.priority === 'high' ? 'border-red-200 text-red-800' :
                        assignment.priority === 'medium' ? 'border-yellow-200 text-yellow-800' :
                        'border-green-200 text-green-800'
                      }>
                        {assignment.priority}
                      </Badge>
                      {assignment.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            markComplete(index);
                            toast.success(`${assignment.title} marked as completed! 🎉`);
                          }}
                          title={`Mark ${assignment.title} as complete`}
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Mark Complete
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setReminder(assignment, 'assignment')}
                        title={`Set reminder for ${assignment.title}`}
                      >
                        <Bell className="mr-1 h-3 w-3" />
                        Remind
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holidays" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Holiday Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Holiday Calendar 2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    holiday: holidays.map(h => h.date),
                    national: holidays.filter(h => h.type === 'national').map(h => h.date),
                    religious: holidays.filter(h => h.type === 'religious').map(h => h.date),
                    regional: holidays.filter(h => h.type === 'regional').map(h => h.date),
                    state: holidays.filter(h => h.type === 'state').map(h => h.date)
                  }}
                  modifiersStyles={{
                    holiday: { 
                      backgroundColor: '#fef3c7',
                      color: '#d97706',
                      fontWeight: 'bold'
                    },
                    national: { 
                      backgroundColor: '#fecaca',
                      color: '#dc2626'
                    },
                    religious: { 
                      backgroundColor: '#fed7aa',
                      color: '#ea580c'
                    },
                    regional: { 
                      backgroundColor: '#bbf7d0',
                      color: '#16a34a'
                    },
                    state: { 
                      backgroundColor: '#e9d5ff',
                      color: '#9333ea'
                    }
                  }}
                />
                
                {/* Selected Date Holiday Info */}
                {selectedDate && getHolidayForDate(selectedDate) && (
                  <div className="mt-4 p-4 bg-accent/50 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2">
                        {getHolidayForDate(selectedDate)?.type === 'national' && <Star className="h-4 w-4 text-red-600" />}
                        {getHolidayForDate(selectedDate)?.type === 'religious' && <Sparkles className="h-4 w-4 text-orange-600" />}
                        {getHolidayForDate(selectedDate)?.type === 'regional' && <Gift className="h-4 w-4 text-green-600" />}
                        {getHolidayForDate(selectedDate)?.type === 'state' && <Calendar className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{getHolidayForDate(selectedDate)?.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {getHolidayForDate(selectedDate)?.description}
                        </p>
                        <Badge className={getHolidayTypeColor(getHolidayForDate(selectedDate)?.type || '')} variant="outline">
                          {getHolidayForDate(selectedDate)?.type?.charAt(0).toUpperCase() + getHolidayForDate(selectedDate)?.type?.slice(1)} Holiday
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                {/* Legend */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-200 rounded"></div>
                    <span>National</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-200 rounded"></div>
                    <span>Religious</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-200 rounded"></div>
                    <span>Regional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-200 rounded"></div>
                    <span>State</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Holidays */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Upcoming Holidays
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getUpcomingHolidays().map((holiday, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-2">
                        {holiday.type === 'national' && <Star className="h-4 w-4 text-red-600" />}
                        {holiday.type === 'religious' && <Sparkles className="h-4 w-4 text-orange-600" />}
                        {holiday.type === 'regional' && <Gift className="h-4 w-4 text-green-600" />}
                        {holiday.type === 'state' && <Calendar className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">{holiday.name}</h4>
                        <p className="text-sm text-muted-foreground">{holiday.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getHolidayTypeColor(holiday.type)} variant="outline">
                            {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {holiday.date.toLocaleDateString('en-IN', { 
                              weekday: 'short', 
                              day: 'numeric', 
                              month: 'short' 
                            })}
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          addToCalendar(holiday, 'holiday')
                          toast.success(`${holiday.name} added to calendar!`)
                        }}
                        title={`Add ${holiday.name} to calendar`}
                      >
                        <CalendarPlus className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Holiday Statistics */}
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-3">Holiday Statistics 2025</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">National:</span>
                      <span className="font-medium">{holidays.filter(h => h.type === 'national').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Religious:</span>
                      <span className="font-medium">{holidays.filter(h => h.type === 'religious').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Regional:</span>
                      <span className="font-medium">{holidays.filter(h => h.type === 'regional').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">State:</span>
                      <span className="font-medium">{holidays.filter(h => h.type === 'state').length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Enhanced Reminder Dialog */}
      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Set Reminder
            </DialogTitle>
            <DialogDescription>
              Set up a reminder for {currentReminderItem?.title || currentReminderItem?.subject}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {currentReminderItem && (
              <div className="p-3 bg-accent/50 rounded-lg">
                <h4 className="font-medium">{currentReminderItem.title || currentReminderItem.subject}</h4>
                <p className="text-sm text-muted-foreground">
                  {currentReminderItem.type === 'exam' && `Exam on ${currentReminderItem.date}`}
                  {currentReminderItem.type === 'assignment' && `Due: ${currentReminderItem.dueDate}`}
                  {currentReminderItem.type === 'class' && `Class: ${currentReminderItem.time}`}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="reminderTime">Remind me</Label>
                <Input
                  id="reminderTime"
                  type="number"
                  min="1"
                  max="30"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="reminderUnit">Time unit</Label>
                <Select value={reminderUnit} onValueChange={setReminderUnit}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">minutes before</SelectItem>
                    <SelectItem value="hours">hours before</SelectItem>
                    <SelectItem value="days">days before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="reminderMethod">Reminder method</Label>
              <Select value={reminderMethod} onValueChange={setReminderMethod}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notification">Browser notification</SelectItem>
                  <SelectItem value="email">Email reminder</SelectItem>
                  <SelectItem value="sms">SMS reminder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {reminders.length > 0 && (
              <div className="pt-3 border-t">
                <Label className="text-sm font-medium">Active Reminders ({reminders.length})</Label>
                <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                  {reminders.slice(-3).map((reminder, index) => (
                    <div key={reminder.id} className="text-xs p-2 bg-muted rounded text-muted-foreground">
                      {reminder.item.title || reminder.item.subject} - {reminder.method}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createReminder}>
              <Bell className="mr-2 h-4 w-4" />
              Set Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}