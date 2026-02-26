# Admin Dashboard Quick Start

## 🔑 Admin Login Credentials

```
Email: admin@jetroutes.us
Password: adminpass@1
```

## 📍 Access Point

1. Go to login page: `/login`
2. Enter admin credentials above
3. Click "Login"
4. Redirects to: `/admin-dashboard`

## 🎯 Admin Dashboard Features

### Dashboard Overview
- **Total Payments:** Count of all pending crypto payments
- **Pending Approval:** Count of payments awaiting admin review
- **Approved:** Count of already-approved payments

### Payment Review

**Left Panel - Payments List:**
- Shows all pending payments with booking ID
- Amount and date for each payment
- Status badge (Blue = Pending, Green = Approved)
- Click to select and view details

**Right Panel - Payment Details:**
- Full booking information
- Flight details (departure, arrival, airline)
- Payer email
- Payment amount
- Creation timestamp
- **Action Buttons:**
  - ✅ **Approve Payment** - Approves transaction (turns green)
  - ❌ **Reject Payment** - Removes from system
  - (Locked if already approved)

## 📊 Workflow

### Incoming Payment
1. User completes booking with crypto payment
2. "Payment Confirmed" starts countdown (1-3 min)
3. Payment added to pending list automatically

### Admin Review
1. Admin logs in to dashboard
2. Sees pending payment in left panel
3. Clicks payment to view details
4. Reviews flight and passenger info
5. Clicks "Approve Payment"

### User Notification
1. Payment approval stored in localStorage
2. User's waiting page updates
3. Ticket becomes available immediately
4. User downloads ticket & gets email

## 💾 Data Storage

**Development Mode:** All data in browser localStorage
- Key: `pendingCryptoPayments`
- Format: JSON array of payment objects
- Persists across page reloads

**Production Mode:** Should use backend database
- Store payments in protected database
- Use authentication for admin endpoints
- Implement proper logging & audit trails

## 📝 Pending Payment Structure

```javascript
{
  id: "JRXXXXXX",              // Booking ID
  type: "crypto_payment",      // Always crypto_payment
  amount: 250.00,              // Payment amount
  currency: "USDT",            // Always USDT (Tron)
  flight: { ... },             // Flight details
  searchParams: { ... },       // Search parameters
  status: "pending_approval",  // pending_approval or approved
  createdAt: "2024-...",       // ISO timestamp
  userEmail: "user@...",       // Payer email
  approvedAt: "2024-..."       // Timestamp when approved
}
```

## 🔄 Approval Process

1. **Admin clicks "Approve"**
   - Payment status changes to "approved"
   - Timestamp recorded in `approvedAt`
   - Stored back to localStorage

2. **Frontend Listening**
   - User waiting page polls localStorage
   - Detects approved status
   - Shows success message
   - Reveals download ticket button

3. **User Action**
   - Click "View & Download Ticket"
   - Navigates to confirmation page
   - Can download/print ticket
   - Confirmation email sent

## 🚨 Common Issues

### Payment Not Showing
- Refresh page
- Clear browser cache
- Check localStorage: Open DevTools → Application → LocalStorage

### Approval Not Working
- Check if payment status is already "approved"
- Verify admin is logged in
- Check browser console for errors
- Try refreshing admin dashboard

### Payment Disappearing After Reject
- Intentional - rejected payments are removed
- Can complete new booking with crypto payment
- Contact support if needed

## 🔐 Security Notes

**Current Setup (Development):**
- Uses localStorage (in-browser storage)
- Suitable for development/testing
- NOT secure for production

**For Production:**
- Implement backend authentication
- Use real database (MongoDB, PostgreSQL, etc.)
- Require password for approval
- Log all admin actions
- Email notification to team on new payments
- IP whitelist for admin dashboard

## 📱 Mobile Access

Admin dashboard works on mobile:
- Responsive design
- Touch-friendly buttons
- All features available
- Full viewport optimization

## 📞 Support

If admin dashboard isn't working:

1. Check login credentials
2. Verify localStorage is enabled
3. Check browser console (F12)
4. Clear cookies & try again
5. Use different browser
6. Contact developer

---

**Happy managing! Payment approval is just a click away.** ✅
