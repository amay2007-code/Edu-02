import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";
import { 
  Plus, 
  CreditCard, 
  Calendar, 
  BookOpen, 
  GraduationCap,
  Download,
  Upload,
  MessageCircle,
  Settings,
  HelpCircle,
  Bell,
  Search,
  Share2,
  FileText,
  Calculator,
  Clock,
  Target,
  Zap
} from "lucide-react";

interface FloatingActionMenuProps {
  onNavigate: (section: string) => void;
  onOpenChatbot: () => void;
}

export function FloatingActionMenu({ onNavigate, onOpenChatbot }: FloatingActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      icon: CreditCard,
      label: "Pay Fees",
      color: "from-amber-500 to-orange-500",
      action: () => {
        onNavigate("fees");
        toast.success("Opening fee payment portal");
        setIsOpen(false);
      }
    },
    {
      icon: GraduationCap,
      label: "Check Results",
      color: "from-blue-500 to-indigo-500",
      action: () => {
        onNavigate("examination-record");
        toast.success("Opening examination records");
        setIsOpen(false);
      }
    },
    {
      icon: Calendar,
      label: "View Schedule",
      color: "from-purple-500 to-pink-500",
      action: () => {
        onNavigate("schedule");
        toast.success("Opening class schedule");
        setIsOpen(false);
      }
    },
    {
      icon: BookOpen,
      label: "Study Materials",
      color: "from-green-500 to-emerald-500",
      action: () => {
        onNavigate("resources");
        toast.success("Opening study resources");
        setIsOpen(false);
      }
    },
    {
      icon: MessageCircle,
      label: "AI Assistant",
      color: "from-cyan-500 to-blue-500",
      action: () => {
        onOpenChatbot();
        toast.success("Opening AI Assistant");
        setIsOpen(false);
      }
    },
    {
      icon: Download,
      label: "Download Reports",
      color: "from-gray-500 to-gray-600",
      action: () => {
        // Generate comprehensive report
        const reportContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Student Progress Report - Rajasthan Institute of Technology</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #d97706; padding-bottom: 20px; }
            .school-name { font-size: 28px; font-weight: bold; color: #d97706; margin-bottom: 5px; }
            .report-section { margin: 20px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; }
            .grade-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            .grade-table th, .grade-table td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
            .grade-table th { background-color: #f3f4f6; }
            .summary { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="school-name">Rajasthan Institute of Technology</div>
            <h2>Student Progress Report</h2>
            <p>Academic Year: 2024-25 | Class: 10th | Student: Arjun Singh</p>
            <p>Generated on: ${new Date().toLocaleDateString('en-IN')}</p>
          </div>
          
          <div class="report-section">
            <h3>📊 Academic Performance</h3>
            <table class="grade-table">
              <tr><th>Subject</th><th>Marks</th><th>Grade</th><th>Remarks</th></tr>
              <tr><td>Advanced Calculus</td><td>85/100</td><td>A</td><td>Excellent</td></tr>
              <tr><td>Technical Communication</td><td>78/100</td><td>B+</td><td>Good</td></tr>
              <tr><td>Operating Systems</td><td>92/100</td><td>A+</td><td>Outstanding</td></tr>
              <tr><td>Data Structures</td><td>81/100</td><td>A-</td><td>Very Good</td></tr>
              <tr><td>Social Data Structures</td><td>87/100</td><td>A</td><td>Excellent</td></tr>
            </table>
          </div>
          
          <div class="summary">
            <h3>📈 Overall Performance Summary</h3>
            <p><strong>Total Percentage:</strong> 84.6%</p>
            <p><strong>Overall Grade:</strong> A</p>
            <p><strong>Class Rank:</strong> 5th out of 45 students</p>
            <p><strong>Attendance:</strong> 88%</p>
          </div>
          
          <div class="report-section">
            <h3>💰 Fee Status</h3>
            <p><strong>Total Annual Fee:</strong> ₹72,000</p>
            <p><strong>Amount Paid:</strong> ₹39,667</p>
            <p><strong>Pending Amount:</strong> ₹32,333</p>
            <p><strong>Next Due Date:</strong> December 15, 2025</p>
          </div>
          
          <div class="report-section">
            <h3>🎯 Recommendations</h3>
            <ul>
              <li>Focus more on Technical Communication grammar and writing skills</li>
              <li>Maintain excellent performance in Operating Systems and Advanced Calculus</li>
              <li>Improve attendance to meet the 90% requirement</li>
              <li>Continue with current study methodology for Data Structures subjects</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p><strong>Rajasthan Institute of Technology</strong><br>
            Shastri Nagar, Jaipur, Rajasthan 302016<br>
            Phone: +91 141 234 5678 | Email: contact@rps.edu.in</p>
          </div>
        </body>
        </html>
        `;
        
        const blob = new Blob([reportContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `RIT_Student_Progress_Report_${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success("📄 Comprehensive progress report downloaded!");
        setIsOpen(false);
      }
    },
    {
      icon: Bell,
      label: "Notifications",
      color: "from-red-500 to-pink-500",
      action: () => {
        toast.info("📢 You have 3 new notifications: Fee reminder, Exam schedule, Assignment due");
        setIsOpen(false);
      }
    },
    {
      icon: Calculator,
      label: "Grade Calculator",
      color: "from-teal-500 to-cyan-500",
      action: () => {
        // Simple grade calculator
        const subjects = ["Advanced Calculus", "Technical Communication", "Operating Systems", "Data Structures", "Social Data Structures"];
        const marks = [85, 78, 92, 81, 87];
        const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
        const percentage = (totalMarks / (subjects.length * 100) * 100).toFixed(1);
        
        let grade = "F";
        if (percentage >= 90) grade = "A+";
        else if (percentage >= 80) grade = "A";
        else if (percentage >= 70) grade = "B+";
        else if (percentage >= 60) grade = "B";
        else if (percentage >= 50) grade = "C";
        
        toast.success(`🧮 Grade Calculation: ${percentage}% - Grade ${grade}`);
        toast.info(`Total: ${totalMarks}/500 | Average: ${(totalMarks/subjects.length).toFixed(1)}/100`);
        setIsOpen(false);
      }
    },
    {
      icon: Share2,
      label: "Share Progress",
      color: "from-indigo-500 to-purple-500",
      action: () => {
        const shareData = {
          title: "My Academic Progress - Rajasthan Institute of Technology",
          text: "Check out my academic progress at Rajasthan Institute of Technology! Overall Grade: A (84.6%)",
          url: window.location.href
        };
        
        if (navigator.share) {
          navigator.share(shareData)
            .then(() => toast.success("📤 Progress shared successfully!"))
            .catch(() => toast.error("Unable to share"));
        } else {
          navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
            .then(() => toast.success("📋 Progress details copied to clipboard!"))
            .catch(() => toast.error("Unable to copy"));
        }
        setIsOpen(false);
      }
    }
  ];

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {/* Quick Action Buttons */}
      {isOpen && (
        <div className="mb-4 space-y-3">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="animate-in slide-in-from-bottom-5 duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Button
                onClick={action.action}
                className={`h-12 w-12 rounded-full shadow-lg bg-gradient-to-r ${action.color} hover:scale-110 transition-all duration-200 group relative`}
                title={action.label}
              >
                <action.icon className="h-5 w-5 text-white" />
                
                {/* Tooltip */}
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {action.label}
                </div>
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        title="Quick Actions"
      >
        <Plus className="h-6 w-6 text-white" />
        
        {/* Notification Badge */}
        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs font-medium flex items-center justify-center">
          !
        </Badge>
      </Button>
    </div>
  );
}