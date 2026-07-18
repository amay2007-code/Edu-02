import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

export async function initializeDemoData() {
  console.log('🚀 Initializing Rajasthan Institute of Technology ERP Demo Data...');

  try {
    // Add overall timeout protection
    const initTimeout = setTimeout(() => {
      throw new Error('Demo data initialization timed out after 25 seconds');
    }, 25000);
    // Create admin user
    let adminResult;
    try {
      adminResult = await supabase.auth.admin.createUser({
        email: 'admin@rps.rajasthan.gov.in',
        password: 'admin123',
        user_metadata: { name: 'Dr. Rajesh Kumar', role: 'admin' },
        email_confirm: true
      });
    } catch (error) {
      if (error.message?.includes('User already registered')) {
        console.log('Admin user already exists, skipping creation');
        // Try to get existing user
        const { data: users } = await supabase.auth.admin.listUsers();
        const existingAdmin = users.users?.find(u => u.email === 'admin@rps.rajasthan.gov.in');
        if (existingAdmin) {
          adminResult = { data: { user: existingAdmin } };
        }
      } else {
        throw error;
      }
    }

    if (adminResult.data.user) {
      const adminProfile = {
        id: adminResult.data.user.id,
        email: 'admin@rps.rajasthan.gov.in',
        name: 'Dr. Rajesh Kumar',
        role: 'admin',
        phone: '+91 98765 43210',
        address: 'Dean Office, Rajasthan Institute of Technology, Jaipur',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        active: true,
        department: 'Administration',
        designation: 'Dean'
      };

      await kv.set(`user:${adminResult.data.user.id}`, adminProfile);
      await kv.set(`user_email:admin@rps.rajasthan.gov.in`, adminResult.data.user.id);
      
      // Add to admin role index
      let adminIndex = await kv.get('users_by_role:admin') || [];
      adminIndex.push(adminResult.data.user.id);
      await kv.set('users_by_role:admin', adminIndex);

      console.log('✅ Admin user created: admin@rps.rajasthan.gov.in / admin123');
    }

    // Create student user
    let studentResult;
    try {
      studentResult = await supabase.auth.admin.createUser({
        email: 'arjun.singh@rps.edu.in',
        password: 'student123',
        user_metadata: { name: 'Arjun Singh', role: 'student' },
        email_confirm: true
      });
    } catch (error) {
      if (error.message?.includes('User already registered')) {
        console.log('Student user already exists, skipping creation');
        const { data: users } = await supabase.auth.admin.listUsers();
        const existingStudent = users.users?.find(u => u.email === 'arjun.singh@rps.edu.in');
        if (existingStudent) {
          studentResult = { data: { user: existingStudent } };
        }
      } else {
        throw error;
      }
    }

    if (studentResult.data.user) {
      const studentProfile = {
        id: studentResult.data.user.id,
        email: 'arjun.singh@rps.edu.in',
        name: 'Arjun Singh',
        role: 'student',
        phone: '+91 98765 54321',
        address: 'Shastri Nagar, Jaipur, Rajasthan 302016',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        active: true,
        class_id: '10-A',
        roll_number: '2025-10-015',
        parent_email: 'parent@example.com',
        academic_year: '2024-25',
        admission_date: '2024-04-01T00:00:00.000Z',
        fees_status: 'partial',
        attendance_percentage: 88,
        current_grade: 'A',
        emergency_contact: '+91 98765 54322',
        blood_group: 'B+',
        father_name: 'Vikram Singh',
        mother_name: 'Priya Singh'
      };

      await kv.set(`user:${studentResult.data.user.id}`, studentProfile);
      await kv.set(`user_email:arjun.singh@rps.edu.in`, studentResult.data.user.id);

      // Add to student role index
      let studentIndex = await kv.get('users_by_role:student') || [];
      studentIndex.push(studentResult.data.user.id);
      await kv.set('users_by_role:student', studentIndex);

      // Create academic records for student
      const academicRecords = {
        student_id: studentResult.data.user.id,
        exams: [
          {
            id: 'exam_mid_term_2024',
            exam_name: 'Mid-Term Examination 2024',
            subject: 'Advanced Calculus',
            marks_obtained: 85,
            total_marks: 100,
            percentage: 85,
            grade: 'A',
            exam_date: '2024-10-15T00:00:00.000Z',
            recorded_by: adminResult.data.user?.id || 'system',
            recorded_at: new Date().toISOString()
          },
          {
            id: 'exam_mid_term_2024_eng',
            exam_name: 'Mid-Term Examination 2024',
            subject: 'Technical Communication',
            marks_obtained: 92,
            total_marks: 100,
            percentage: 92,
            grade: 'A+',
            exam_date: '2024-10-16T00:00:00.000Z',
            recorded_by: adminResult.data.user?.id || 'system',
            recorded_at: new Date().toISOString()
          },
          {
            id: 'exam_mid_term_2024_sci',
            exam_name: 'Mid-Term Examination 2024',
            subject: 'Data Structures',
            marks_obtained: 78,
            total_marks: 100,
            percentage: 78,
            grade: 'B+',
            exam_date: '2024-10-17T00:00:00.000Z',
            recorded_by: adminResult.data.user?.id || 'system',
            recorded_at: new Date().toISOString()
          },
          {
            id: 'exam_mid_term_2024_hindi',
            exam_name: 'Mid-Term Examination 2024',
            subject: 'Operating Systems',
            marks_obtained: 88,
            total_marks: 100,
            percentage: 88,
            grade: 'A',
            exam_date: '2024-10-18T00:00:00.000Z',
            recorded_by: adminResult.data.user?.id || 'system',
            recorded_at: new Date().toISOString()
          },
          {
            id: 'exam_mid_term_2024_social',
            exam_name: 'Mid-Term Examination 2024',
            subject: 'Social Data Structures',
            marks_obtained: 82,
            total_marks: 100,
            percentage: 82,
            grade: 'A',
            exam_date: '2024-10-19T00:00:00.000Z',
            recorded_by: adminResult.data.user?.id || 'system',
            recorded_at: new Date().toISOString()
          }
        ],
        assignments: [
          {
            id: 'assign_math_001',
            assignment_id: 'MATH-2024-001',
            subject: 'Advanced Calculus',
            title: 'Quadratic Equations Project',
            submission_date: '2024-11-15T00:00:00.000Z',
            due_date: '2024-11-20T00:00:00.000Z',
            status: 'submitted',
            grade: 'A',
            marks: 18,
            total_marks: 20,
            updated_via: 'manual'
          },
          {
            id: 'assign_eng_001',
            assignment_id: 'ENG-2024-001',
            subject: 'Technical Communication',
            title: 'Essay on Environmental Conservation',
            submission_date: '2024-11-10T00:00:00.000Z',
            due_date: '2024-11-15T00:00:00.000Z',
            status: 'submitted',
            grade: 'A+',
            marks: 19,
            total_marks: 20,
            updated_via: 'manual'
          }
        ],
        attendance: [
          {
            date: '2024-12-01',
            status: 'present',
            subject: 'Advanced Calculus',
            period: 1,
            updated_via: 'manual'
          },
          {
            date: '2024-12-01',
            status: 'present',
            subject: 'Technical Communication',
            period: 2,
            updated_via: 'manual'
          },
          {
            date: '2024-12-01',
            status: 'present',
            subject: 'Data Structures',
            period: 3,
            updated_via: 'manual'
          },
          {
            date: '2024-12-02',
            status: 'present',
            subject: 'Operating Systems',
            period: 1,
            updated_via: 'manual'
          },
          {
            date: '2024-12-02',
            status: 'absent',
            subject: 'Social Data Structures',
            period: 2,
            updated_via: 'manual'
          }
        ],
        overall_grade: 'A',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await kv.set(`academic_records:${studentResult.data.user.id}`, academicRecords);

      // Create fee details for student
      const feeDetails = {
        student_id: studentResult.data.user.id,
        total_annual_fee: 72000,
        paid_amount: 39667,
        pending_amount: 32333,
        installments: [
          {
            id: 'inst_1_2024',
            name: 'First Installment - Admission Fee',
            amount: 24000,
            due_date: '2024-06-15',
            status: 'paid',
            paid_date: '2024-06-10T10:30:00.000Z',
            payment_method: 'online',
            description: 'Tuition fee, Books, and Uniform'
          },
          {
            id: 'inst_2_2024',
            name: 'Second Installment - Mid-Year Fee',
            amount: 24000,
            due_date: '2024-09-15',
            status: 'paid',
            paid_date: '2024-09-12T14:45:00.000Z',
            payment_method: 'online',
            description: 'Second quarter fees and activities'
          },
          {
            id: 'inst_3_2024',
            name: 'Third Installment - Final Fee',
            amount: 24000,
            due_date: '2025-12-15',
            status: 'pending',
            description: 'Final quarter fees and examination charges'
          }
        ],
        transactions: [
          {
            id: 'txn_001_2024',
            student_id: studentResult.data.user.id,
            installment_id: 'inst_1_2024',
            amount: 24000,
            payment_method: 'online',
            razorpay_payment_id: 'pay_demo_001',
            status: 'completed',
            payment_date: '2024-06-10T10:30:00.000Z',
            receipt_number: 'RPS/RCT/2024/0001'
          },
          {
            id: 'txn_002_2024',
            student_id: studentResult.data.user.id,
            installment_id: 'inst_2_2024',
            amount: 24000,
            payment_method: 'online',
            razorpay_payment_id: 'pay_demo_002',
            status: 'completed',
            payment_date: '2024-09-12T14:45:00.000Z',
            receipt_number: 'RPS/RCT/2024/0002'
          }
        ],
        late_fees: 0,
        discount_applied: 0,
        scholarship_amount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await kv.set(`fees:${studentResult.data.user.id}`, feeDetails);

      // Store individual transactions
      for (const transaction of feeDetails.transactions) {
        await kv.set(`transaction:${transaction.id}`, transaction);
      }

      // Create notifications for student
      const notifications = [
        {
          id: 'notif_001',
          target_user_id: studentResult.data.user.id,
          title: 'Fee Reminder',
          message: 'Third installment due on Dec 15, 2025 - ₹24,000',
          type: 'warning',
          priority: 'high',
          read: false,
          created_by: 'system',
          created_at: new Date().toISOString()
        },
        {
          id: 'notif_002',
          target_user_id: studentResult.data.user.id,
          title: 'Exam Schedule',
          message: 'Final examinations starting from Dec 20, 2025',
          type: 'info',
          priority: 'normal',
          read: false,
          created_by: 'system',
          created_at: new Date().toISOString()
        },
        {
          id: 'notif_003',
          target_user_id: studentResult.data.user.id,
          title: 'Assignment Due',
          message: 'Physics lab report due tomorrow',
          type: 'urgent',
          priority: 'high',
          read: false,
          created_by: 'system',
          created_at: new Date().toISOString()
        },
        {
          id: 'notif_004',
          target_user_id: studentResult.data.user.id,
          title: 'Welcome to ERP',
          message: 'Your account has been successfully created and activated',
          type: 'success',
          priority: 'normal',
          read: true,
          created_by: 'system',
          created_at: '2024-04-01T00:00:00.000Z'
        }
      ];

      await kv.set(`notifications:${studentResult.data.user.id}`, notifications);

      console.log('✅ Student user created: arjun.singh@rps.edu.in / student123');
      console.log('✅ Academic records, fees, and notifications created for student');
    }

    // Create teacher user
    const teacherResult = await supabase.auth.admin.createUser({
      email: 'teacher@rps.edu.in',
      password: 'teacher123',
      user_metadata: { name: 'Prof. Sunita Sharma', role: 'teacher' },
      email_confirm: true
    });

    if (teacherResult.data.user) {
      const teacherProfile = {
        id: teacherResult.data.user.id,
        email: 'teacher@rps.edu.in',
        name: 'Prof. Sunita Sharma',
        role: 'teacher',
        phone: '+91 98765 12345',
        address: 'Faculty Housing, Rajasthan Institute of Technology Campus',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        active: true,
        department: 'Advanced Calculus',
        designation: 'Senior Professor',
        employee_id: 'RPS-T-001',
        subjects: ['Advanced Calculus', 'Physics'],
        classes_assigned: ['10-A', '10-B', '11-A'],
        qualification: 'M.Sc. Advanced Calculus, B.Ed.'
      };

      await kv.set(`user:${teacherResult.data.user.id}`, teacherProfile);
      await kv.set(`user_email:teacher@rps.edu.in`, teacherResult.data.user.id);

      // Add to teacher role index
      let teacherIndex = await kv.get('users_by_role:teacher') || [];
      teacherIndex.push(teacherResult.data.user.id);
      await kv.set('users_by_role:teacher', teacherIndex);

      console.log('✅ Professor user created: teacher@rps.edu.in / teacher123');
    }

    // Create parent user
    const parentResult = await supabase.auth.admin.createUser({
      email: 'parent@example.com',
      password: 'parent123',
      user_metadata: { name: 'Vikram Singh', role: 'parent' },
      email_confirm: true
    });

    if (parentResult.data.user) {
      const parentProfile = {
        id: parentResult.data.user.id,
        email: 'parent@example.com',
        name: 'Vikram Singh',
        role: 'parent',
        phone: '+91 98765 54322',
        address: 'Shastri Nagar, Jaipur, Rajasthan 302016',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        active: true,
        children: [studentResult.data.user?.id],
        occupation: 'Government Officer',
        emergency_contact: '+91 98765 54323'
      };

      await kv.set(`user:${parentResult.data.user.id}`, parentProfile);
      await kv.set(`user_email:parent@example.com`, parentResult.data.user.id);

      // Add to parent role index
      let parentIndex = await kv.get('users_by_role:parent') || [];
      parentIndex.push(parentResult.data.user.id);
      await kv.set('users_by_role:parent', parentIndex);

      console.log('✅ Parent user created: parent@example.com / parent123');
    }

    // Create additional sample students for better demo
    const additionalStudents = [
      {
        name: 'Priya Meena',
        email: 'priya.meena@rps.edu.in',
        class_id: '10-A',
        roll_number: '2025-10-001'
      },
      {
        name: 'Rahul Gupta',
        email: 'rahul.gupta@rps.edu.in',
        class_id: '10-A',
        roll_number: '2025-10-002'
      },
      {
        name: 'Kavya Jain',
        email: 'kavya.jain@rps.edu.in',
        class_id: '11-A',
        roll_number: '2025-11-001'
      },
      {
        name: 'Amit Sharma',
        email: 'amit.sharma@rps.edu.in',
        class_id: '9-A',
        roll_number: '2025-09-001'
      }
    ];

    for (const [index, student] of additionalStudents.entries()) {
      const result = await supabase.auth.admin.createUser({
        email: student.email,
        password: 'student123',
        user_metadata: { name: student.name, role: 'student' },
        email_confirm: true
      });

      if (result.data.user) {
        const profile = {
          id: result.data.user.id,
          email: student.email,
          name: student.name,
          role: 'student',
          phone: `+91 9876${54300 + index}`,
          address: `Address ${index + 1}, Jaipur, Rajasthan`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          active: true,
          class_id: student.class_id,
          roll_number: student.roll_number,
          parent_email: `parent${index + 1}@example.com`,
          academic_year: '2024-25',
          admission_date: '2024-04-01T00:00:00.000Z',
          fees_status: index % 2 === 0 ? 'paid' : 'pending',
          attendance_percentage: 80 + Math.floor(Math.random() * 20),
          current_grade: ['A', 'B+', 'A+', 'B'][index % 4]
        };

        await kv.set(`user:${result.data.user.id}`, profile);
        await kv.set(`user_email:${student.email}`, result.data.user.id);

        // Add to student index
        let studentIndex = await kv.get('users_by_role:student') || [];
        studentIndex.push(result.data.user.id);
        await kv.set('users_by_role:student', studentIndex);
      }
    }

    console.log('✅ Additional sample students created');

    // Create system metadata
    const systemMetadata = {
      school_name: 'Rajasthan Institute of Technology',
      school_code: 'RPS-JAI-001',
      academic_year: '2024-25',
      establishment_year: '1995',
      affiliation: 'CBSE - Central Board of Higher Education',
      principal: 'Dr. Rajesh Kumar',
      address: 'Shastri Nagar, Jaipur, Rajasthan 302016',
      phone: '+91 141 234 5678',
      email: 'info@rps.rajasthan.gov.in',
      website: 'https://rps.rajasthan.gov.in',
      total_students: 500,
      total_teachers: 35,
      total_staff: 50,
      classes: ['6-A', '7-A', '8-A', '9-A', '10-A', '11-A', '12-A'],
      subjects: ['Technical Communication', 'Operating Systems', 'Advanced Calculus', 'Data Structures', 'Social Data Structures', 'Physical Education'],
      infrastructure: {
        classrooms: 20,
        laboratories: 5,
        library: 1,
        playground: 1,
        computer_lab: 2,
        auditorium: 1
      },
      fees_structure: {
        class_6_8: 60000,
        class_9_10: 70000,
        class_11_12: 80000
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await kv.set('system_metadata', systemMetadata);

    console.log('✅ System metadata created');
    
    // Clear the timeout since we completed successfully
    clearTimeout(initTimeout);
    
    console.log('\n🎉 Demo data initialization completed successfully!');
    console.log('\n📋 Demo Accounts Created:');
    console.log('👨‍💼 Admin: admin@rps.rajasthan.gov.in / admin123');
    console.log('👩‍🏫 Professor: teacher@rps.edu.in / teacher123');
    console.log('👨‍👩‍👧‍👦 Parent: parent@example.com / parent123');
    console.log('🎓 Student: arjun.singh@rps.edu.in / student123');
    console.log('\n🌟 Features Available:');
    console.log('• Complete user authentication system');
    console.log('• Academic records with exam results');
    console.log('• Fee management with payment history');
    console.log('• Real-time notifications');
    console.log('• Multi-language support (Technical Communication, Operating Systems, Rajasthani)');
    console.log('• Role-based access control');
    console.log('• Integration APIs for external projects');
    console.log('• File upload and storage');
    console.log('• Analytics and reporting');

    return {
      success: true,
      message: 'Demo data initialized successfully',
      accounts: {
        admin: { email: 'admin@rps.rajasthan.gov.in', password: 'admin123' },
        teacher: { email: 'teacher@rps.edu.in', password: 'teacher123' },
        parent: { email: 'parent@example.com', password: 'parent123' },
        student: { email: 'arjun.singh@rps.edu.in', password: 'student123' }
      }
    };

  } catch (error) {
    console.error('❌ Error initializing demo data:', error);
    
    // Provide more specific error handling
    let errorMessage = error.message;
    if (error.message?.includes('timed out')) {
      errorMessage = 'Demo data initialization timed out. Please try again.';
    } else if (error.message?.includes('User already registered')) {
      errorMessage = 'Demo users already exist. System is ready to use.';
      return {
        success: true,
        message: 'Demo data already available',
        accounts: {
          admin: { email: 'admin@rps.rajasthan.gov.in', password: 'admin123' },
          teacher: { email: 'teacher@rps.edu.in', password: 'teacher123' },
          parent: { email: 'parent@example.com', password: 'parent123' },
          student: { email: 'arjun.singh@rps.edu.in', password: 'student123' }
        }
      };
    } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
      errorMessage = 'Network error during initialization. Please check your connection and try again.';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}