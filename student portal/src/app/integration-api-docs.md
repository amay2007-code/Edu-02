# 🔗 Rajasthan Public School ERP - Integration API Documentation

## Overview
This document provides comprehensive guidelines for connecting external Figma Make projects to the Rajasthan Public School ERP system. The ERP provides robust APIs for data sharing, real-time synchronization, and seamless integration.

## 🏗️ Integration Architecture

```
External Project 1 ←→ RPS ERP Backend ←→ External Project 2
                           ↕
                    External Project 3
```

## 📡 API Base Configuration

### Base URL
```
https://lbzlkfxdtlppumnauycf.supabase.co/functions/v1/make-server-5bfaaa89
```

### Authentication
All API requests require authentication:
```javascript
Headers: {
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type': 'application/json'
}
```

## 🔑 Getting Access Tokens

### Method 1: Login API
```javascript
POST /auth/login
{
  "email": "your-email@example.com",
  "password": "your-password"
}

Response:
{
  "user": { ... },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Method 2: Using Demo Accounts
```javascript
// Demo credentials for testing
const demoAccounts = {
  admin: {
    email: "admin@rps.rajasthan.gov.in",
    password: "admin123"
  },
  student: {
    email: "arjun.singh@rps.edu.in", 
    password: "student123"
  },
  teacher: {
    email: "teacher@rps.edu.in",
    password: "teacher123"
  }
};
```

## 📊 Core Integration Endpoints

### 1. Student Data Integration
Get comprehensive student information for external projects.

```javascript
GET /integration/student-data/:studentId

Response:
{
  "data": {
    "student": {
      "id": "uuid",
      "name": "Arjun Singh",
      "email": "arjun.singh@rps.edu.in",
      "class_id": "10-A",
      "roll_number": "2025-10-015",
      "phone": "+91 98765 54321",
      "parent_email": "parent@example.com"
    },
    "academic": {
      "exams": [...],
      "assignments": [...],
      "attendance": [...],
      "overall_grade": "A"
    },
    "fees": {
      "total_annual_fee": 72000,
      "paid_amount": 39667,
      "pending_amount": 32333,
      "installments": [...]
    },
    "notifications": [...],
    "last_updated": "2024-12-08T...",
    "api_version": "1.0"
  }
}
```

### 2. Webhook Integration
Send data updates from external projects to the ERP system.

```javascript
POST /integration/webhook

Payload:
{
  "event_type": "attendance_update" | "assignment_submission" | "fee_reminder",
  "student_id": "uuid",
  "data": {
    // Event-specific data
  },
  "source_project": "project-name"
}

Response:
{
  "message": "Webhook processed successfully",
  "event_id": "webhook_123456"
}
```

## 🔄 Real-time Data Synchronization

### Supported Event Types

#### 1. Attendance Updates
```javascript
{
  "event_type": "attendance_update",
  "student_id": "uuid",
  "data": {
    "date": "2024-12-08",
    "status": "present" | "absent" | "late",
    "subject": "Mathematics",
    "period": 1,
    "notes": "Optional notes"
  },
  "source_project": "attendance-tracker"
}
```

#### 2. Assignment Submissions
```javascript
{
  "event_type": "assignment_submission",
  "student_id": "uuid", 
  "data": {
    "assignment_id": "MATH-2024-001",
    "subject": "Mathematics",
    "title": "Quadratic Equations",
    "submission_date": "2024-12-08T10:30:00Z",
    "file_url": "https://...",
    "grade": "A",
    "marks": 18,
    "total_marks": 20
  },
  "source_project": "assignment-portal"
}
```

#### 3. Fee Reminders
```javascript
{
  "event_type": "fee_reminder",
  "student_id": "uuid",
  "data": {
    "message": "Third installment due on Dec 15, 2025",
    "amount": 24000,
    "due_date": "2025-12-15",
    "priority": "high"
  },
  "source_project": "fee-reminder-system"
}
```

## 📚 Additional API Endpoints

### Student Management
```javascript
// Get student profile
GET /students/:id

// Update student profile  
PUT /students/:id

// Get all students (Admin/Teacher only)
GET /students
```

### Academic Records
```javascript
// Get academic records
GET /academic/records/:studentId

// Add exam result (Teacher/Admin only)
POST /academic/exam-result
```

### Fee Management  
```javascript
// Get fee details
GET /fees/:studentId

// Process payment
POST /fees/payment
```

### Notifications
```javascript
// Get notifications
GET /notifications/:userId

// Create notification
POST /notifications
```

### File Management
```javascript
// Upload file
POST /files/upload

// File will be stored in Supabase Storage with signed URL
```

## 🔧 Integration Examples

### Example 1: Attendance Tracking System

```javascript
// External attendance project sending data to ERP
async function syncAttendanceToERP(studentId, attendanceData) {
  const response = await fetch(
    'https://lbzlkfxdtlppumnauycf.supabase.co/functions/v1/make-server-5bfaaa89/integration/webhook',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_type: 'attendance_update',
        student_id: studentId,
        data: {
          date: attendanceData.date,
          status: attendanceData.status,
          subject: attendanceData.subject,
          period: attendanceData.period
        },
        source_project: 'attendance-tracker-v1'
      })
    }
  );
  
  return await response.json();
}
```

### Example 2: Grade Book System

```javascript
// External grade book pulling student data
async function getStudentDataFromERP(studentId) {
  const response = await fetch(
    `https://lbzlkfxdtlppumnauycf.supabase.co/functions/v1/make-server-5bfaaa89/integration/student-data/${studentId}`,
    {
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      }
    }
  );
  
  const result = await response.json();
  return result.data;
}
```

### Example 3: Assignment Portal

```javascript
// Assignment submission system
async function submitAssignmentToERP(submissionData) {
  const response = await fetch(
    'https://lbzlkfxdtlppumnauycf.supabase.co/functions/v1/make-server-5bfaaa89/integration/webhook',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_type: 'assignment_submission',
        student_id: submissionData.studentId,
        data: {
          assignment_id: submissionData.assignmentId,
          subject: submissionData.subject,
          submission_date: new Date().toISOString(),
          grade: submissionData.grade,
          marks: submissionData.marks,
          total_marks: submissionData.totalMarks
        },
        source_project: 'assignment-portal-v2'
      })
    }
  );
  
  return await response.json();
}
```

## 🛠️ Setup Instructions for External Projects

### Step 1: Authentication Setup
```javascript
// In your external Figma Make project
const API_BASE = 'https://lbzlkfxdtlppumnauycf.supabase.co/functions/v1/make-server-5bfaaa89';

// Login to get access token
async function authenticateWithERP(email, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const result = await response.json();
  // Store the access_token for future requests
  localStorage.setItem('erp_token', result.access_token);
  return result.access_token;
}
```

### Step 2: Data Integration
```javascript
// Helper function for API calls
async function callERPAPI(endpoint, method = 'GET', data = null) {
  const token = localStorage.getItem('erp_token');
  
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, options);
  return await response.json();
}
```

### Step 3: Real-time Sync
```javascript
// Send updates to ERP when data changes in your project
async function syncDataToERP(eventType, studentId, eventData) {
  return await callERPAPI('/integration/webhook', 'POST', {
    event_type: eventType,
    student_id: studentId,
    data: eventData,
    source_project: 'your-project-name'
  });
}
```

## 📋 Best Practices

### 🔒 Security
- Always use HTTPS for API calls
- Store access tokens securely
- Implement proper error handling
- Validate data before sending

### ⚡ Performance
- Cache frequently accessed data
- Implement request debouncing
- Use batch operations when possible
- Monitor API rate limits

### 🔄 Data Consistency
- Handle network failures gracefully
- Implement retry mechanisms
- Validate data integrity
- Use transactions for critical updates

### 📊 Monitoring
- Log all API interactions
- Monitor response times
- Track error rates
- Set up health checks

## 🚨 Error Handling

### Common Error Responses
```javascript
// Unauthorized
{
  "error": "Unauthorized access",
  "status": 401
}

// Forbidden
{
  "error": "Access denied",
  "status": 403
}

// Not Found
{
  "error": "Student not found", 
  "status": 404
}

// Server Error
{
  "error": "Internal server error",
  "status": 500
}
```

### Error Handling Example
```javascript
async function safeAPICall(endpoint, options) {
  try {
    const response = await fetch(endpoint, options);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API call failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Handle error appropriately
    throw error;
  }
}
```

## 🔍 Testing & Debugging

### Health Check
```javascript
// Check if ERP backend is available
async function checkERPHealth() {
  const response = await fetch(`${API_BASE}/health`);
  return await response.json();
}
```

### Sample Data Access
```javascript
// Use demo student for testing
const DEMO_STUDENT_ID = "Get from login response";

async function testIntegration() {
  try {
    // Test authentication
    const token = await authenticateWithERP(
      'arjun.singh@rps.edu.in', 
      'student123'
    );
    
    // Test data retrieval
    const studentData = await callERPAPI(`/integration/student-data/${DEMO_STUDENT_ID}`);
    
    // Test webhook
    const webhookResult = await syncDataToERP(
      'attendance_update',
      DEMO_STUDENT_ID,
      {
        date: '2024-12-08',
        status: 'present',
        subject: 'Mathematics'
      }
    );
    
    console.log('Integration test successful:', {
      auth: !!token,
      data: !!studentData,
      webhook: !!webhookResult
    });
    
  } catch (error) {
    console.error('Integration test failed:', error);
  }
}
```

## 📞 Support & Resources

### Getting Help
- Review error messages in browser console
- Check network requests in developer tools
- Verify API endpoint URLs and parameters
- Ensure proper authentication headers

### API Versioning
- Current version: `v1.0`
- Backwards compatibility maintained
- New features added without breaking changes
- Version info included in responses

### Rate Limits
- 100 requests per minute per user
- Bulk operations encouraged for large datasets
- Contact admin for higher limits if needed

---

## 🎯 Integration Checklist

### ✅ Pre-Integration
- [ ] Understand the ERP data structure
- [ ] Set up authentication in your project
- [ ] Identify data sync requirements
- [ ] Plan error handling strategy

### ✅ During Integration
- [ ] Test authentication flow
- [ ] Verify data retrieval endpoints
- [ ] Implement webhook sending
- [ ] Add proper error handling

### ✅ Post-Integration
- [ ] Test end-to-end data flow
- [ ] Verify real-time synchronization
- [ ] Monitor API performance
- [ ] Document your integration

## 🎉 Success!

With these APIs and guidelines, you can successfully integrate any external Figma Make project with the Rajasthan Public School ERP system, creating a seamless, interconnected educational technology ecosystem! 🚀