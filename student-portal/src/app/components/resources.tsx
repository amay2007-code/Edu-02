import { useState } from "react";
import { useLanguage } from "../contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { 
  BookOpen, 
  Download, 
  FileText, 
  Video, 
  Link2, 
  Search,
  Filter,
  ExternalLink,
  Calendar,
  User,
  X,
  Eye,
  PlayCircle
} from "lucide-react";

export function Resources() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [activeTab, setActiveTab] = useState("materials");

  const studyMaterials = [
    {
      title: "Essay Writing Guidelines",
      subject: "Technical Communication",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: "Jan 28, 2025",
      uploadedBy: "Mrs. Sarah Wilson",
      category: "reference",
      description: "Comprehensive guide for essay writing techniques and formats"
    },
    {
      title: "Operating Systems Grammar Rules",
      subject: "Operating Systems",
      type: "PDF",
      size: "850 KB",
      uploadDate: "Jan 25, 2025",
      uploadedBy: "Mrs. Priya Sharma",
      category: "reference",
      description: "Complete Operating Systems grammar rules with examples"
    },
    {
      title: "Indian History Notes",
      subject: "Social Data Structures",
      type: "PDF",
      size: "2.1 MB",
      uploadDate: "Jan 22, 2025",
      uploadedBy: "Mr. Raj Kumar",
      category: "lecture-notes",
      description: "Detailed notes on Indian independence movement"
    },
    {
      title: "Algebra Practice Problems",
      subject: "Advanced Calculus",
      type: "PDF",
      size: "945 KB",
      uploadDate: "Jan 20, 2025",
      uploadedBy: "Mrs. Meera Gupta",
      category: "practice",
      description: "100+ algebra problems with step-by-step solutions"
    },
    {
      title: "Physics Experiments Guide",
      subject: "Data Structures",
      type: "PDF",
      size: "1.5 MB",
      uploadDate: "Jan 18, 2025",
      uploadedBy: "Mr. Amit Singh",
      category: "tutorial",
      description: "Laboratory experiments with safety guidelines"
    },
    {
      title: "Rajasthan Geography Notes",
      subject: "Social Data Structures",
      type: "PDF",
      size: "1.3 MB",
      uploadDate: "Jan 15, 2025",
      uploadedBy: "Dr. Anjali Jain",
      category: "reference",
      description: "Complete geography of Rajasthan state"
    }
  ];

  const videoLectures = [
    {
      title: "Technical Communication Grammar & Communication Skills",
      subject: "Technical Communication",
      duration: "45m",
      uploadDate: "Jan 30, 2025",
      instructor: "Mrs. Sarah Wilson",
      views: "145",
      thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=200&fit=crop",
      url: "https://www.youtube.com/watch?v=sWtPDrzgEqY"
    },
    {
      title: "Operating Systems Kavita aur Vyakaran",
      subject: "Operating Systems",
      duration: "35m",
      uploadDate: "Jan 28, 2025",
      instructor: "Mrs. Priya Sharma",
      views: "89",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      url: "https://www.youtube.com/watch?v=5k3S6Zx2R6k"
    },
    {
      title: "Rajasthan History and Culture",
      subject: "Social Data Structures",
      duration: "50m",
      uploadDate: "Jan 26, 2025",
      instructor: "Mr. Raj Kumar",
      views: "112",
      thumbnail: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=200&fit=crop",
      url: "https://www.youtube.com/watch?v=Q8TXgCzxEnw"
    },
    {
      title: "Quadratic Equations - Complete Guide",
      subject: "Advanced Calculus",
      duration: "40m",
      uploadDate: "Jan 24, 2025",
      instructor: "Mrs. Meera Gupta",
      views: "78",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop",
      url: "https://www.youtube.com/watch?v=yDqqOEZhqdM"
    },
    {
      title: "Newton's Laws of Motion - Physics Class 10",
      subject: "Data Structures",
      duration: "55m",
      uploadDate: "Jan 22, 2025",
      instructor: "Mr. Amit Singh",
      views: "95",
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=200&fit=crop",
      url: "https://www.youtube.com/watch?v=kKKM8Y-u7ds"
    },
    {
      title: "Cell Structure and Functions - Biology",
      subject: "Data Structures",
      duration: "42m",
      uploadDate: "Jan 20, 2025",
      instructor: "Dr. Anjali Jain",
      views: "126",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      url: "https://www.youtube.com/watch?v=URUJD5NEXC8"
    },
    {
      title: "Algebra Fundamentals for Class 10",
      subject: "Advanced Calculus",
      duration: "38m",
      uploadDate: "Jan 18, 2025",
      instructor: "Mr. Vikram Singh",
      views: "203",
      thumbnail: "https://images.unsplash.com/photo-1596495758103-64cc3b39319a?w=300&h=200&fit=crop",
      url: "https://www.youtube.com/watch?v=NybHckSEQBI"
    },
    {
      title: "Technical Communication Literature - Poem Analysis",
      subject: "Technical Communication",
      duration: "33m",
      uploadDate: "Jan 16, 2025",
      instructor: "Mrs. Renu Agarwal",
      views: "167",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      url: "https://www.youtube.com/watch?v=V5BXuZL1HAg"
    },
    {
      title: "Indian Geography - Physical Features",
      subject: "Social Data Structures",
      duration: "47m",
      uploadDate: "Jan 14, 2025",
      instructor: "Mr. Anil Kumar",
      views: "134",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      url: "https://www.youtube.com/watch?v=dJT8h89QmKo"
    },
    {
      title: "Operating Systems Gadya aur Padya",
      subject: "Operating Systems",
      duration: "41m",
      uploadDate: "Jan 12, 2025",
      instructor: "Mrs. Kamala Devi",
      views: "98",
      thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop",
      url: "https://www.youtube.com/watch?v=XyNlqQId-nk"
    }
  ];

  const externalLinks = [
    {
      title: "Khan Academy - Advanced Calculus",
      url: "https://www.khanacademy.org/math",
      description: "Free online math lessons and practice exercises",
      category: "course",
      subject: "Advanced Calculus",
      rating: 4.8
    },
    {
      title: "NCERT Digital Repository",
      url: "https://ncert.nic.in/textbook.php",
      description: "Official NCERT textbooks and study materials",
      category: "reference",
      subject: "All Subjects",
      rating: 4.9
    },
    {
      title: "BYJU'S Learning App",
      url: "https://byjus.com/",
      description: "Interactive video lessons for all subjects",
      category: "course",
      subject: "All Subjects",
      rating: 4.7
    },
    {
      title: "Vedantu - Free Live Classes",
      url: "https://www.vedantu.com/",
      description: "Free live online classes and doubt sessions",
      category: "course",
      subject: "All Subjects",
      rating: 4.6
    },
    {
      title: "Rajasthan Board Resources",
      url: "https://rajeduboard.rajasthan.gov.in/",
      description: "Official Rajasthan Board study materials and syllabus",
      category: "reference",
      subject: "All Subjects",
      rating: 4.8
    },
    {
      title: "CBSE Academic Resources",
      url: "https://cbseacademic.nic.in/",
      description: "CBSE curriculum resources and sample papers",
      category: "reference",
      subject: "All Subjects",
      rating: 4.7
    },
    {
      title: "Doubtnut - Maths & Data Structures",
      url: "https://www.doubtnut.com/",
      description: "Get instant solutions to math and science problems",
      category: "course",
      subject: "Advanced Calculus",
      rating: 4.5
    },
    {
      title: "Technical Communication Speaking Course",
      url: "https://www.englishclub.com/speaking/",
      description: "Improve Technical Communication speaking skills with practice exercises",
      category: "course",
      subject: "Technical Communication",
      rating: 4.4
    },
    {
      title: "Operating Systems Grammar Guide",
      url: "https://www.learncbse.in/hindi-grammar/",
      description: "Complete Operating Systems grammar rules and examples",
      category: "reference",
      subject: "Operating Systems",
      rating: 4.3
    },
    {
      title: "Geography Online",
      url: "https://www.worldatlas.com/",
      description: "World geography resources and interactive maps",
      category: "reference",
      subject: "Social Data Structures",
      rating: 4.6
    }
  ];

  const assignments = [
    {
      title: "Essay on Rajasthan Culture",
      subject: "Technical Communication",
      dueDate: "Feb 5, 2025",
      status: "active",
      description: "Write a 500-word essay on the rich cultural heritage of Rajasthan",
      submissionLink: "#",
      priority: "high"
    },
    {
      title: "Operating Systems Story Writing",
      subject: "Operating Systems",
      dueDate: "Feb 8, 2025",
      status: "active",
      description: "Create an original short story in Operating Systems with moral values",
      submissionLink: "#",
      priority: "medium"
    },
    {
      title: "Math Problem Set - Algebra",
      subject: "Advanced Calculus",
      dueDate: "Feb 1, 2025",
      status: "completed",
      description: "Solve all practice problems from quadratic equations chapter",
      submissionLink: "#",
      priority: "high",
      grade: "A+"
    },
    {
      title: "Data Structures Project - Renewable Energy",
      subject: "Data Structures",
      dueDate: "Jan 30, 2025",
      status: "completed",
      description: "Create a model showcasing renewable energy sources in Rajasthan",
      submissionLink: "#",
      priority: "high",
      grade: "A"
    },
    {
      title: "Rajasthan Map Work",
      subject: "Social Data Structures",
      dueDate: "Feb 10, 2025",
      status: "active",
      description: "Mark major cities, rivers and mountain ranges on Rajasthan map",
      submissionLink: "#",
      priority: "medium"
    }
  ];

  const subjects = ["All Subjects", ...new Set([
    ...studyMaterials.map(m => m.subject),
    ...videoLectures.map(v => v.subject),
    ...externalLinks.map(l => l.subject),
    ...assignments.map(a => a.subject)
  ].filter(s => s !== "All Subjects"))];

  const categories = ["all", "reference", "lecture-notes", "practice", "tutorial", "course"];

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="h-4 w-4 text-red-500" />;
      case 'video': return <Video className="h-4 w-4 text-blue-500" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lecture-notes': return 'bg-blue-100 text-blue-800';
      case 'reference': return 'bg-green-100 text-green-800';
      case 'practice': return 'bg-yellow-100 text-yellow-800';
      case 'tutorial': return 'bg-purple-100 text-purple-800';
      case 'course': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterItems = (items: any[], type: string) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSubject = selectedSubject === "all" || selectedSubject === "All Subjects" || item.subject === selectedSubject;
      
      const matchesCategory = selectedCategory === "all" || 
                             (type === 'materials' && item.category === selectedCategory) ||
                             (type === 'links' && item.category === selectedCategory);
      
      return matchesSearch && matchesSubject && matchesCategory;
    });
  };

  const downloadFile = (item: any) => {
    // Generate a detailed PDF document for the study material
    const materialHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${item.title} - Rajasthan Institute of Technology</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #d97706; padding-bottom: 20px; }
        .school-name { font-size: 28px; font-weight: bold; color: #d97706; margin-bottom: 5px; }
        .document-title { font-size: 22px; font-weight: bold; margin: 20px 0; text-align: center; }
        .document-meta { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .content { margin: 20px 0; line-height: 1.6; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="school-name">Rajasthan Institute of Technology</div>
        <div style="color: #666;">45 Shastri Nagar, Jaipur, Rajasthan - 302016</div>
        <div style="color: #d97706; font-weight: bold; margin-top: 10px;">राजस्थान पब्लिक स्कूल</div>
      </div>
      
      <div class="document-title">${item.title}</div>
      
      <div class="document-meta">
        <div><strong>Subject:</strong> ${item.subject}</div>
        <div><strong>Category:</strong> ${item.category}</div>
        <div><strong>File Type:</strong> ${item.type}</div>
        <div><strong>Size:</strong> ${item.size}</div>
        <div><strong>Uploaded by:</strong> ${item.uploadedBy}</div>
        <div><strong>Upload Date:</strong> ${item.uploadDate}</div>
      </div>
      
      <div class="content">
        <h3>Description</h3>
        <p>${item.description}</p>
        
        <h3>Study Material Content</h3>
        <p>This document contains comprehensive study material for ${item.subject}. 
        The material has been carefully prepared by ${item.uploadedBy} to help students 
        understand key concepts and excel in their academic pursuits.</p>
        
        <h3>Learning Objectives</h3>
        <ul>
          <li>Understanding fundamental concepts in ${item.subject}</li>
          <li>Practical application of theoretical knowledge</li>
          <li>Preparation for examinations and assessments</li>
          <li>Enhanced problem-solving skills</li>
        </ul>
        
        <h3>Usage Guidelines</h3>
        <ul>
          <li>Use this material as a supplement to regular classroom learning</li>
          <li>Practice exercises regularly for better retention</li>
          <li>Consult your subject teacher for any clarifications</li>
          <li>Share knowledge with classmates through study groups</li>
        </ul>
      </div>
      
      <div class="footer">
        This study material is provided by Rajasthan Institute of Technology.<br>
        For academic purposes only. All rights reserved.<br>
        <strong>जय राजस्थान!</strong>
      </div>
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(materialHTML);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
    
    toast.success(`${item.title} downloaded successfully!`);
  };

  const watchVideo = (video: any) => {
    // Open video directly in new tab
    window.open(video.url, '_blank');
    toast.success(`Opening ${video.title} in new tab...`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSubject("all");
    toast.success("Filters cleared");
  };

  const submitAssignment = (assignment: any) => {
    if (assignment.status === 'completed') {
      toast.info("Assignment already submitted");
      return;
    }
    
    // Create file input for assignment submission
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt,.jpg,.png,.ppt,.pptx';
    input.multiple = true;
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const fileNames = Array.from(files).map(f => f.name).join(', ');
        const totalSize = Array.from(files).reduce((total, file) => total + file.size, 0);
        const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
        
        // Validate file size (max 10MB per file)
        const oversizedFiles = Array.from(files).filter(file => file.size > 10 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
          toast.error(`Files too large: ${oversizedFiles.map(f => f.name).join(', ')}. Maximum size is 10MB per file.`);
          return;
        }
        
        // Show success message with details
        toast.success(`📤 Assignment Submitted Successfully!`);
        toast.info(`Files: ${fileNames} (Total: ${sizeInMB} MB)`);
        
        // Simulate submission process
        setTimeout(() => {
          toast.success(`✅ ${assignment.title} submitted to ${assignment.subject} teacher. Submission ID: RPS${Math.floor(Math.random() * 10000)}`);
          
          // Show additional confirmation
          setTimeout(() => {
            toast.info(`📧 Confirmation email sent to your registered email address. You can track submission status in your dashboard.`);
          }, 2000);
        }, 1500);
      }
    };
    
    input.click();
  };

  const filteredMaterials = filterItems(studyMaterials, 'materials');
  const filteredVideos = filterItems(videoLectures, 'videos');
  const filteredLinks = filterItems(externalLinks, 'links');
  const filteredAssignments = filterItems(assignments, 'assignments');

  return (
    <div className="space-y-6">
      <div>
        <h1>Learning Resources</h1>
        <p className="text-muted-foreground">Access study materials, video lectures, and external resources - Rajasthan Institute of Technology.</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search resources, subjects, or descriptions..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.filter(s => s !== "All Subjects").map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(activeTab === 'materials' || activeTab === 'links') && (
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.filter(c => c !== 'all').map(category => (
                      <SelectItem key={category} value={category}>
                        {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
          <TabsTrigger value="videos">Video Lectures</TabsTrigger>
          <TabsTrigger value="links">External Links</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-4">
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No study materials found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredMaterials.map((material, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      {getFileIcon(material.type)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{material.title}</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          {material.subject}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {material.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getCategoryColor(material.category)}>
                            {material.category.replace('-', ' ')}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{material.size}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {material.uploadDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {material.uploadedBy}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => toast.success(`Previewing ${material.title}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button size="sm" onClick={() => downloadFile(material)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          {filteredVideos.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No video lectures found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredVideos.map((video, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <PlayCircle className="absolute inset-0 m-auto h-6 w-6 text-white opacity-80" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{video.title}</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          {video.subject}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                          <span>Duration: {video.duration}</span>
                          <span>{video.views} views</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {video.uploadDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {video.instructor}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button size="sm" onClick={() => watchVideo(video)}>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Watch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          {filteredLinks.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No external links found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredLinks.map((link, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Link2 className="h-4 w-4 text-blue-500 mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium">{link.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {link.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getCategoryColor(link.category)}>
                            {link.category}
                          </Badge>
                          <Badge variant="outline">{link.subject}</Badge>
                          {link.rating && (
                            <span className="text-xs text-yellow-600">
                              ★ {link.rating}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground truncate block mt-1">
                          {link.url}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          window.open(link.url, '_blank');
                          toast.success(`Opening ${link.title}`);
                        }}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Site
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          {filteredAssignments.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No assignments found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredAssignments.map((assignment, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{assignment.title}</h3>
                          <Badge variant={assignment.status === 'active' ? 'default' : 'secondary'}>
                            {assignment.status}
                          </Badge>
                          <Badge className={getPriorityColor(assignment.priority)} variant="outline">
                            {assignment.priority}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {assignment.subject}
                        </div>
                        <p className="text-sm mt-2">{assignment.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {assignment.dueDate}
                          </span>
                          {assignment.grade && (
                            <span className="flex items-center gap-1 text-green-600">
                              Grade: {assignment.grade}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => downloadFile({title: `${assignment.title} Instructions`, subject: assignment.subject})}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        {assignment.status === 'active' && (
                          <Button 
                            size="sm"
                            onClick={() => submitAssignment(assignment)}
                          >
                            Submit
                          </Button>
                        )}
                        {assignment.status === 'completed' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toast.success(`Viewing grade for ${assignment.title}`)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Grade
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{studyMaterials.length}</div>
                <p className="text-xs text-muted-foreground">Study Materials</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-red-500" />
              <div>
                <div className="text-2xl font-bold">{videoLectures.length}</div>
                <p className="text-xs text-muted-foreground">Video Lectures</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{externalLinks.length}</div>
                <p className="text-xs text-muted-foreground">External Links</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{assignments.filter(a => a.status === 'active').length}</div>
                <p className="text-xs text-muted-foreground">Active Assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}