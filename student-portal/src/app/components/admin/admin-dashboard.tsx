import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
// Removed backend service imports for demo mode
import { toast } from 'sonner';
import { 
  Users, 
  UserPlus, 
  GraduationCap, 
  TrendingUp, 
  IndianRupee, 
  BarChart3,
  School,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit3,
  UserCheck
} from 'lucide-react';

export function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    class_id: '10-A',
    roll_number: '',
    phone: '',
    address: '',
    parent_email: ''
  });

  useEffect(() => {
    loadDemoData();
  }, []);

  const loadDemoData = () => {
    setIsLoading(true);
    
    // Demo data for admin dashboard
    const demoStudents = [
      {
        id: 'demo_student_001',
        name: 'Arjun Singh',
        email: 'arjun.singh@rps.edu.in',
        class_id: '10-A',
        roll_number: '2025-10-015',
        phone: '+91 98765 54321',
        admission_date: '2024-04-01T00:00:00.000Z',
        fees_status: 'partial',
        active: true,
        parent_email: 'parent@example.com'
      },
      {
        id: 'demo_student_002',
        name: 'Priya Meena',
        email: 'priya.meena@rps.edu.in',
        class_id: '10-A',
        roll_number: '2025-10-001',
        phone: '+91 98765 54322',
        admission_date: '2024-04-01T00:00:00.000Z',
        fees_status: 'paid',
        active: true,
        parent_email: 'parent1@example.com'
      },
      {
        id: 'demo_student_003',
        name: 'Rahul Gupta',
        email: 'rahul.gupta@rps.edu.in',
        class_id: '10-A',
        roll_number: '2025-10-002',
        phone: '+91 98765 54323',
        admission_date: '2024-04-01T00:00:00.000Z',
        fees_status: 'pending',
        active: true,
        parent_email: 'parent2@example.com'
      },
      {
        id: 'demo_student_004',
        name: 'Kavya Jain',
        email: 'kavya.jain@rps.edu.in',
        class_id: '11-A',
        roll_number: '2025-11-001',
        phone: '+91 98765 54324',
        admission_date: '2024-04-01T00:00:00.000Z',
        fees_status: 'paid',
        active: true,
        parent_email: 'parent3@example.com'
      }
    ];

    const demoAnalytics = {
      total_students: 500,
      total_teachers: 35,
      total_fees_collected: 2850000,
      total_fees_pending: 1420000,
      collection_percentage: 67
    };

    setStudents(demoStudents);
    setAnalytics(demoAnalytics);
    setIsLoading(false);
    
    toast.success('📊 Demo admin data loaded successfully');
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo mode - simulate user creation
    const newDemoUser = {
      id: `demo_user_${Date.now()}`,
      ...newUser,
      active: true,
      admission_date: new Date().toISOString(),
      fees_status: 'pending'
    };

    // Add to demo students list
    setStudents(prev => [...prev, newDemoUser]);
    
    toast.success(`✅ Demo ${newUser.role} "${newUser.name}" created successfully`);
    setIsCreateUserOpen(false);
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'student',
      class_id: '10-A',
      roll_number: '',
      phone: '',
      address: '',
      parent_email: ''
    });
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.roll_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'all' || student.class_id === filterClass;
    return matchesSearch && matchesClass;
  });

  const exportStudentData = () => {
    const exportData = filteredStudents.map(student => ({
      name: student.name,
      email: student.email,
      class: student.class_id,
      roll_number: student.roll_number,
      phone: student.phone,
      admission_date: student.admission_date,
      fees_status: student.fees_status
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RIT_Students_Export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Student data exported successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <span>Loading admin dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <School className="h-6 w-6" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage students, teachers, and school operations</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadDemoData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Add a new student, teacher, or parent to the system
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="Secure password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Professor</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newUser.role === 'student' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="class_id">Course</Label>
                        <Select value={newUser.class_id} onValueChange={(value) => setNewUser({ ...newUser, class_id: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6-A">Class 6-A</SelectItem>
                            <SelectItem value="7-A">Class 7-A</SelectItem>
                            <SelectItem value="8-A">Class 8-A</SelectItem>
                            <SelectItem value="9-A">Class 9-A</SelectItem>
                            <SelectItem value="10-A">CS Section A</SelectItem>
                            <SelectItem value="11-A">Class 11-A</SelectItem>
                            <SelectItem value="12-A">Class 12-A</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="roll_number">Roll Number</Label>
                        <Input
                          id="roll_number"
                          value={newUser.roll_number}
                          onChange={(e) => setNewUser({ ...newUser, roll_number: e.target.value })}
                          placeholder="2025-010"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent_email">Parent Email</Label>
                      <Input
                        id="parent_email"
                        type="email"
                        value={newUser.parent_email}
                        onChange={(e) => setNewUser({ ...newUser, parent_email: e.target.value })}
                        placeholder="parent@example.com"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create User
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.total_students}</div>
              <p className="text-xs text-muted-foreground">Active student accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Professors</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.total_teachers}</div>
              <p className="text-xs text-muted-foreground">Teaching staff</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fees Collected</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{analytics.total_fees_collected?.toLocaleString('en-IN')}</div>
              <p className="text-xs text-muted-foreground">
                {analytics.collection_percentage}% collection rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{analytics.total_fees_pending?.toLocaleString('en-IN')}</div>
              <p className="text-xs text-muted-foreground">Outstanding amount</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Students Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Student Management
              </CardTitle>
              <CardDescription>View and manage all registered students</CardDescription>
            </div>
            <Button onClick={exportStudentData} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search students by name, email, or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="6-A">Class 6-A</SelectItem>
                <SelectItem value="7-A">Class 7-A</SelectItem>
                <SelectItem value="8-A">Class 8-A</SelectItem>
                <SelectItem value="9-A">Class 9-A</SelectItem>
                <SelectItem value="10-A">CS Section A</SelectItem>
                <SelectItem value="11-A">Class 11-A</SelectItem>
                <SelectItem value="12-A">Class 12-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Admission Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.class_id}</Badge>
                    </TableCell>
                    <TableCell>{student.roll_number}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{student.phone}</div>
                        {student.parent_email && (
                          <div className="text-gray-500">Parent: {student.parent_email}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(student.active ? 'active' : 'inactive')}>
                        {student.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {student.admission_date ? new Date(student.admission_date).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Edit Student">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No students found matching your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Generate Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Generate comprehensive academic and financial reports
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Create Report
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Bulk Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Perform bulk updates on student records and fees
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Bulk Actions
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Monitor system performance and health status
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Status
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}