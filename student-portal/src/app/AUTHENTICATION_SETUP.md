# Authentication Setup Guide

## Overview
The Rajasthan Public School ERP system now uses **real Supabase authentication** with a full backend. All demo mode functionality has been removed.

## Initial Setup

### 1. Initialize Demo Data (First Time Only)
Before you can login, you need to initialize the demo data. The backend server will automatically attempt to initialize demo data on startup.

If you need to manually initialize:
- The system will show a login page
- If no users exist, you'll need to initialize demo accounts through the backend

### 2. Demo User Accounts
After initialization, the following demo accounts will be available:

#### Admin Account
- **Email:** `admin@rps.rajasthan.gov.in`
- **Password:** `admin123`
- **Name:** Dr. Rajesh Kumar
- **Role:** Administrator

#### Student Account
- **Email:** `arjun.singh@rps.edu.in`
- **Password:** `student123`
- **Name:** Arjun Singh
- **Role:** Student
- **Class:** 10-A
- **Roll Number:** 2025-10-015

#### Teacher Account
- **Email:** `teacher@rps.edu.in`
- **Password:** `teacher123`
- **Name:** Prof. Sunita Sharma
- **Role:** Teacher

#### Parent Account
- **Email:** `parent@example.com`
- **Password:** `parent123`
- **Name:** Vikram Singh
- **Role:** Parent

## How It Works

### Authentication Flow
1. **Login:** User enters email and password on the login page
2. **Backend Validation:** Credentials are sent to the Supabase backend via `/auth/login` endpoint
3. **Token Generation:** On successful authentication, Supabase returns a JWT access token
4. **Session Storage:** The token and user data are stored in localStorage
5. **Authenticated Requests:** All subsequent API calls include the access token in the Authorization header

### Registration (Admin Only)
Only admin users can register new accounts through the system. To create new users:
1. Login as admin
2. Navigate to Admin Dashboard
3. Use the user management features to create new students, teachers, or parents

### Session Persistence
- User sessions are stored in localStorage
- On page refresh, the system checks for an existing valid session
- If found, the user is automatically logged in
- If expired or invalid, the user is redirected to login

### Sign Out
- Clicking "Sign Out" clears all session data from localStorage
- User is redirected to the login page
- All authentication tokens are invalidated

## Backend API Endpoints

### Public Endpoints (No Auth Required)
- `GET /health` - Health check
- `GET /ping` - Simple connectivity test
- `POST /init-demo-data` - Initialize demo data
- `GET /system/status` - System status

### Protected Endpoints (Auth Required)
- `POST /auth/login` - User login
- `POST /auth/register` - Register new user (admin only)
- `GET /students` - Get all students (admin/teacher only)
- `GET /students/:id` - Get student profile
- `PUT /students/:id` - Update student profile
- `GET /academic/records/:studentId` - Get academic records
- `POST /academic/exam-result` - Add exam result (admin/teacher only)
- `GET /fees/:studentId` - Get fee details
- `POST /fees/payment` - Process fee payment
- `GET /notifications/:userId` - Get user notifications

## Troubleshooting

### Cannot Login
1. Check if demo data has been initialized
2. Verify you're using the correct email and password
3. Check browser console for error messages
4. Ensure backend server is running and accessible

### Session Expired
- Simply login again with your credentials
- Sessions are managed by Supabase and have an expiration time

### Backend Connection Issues
- Check the "System Status" panel in the sidebar
- Backend status should show "Active" (green)
- If showing "Offline" (red), check your internet connection
- Verify the Supabase project is running

## Security Notes

- **Never share your password** with others
- Passwords are securely hashed using Supabase Auth
- Access tokens are used for API authentication
- Admin credentials provide full system access - protect them carefully
- Session tokens are stored in localStorage (consider sessionStorage for enhanced security in production)

## Next Steps

### For Development
- Modify user roles and permissions in `/supabase/functions/server/index.tsx`
- Add new protected routes as needed
- Implement additional authentication features (password reset, email verification, etc.)

### For Production
1. Configure proper email service in Supabase dashboard
2. Enable email verification for new accounts
3. Set up password reset functionality
4. Configure proper CORS settings
5. Enable row-level security (RLS) policies
6. Set up production environment variables
7. Implement rate limiting and security headers

## Support
For issues or questions:
- Check the backend logs in Supabase dashboard
- Review browser console for frontend errors
- Verify all environment variables are properly set
- Ensure Supabase project has proper configuration

---

**Important:** This system uses real authentication with Supabase. Make sure to properly secure your production environment and follow security best practices.
