import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { 
  CreditCard, 
  Download, 
  Receipt, 
  AlertCircle, 
  CheckCircle,
  Calendar,
  IndianRupee,
  FileText,
  Printer,
  DollarSign,
} from "lucide-react";

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export function Fees() {
  const { t } = useLanguage();
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feeData, setFeeData] = useState({
    totalPaid: 39667,
    totalPending: 32333
  });

  // Razorpay configuration
  // IMPORTANT: Replace with your actual Razorpay keys
  const RAZORPAY_KEY_ID = "rzp_test_1234567890"; // Get from Razorpay Dashboard
  const RAZORPAY_SECRET = "YOUR_SECRET_KEY"; // Keep this on backend only
  const RAZORPAY_API_URL = "https://api.razorpay.com/v1/payments";
  
  // For production: 
  // - Use rzp_live_xxxxx key ID
  // - Implement proper backend verification
  // - Add webhook handling for payment status updates

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          setIsRazorpayLoaded(true);
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setIsRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          toast.error("Failed to load Razorpay SDK");
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);
  
  const currentAcademicYear = "2025-26";
  const studentInfo = {
    name: "Arjun Singh",
    course: "10-A",
    rollNumber: "2025-10-015",
    fatherName: "Mr. Rajesh Singh",
    address: "45 Shastri Nagar, Jaipur, Rajasthan 302016"
  };

  // Fee structure with automated calculations
  const feeStructure = [
    { category: "Tuition Fee", amount: 25000, installments: 3, paid: 2 },
    { category: "Development Fee", amount: 5000, installments: 1, paid: 1 },
    { category: "Library Fee", amount: 2000, installments: 1, paid: 0 },
    { category: "Laboratory Fee", amount: 3000, installments: 1, paid: 0 },
    { category: "Sports Fee", amount: 1500, installments: 1, paid: 0 },
    { category: "Examination Fee", amount: 2500, installments: 1, paid: 0 },
    { category: "Computer Lab Fee", amount: 3000, installments: 1, paid: 0 },
    { category: "Transport Fee", amount: 6000, installments: 2, paid: 1 },
    { category: "Hostel Fee", amount: 24000, installments: 3, paid: 1 }
  ];

  // Calculate totals
  const totalAnnualFee = feeStructure.reduce((sum, fee) => sum + fee.amount, 0);
  const paidAmount = feeData.totalPaid;
  const pendingAmount = feeData.totalPending;

  const paymentHistory = [
    {
      receiptNo: "RPS-2025-001",
      date: "2025-04-15",
      amount: 20000,
      method: "Online Payment",
      status: "Completed",
      description: "First Installment - Tuition & Development Fee",
      items: [
        { category: "Tuition Fee", amount: 8333 },
        { category: "Development Fee", amount: 5000 },
        { category: "Hostel Fee", amount: 8000 }
      ]
    },
    {
      receiptNo: "RPS-2025-002",
      date: "2025-08-10",
      amount: 19667,
      method: "Bank Transfer",
      status: "Completed", 
      description: "Second Installment - Tuition & Transport Fee",
      items: [
        { category: "Tuition Fee", amount: 8334 },
        { category: "Transport Fee", amount: 3000 },
        { category: "Hostel Fee", amount: 8000 }
      ]
    },
    {
      receiptNo: "RPS-2025-003",
      date: "2025-12-15",
      amount: 32333,
      method: "Pending",
      status: "Pending",
      description: "Third Installment - Remaining Fees",
      items: [
        { category: "Tuition Fee", amount: 8333 },
        { category: "Library Fee", amount: 2000 },
        { category: "Laboratory Fee", amount: 3000 },
        { category: "Sports Fee", amount: 1500 },
        { category: "Examination Fee", amount: 2500 },
        { category: "Computer Lab Fee", amount: 3000 },
        { category: "Transport Fee", amount: 3000 },
        { category: "Hostel Fee", amount: 8000 }
      ]
    }
  ];

  const upcomingDueDates = paymentHistory.filter(payment => payment.status === "Pending").map(payment => ({
    description: payment.description,
    amount: payment.amount,
    dueDate: payment.date,
    status: new Date(payment.date) < new Date() ? "overdue" : "pending"
  }));

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const generatePDFReceipt = (receipt: any) => {
    // Create a downloadable HTML receipt file
    const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fee Receipt - ${receipt.receiptNo}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 3px solid #d97706; padding-bottom: 20px; margin-bottom: 30px; }
        .school-name { font-size: 32px; font-weight: bold; color: #d97706; margin-bottom: 8px; }
        .school-address { font-size: 14px; color: #666; margin-bottom: 10px; }
        .receipt-title { font-size: 24px; font-weight: bold; margin: 25px 0; text-align: center; background: #fef3c7; padding: 15px; border-radius: 8px; }
        .student-details { background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 25px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .payment-details { background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 25px 0; }
        .table { width: 100%; border-collapse: collapse; margin: 25px 0; }
        .table th, .table td { border: 2px solid #e5e7eb; padding: 15px; text-align: left; }
        .table th { background-color: #fef3c7; font-weight: bold; }
        .total-row { font-weight: bold; background-color: #f9fafb; font-size: 18px; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; border-top: 2px solid #e5e7eb; padding-top: 20px; }
        .signature { margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; }
        .signature-box { text-align: center; padding: 20px; border: 1px dashed #d1d5db; border-radius: 8px; }
        .rajasthan-seal { text-align: center; margin: 20px 0; color: #d97706; font-weight: bold; font-size: 18px; }
        .amount-words { background: #fffbeb; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #f59e0b; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="school-name">Rajasthan Institute of Technology</div>
        <div class="school-address">
          45 Shastri Nagar, Jaipur, Rajasthan - 302016<br>
          Phone: +91-141-2345678 | Email: admin@rps.edu.in<br>
          CBSE Affiliation No: 1234567 | School Code: 12345
        </div>
        <div class="rajasthan-seal">राजस्थान पब्लिक स्कूल</div>
      </div>
      
      <div class="receipt-title">OFFICIAL FEE RECEIPT</div>
      
      <div class="student-details">
        <div><strong>Receipt No:</strong> ${receipt.receiptNo}</div>
        <div><strong>Date:</strong> ${new Date(receipt.date).toLocaleDateString('en-IN')}</div>
        <div><strong>Student Name:</strong> ${studentInfo.name}</div>
        <div><strong>Course:</strong> ${studentInfo.class}</div>
        <div><strong>Roll Number:</strong> ${studentInfo.rollNumber}</div>
        <div><strong>Father's Name:</strong> ${studentInfo.fatherName}</div>
        <div><strong>Academic Year:</strong> ${currentAcademicYear}</div>
        <div><strong>Payment Mode:</strong> ${receipt.method}</div>
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Fee Category</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${receipt.items.map((item, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${item.category}</td>
              <td>₹${item.amount.toLocaleString()}</td>
            </tr>
          `).join('')}
          <tr class="total-row">
            <td colspan="2"><strong>TOTAL AMOUNT</strong></td>
            <td><strong>₹${receipt.amount.toLocaleString()}</strong></td>
          </tr>
        </tbody>
      </table>
      
      <div class="amount-words">
        <strong>Amount in Words:</strong> ${numberToWords(receipt.amount)} Rupees Only
      </div>
      
      <div class="payment-details">
        <h3 style="margin: 0 0 15px 0;">Payment Details</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div><strong>Transaction Date:</strong> ${new Date(receipt.date).toLocaleDateString('en-IN')}</div>
          <div><strong>Payment Method:</strong> ${receipt.method}</div>
          <div><strong>Receipt Generated:</strong> ${new Date().toLocaleDateString('en-IN')}</div>
          <div><strong>Academic Year:</strong> ${currentAcademicYear}</div>
        </div>
      </div>
      
      <div class="signature">
        <div class="signature-box">
          <p><strong>Student Signature</strong></p>
          <br><br>
          <p>_____________________</p>
          <p>${studentInfo.name}</p>
        </div>
        <div class="signature-box">
          <p><strong>Cashier Signature</strong></p>
          <br><br>
          <p>_____________________</p>
          <p>Accounts Office</p>
        </div>
      </div>
      
      <div class="footer">
        <p><strong>This is a computer generated receipt from Rajasthan Institute of Technology</strong></p>
        <p>For any queries regarding fees, please contact the accounts office</p>
        <p>Email: accounts@rps.edu.in | Phone: +91-141-2345678 Ext: 101</p>
        <div class="rajasthan-seal">जय राजस्थान!</div>
      </div>
    </body>
    </html>
    `;

    // Create downloadable file
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RIT_Receipt_${receipt.receiptNo}_${studentInfo.name.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Receipt ${receipt.receiptNo} downloaded successfully!`);
  };

  const numberToWords = (num: number): string => {
    // Simple number to words conversion for Indian currency
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    
    if (num === 0) return "Zero";
    
    let result = "";
    
    // Handle lakhs
    if (num >= 100000) {
      const lakhs = Math.floor(num / 100000);
      result += numberToWords(lakhs) + " Lakh ";
      num %= 100000;
    }
    
    // Handle thousands
    if (num >= 1000) {
      const thousands = Math.floor(num / 1000);
      result += numberToWords(thousands) + " Thousand ";
      num %= 1000;
    }
    
    // Handle hundreds
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }
    
    // Handle remaining numbers
    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    } else if (num >= 10) {
      result += teens[num - 10] + " ";
      return result.trim();
    }
    
    if (num > 0) {
      result += ones[num] + " ";
    }
    
    return result.trim();
  };

  const makePayment = (amount: number, category?: string) => {
    setPaymentAmount(amount.toString());
    setPaymentMethod("razorpay"); // Set default to Razorpay
    setIsPaymentDialogOpen(true);
  };

  // Create Razorpay order
  const createRazorpayOrder = async (amount: number) => {
    try {
      // In a real implementation, this would be a call to your backend
      // For demo purposes, we're creating a mock order
      const orderData = {
        id: `order_${Date.now()}`,
        entity: "order",
        amount: amount * 100, // Razorpay expects amount in paise
        amount_paid: 0,
        amount_due: amount * 100,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        status: "created",
        created_at: Math.floor(Date.now() / 1000)
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return orderData;
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Failed to create payment order");
    }
  };

  // Verify payment signature (for demo purposes)
  const verifyPaymentSignature = (response: any) => {
    // In a real application, this verification should be done on your backend
    // This is just for demo purposes
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
    
    // Mock verification - in production, use crypto.createHmac with your webhook secret
    if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
      return true;
    }
    return false;
  };

  // Handle Razorpay payment success
  const handlePaymentSuccess = (response: any) => {
    const amount = parseFloat(paymentAmount);
    
    // Verify payment signature
    if (!verifyPaymentSignature(response)) {
      toast.error("Payment verification failed. Please contact support.");
      setIsProcessing(false);
      return;
    }
    
    // Create new payment record
    const newPayment = {
      receiptNo: `RPS-2025-${String(paymentHistory.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      amount: amount,
      method: "Razorpay Online Payment",
      status: "Completed",
      description: `Online Payment - ${new Date().toLocaleDateString()}`,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      razorpaySignature: response.razorpay_signature,
      items: [
        { category: "Fee Payment", amount: amount }
      ]
    };

    // Update fee data
    setFeeData(prev => ({
      totalPaid: prev.totalPaid + amount,
      totalPending: prev.totalPending - amount
    }));

    // Add to payment history (in real app, this would be saved to backend)
    paymentHistory.unshift(newPayment);
    
    // Show success message with payment ID
    toast.success(
      `Payment of ₹${amount.toLocaleString()} completed successfully! Payment ID: ${response.razorpay_payment_id.slice(-8)}`,
      { duration: 5000 }
    );
    
    setIsPaymentDialogOpen(false);
    setPaymentAmount("");
    setPaymentMethod("");
    setIsProcessing(false);

    // Auto-download receipt after a short delay
    setTimeout(() => {
      generatePDFReceipt(newPayment);
      toast.info("Receipt downloaded automatically!");
    }, 1500);
  };

  // Handle Razorpay payment failure
  const handlePaymentError = (error: any) => {
    console.error("Payment failed:", error);
    toast.error(`Payment failed: ${error.description || "Unknown error"}`);
    setIsProcessing(false);
  };

  // Process payment with Razorpay
  const processPayment = async () => {
    const amount = parseFloat(paymentAmount);
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amount > pendingAmount) {
      toast.error(`Amount cannot exceed pending balance of ₹${pendingAmount.toLocaleString()}`);
      return;
    }

    if (!isRazorpayLoaded) {
      toast.error("Payment system is not ready. Please try again.");
      return;
    }

    setIsProcessing(true);

    try {
      // Create order
      const order = await createRazorpayOrder(amount);
      
      // Configure Razorpay options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Rajasthan Institute of Technology",
        description: `Fee Payment for ${studentInfo.name}`,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=center", // School logo
        order_id: order.id,
        handler: handlePaymentSuccess,
        prefill: {
          name: studentInfo.name,
          email: "arjun.singh@student.rps.edu.in",
          contact: "+91-9876543210"
        },
        notes: {
          student_id: studentInfo.rollNumber,
          class: studentInfo.class,
          academic_year: currentAcademicYear
        },
        theme: {
          color: "#d97706"
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.info("Payment cancelled by user");
          }
        },
        retry: {
          enabled: true,
          max_count: 3
        },
        timeout: 300, // 5 minutes
        remember_customer: true
      };

      // Create Razorpay instance and open checkout
      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', handlePaymentError);
      rzp.open();

    } catch (error) {
      console.error("Payment initialization failed:", error);
      toast.error("Failed to initialize payment. Please try again.");
      setIsProcessing(false);
    }
  };

  const downloadFeeStructure = () => {
    const feeStructureHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fee Structure - Rajasthan Institute of Technology</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #d97706; padding-bottom: 20px; }
        .school-name { font-size: 32px; font-weight: bold; color: #d97706; margin-bottom: 8px; }
        .school-address { font-size: 14px; color: #666; margin-bottom: 15px; }
        .document-title { font-size: 24px; font-weight: bold; margin: 25px 0; text-align: center; background: #fef3c7; padding: 15px; border-radius: 8px; }
        .student-info { background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #0ea5e9; }
        .table { width: 100%; border-collapse: collapse; margin: 25px 0; }
        .table th, .table td { border: 2px solid #e5e7eb; padding: 15px; text-align: left; }
        .table th { background-color: #fef3c7; font-weight: bold; font-size: 16px; }
        .table td { font-size: 14px; }
        .total-row { background-color: #f9fafb; font-weight: bold; font-size: 16px; }
        .payment-terms { background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #22c55e; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; border-top: 2px solid #e5e7eb; padding-top: 20px; }
        .rajasthan-text { color: #d97706; font-weight: bold; font-size: 18px; margin: 15px 0; }
        .amount { font-weight: bold; color: #0f172a; }
        @media print { body { margin: 0; } .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="school-name">Rajasthan Institute of Technology</div>
        <div class="school-address">
          45 Shastri Nagar, Jaipur, Rajasthan - 302016<br>
          Phone: +91-141-2345678 | Email: admin@rps.edu.in<br>
          CBSE Affiliation No: 1234567 | School Code: 12345
        </div>
        <div class="rajasthan-text">राजस्थान पब्लिक स्कूल</div>
      </div>
      
      <div class="document-title">ANNUAL FEE STRUCTURE ${currentAcademicYear}</div>
      
      <div class="student-info">
        <h3 style="margin: 0 0 10px 0; color: #0f172a;">Student Information</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div><strong>Student Name:</strong> ${studentInfo.name}</div>
          <div><strong>Course:</strong> ${studentInfo.class}</div>
          <div><strong>Roll Number:</strong> ${studentInfo.rollNumber}</div>
          <div><strong>Academic Year:</strong> ${currentAcademicYear}</div>
          <div><strong>Father's Name:</strong> ${studentInfo.fatherName}</div>
          <div><strong>Generated Date:</strong> ${new Date().toLocaleDateString('en-IN')}</div>
        </div>
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Fee Category</th>
            <th>Annual Amount (₹)</th>
            <th>No. of Installments</th>
            <th>Amount per Installment (₹)</th>
            <th>Due Dates</th>
          </tr>
        </thead>
        <tbody>
          ${feeStructure.map((fee, index) => `
            <tr>
              <td>${index + 1}</td>
              <td><strong>${fee.category}</strong></td>
              <td class="amount">₹${fee.amount.toLocaleString()}</td>
              <td>${fee.installments}</td>
              <td class="amount">₹${Math.round(fee.amount / fee.installments).toLocaleString()}</td>
              <td>
                ${fee.installments === 1 ? 'April 15' : 
                  fee.installments === 2 ? 'April 15, Aug 15' : 
                  'April 15, Aug 15, Dec 15'}
              </td>
            </tr>
          `).join('')}
          <tr class="total-row">
            <td colspan="2"><strong>TOTAL ANNUAL FEE</strong></td>
            <td class="amount"><strong>₹${totalAnnualFee.toLocaleString()}</strong></td>
            <td colspan="3"><strong>Amount in Words: ${numberToWords(totalAnnualFee)} Rupees Only</strong></td>
          </tr>
        </tbody>
      </table>
      
      <div class="payment-terms">
        <h3 style="margin: 0 0 15px 0; color: #0f172a;">Payment Terms & Conditions</h3>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>Fees must be paid by the due dates mentioned above</li>
          <li>Late payment will attract a fine of ₹100 per day after due date</li>
          <li>Fees can be paid online through school portal or at school counter</li>
          <li>Original fee receipt must be preserved for record purposes</li>
          <li>No fee refund after admission confirmation</li>
          <li>Students with pending fees may not be allowed to attend classes</li>
          <li>All fees are exclusive of examination fees charged by CBSE</li>
          <li>Transport and hostel fees are optional and charged separately</li>
        </ul>
      </div>
      
      <div style="margin: 30px 0; padding: 20px; background: #fef3c7; border-radius: 10px;">
        <h3 style="margin: 0 0 15px 0; color: #92400e;">Payment Methods Accepted</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div>• UPI Payment</div>
          <div>• Net Banking</div>
          <div>• Credit/Debit Cards</div>
          <div>• Cash (at school office only)</div>
          <div>• Bank Transfer/NEFT</div>
          <div>• Digital Wallets</div>
        </div>
      </div>
      
      <div class="footer">
        <p><strong>This is an official fee structure document from Rajasthan Institute of Technology</strong></p>
        <p>For any fee-related queries, contact: accounts@rps.edu.in | +91-141-2345678</p>
        <div class="rajasthan-text" style="font-size: 16px; margin-top: 15px;">जय राजस्थान!</div>
      </div>
    </body>
    </html>
    `;

    // Create a blob and download link
    const blob = new Blob([feeStructureHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RIT_Fee_Structure_${currentAcademicYear}_${studentInfo.name.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Fee Structure downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Fee Management</h1>
        <p className="text-muted-foreground">
          View and manage your fee payments for academic year {currentAcademicYear} - Rajasthan Institute of Technology.
        </p>
      </div>

      {/* Fee Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Annual Fee</CardTitle>
            <IndianRupee className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalAnnualFee.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Academic Year {currentAcademicYear}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Amount Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{paidAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((paidAmount / totalAnnualFee) * 100)}% of total fee
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending Amount</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹{pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Due by Dec 15, 2025</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Payment Status</CardTitle>
            <Receipt className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/3</div>
            <p className="text-xs text-muted-foreground">Installments paid</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Pay securely with Razorpay - UPI, Cards, Net Banking & more
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="flex items-center gap-2"
              onClick={() => makePayment(pendingAmount)}
            >
              <CreditCard className="h-4 w-4" />
              Pay Pending Amount
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                // Generate comprehensive fee structure as downloadable file
                const feeStructureHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                  <title>Fee Structure - Rajasthan Institute of Technology</title>
                  <style>
                    body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #d97706; padding-bottom: 20px; }
                    .school-name { font-size: 32px; font-weight: bold; color: #d97706; margin-bottom: 8px; }
                    .school-address { font-size: 14px; color: #666; margin-bottom: 15px; }
                    .document-title { font-size: 24px; font-weight: bold; margin: 25px 0; text-align: center; background: #fef3c7; padding: 15px; border-radius: 8px; }
                    .student-info { background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #0ea5e9; }
                    .table { width: 100%; border-collapse: collapse; margin: 25px 0; }
                    .table th, .table td { border: 2px solid #e5e7eb; padding: 15px; text-align: left; }
                    .table th { background-color: #fef3c7; font-weight: bold; font-size: 16px; }
                    .table td { font-size: 14px; }
                    .total-row { background-color: #f9fafb; font-weight: bold; font-size: 16px; }
                    .payment-terms { background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #22c55e; }
                    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; border-top: 2px solid #e5e7eb; padding-top: 20px; }
                    .rajasthan-text { color: #d97706; font-weight: bold; font-size: 18px; margin: 15px 0; }
                    .amount { font-weight: bold; color: #0f172a; }
                    @media print { body { margin: 0; } .no-print { display: none; } }
                  </style>
                </head>
                <body>
                  <div class="header">
                    <div class="school-name">Rajasthan Institute of Technology</div>
                    <div class="school-address">
                      45 Shastri Nagar, Jaipur, Rajasthan - 302016<br>
                      Phone: +91-141-2345678 | Email: admin@rps.edu.in<br>
                      CBSE Affiliation No: 1234567 | School Code: 12345
                    </div>
                    <div class="rajasthan-text">राजस्थान पब्लिक स्कूल</div>
                  </div>
                  
                  <div class="document-title">ANNUAL FEE STRUCTURE ${currentAcademicYear}</div>
                  
                  <div class="student-info">
                    <h3 style="margin: 0 0 10px 0; color: #0f172a;">Student Information</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                      <div><strong>Student Name:</strong> ${studentInfo.name}</div>
                      <div><strong>Course:</strong> ${studentInfo.class}</div>
                      <div><strong>Roll Number:</strong> ${studentInfo.rollNumber}</div>
                      <div><strong>Academic Year:</strong> ${currentAcademicYear}</div>
                      <div><strong>Father's Name:</strong> ${studentInfo.fatherName}</div>
                      <div><strong>Generated Date:</strong> ${new Date().toLocaleDateString('en-IN')}</div>
                    </div>
                  </div>
                  
                  <table class="table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Fee Category</th>
                        <th>Annual Amount (₹)</th>
                        <th>No. of Installments</th>
                        <th>Amount per Installment (₹)</th>
                        <th>Due Dates</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${feeStructure.map((fee, index) => `
                        <tr>
                          <td>${index + 1}</td>
                          <td><strong>${fee.category}</strong></td>
                          <td class="amount">₹${fee.amount.toLocaleString()}</td>
                          <td>${fee.installments}</td>
                          <td class="amount">₹${Math.round(fee.amount / fee.installments).toLocaleString()}</td>
                          <td>
                            ${fee.installments === 1 ? 'April 15' : 
                              fee.installments === 2 ? 'April 15, Aug 15' : 
                              'April 15, Aug 15, Dec 15'}
                          </td>
                        </tr>
                      `).join('')}
                      <tr class="total-row">
                        <td colspan="2"><strong>TOTAL ANNUAL FEE</strong></td>
                        <td class="amount"><strong>₹${totalAnnualFee.toLocaleString()}</strong></td>
                        <td colspan="3"><strong>Amount in Words: ${numberToWords(totalAnnualFee)} Rupees Only</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div class="payment-terms">
                    <h3 style="margin: 0 0 15px 0; color: #0f172a;">Payment Terms & Conditions</h3>
                    <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                      <li>Fees must be paid by the due dates mentioned above</li>
                      <li>Late payment will attract a fine of ₹100 per day after due date</li>
                      <li>Fees can be paid online through school portal or at school counter</li>
                      <li>Original fee receipt must be preserved for record purposes</li>
                      <li>No fee refund after admission confirmation</li>
                      <li>Students with pending fees may not be allowed to attend classes</li>
                      <li>All fees are exclusive of examination fees charged by CBSE</li>
                      <li>Transport and hostel fees are optional and charged separately</li>
                    </ul>
                  </div>
                  
                  <div style="margin: 30px 0; padding: 20px; background: #fef3c7; border-radius: 10px;">
                    <h3 style="margin: 0 0 15px 0; color: #92400e;">Payment Methods Accepted</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                      <div>• UPI Payment</div>
                      <div>• Net Banking</div>
                      <div>• Credit/Debit Cards</div>
                      <div>• Cash (at school office only)</div>
                      <div>• Bank Transfer/NEFT</div>
                      <div>• Digital Wallets</div>
                    </div>
                  </div>
                  
                  <div class="footer">
                    <p><strong>This is an official fee structure document from Rajasthan Institute of Technology</strong></p>
                    <p>For any fee-related queries, contact: accounts@rps.edu.in | +91-141-2345678</p>
                    <div class="rajasthan-text" style="font-size: 16px; margin-top: 15px;">जय राजस्थान!</div>
                  </div>
                </body>
                </html>
                `;

                // Create downloadable file
                const blob = new Blob([feeStructureHTML], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `RIT_Fee_Structure_${currentAcademicYear}_${studentInfo.name.replace(/\s+/g, '_')}.html`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                toast.success("Fee Structure downloaded successfully!");
              }}
            >
              <Download className="h-4 w-4" />
              Download Fee Structure
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                // Generate comprehensive receipts summary as downloadable file
                const allReceiptsHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                  <title>All Fee Receipts - Rajasthan Institute of Technology</title>
                  <style>
                    body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #d97706; padding-bottom: 20px; }
                    .school-name { font-size: 28px; font-weight: bold; color: #d97706; margin-bottom: 5px; }
                    .receipt-summary { background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0; }
                    .receipt-item { border: 1px solid #e2e8f0; padding: 15px; margin: 10px 0; border-radius: 8px; background: white; }
                    .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
                    @media print { body { margin: 0; } }
                  </style>
                </head>
                <body>
                  <div class="header">
                    <div class="school-name">Rajasthan Institute of Technology</div>
                    <h2>ALL FEE RECEIPTS SUMMARY</h2>
                    <p>Student: ${studentInfo.name} | Class: ${studentInfo.class} | Academic Year: ${currentAcademicYear}</p>
                  </div>
                  
                  ${paymentHistory.map(payment => `
                    <div class="receipt-item">
                      <h3>Receipt No: ${payment.receiptNo}</h3>
                      <p><strong>Amount:</strong> ₹${payment.amount.toLocaleString()}</p>
                      <p><strong>Date:</strong> ${new Date(payment.date).toLocaleDateString('en-IN')}</p>
                      <p><strong>Method:</strong> ${payment.method}</p>
                      <p><strong>Status:</strong> ${payment.status}</p>
                      <p><strong>Description:</strong> ${payment.description}</p>
                    </div>
                  `).join('')}
                  
                  <div class="footer">
                    Generated on ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>जय राजस्थान!</strong>
                  </div>
                </body>
                </html>
                `;

                // Create downloadable file
                const blob = new Blob([allReceiptsHTML], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `RIT_All_Receipts_${currentAcademicYear}_${studentInfo.name.replace(/\s+/g, '_')}.html`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                toast.success("All receipts summary downloaded!");
              }}
            >
              <Receipt className="h-4 w-4" />
              View All Receipts
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => makePayment(5000)}
            >
              <DollarSign className="h-4 w-4" />
              Pay Custom Amount
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Make Payment - Razorpay
            </DialogTitle>
            <DialogDescription>
              Process your fee payment securely with Razorpay. All major payment methods supported.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
                max={pendingAmount}
              />
              {paymentAmount && parseFloat(paymentAmount) > 0 && (
                <p className="text-xs text-muted-foreground">
                  Processing fee: ₹{(parseFloat(paymentAmount) * 0.02).toFixed(2)} (2% + GST)
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">RP</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Razorpay Gateway</p>
                    <p className="text-xs text-blue-700">UPI • Cards • Net Banking • Wallets</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Student:</strong> {studentInfo.name}<br />
                <strong>Course:</strong> {studentInfo.class}<br />
                <strong>Roll No:</strong> {studentInfo.rollNumber}<br />
                <strong>Academic Year:</strong> {currentAcademicYear}
              </p>
            </div>
            
            {!isRazorpayLoaded && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Loading payment gateway... Please wait.
                </p>
              </div>
            )}
            
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-800">
                🔒 Secure payment powered by Razorpay. Your payment information is encrypted and secure.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={processPayment}
              disabled={isProcessing || !isRazorpayLoaded || !paymentAmount || parseFloat(paymentAmount) <= 0}
              className="w-full"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {isProcessing ? "Processing Payment..." : !isRazorpayLoaded ? "Loading Payment Gateway..." : `Pay ₹${paymentAmount || "0"} with Razorpay`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Due Dates Alert */}
      {upcomingDueDates.length > 0 && (
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              Upcoming Due Dates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDueDates.map((due, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium">{due.description}</div>
                    <div className="text-sm text-muted-foreground">
                      Due: {new Date(due.dueDate).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-700">₹{due.amount.toLocaleString()}</div>
                    <Badge className="bg-red-100 text-red-800">
                      {due.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Fee Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Breakdown - {currentAcademicYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feeStructure.map((fee, index) => {
                const amountPerInstallment = fee.amount / fee.installments;
                const paidForThisFee = amountPerInstallment * fee.paid;
                const pendingForThisFee = fee.amount - paidForThisFee;
                const status = fee.paid === fee.installments ? 'paid' : 'pending';
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{fee.category}</div>
                      <div className="text-sm text-muted-foreground">
                        {fee.paid}/{fee.installments} installments paid
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-medium">₹{fee.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          Pending: ₹{pendingForThisFee.toLocaleString()}
                        </div>
                      </div>
                      <Badge className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
              
              <Separator />
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="font-bold">Total</div>
                <div className="font-bold">₹{totalAnnualFee.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">₹{payment.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{payment.receiptNo}</div>
                    </div>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {payment.description}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(payment.date).toLocaleDateString('en-IN')}
                    </span>
                    <span>Method: {payment.method}</span>
                  </div>
                  {payment.status === "Completed" && (
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => generatePDFReceipt(payment)}
                      >
                        <Download className="mr-1 h-3 w-3" />
                        Receipt PDF
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <FileText className="mr-1 h-3 w-3" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Payment Details</DialogTitle>
                            <DialogDescription>{payment.receiptNo}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Date:</span>
                              <span>{new Date(payment.date).toLocaleDateString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Method:</span>
                              <span>{payment.method}</span>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                              <h4 className="font-medium">Fee Breakdown:</h4>
                              {payment.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between text-sm">
                                  <span>{item.category}</span>
                                  <span>₹{item.amount.toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Total:</span>
                              <span>₹{payment.amount.toLocaleString()}</span>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => generatePDFReceipt(payment)}>
                              <Printer className="mr-2 h-4 w-4" />
                              Print Receipt
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                  {payment.status === "Pending" && (
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        onClick={() => makePayment(payment.amount)}
                      >
                        <CreditCard className="mr-1 h-3 w-3" />
                        Pay Now
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Structure Table */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Fee Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Category</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Installments</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStructure.map((fee, index) => {
                const amountPerInstallment = fee.amount / fee.installments;
                const paidForThisFee = amountPerInstallment * fee.paid;
                const pendingForThisFee = fee.amount - paidForThisFee;
                const status = fee.paid === fee.installments ? 'paid' : 'pending';
                
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{fee.category}</TableCell>
                    <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                    <TableCell>{fee.installments}</TableCell>
                    <TableCell>₹{paidForThisFee.toLocaleString()}</TableCell>
                    <TableCell>₹{pendingForThisFee.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {status === "pending" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => makePayment(pendingForThisFee, fee.category)}
                        >
                          Pay Now
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}