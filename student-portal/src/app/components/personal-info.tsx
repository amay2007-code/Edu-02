// @ts-nocheck
import { useState } from "react";
import { useLanguage } from "../contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Edit, Camera, Home, Droplets } from "lucide-react";

export function PersonalInfo() {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [isHostelOptedIn, setIsHostelOptedIn] = useState(true);
  const [editedData, setEditedData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "demo@ed.ac.uk",
    phone: "+44 131 650 1000",
    address: "Old College, South Bridge, Edinburgh EH8 9YL",
    bloodGroup: "O+",
    class: "BSc Computer Science",
    hostelName: "Pollock Halls (Chancellors Court)",
    roomNumber: "C-204"
  });

  const handleSave = () => {
    // Simulate API call
    toast.success("Personal information updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>{t("personal.information")}</h1>
        <p className="text-muted-foreground">{t("student.details")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>{t("profile.picture")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
{t("edit")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Profile Picture</DialogTitle>
                  <DialogDescription>
                    Upload a new profile picture. Supported formats: JPG, PNG (max 5MB)
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          toast.error("File size too large. Maximum 5MB allowed.");
                          return;
                        }
                        toast.info(`Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
                      }
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    Your new profile picture will be reviewed and updated within 24 hours.
                  </p>
                </div>
                <DialogFooter className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast.info("Upload cancelled");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      toast.success("Profile picture uploaded successfully!");
                      toast.info("Your new photo will be visible across all school platforms within 24 hours.");
                    }}
                  >
                    Upload
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Academic Status */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge>Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Course</span>
                <span>{editedData.class} (10th Standard)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Academic Year</span>
                <span>2025-26</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Board Exam</span>
                <span>March 2026</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Info */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Blood Group</span>
                <Badge variant="outline">{editedData.bloodGroup}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Roll Number</span>
                <span>2025-10-015</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Section</span>
                <span>A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">House</span>
                <span>Red House</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Details Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Details
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="mr-2 h-4 w-4" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={editedData.firstName}
                onChange={(e) => setEditedData({...editedData, firstName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={editedData.lastName}
                onChange={(e) => setEditedData({...editedData, lastName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Roll Number</Label>
              <Input id="studentId" defaultValue="2025-10-015" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" defaultValue="2009-06-15" disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={editedData.email}
                onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={editedData.phone}
                onChange={(e) => setEditedData({...editedData, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select 
                value={editedData.bloodGroup} 
                onValueChange={(value) => setEditedData({...editedData, bloodGroup: value})}
                disabled={!isEditing}
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
              <Label htmlFor="course">Course</Label>
              <Input 
                id="course" 
                value={editedData.class}
                onChange={(e) => setEditedData({...editedData, class: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              value={editedData.address}
              onChange={(e) => setEditedData({...editedData, address: e.target.value})}
              disabled={!isEditing}
            />
          </div>
          
          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Academic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="school">College Name</Label>
              <Input id="school" defaultValue="University of Edinburgh" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="board">University Body</Label>
              <Input id="board" defaultValue="Senate of the University" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stream">Specialization</Label>
              <Input id="stream" defaultValue="Software Engineering" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classTeacher">Faculty Advisor</Label>
              <Input id="classTeacher" defaultValue="Mrs. Priya Gupta" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admissionDate">Admission Date</Label>
              <Input id="admissionDate" type="date" defaultValue="2019-04-01" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentPercentage">Current Percentage</Label>
              <Input id="currentPercentage" defaultValue="87.5%" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parent Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Parent/Guardian Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fatherName">Father's Name</Label>
              <Input id="fatherName" defaultValue="Mr. Rajesh Singh" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherName">Mother's Name</Label>
              <Input id="motherName" defaultValue="Mrs. Sunita Singh" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fatherOccupation">Father's Occupation</Label>
              <Input id="fatherOccupation" defaultValue="Government Officer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherOccupation">Mother's Occupation</Label>
              <Input id="motherOccupation" defaultValue="Professor" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentPhone">Parent Contact</Label>
              <Input id="parentPhone" type="tel" defaultValue="+44 131 650 1001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentEmail">Parent Email</Label>
              <Input id="parentEmail" type="email" defaultValue="robert.doe@ed.ac.uk" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input id="emergencyContact" defaultValue="Uncle - John Doe (+44 7700 900077)" />
          </div>
        </CardContent>
      </Card>

      {/* Hostel Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Hostel Allocation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="hostel-opt"
              checked={isHostelOptedIn}
              onCheckedChange={setIsHostelOptedIn}
              disabled={!isEditing}
            />
            <Label htmlFor="hostel-opt">Hostel Opted</Label>
          </div>
          
          {isHostelOptedIn && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hostelName">Hostel Name</Label>
                <Input 
                  id="hostelName" 
                  value={editedData.hostelName}
                  onChange={(e) => setEditedData({...editedData, hostelName: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input 
                  id="roomNumber" 
                  value={editedData.roomNumber}
                  onChange={(e) => setEditedData({...editedData, roomNumber: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roommate">Roommate</Label>
                <Input id="roommate" defaultValue="Arjun Patel" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warden">Hostel Warden</Label>
                <Input id="warden" defaultValue="Mr. Suresh Kumar" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hostelFee">Monthly Hostel Fee</Label>
                <Input id="hostelFee" defaultValue="₹8,000" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkInDate">Check-in Date</Label>
                <Input id="checkInDate" type="date" defaultValue="2024-04-01" disabled />
              </div>
            </div>
          )}
          
          {!isHostelOptedIn && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Student has not opted for hostel accommodation. Contact the administration office to apply for hostel allocation.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}