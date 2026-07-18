# Quick Start Guide - Real Authentication

## 🚀 Quick Start (3 Steps)

### Step 1: Initialize Demo Accounts (First Time Only)
**IMPORTANT:** On your first visit, you need to initialize demo accounts.

1. Open the login page
2. You'll see an "Initialize Demo Accounts" button
3. Click it and wait 10-15 seconds
4. When done, you'll see "Demo Accounts Ready" ✅

**This only needs to be done once!**

### Step 2: Choose a Demo Account
Pick one of these accounts to test:

**👨‍💼 Admin Account** (Full system access)
```
Email: admin@rps.rajasthan.gov.in
Password: admin123
```

**🎓 Student Account** (Student features)
```
Email: arjun.singh@rps.edu.in
Password: student123
```

**👩‍🏫 Teacher Account** (Teacher features)
```
Email: teacher@rps.edu.in
Password: teacher123
```

**👨‍👩‍👧‍👦 Parent Account** (Parent features)
```
Email: parent@example.com
Password: parent123
```

### Step 3: Login and Explore
1. Enter the email and password
2. Click "Sign In"
3. Explore the ERP system!

## ✨ What You Can Do

### As Admin:
- ✅ View all students and manage data
- ✅ Access admin dashboard with analytics
- ✅ Create new users (students, teachers, parents)
- ✅ Manage system settings
- ✅ View financial reports

### As Student:
- ✅ View academic records and exam results
- ✅ Check fee payment status
- ✅ Access class schedule
- ✅ Download study resources
- ✅ View notifications

### As Teacher:
- ✅ View student lists
- ✅ Record exam results
- ✅ Manage assignments
- ✅ Track attendance

### As Parent:
- ✅ View child's academic progress
- ✅ Check fee status
- ✅ View notifications
- ✅ Access reports

## 🔍 System Status Indicators

Look for these in the sidebar:

**Connection:** 
- 🟢 Online = Internet connected
- 🔴 Offline = No internet

**Backend:**
- 🟢 Active = Backend ready
- 🔴 Offline = Backend unavailable
- 🟡 Checking... = Verifying connection

**Role:**
- Shows your current role (admin/student/teacher/parent)

## 🎨 Features to Try

### 1. Multi-Language Support
Click the language button (EN/हिं/राज) in the header to switch between:
- English
- Hindi (हिंदी)
- Rajasthani (राजस्थानी)

### 2. Dark Mode
Click the moon/sun icon to toggle dark mode

### 3. Global Search
Press `Ctrl+K` or click the search icon to search across the system

### 4. Keyboard Shortcuts
- `Alt + 1-7` - Navigate between sections
- `Ctrl + K` - Open global search
- `Alt + T` - Toggle dark mode
- `Alt + R` - Refresh data
- `Alt + E` - Export data
- `Alt + H` - Show help

### 5. Interactive Features
- Click on progress bars for quick navigation
- Click notifications to jump to relevant sections
- Use the AI chatbot (bottom right)
- Try the floating action menu

### 6. Admin Dashboard (Admin Only)
As admin, click "Admin Dashboard" to see:
- Student management
- Analytics and charts
- System statistics
- Bulk operations

## 📱 Sign Out
1. Click the "Sign Out" button at the bottom of the sidebar
2. Confirm in the dialog
3. You'll be logged out and returned to login screen

## ⚠️ Important Notes

### First Time Login
- Demo data is automatically initialized on server startup
- If you see login errors, wait 10 seconds and try again
- The backend needs a moment to set up demo accounts

### Testing Different Roles
- Sign out and login with different accounts
- Each role has different permissions and views
- Try logging in as different users to see the differences

### Data Persistence
- Your session persists across page refreshes
- Data changes are saved to the backend
- Use real features like fee payment and profile editing

## 🔧 Troubleshooting

### "Invalid credentials" error?
- Double-check you copied the email exactly
- Passwords are case-sensitive
- Make sure demo data has been initialized

### Backend shows "Offline"?
- Check your internet connection
- Wait a few seconds and refresh
- The backend server may still be starting up

### Can't see certain features?
- Different roles have different permissions
- Try logging in as admin for full access
- Check the role indicator in the sidebar

## 💡 Pro Tips

1. **Try all roles** - Each role has unique features
2. **Use keyboard shortcuts** - Much faster than clicking
3. **Check notifications** - Important updates appear there
4. **Explore the admin dashboard** - Lots of powerful features
5. **Test payments** - Fee payment system is fully functional
6. **Export data** - Use Alt+E to download your data
7. **Search everything** - Ctrl+K searches across all sections

## 🎯 What's Real vs Demo

### Real (Actually Working):
- ✅ Authentication with Supabase
- ✅ JWT token-based sessions
- ✅ Backend API calls
- ✅ Data persistence in database
- ✅ Role-based access control
- ✅ All interactive features
- ✅ Fee calculations
- ✅ Grade calculations
- ✅ Search functionality
- ✅ Language switching

### Demo (Sample Data):
- ℹ️ Pre-populated student records
- ℹ️ Sample exam results
- ℹ️ Sample fee transactions
- ℹ️ Demo notifications
- ℹ️ Example academic records

**Note:** Even the "demo" data is stored in a real database and can be modified through the UI!

## 🚦 Ready to Start?

1. Open the application
2. Use one of the demo accounts above
3. Login and start exploring!

---

**Need Help?** 
- Check `/AUTHENTICATION_SETUP.md` for detailed information
- Review `/REAL_AUTH_IMPLEMENTATION_SUMMARY.md` for technical details
- Look at browser console for debugging info

**Have Fun Exploring the Rajasthan Public School ERP System! 🎉**
