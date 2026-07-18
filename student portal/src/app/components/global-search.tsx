import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/language-context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";
import { 
  Search, 
  ArrowRight,
  LayoutDashboard,
  User,
  GraduationCap,
  Calendar,
  BookOpen,
  CreditCard,
  Settings,
  Clock,
  FileText,
  Video,
  DollarSign,
  Star,
  Target,
  Zap
} from "lucide-react";

interface GlobalSearchProps {
  onNavigate: (section: string) => void;
}

export function GlobalSearch({ onNavigate }: GlobalSearchProps) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Comprehensive search database
  const searchDatabase = [
    // Navigation sections
    { 
      id: "dashboard", 
      title: "Dashboard", 
      titleHi: "डैशबोर्ड", 
      titleRaj: "डैशबोर्ड",
      description: "Overview of academic progress, fees, and quick stats",
      descriptionHi: "शैक्षणिक प्रगति, फीस और त्वरित आंकड़ों का अवलोकन",
      descriptionRaj: "पढ़ाई री प्रगति, फीस अर जल्दी री जानकारी",
      icon: LayoutDashboard,
      type: "navigation",
      keywords: ["home", "main", "overview", "stats", "progress", "मुख्य", "घर", "प्रगति"]
    },
    { 
      id: "personal-info", 
      title: "Personal Information", 
      titleHi: "व्यक्तिगत जानकारी", 
      titleRaj: "व्यक्तिगत जानकारी",
      description: "View and edit your profile details",
      descriptionHi: "अपनी प्रोफाइल विवरण देखें और संपादित करें",
      descriptionRaj: "अपणी प्रोफाइल री जानकारी देखो अर बदलो",
      icon: User,
      type: "navigation",
      keywords: ["profile", "edit", "personal", "details", "प्रोफाइल", "व्यक्तिगत", "विवरण"]
    },
    { 
      id: "examination-record", 
      title: "Examination Records", 
      titleHi: "परीक्षा रिकॉर्ड", 
      titleRaj: "परीक्षा रिकॉर्ड",
      description: "View exam results, grades, and academic performance",
      descriptionHi: "परीक्षा परिणाम, ग्रेड और शैक्षणिक प्रदर्शन देखें",
      descriptionRaj: "परीक्षा रा नतीजा, नंबर अर पढ़ाई रो प्रदर्शन देखो",
      icon: GraduationCap,
      type: "navigation",
      keywords: ["exam", "results", "grades", "marks", "performance", "परीक्षा", "नतीजा", "नंबर", "ग्रेड"]
    },
    { 
      id: "schedule", 
      title: "Class Schedule", 
      titleHi: "कक्षा अनुसूची", 
      titleRaj: "क्लास शेड्यूल",
      description: "View timetable, assignments, and upcoming events",
      descriptionHi: "समय सारणी, असाइनमेंट और आगामी कार्यक्रम देखें",
      descriptionRaj: "टाइम टेबल, असाइनमेंट अर आण वाला कार्यक्रम देखो",
      icon: Calendar,
      type: "navigation",
      keywords: ["timetable", "course", "schedule", "assignments", "calendar", "समय", "कक्षा", "असाइनमेंट"]
    },
    { 
      id: "resources", 
      title: "Study Resources", 
      titleHi: "अध्ययन संसाधन", 
      titleRaj: "पढ़ाई री सामग्री",
      description: "Access books, videos, and learning materials",
      descriptionHi: "किताबें, वीडियो और शिक्षण सामग्री तक पहुंचें",
      descriptionRaj: "किताबां, वीडियो अर पढ़ाई री सामग्री देखो",
      icon: BookOpen,
      type: "navigation",
      keywords: ["books", "videos", "materials", "study", "learning", "किताब", "वीडियो", "पढ़ाई", "सामग्री"]
    },
    { 
      id: "fees", 
      title: "Fee Management", 
      titleHi: "फीस प्रबंधन", 
      titleRaj: "फीस प्रबंधन",
      description: "Pay fees, view receipts, and check payment history",
      descriptionHi: "फीस भुगतान करें, रसीदें देखें और भुगतान इतिहास जांचें",
      descriptionRaj: "फीस भरो, रसीद देखो अर भुगतान रो इतिहास देखो",
      icon: CreditCard,
      type: "navigation",
      keywords: ["fees", "payment", "receipt", "money", "फीस", "भुगतान", "रसीद", "पैसा"]
    },
    { 
      id: "settings", 
      title: "Settings", 
      titleHi: "सेटिंग्स", 
      titleRaj: "सेटिंग्स",
      description: "Manage preferences, theme, language, and privacy",
      descriptionHi: "प्राथमिकताएं, थीम, भाषा और गोपनीयता प्रबंधित करें",
      descriptionRaj: "प्राथमिकताएं, थीम, भाषा अर गोपनीयता प्रबंधित करो",
      icon: Settings,
      type: "navigation",
      keywords: ["preferences", "theme", "language", "privacy", "सेटिंग", "भाषा", "थीम", "गोपनीयता"]
    },

    // Quick actions
    { 
      id: "pay-fees", 
      title: "Pay Fees Online", 
      titleHi: "ऑनलाइन फीस भुगतान", 
      titleRaj: "ऑनलाइन फीस भुगतान",
      description: "Make online fee payment with Razorpay",
      descriptionHi: "Razorpay के साथ ऑनलाइन फीस भुगतान करें",
      descriptionRaj: "Razorpay रे साथ ऑनलाइन फीस भुगतान करो",
      icon: DollarSign,
      type: "action",
      action: () => onNavigate("fees"),
      keywords: ["pay", "payment", "online", "razorpay", "भुगतान", "ऑनलाइन"]
    },
    { 
      id: "check-results", 
      title: "Check Exam Results", 
      titleHi: "परीक्षा परिणाम जांचें", 
      titleRaj: "परीक्षा परिणाम जांचो",
      description: "View latest examination results and grades",
      descriptionHi: "नवीनतम परीक्षा परिणाम और ग्रेड देखें",
      descriptionRaj: "नवीनतम परीक्षा परिणाम अर ग्रेड देखो",
      icon: Star,
      type: "action",
      action: () => onNavigate("examination-record"),
      keywords: ["results", "grades", "exam", "marks", "परिणाम", "ग्रेड", "परीक्षा", "नंबर"]
    },
    { 
      id: "download-materials", 
      title: "Download Study Materials", 
      titleHi: "अध्ययन सामग्री डाउनलोड करें", 
      titleRaj: "पढ़ाई री सामग्री डाउनलोड करो",
      description: "Download PDFs, videos, and notes",
      descriptionHi: "PDFs, वीडियो और नोट्स डाउनलोड करें",
      descriptionRaj: "PDFs, वीडियो अर नोट्स डाउनलोड करो",
      icon: FileText,
      type: "action",
      action: () => onNavigate("resources"),
      keywords: ["download", "pdf", "notes", "materials", "डाउनलोड", "सामग्री", "नोट्स"]
    },
    { 
      id: "view-schedule", 
      title: "Today's Class Schedule", 
      titleHi: "आज की कक्षा अनुसूची", 
      titleRaj: "आज री क्लास शेड्यूल",
      description: "Check today's classes and timings",
      descriptionHi: "आज की कक्षाओं और समय की जांच करें",
      descriptionRaj: "आज री कक्षाओं अर समय री जांच करो",
      icon: Clock,
      type: "action",
      action: () => onNavigate("schedule"),
      keywords: ["today", "classes", "timetable", "schedule", "आज", "कक्षा", "समय"]
    },

    // Specific features
    { 
      id: "video-lectures", 
      title: "Video Lectures", 
      titleHi: "वीडियो व्याख्यान", 
      titleRaj: "वीडियो व्याख्यान",
      description: "Watch educational videos for all subjects",
      descriptionHi: "सभी विषयों के लिए शैक्षिक वीडियो देखें",
      descriptionRaj: "सब विषयां रे लिए शैक्षिक वीडियो देखो",
      icon: Video,
      type: "feature",
      action: () => {
        onNavigate("resources");
        toast.success("Opening video lectures section");
      },
      keywords: ["video", "lectures", "watch", "educational", "वीडियो", "व्याख्यान", "शैक्षिक"]
    },
    { 
      id: "ai-assistant", 
      title: "AI Assistant", 
      titleHi: "AI सहायक", 
      titleRaj: "AI सहायक",
      description: "Get help from AI chatbot for any questions",
      descriptionHi: "किसी भी प्रश्न के लिए AI चैटबॉट से मदद लें",
      descriptionRaj: "कुणसे भी सवाल रे लिए AI चैटबॉट सूं मदद लो",
      icon: Zap,
      type: "feature",
      action: () => {
        toast.success("Opening AI Assistant");
        // Will be handled by parent component
      },
      keywords: ["ai", "assistant", "chatbot", "help", "question", "सहायक", "मदद", "सवाल"]
    }
  ];

  // Filter search results
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = searchDatabase.filter(item => {
      const title = language === 'hi' ? item.titleHi : language === 'raj' ? item.titleRaj : item.title;
      const description = language === 'hi' ? item.descriptionHi : language === 'raj' ? item.descriptionRaj : item.description;
      
      return (
        title.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    });

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
  }, [searchQuery, language]);

  const handleSearchSelect = (item: any) => {
    if (item.action) {
      item.action();
    } else {
      onNavigate(item.id);
    }
    setIsOpen(false);
    setSearchQuery("");
    toast.success(`Opening ${item.title}`);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "navigation": return "bg-blue-100 text-blue-800";
      case "action": return "bg-green-100 text-green-800";
      case "feature": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          title="Global Search (Ctrl+K)"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline text-sm text-muted-foreground">
            {language === 'hi' ? "खोजें..." : language === 'raj' ? "खोजो..." : "Search..."}
          </span>
          <Badge variant="outline" className="hidden lg:inline text-xs">
            Ctrl+K
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {language === 'hi' ? "खोजें" : language === 'raj' ? "खोजो" : "Search"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Input
            placeholder={
              language === 'hi' 
                ? "कुछ भी खोजें... (फीस, परीक्षा, शेड्यूल, आदि)"
                : language === 'raj'
                ? "कुछ भी खोजो... (फीस, परीक्षा, शेड्यूल, आदि)"
                : "Search anything... (fees, exams, schedule, etc.)"
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-base"
            autoFocus
          />
          
          {searchResults.length > 0 && (
            <ScrollArea className="h-80">
              <div className="space-y-2">
                {searchResults.map((item) => {
                  const title = language === 'hi' ? item.titleHi : language === 'raj' ? item.titleRaj : item.title;
                  const description = language === 'hi' ? item.descriptionHi : language === 'raj' ? item.descriptionRaj : item.description;
                  
                  return (
                    <Card
                      key={item.id}
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => handleSearchSelect(item)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                            <item.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium truncate">{title}</h4>
                              <Badge variant="outline" className={`text-xs ${getTypeColor(item.type)}`}>
                                {item.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          )}
          
          {searchQuery && searchResults.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>
                {language === 'hi' 
                  ? "कोई परिणाम नहीं मिला"
                  : language === 'raj'
                  ? "कुणसो परिणाम कोनी मिल्यो"
                  : "No results found"
                }
              </p>
              <p className="text-sm mt-1">
                {language === 'hi' 
                  ? "कुछ और खोजने का प्रयास करें"
                  : language === 'raj'
                  ? "कुछ और खोजणे रो प्रयास करो"
                  : "Try searching for something else"
                }
              </p>
            </div>
          )}
          
          {!searchQuery && (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>
                {language === 'hi' 
                  ? "फीस, परीक्षा, शेड्यूल या कुछ और खोजें"
                  : language === 'raj'
                  ? "फीस, परीक्षा, शेड्यूल या कुछ और खोजो"
                  : "Search for fees, exams, schedule, or anything else"
                }
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}