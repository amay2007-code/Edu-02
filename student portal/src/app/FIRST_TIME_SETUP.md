# First Time Setup Guide

## Getting Started with Rajasthan Public School ERP

### Step 1: Open the Application
Navigate to your application URL in a web browser.

### Step 2: Initialize Demo Accounts

When you first open the login page, you'll see a message indicating that demo accounts need to be initialized.

**Click the "Initialize Demo Accounts" button**

This will:
- Create 4 demo user accounts in Supabase Auth
- Set up user profiles in the database
- Create sample academic records
- Set up fee data
- Generate notifications

**Wait 10-15 seconds** while the system initializes.

### Step 3: Login with Demo Credentials

Once initialization is complete, you'll see a "Demo Accounts Ready" badge and the credentials will be displayed.

#### Available Demo Accounts:

**👨‍💼 Admin Account**
```
Email: admin@rps.rajasthan.gov.in
Password: admin123
```
- Full system access
- Can manage students, teachers, parents
- Access to admin dashboard
- Can create new users

**🎓 Student Account**
```
Email: arjun.singh@rps.edu.in
Password: student123
```
- View academic records
- Check exam results
- Pay fees
- Access learning resources

**👩‍🏫 Teacher Account**
```
Email: teacher@rps.edu.in
Password: teacher123
```
- View student lists
- Record exam results
- Manage assignments

**👨‍👩‍👧‍👦 Parent Account**
```
Email: parent@example.com
Password: parent123
```
- View child's progress
- Check fee status
- Receive notifications

## Troubleshooting

### "Invalid credentials" Error?
If you get an "Invalid credentials" error, it means demo accounts haven't been initialized yet.

**Solution:**
1. Look for the "Initialize Demo Accounts" button on the login page
2. Click it and wait 10-15 seconds
3. Try logging in again

### Initialization Button Not Appearing?
Refresh the page. The button should appear if the system detects that demo accounts aren't set up.

### Initialization Taking Too Long?
- Check your internet connection
- Wait up to 30 seconds
- If it still fails, refresh the page and try again

### "Failed to initialize" Error?
This could mean:
1. **Network issue** - Check your internet connection
2. **Supabase is down** - Wait a few minutes and try again
3. **Already initialized** - Try logging in with demo credentials anyway

## What Gets Created?

When you initialize demo accounts, the system creates:

### User Accounts (Supabase Auth)
- 4 user accounts with email/password authentication
- Accounts are auto-confirmed (no email verification needed)

### User Profiles (Database)
- Complete profile information for each user
- Role-based data (student has class/roll number, etc.)

### Sample Data
- **Academic Records:** Exam results, assignments, attendance
- **Fee Information:** Payment history, pending installments
- **Notifications:** Sample alerts and updates
- **System Metadata:** School information

### Additional Sample Students
- 4 more student accounts for testing bulk operations
- All use password: `student123`

## After Setup

### First Login Experience
1. Choose one of the demo accounts
2. Enter the email and password
3. Click "Sign In"
4. You'll be redirected to the appropriate dashboard

### Exploring the System
- Try different user roles to see different features
- All interactive features are fully functional
- Data persists across sessions
- You can edit information and it will be saved

## Important Notes

### Demo Data is Persistent
- Once initialized, demo data stays in the database
- You won't need to reinitialize unless you reset the database
- Changes you make are saved

### Passwords
- Demo passwords are simple (admin123, student123, etc.)
- For production, enforce strong password requirements

### Email Verification
- Demo accounts skip email verification
- In production, configure SMTP in Supabase dashboard

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection
- JavaScript enabled

## Next Steps

After initialization and first login:

1. **Explore Each Role**
   - Login as different users to see different features
   - Each role has unique permissions and views

2. **Test Features**
   - Try fee payments
   - Edit profile information
   - View exam results
   - Use the search function

3. **Customize**
   - Update school information in admin dashboard
   - Add more users
   - Modify system settings

4. **Integration**
   - Use the API endpoints for external integrations
   - Connect with other Figma Make projects
   - Build custom features on top of the ERP

## Security Notes

### Demo Environment
- Demo passwords are intentionally simple
- Demo accounts are for testing only
- Not suitable for production without changes

### Production Deployment
Before using in production:
1. Change all passwords to strong passwords
2. Enable email verification
3. Set up proper SMTP service
4. Configure row-level security (RLS)
5. Enable audit logging
6. Set up backup procedures

## Support

### If You Get Stuck
1. Check browser console for detailed error messages
2. Review the error message on screen
3. Try refreshing the page
4. Clear browser cache and cookies
5. Try a different browser

### Documentation
- `/AUTHENTICATION_SETUP.md` - Complete authentication guide
- `/QUICK_START.md` - Quick reference for demo accounts
- `/TESTING_CHECKLIST.md` - Comprehensive testing guide
- `/SUPABASE_AUTH_WORKAROUND.md` - Technical details

## Success Checklist

After setup, you should be able to:
- ✅ See "Demo Accounts Ready" badge on login page
- ✅ Login with any of the 4 demo accounts
- ✅ See "Backend: Active" status after login
- ✅ Navigate through all sections
- ✅ View and edit data
- ✅ Sign out and login again

---

**Ready to Go!** Once you've initialized demo accounts and successfully logged in, you're all set to explore the Rajasthan Public School ERP system! 🎉
