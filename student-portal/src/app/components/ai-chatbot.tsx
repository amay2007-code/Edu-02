import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";
import { 
  Bot, 
  Send, 
  User, 
  MessageCircle, 
  X, 
  Minimize2, 
  Maximize2,
  BookOpen,
  Calendar,
  CreditCard,
  GraduationCap,
  Settings,
  HelpCircle,
  Lightbulb,
  Clock,
  Star,
  Search,
  Volume2,
  Copy,
  RotateCcw,
  ChevronDown,
  Mic,
  MicOff
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'action' | 'suggestion';
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

interface AIChatbotProps {
  onNavigate?: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function AIChatbot({ onNavigate, isOpen, onToggle }: AIChatbotProps) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'hi' 
        ? "नमस्ते! मैं राजस्थान पब्लिक स्कूल का AI असिस्टेंट हूं। मैं आपकी फीस, परीक्षा, शेड्यूल, और अन्य स्कूल संबंधी जानकारी में मदद कर सकता हूं। आप मुझसे कुछ भी पूछ सकते हैं!"
        : language === 'raj'
        ? "राम राम! म्हूँ राजस्थान पब्लिक स्कूल को AI सहायक हूं। म्हूँ थारी फीस, परीक्षा, टाइम टेबल रो सब काम में मदद कर सकूं हूं। थूं कुण सो सवाल पूछ सकता हो!"
        : "Hello! I'm your Rajasthan Institute of Technology AI Assistant. I can help you with fees, exams, schedules, grades, and any school-related questions. Feel free to ask me anything!",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Knowledge base for the AI chatbot
  const knowledgeBase = {
    // Academic Information
    subjects: ["Technical Communication", "Operating Systems", "Advanced Calculus", "Data Structures", "Social Data Structures"],
    classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
    
    // Fee Information
    feeStructure: {
      "Tuition Fee": "₹12,000 per term",
      "Development Fee": "₹3,000 per term", 
      "Laboratory Fee": "₹2,000 per term",
      "Library Fee": "₹1,000 per term",
      "Sports Fee": "₹1,500 per term",
      "Total per term": "₹19,500"
    },
    
    // College Information
    collegeInfo: {
      name: "University of Edinburgh",
      address: "Old College, South Bridge, Edinburgh EH8 9YL",
      phone: "+44 131 650 1000",
      email: "contact@ed.ac.uk",
      timings: "9:00 AM to 5:00 PM",
      founded: "1582"
    },

    // Exam schedules
    examSchedule: {
      "Advanced Calculus": "December 20, 2025",
      "Technical Communication": "December 22, 2025", 
      "Operating Systems": "December 24, 2025",
      "Data Structures": "December 26, 2025",
      "Social Data Structures": "December 28, 2025"
    }
  };

  // Quick suggestion buttons
  const quickSuggestions = [
    {
      text: language === 'hi' ? "मेरी फीस कितनी बची है?" : language === 'raj' ? "म्हारी फीस कितनी बाकी है?" : "How much fees do I have pending?",
      icon: CreditCard,
      action: () => handleQuickQuestion("fees_pending")
    },
    {
      text: language === 'hi' ? "आज के क्लास कौन से हैं?" : language === 'raj' ? "आज को कौन सो क्लास है?" : "What are today's classes?",
      icon: Calendar,
      action: () => handleQuickQuestion("todays_classes")
    },
    {
      text: language === 'hi' ? "मेरे नंबर कैसे हैं?" : language === 'raj' ? "म्हारा नंबर कैसा है?" : "How are my grades?",
      icon: GraduationCap,
      action: () => handleQuickQuestion("grades")
    },
    {
      text: language === 'hi' ? "परीक्षा कब है?" : language === 'raj' ? "परीक्षा कदे है?" : "When are the exams?",
      icon: BookOpen,
      action: () => handleQuickQuestion("exam_schedule")
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI response system
  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    const message = userMessage.toLowerCase();
    let response = "";
    let actions: Array<{label: string; action: () => void}> = [];

    // Fee-related queries
    if (message.includes("fee") || message.includes("फीस") || message.includes("पैसा") || message.includes("payment")) {
      if (language === 'hi') {
        response = "आपकी फीस की जानकारी:\n\n• कुल फीस: ₹72,000 (वार्षिक)\n• भुगतान हो चुका: ₹39,667\n• बकाया: ₹32,333\n• अगली किस्त: 15 दिसंबर, 2025\n\nक्या आप फीस भुगतान करना चाहते हैं?";
      } else if (language === 'raj') {
        response = "थारी फीस री जानकारी:\n\n• कुल फीस: ₹72,000 (सालाना)\n• भर्या जा चुक्या: ₹39,667\n• बाकी: ₹32,333\n• आगली किस्त: 15 दिसंबर, 2025\n\nके थूं फीस भरणा चाहे हो?";
      } else {
        response = "Here's your fee information:\n\n• Total Annual Fee: ₹72,000\n• Amount Paid: ₹39,667\n• Pending Amount: ₹32,333\n• Next Due Date: December 15, 2025\n\nWould you like to make a payment?";
      }
      
      actions = [{
        label: language === 'hi' ? "फीस भुगतान करें" : language === 'raj' ? "फीस भरो" : "Pay Fees",
        action: () => {
          if (onNavigate) onNavigate("fees");
          toast.success("Opening fee payment section...");
        }
      }];
    }
    
    // Grade/Exam related queries
    else if (message.includes("grade") || message.includes("marks") || message.includes("result") || 
             message.includes("नंबर") || message.includes("परीक्षा") || message.includes("exam")) {
      if (language === 'hi') {
        response = "आपके नवीनतम परीक्षा परिणाम:\n\n• गणित: 85/100 (A)\n• अंग्रेजी: 78/100 (B+)\n• हिंदी: 92/100 (A+)\n• विज्ञान: 81/100 (A-)\n• सामाजिक विज्ञान: 87/100 (A)\n\nकुल प्रतिशत: 84.6%\nश्रेणी: A\n\nक्या आप विस्तृत रिपोर्ट देखना चाहते हैं?";
      } else if (language === 'raj') {
        response = "थारा परीक्षा रा नतीजा:\n\n• गणित: 85/100 (A)\n• अंग्रेजी: 78/100 (B+)\n• हिंदी: 92/100 (A+)\n• विज्ञान: 81/100 (A-)\n• समाज: 87/100 (A)\n\nकुल फीसदी: 84.6%\nदर्जो: A\n\nके थूं पूरी रिपोर्ट देखणा चाहे हो?";
      } else {
        response = "Your latest exam results:\n\n• Advanced Calculus: 85/100 (A)\n• Technical Communication: 78/100 (B+)\n• Operating Systems: 92/100 (A+)\n• Data Structures: 81/100 (A-)\n• Social Data Structures: 87/100 (A)\n\nOverall Percentage: 84.6%\nGrade: A\n\nWould you like to view the detailed report?";
      }
      
      actions = [{
        label: language === 'hi' ? "परीक्षा रिपोर्ट देखें" : language === 'raj' ? "परीक्षा रिपोर्ट देखो" : "View Exam Report",
        action: () => {
          if (onNavigate) onNavigate("examination-record");
          toast.success("Opening examination records...");
        }
      }];
    }
    
    // Schedule/Timetable queries
    else if (message.includes("schedule") || message.includes("course") || message.includes("timetable") || 
             message.includes("शेड्यूल") || message.includes("समय") || message.includes("क्लास")) {
      if (language === 'hi') {
        response = "आज (गुरुवार) का शेड्यूल:\n\n⏰ 8:00-8:45 AM: गणित\n⏰ 8:45-9:30 AM: अंग्रेजी\n⏰ 9:30-10:15 AM: हिंदी\n⏰ 10:15-10:30 AM: विश्राम\n⏰ 10:30-11:15 AM: विज्ञान\n⏰ 11:15-12:00 PM: सामाजिक विज्ञान\n⏰ 12:00-12:45 PM: खेल\n\nआगामी असाइनमेंट:\n• गणित: 5 दिसंबर तक\n• अंग्रेजी निबंध: 8 दिसंबर तक";
      } else if (language === 'raj') {
        response = "आज (गुरुवार) को टाइम टेबल:\n\n⏰ 8:00-8:45 AM: गणित\n⏰ 8:45-9:30 AM: अंग्रेजी\n⏰ 9:30-10:15 AM: हिंदी\n⏰ 10:15-10:30 AM: आराम\n⏰ 10:30-11:15 AM: विज्ञान\n⏰ 11:15-12:00 PM: समाज\n⏰ 12:00-12:45 PM: खेल\n\nआण वाला काम:\n• गणित: 5 दिसंबर तक\n• अंग्रेजी निबंध: 8 दिसंबर तक";
      } else {
        response = "Today's Schedule (Thursday):\n\n⏰ 8:00-8:45 AM: Advanced Calculus\n⏰ 8:45-9:30 AM: Technical Communication\n⏰ 9:30-10:15 AM: Operating Systems\n⏰ 10:15-10:30 AM: Break\n⏰ 10:30-11:15 AM: Data Structures\n⏰ 11:15-12:00 PM: Social Data Structures\n⏰ 12:00-12:45 PM: Sports\n\nUpcoming Assignments:\n• Math homework: Due Dec 5\n• Technical Communication essay: Due Dec 8";
      }
      
      actions = [{
        label: language === 'hi' ? "पूरा शेड्यूल देखें" : language === 'raj' ? "पूरो शेड्यूल देखो" : "View Full Schedule",
        action: () => {
          if (onNavigate) onNavigate("schedule");
          toast.success("Opening class schedule...");
        }
      }];
    }
    
    // Study materials/Resources queries
    else if (message.includes("study") || message.includes("book") || message.includes("material") || 
             message.includes("पढ़ाई") || message.includes("किताब") || message.includes("video")) {
      if (language === 'hi') {
        response = "उपलब्ध अध्ययन सामग्री:\n\n📚 पाठ्यक्रम पुस्तकें: 25+ PDF\n🎥 वीडियो लेक्चर: 45+ वीडियो\n📝 नोट्स और गाइडस: 30+ फाइलें\n🧪 प्रैक्टिकल गाइड: 15+ लैब मैन्युअल\n\nलोकप्रिय वीडियो:\n• गणित: द्विघात समीकरण\n• विज्ञान: न्यूटन के नियम\n• अंग्रेजी: व्याकरण मूल बातें\n\nक्या आप कोई विशिष्ट विषय खोज रहे हैं?";
      } else if (language === 'raj') {
        response = "पढ़ाई री सामग्री:\n\n📚 किताबां: 25+ PDF\n🎥 वीडियो: 45+ लेक्चर\n📝 नोट्स: 30+ फाइलां\n🧪 प्रैक्टिकल: 15+ गाइड\n\nमशहूर वीडियो:\n• गणित: द्विघात समीकरण\n• विज्ञान: न्यूटन रा नियम\n• अंग्रेजी: व्याकरण\n\nके थूं कुणसो खास विषय खोजे हो?";
      } else {
        response = "Available Study Resources:\n\n📚 Textbooks: 25+ PDFs\n🎥 Video Lectures: 45+ videos\n📝 Notes & Guides: 30+ files\n🧪 Practical Guides: 15+ lab manuals\n\nPopular Videos:\n• Advanced Calculus: Quadratic Equations\n• Data Structures: Newton's Laws\n• Technical Communication: Grammar Fundamentals\n\nAre you looking for any specific subject?";
      }
      
      actions = [{
        label: language === 'hi' ? "अध्ययन सामग्री देखें" : language === 'raj' ? "पढ़ाई री सामग्री देखो" : "Browse Study Materials",
        action: () => {
          if (onNavigate) onNavigate("resources");
          toast.success("Opening study resources...");
        }
      }];
    }
    
    // School information queries
    else if (message.includes("school") || message.includes("university") || message.includes("college") || message.includes("contact") || message.includes("address") || 
             message.includes("स्कूल") || message.includes("संपर्क") || message.includes("पता")) {
      if (language === 'hi') {
        response = "यूनिवर्सिटी ऑफ एडिनबर्ग की जानकारी:\n\n🏫 पूरा नाम: यूनिवर्सिटी ऑफ एडिनबर्ग\n📍 पता: ओल्ड कॉलेज, साउथ ब्रिज, एडिनबर्ग EH8 9YL\n📞 फोन: +44 131 650 1000\n📧 ईमेल: contact@ed.ac.uk\n⏰ समय: सुबह 9:00 से शाम 5:00 तक\n📅 स्थापना: 1582\n👥 कुल छात्र: 45,000+\n👨‍🏫 प्रोफेसर: 3,000+\n\nविश्वविद्यालय की विशेषताएं:\n• ऐतिहासिक और आधुनिक परिसर\n• विश्व स्तरीय अनुसंधान प्रयोगशालाएं\n• उत्कृष्ट छात्र संघ\n• प्रसिद्ध पुस्तकालय प्रणाली";
      } else if (language === 'raj') {
        response = "यूनिवर्सिटी ऑफ एडिनबर्ग री जानकारी:\n\n🏫 नाम: यूनिवर्सिटी ऑफ एडिनबर्ग\n📍 पतो: ओल्ड कॉलेज, साउथ ब्रिज, एडिनबर्ग EH8 9YL\n📞 फोन: +44 131 650 1000\n📧 ईमेल: contact@ed.ac.uk\n⏰ टाइम: सबेरे 9:00 सूं शाम 5:00 तक\n📅 शुरुआत: 1582\n👥 कुल छात्र: 45,000+\n👨‍🏫 टीचर: 3,000+\n\nविश्वविद्यालय री खासियतां:\n• ऐतिहासिक अर आधुनिक कैंपस\n• वर्ल्ड क्लास लैब\n• उत्कृष्ट छात्र संघ\n• मशहूर लाइब्रेरी प्रणाली";
      } else {
        response = "University of Edinburgh Information:\n\n🏫 Full Name: University of Edinburgh\n📍 Address: Old College, South Bridge, Edinburgh EH8 9YL\n📞 Phone: +44 131 650 1000\n📧 Email: contact@ed.ac.uk\n⏰ Timing: 9:00 AM to 5:00 PM\n📅 Established: 1582\n👥 Total Students: 45,000+\n👨‍🏫 Professors: 3,000+\n\nUniversity Features:\n• Historic and Modern Campus\n• World-class Research Laboratories\n• Excellent Student Unions\n• Renowned University Library System";
      }
      
      actions = [{
        label: language === 'hi' ? "संपर्क जानकारी कॉपी करें" : language === 'raj' ? "संपर्क री जानकारी कॉपी करो" : "Copy Contact Info",
        action: () => {
          navigator.clipboard.writeText("Phone: +44 131 650 1000\nEmail: contact@ed.ac.uk");
          toast.success("Contact information copied to clipboard!");
        }
      }];
    }
    
    // Settings/Profile queries
    else if (message.includes("setting") || message.includes("profile") || message.includes("password") || 
             message.includes("सेटिंग") || message.includes("प्रोफाइल") || message.includes("पासवर्ड")) {
      if (language === 'hi') {
        response = "सेटिंग्स और प्रोफाइल विकल्प:\n\n👤 व्यक्तिगत जानकारी अपडेट करें\n🔐 पासवर्ड बदलें\n🔔 नोटिफिकेशन सेटिंग्स\n🎨 थीम और भाषा\n📊 गोपनीयता सेटिंग्स\n📤 डेटा एक्सपोर्ट/इंपोर्ट\n\nक्या आप कोई विशिष्ट सेटिंग बदलना चाहते हैं?";
      } else if (language === 'raj') {
        response = "सेटिंग्स अर प्रोफाइल रा विकल्प:\n\n👤 व्यक्तिगत जानकारी अपडेट करो\n🔐 पासवर्ड बदलो\n🔔 नोटिफिकेशन सेटिंग्स\n🎨 थीम अर भाषा\n📊 प्राइवेसी सेटिंग्स\n📤 डेटा एक्सपोर्ट/इंपोर्ट\n\nके थूं कुणसी खास सेटिंग बदलणा चाहे हो?";
      } else {
        response = "Settings and Profile Options:\n\n👤 Update Personal Information\n🔐 Change Password\n🔔 Notification Settings\n🎨 Theme and Language\n📊 Privacy Settings\n📤 Data Export/Import\n\nWould you like to change any specific setting?";
      }
      
      actions = [{
        label: language === 'hi' ? "सेटिंग्स खोलें" : language === 'raj' ? "सेटिंग्स खोलो" : "Open Settings",
        action: () => {
          if (onNavigate) onNavigate("settings");
          toast.success("Opening settings...");
        }
      }];
    }
    
    // Attendance queries
    else if (message.includes("attendance") || message.includes("उपस्थिति") || message.includes("हाजिरी")) {
      if (language === 'hi') {
        response = "आपकी उपस्थिति रिपोर्ट:\n\n📊 वर्तमान महीना: 88%\n📈 पिछला महीना: 92%\n📅 इस सेमेस्टर: 89%\n\nविस्तृत जानकारी:\n• कुल स्कूल दिवस: 25\n• उपस्थित दिन: 22\n• अनुपस्थित दिन: 3\n• देर से आना: 1\n\nस्थिति: उत्कृष्ट ✅\n\nन्यूनतम आवश्यकता: 75%\nआपकी उपस्थिति: 88% 🎉";
      } else if (language === 'raj') {
        response = "थारी हाजिरी री रिपोर्ट:\n\n📊 इस महीना: 88%\n📈 पिछलो महीनो: 92%\n📅 इस सेमेस्टर: 89%\n\nविस्तार सूं जानकारी:\n• कुल स्कूल रा दिन: 25\n• हाजिर रह्या: 22\n• गैरहाजिर: 3\n• देर सूं आया: 1\n\nस्थिति: बहुत बढ़िया ✅\n\nकम सूं कम चाहिए: 75%\nथारी हाजिरी: 88% 🎉";
      } else {
        response = "Your Attendance Report:\n\n📊 Current Month: 88%\n📈 Last Month: 92%\n📅 This Semester: 89%\n\nDetailed Breakdown:\n• Total School Days: 25\n• Days Present: 22\n• Days Absent: 3\n• Late Arrivals: 1\n\nStatus: Excellent ✅\n\nMinimum Required: 75%\nYour Attendance: 88% 🎉";
      }
    }
    
    // Help and general queries
    else if (message.includes("help") || message.includes("मदद") || message.includes("सहायता") || 
             message.includes("how") || message.includes("कैसे")) {
      if (language === 'hi') {
        response = "मैं आपकी निम्नलिखित चीजों में मदद कर सकता हूं:\n\n🎓 शैक्षणिक प्रश्न\n• परीक्षा परिणाम और ग्रेड\n• असाइनमेंट और होमवर्क\n• क्लास शेड्यूल और टाइमटेबल\n\n💰 वित्तीय प्रश्न\n• फीस की स्थिति और भुगतान\n• बकाया राशि की जानकारी\n• रसीद डाउनलोड करना\n\n📚 अध्ययन सहायता\n• वीडियो लेक्चर और नोट्स\n• पाठ्यक्रम सामग्री\n• प्रैक्टिकल गाइड\n\n⚙️ तकनीकी सहायता\n• सेटिंग्स बदलना\n• पासवर्ड रीसेट करना\n• प्रोफाइल अपडेट करना\n\nबस टाइप करें कि आप क्या जानना चाहते हैं!";
      } else if (language === 'raj') {
        response = "म्हूँ थारी इन चीजां में मदद कर सकूं हूं:\n\n🎓 पढ़ाई रा सवाल\n• परीक्षा रा नतीजा अर नंबर\n• असाइनमेंट अर होमवर्क\n• क्लास शेड्यूल अर टाइमटेबल\n\n💰 पैसा रा सवाल\n• फीस री स्थिति अर भुगतान\n• बाकी पैसा री जानकारी\n• रसीद डाउनलोड करणा\n\n📚 पढ़ाई री मदद\n• वीडियो लेक्चर अर नोट्स\n• पाठ्यक्रम री सामग्री\n• प्रैक्टिकल गाइड\n\n⚙️ तकनीकी मदद\n• सेटिंग्स बदलणा\n• पासवर्ड रीसेट करणा\n• प्रोफाइल अपडेट करणा\n\nबस लिखो के थूं के जाणणा चाहो हो!";
      } else {
        response = "I can help you with the following:\n\n🎓 Academic Queries\n• Exam results and grades\n• Assignment and homework info\n• Class schedules and timetables\n\n💰 Financial Queries\n• Fee status and payments\n• Pending amount information\n• Receipt downloads\n\n📚 Study Assistance\n• Video lectures and notes\n• Course materials\n• Practical guides\n\n⚙️ Technical Support\n• Changing settings\n• Password reset\n• Profile updates\n\nJust type what you'd like to know!";
      }
    }
    
    // Default response for unrecognized queries
    else {
      if (language === 'hi') {
        response = "मुझे खुशी होगी आपकी मदद करने में! मैं निम्नलिखित विषयों पर आपकी सहायता कर सकता हूं:\n\n• फीस भुगतान और बकाया राशि 💰\n• परीक्षा परिणाम और ग्रेड 📊\n• क्लास शेड्यूल और असाइनमेंट 📅\n• अध्ययन सामग्री और वीडियो 📚\n• स्कूल की जानकारी और संपर्क 🏫\n• सेटिंग्स और प्रोफाइल अपडेट ⚙️\n\nकृपया अपना प्रश्न अधिक स्पष्ट रूप से पूछें या ऊपर दिए गए विकल्पों में से चुनें।";
      } else if (language === 'raj') {
        response = "म्हैं थारी मदद करणमें खुश हूं! म्हूँ इन चीजां में थारी सहायता कर सकूं हूं:\n\n• फीस भुगतान अर बाकी पैसा 💰\n• परीक्षा रा नतीजा अर नंबर 📊\n• क्लास शेड्यूल अर असाइनमेंट 📅\n• पढ़ाई री सामग्री अर वीडियो 📚\n• स्कूल री जानकारी अर संपर्क 🏫\n• सेटिंग्स अर प्रोफाइल अपडेट ⚙️\n\nकृपया अपणो सवाल साफ तरीके सूं पूछो या ऊपर रा विकल्पां सूं चुनो।";
      } else {
        response = "I'd be happy to help you! I can assist you with:\n\n• Fee payments and pending amounts 💰\n• Exam results and grades 📊\n• Class schedules and assignments 📅\n• Study materials and videos 📚\n• School information and contacts 🏫\n• Settings and profile updates ⚙️\n\nPlease ask your question more clearly or choose from the options above.";
      }
      
      // Add quick action buttons for common tasks
      actions = [
        {
          label: language === 'hi' ? "फीस देखें" : language === 'raj' ? "फीस देखो" : "Check Fees",
          action: () => handleQuickQuestion("fees_pending")
        },
        {
          label: language === 'hi' ? "परीक्षा परिणाम" : language === 'raj' ? "परीक्षा नतीजा" : "Exam Results", 
          action: () => handleQuickQuestion("grades")
        }
      ];
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      type: actions.length > 0 ? 'action' : 'text',
      actions
    };
  };

  const handleQuickQuestion = (type: string) => {
    let question = "";
    
    switch (type) {
      case "fees_pending":
        question = "How much fees do I have pending?";
        break;
      case "todays_classes":
        question = "What are today's classes?";
        break;
      case "grades":
        question = "How are my grades?";
        break;
      case "exam_schedule":
        question = "When are the exams?";
        break;
    }
    
    if (question) {
      sendMessage(question);
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Generate AI response
    const aiResponse = await generateAIResponse(messageText);
    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      text: language === 'hi' 
        ? "चैट साफ कर दिया गया है। मैं फिर से आपकी मदद के लिए तैयार हूं! कुछ भी पूछें।"
        : language === 'raj'
        ? "चैट साफ कर दियो गयो है। म्हूँ फेर थारी मदद रे तैयार हूं! कुछ भी पूछो।"
        : "Chat cleared! I'm ready to help you again. Ask me anything!",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }]);
    toast.success("Chat history cleared");
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
      toast.success("Reading message aloud...");
    } else {
      toast.error("Speech synthesis not supported");
    }
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'raj' ? 'hi-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("Listening... Speak now!");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        toast.success("Voice input captured!");
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast.error("Voice recognition failed");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast.error("Voice recognition not supported");
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        title="Open AI Assistant"
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-4 right-4 z-50 shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 transition-all duration-300 ${
      isMinimized ? 'h-16 w-80' : 'h-[600px] w-96'
    }`}>
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium">
                {language === 'hi' ? "AI असिस्टेंट" : language === 'raj' ? "AI सहायक" : "AI Assistant"}
              </CardTitle>
              <p className="text-xs opacity-90">
                {language === 'hi' ? "राजस्थान पब्लिक स्कूल" : language === 'raj' ? "राजस्थान पब्लिक स्कूल" : "Rajasthan Institute of Technology"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 hover:bg-white/20 text-white"
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0 hover:bg-white/20 text-white"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[400px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[280px] ${message.sender === 'user' ? 'order-first' : ''}`}>
                      <div
                        className={`rounded-lg p-3 text-sm whitespace-pre-line ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-8'
                            : 'bg-white dark:bg-gray-800 border shadow-sm'
                        }`}
                      >
                        {message.text}
                        
                        {message.sender === 'bot' && (
                          <div className="flex items-center gap-1 mt-2 opacity-60">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakMessage(message.text)}
                              className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                              title="Read aloud"
                            >
                              <Volume2 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(message.text);
                                toast.success("Message copied!");
                              }}
                              className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                              title="Copy message"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {message.actions && message.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={action.action}
                              className="h-7 text-xs"
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs text-muted-foreground mt-1 px-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {message.sender === 'user' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs">
                          {language === 'hi' ? "आप" : language === 'raj' ? "थूं" : "You"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white dark:bg-gray-800 border shadow-sm rounded-lg p-3 max-w-[280px]">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 border-t">
              <div className="flex flex-wrap gap-1 mb-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={suggestion.action}
                    className="h-7 text-xs flex items-center gap-1"
                  >
                    <suggestion.icon className="h-3 w-3" />
                    {suggestion.text.substring(0, 10)}...
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>

          <div className="p-4 border-t bg-gray-50 dark:bg-gray-900 rounded-b-lg">
            <div className="flex gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="h-8 text-xs"
                title="Clear chat"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                {language === 'hi' ? "साफ़" : language === 'raj' ? "साफ" : "Clear"}
              </Button>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    language === 'hi' 
                      ? "अपना प्रश्न टाइप करें..." 
                      : language === 'raj'
                      ? "अपणो सवाल लिखो..."
                      : "Type your question..."
                  }
                  className="pr-10"
                  autoFocus={isOpen && !isMinimized}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={startVoiceInput}
                  disabled={isListening}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  title="Voice input"
                >
                  {isListening ? <MicOff className="h-3 w-3 text-red-500" /> : <Mic className="h-3 w-3" />}
                </Button>
              </div>
              <Button
                onClick={() => sendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="h-10 w-10 p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}