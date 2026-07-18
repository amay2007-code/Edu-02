import { useState } from "react";
import { useLanguage } from "../contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { FileText, Download, Search, Filter, Award, TrendingUp, Calendar } from "lucide-react";

export function ExaminationRecord() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const examResults = [
    {
      term: "Term 2 - 2025",
      subject: "Advanced Calculus",
      code: "MATH-10",
      maxMarks: 100,
      obtainedMarks: 95,
      grade: "A+",
      percentage: 95,
      examType: "Term End",
      date: "Mar 15, 2025"
    },
    {
      term: "Term 2 - 2025",
      subject: "Data Structures",
      code: "SCI-10",
      maxMarks: 100,
      obtainedMarks: 88,
      grade: "A",
      percentage: 88,
      examType: "Term End",
      date: "Mar 12, 2025"
    },
    {
      term: "Term 2 - 2025",
      subject: "Technical Communication",
      code: "ENG-10",
      maxMarks: 100,
      obtainedMarks: 82,
      grade: "B+",
      percentage: 82,
      examType: "Term End",
      date: "Mar 10, 2025"
    },
    {
      term: "Term 2 - 2025",
      subject: "Social Data Structures",
      code: "SSC-10",
      maxMarks: 100,
      obtainedMarks: 90,
      grade: "A",
      percentage: 90,
      examType: "Term End",
      date: "Mar 8, 2025"
    },
    {
      term: "Term 2 - 2025",
      subject: "Operating Systems",
      code: "HIN-10",
      maxMarks: 100,
      obtainedMarks: 85,
      grade: "A",
      percentage: 85,
      examType: "Term End",
      date: "Mar 6, 2025"
    },
    {
      term: "Term 1 - 2025",
      subject: "Advanced Calculus",
      code: "MATH-10",
      maxMarks: 100,
      obtainedMarks: 92,
      grade: "A+",
      percentage: 92,
      examType: "Mid Term",
      date: "Sep 4, 2024"
    },
    {
      term: "Term 1 - 2025",
      subject: "Data Structures",
      code: "SCI-10",
      maxMarks: 100,
      obtainedMarks: 86,
      grade: "A",
      percentage: 86,
      examType: "Mid Term",
      date: "Sep 6, 2024"
    },
    {
      term: "Term 1 - 2025",
      subject: "Technical Communication",
      code: "ENG-10",
      maxMarks: 100,
      obtainedMarks: 79,
      grade: "B+",
      percentage: 79,
      examType: "Mid Term",
      date: "Sep 8, 2024"
    },
    {
      term: "Term 1 - 2025",
      subject: "Social Data Structures",
      code: "SSC-10",
      maxMarks: 100,
      obtainedMarks: 87,
      grade: "A",
      percentage: 87,
      examType: "Mid Term",
      date: "Sep 10, 2024"
    },
    {
      term: "Term 1 - 2025",
      subject: "Operating Systems",
      code: "HIN-10",
      maxMarks: 100,
      obtainedMarks: 83,
      grade: "A",
      percentage: 83,
      examType: "Mid Term",
      date: "Sep 12, 2024"
    }
  ];

  const getGradeBadgeVariant = (grade: string) => {
    if (grade.startsWith('A')) return 'default';
    if (grade.startsWith('B')) return 'secondary';
    if (grade.startsWith('C')) return 'outline';
    return 'destructive';
  };

  const calculateTermAverage = (term: string) => {
    const termResults = filteredResults.filter(result => result.term === term);
    const totalPercentage = termResults.reduce((sum, result) => sum + result.percentage, 0);
    return termResults.length > 0 ? (totalPercentage / termResults.length).toFixed(1) : '0.0';
  };

  const calculateOverallAverage = () => {
    if (filteredResults.length === 0) return '0.0';
    const totalPercentage = filteredResults.reduce((sum, result) => sum + result.percentage, 0);
    return (totalPercentage / filteredResults.length).toFixed(1);
  };

  const terms = [...new Set(examResults.map(result => result.term))].sort().reverse();
  const subjects = [...new Set(examResults.map(result => result.subject))].sort();

  // Filter results based on search and selections
  const filteredResults = examResults.filter(result => {
    const matchesSearch = result.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.examType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTerm = selectedTerm === "all" || result.term === selectedTerm;
    const matchesSubject = selectedSubject === "all" || result.subject === selectedSubject;
    
    return matchesSearch && matchesTerm && matchesSubject;
  });

  const downloadTranscript = () => {
    const transcriptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Academic Transcript - Rajasthan Institute of Technology</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #d97706; padding-bottom: 20px; }
        .school-name { font-size: 28px; font-weight: bold; color: #d97706; margin-bottom: 5px; }
        .school-address { font-size: 14px; color: #666; margin-bottom: 10px; }
        .transcript-title { font-size: 22px; font-weight: bold; margin: 20px 0; }
        .student-info { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        .table th { background-color: #fef3c7; font-weight: bold; }
        .summary { background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .grade-a { background-color: #dcfce7; }
        .grade-b { background-color: #fef3c7; }
        .grade-c { background-color: #fee2e2; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
        .signature { margin-top: 30px; display: flex; justify-content: space-between; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="school-name">University of Edinburgh</div>
        <div class="school-address">Old College, South Bridge, Edinburgh EH8 9YL<br>Phone: +44 131 650 1000 | Email: exams@ed.ac.uk</div>
      </div>
      
      <div class="transcript-title">ACADEMIC TRANSCRIPT</div>
      
      <div class="student-info">
        <strong>Student Name:</strong> Jane Doe<br>
        <strong>Course:</strong> BSc Computer Science<br>
        <strong>Roll Number:</strong> S2510015<br>
        <strong>Academic Year:</strong> 2025-26
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Subject Code</th>
            <th>Term</th>
            <th>Exam Type</th>
            <th>Max Marks</th>
            <th>Obtained Marks</th>
            <th>Percentage</th>
            <th>Grade</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${examResults.map(result => `
            <tr class="${result.grade.startsWith('A') ? 'grade-a' : result.grade.startsWith('B') ? 'grade-b' : 'grade-c'}">
              <td>${result.subject}</td>
              <td>${result.code}</td>
              <td>${result.term}</td>
              <td>${result.examType}</td>
              <td>${result.maxMarks}</td>
              <td>${result.obtainedMarks}</td>
              <td>${result.percentage}%</td>
              <td><strong>${result.grade}</strong></td>
              <td>${result.date}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="summary">
        <h3>Academic Summary</h3>
        <p><strong>Overall Average:</strong> ${calculateOverallAverage()}%</p>
        <p><strong>Total Exams:</strong> ${examResults.length}</p>
        <p><strong>Subjects:</strong> ${subjects.length}</p>
        ${terms.map(term => `<p><strong>${term} Average:</strong> ${calculateTermAverage(term)}%</p>`).join('')}
      </div>
      
      <div class="signature">
        <div>
          Student Signature<br><br>
          _________________<br>
          Arjun Singh
        </div>
        <div>
          Dean Signature<br><br>
          _________________<br>
          Dr. Meena Sharma<br>
          Dean
        </div>
      </div>
      
      <div class="footer">
        This is an official transcript from Rajasthan Institute of Technology.<br>
        Generated on ${new Date().toLocaleDateString('en-IN')}<br>
        <strong>जय राजस्थान!</strong>
      </div>
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(transcriptHTML);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
    toast.success("Transcript downloaded successfully!");
  };

  const downloadSubjectReport = (subject: string) => {
    const subjectResults = examResults.filter(result => result.subject === subject);
    const subjectHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${subject} Subject Report - Rajasthan Institute of Technology</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #d97706; padding-bottom: 20px; }
        .school-name { font-size: 28px; font-weight: bold; color: #d97706; margin-bottom: 5px; }
        .school-address { font-size: 14px; color: #666; margin-bottom: 10px; }
        .subject-title { font-size: 22px; font-weight: bold; margin: 20px 0; text-align: center; }
        .student-info { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        .table th { background-color: #fef3c7; font-weight: bold; }
        .performance-summary { background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .grade-a { background-color: #dcfce7; }
        .grade-b { background-color: #fef3c7; }
        .grade-c { background-color: #fee2e2; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="school-name">University of Edinburgh</div>
        <div class="school-address">Old College, South Bridge, Edinburgh EH8 9YL<br>Phone: +44 131 650 1000 | Email: exams@ed.ac.uk</div>
      </div>
      
      <div class="subject-title">${subject.toUpperCase()} - SUBJECT PERFORMANCE REPORT</div>
      
      <div class="student-info">
        <strong>Student Name:</strong> Jane Doe<br>
        <strong>Course:</strong> BSc Computer Science<br>
        <strong>Roll Number:</strong> S2510015<br>
        <strong>Academic Year:</strong> 2025-26<br>
        <strong>Report Generated:</strong> ${new Date().toLocaleDateString('en-GB')}
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Exam Type</th>
            <th>Date</th>
            <th>Max Marks</th>
            <th>Obtained Marks</th>
            <th>Percentage</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          ${subjectResults.map(result => `
            <tr class="${result.grade.startsWith('A') ? 'grade-a' : result.grade.startsWith('B') ? 'grade-b' : 'grade-c'}">
              <td>${result.term}</td>
              <td>${result.examType}</td>
              <td>${result.date}</td>
              <td>${result.maxMarks}</td>
              <td>${result.obtainedMarks}</td>
              <td>${result.percentage}%</td>
              <td><strong>${result.grade}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="performance-summary">
        <h3>${subject} Performance Summary</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <p><strong>Total Exams:</strong> ${subjectResults.length}</p>
            <p><strong>Average Percentage:</strong> ${(subjectResults.reduce((sum, r) => sum + r.percentage, 0) / subjectResults.length).toFixed(1)}%</p>
            <p><strong>Highest Score:</strong> ${Math.max(...subjectResults.map(r => r.percentage))}%</p>
            <p><strong>Lowest Score:</strong> ${Math.min(...subjectResults.map(r => r.percentage))}%</p>
          </div>
          <div>
            <p><strong>Best Grade:</strong> ${subjectResults.reduce((best, current) => current.percentage > best.percentage ? current : best).grade}</p>
            <p><strong>Total Marks Obtained:</strong> ${subjectResults.reduce((sum, r) => sum + r.obtainedMarks, 0)}</p>
            <p><strong>Total Max Marks:</strong> ${subjectResults.reduce((sum, r) => sum + r.maxMarks, 0)}</p>
            <p><strong>Overall Grade:</strong> ${(subjectResults.reduce((sum, r) => sum + r.percentage, 0) / subjectResults.length) >= 90 ? 'A+' : 
              (subjectResults.reduce((sum, r) => sum + r.percentage, 0) / subjectResults.length) >= 80 ? 'A' : 'B+'}</p>
          </div>
        </div>
      </div>
      
      <div style="margin: 20px 0; padding: 15px; background: #e0f2fe; border-radius: 8px;">
        <h3>Professor's Recommendations</h3>
        <p>Based on the performance in ${subject}, the student shows ${
          (subjectResults.reduce((sum, r) => sum + r.percentage, 0) / subjectResults.length) >= 85 ? 
          'excellent understanding and consistent performance. Continue with the current study approach.' :
          'good potential. Regular practice and focused study on weak areas will help improve performance.'
        }</p>
        <p><strong>Areas of Strength:</strong> ${
          subjectResults.filter(r => r.percentage >= 85).length > 0 ? 
          'Strong performance in most assessments' : 'Shows improvement potential'
        }</p>
        <p><strong>Areas for Improvement:</strong> ${
          subjectResults.filter(r => r.percentage < 80).length > 0 ? 
          'Focus on areas where scores are below 80%' : 'Maintain current performance level'
        }</p>
      </div>
      
      <div class="footer">
        This is an official subject report from Rajasthan Institute of Technology.<br>
        For academic guidance, please consult with the subject teacher.<br>
        <strong>जय राजस्थान!</strong>
      </div>
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(subjectHTML);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
    toast.success(`${subject} report downloaded successfully!`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTerm("all");
    setSelectedSubject("all");
    toast.success("Filters cleared");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Examination Records</h1>
        <p className="text-muted-foreground">View your academic performance and download transcripts - Rajasthan Institute of Technology.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Overall Percentage</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateOverallAverage()}%</div>
            <p className="text-xs text-muted-foreground">Current academic year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Subjects</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects.length}</div>
            <p className="text-xs text-muted-foreground">Total subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Exams Completed</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredResults.length}</div>
            <p className="text-xs text-muted-foreground">Filtered results</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Current Term</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateTermAverage('Term 2 - 2025')}%</div>
            <p className="text-xs text-muted-foreground">Term 2 Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Examination Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search subjects, codes, or exam types..." 
                  className="pl-10 w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Terms</SelectItem>
                  {terms.map(term => (
                    <SelectItem key={term} value={term}>{term}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearFilters}>
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
              <Button variant="outline" onClick={downloadTranscript}>
                <Download className="mr-2 h-4 w-4" />
                Download Transcript
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Exam Type</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6">
                    No results found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.subject}</TableCell>
                    <TableCell className="text-muted-foreground">{result.code}</TableCell>
                    <TableCell>{result.term}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{result.examType}</Badge>
                    </TableCell>
                    <TableCell>{result.obtainedMarks}/{result.maxMarks}</TableCell>
                    <TableCell>
                      <Badge variant={getGradeBadgeVariant(result.grade)}>
                        {result.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>{result.percentage}%</TableCell>
                    <TableCell className="text-muted-foreground">{result.date}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => downloadSubjectReport(result.subject)}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Term-wise Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Term-wise Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {terms.map(term => {
              const termResults = examResults.filter(r => r.term === term);
              const termAverage = calculateTermAverage(term);
              const totalMarks = termResults.reduce((sum, r) => sum + r.obtainedMarks, 0);
              const maxMarks = termResults.reduce((sum, r) => sum + r.maxMarks, 0);
              
              return (
                <div key={term} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div>
                    <div className="font-medium">{term}</div>
                    <div className="text-sm text-muted-foreground">
                      {termResults.length} subjects completed
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Last exam: {termResults[termResults.length - 1]?.date}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-lg">Average: {termAverage}%</div>
                    <div className="text-sm text-muted-foreground">
                      {totalMarks}/{maxMarks} marks
                    </div>
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedTerm(term);
                          toast.success(`Filtered to ${term}`);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Subject Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map(subject => {
              const subjectResults = examResults.filter(r => r.subject === subject);
              const average = subjectResults.reduce((sum, r) => sum + r.percentage, 0) / subjectResults.length;
              const bestGrade = subjectResults.reduce((best, current) => 
                current.percentage > best.percentage ? current : best
              );
              
              return (
                <div key={subject} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{subject}</h3>
                    <Badge variant={getGradeBadgeVariant(bestGrade.grade)}>
                      Best: {bestGrade.grade}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1">{average.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Average across {subjectResults.length} exams
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedSubject(subject);
                      toast.success(`Filtered to ${subject}`);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}