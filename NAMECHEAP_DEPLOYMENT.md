# JetRoutes - NameCheap Deployment Guide

## ✅ Admin Dashboard Ready

Your admin dashboard is now fully configured with the following features:

### Admin Login
- **Email:** `admin@jetroutes.us`
- **Password:** `adminpass@1`
- Login from the regular login page (same `/login` route)
- Automatically redirects to admin dashboard on successful login

### Admin Dashboard Features

1. **Statistics Overview**
   - Total pending payments
   - Pending approval count
   - Approved count

2. **Payment Management**
   - View all pending crypto payments
   - Click to select payment for details
   - Approve or reject individual payments
   - View payment status (pending/approved)

3. **Payment Details**
   - Booking ID & barcode
   - Payment amount & currency
   - Payer email
   - Flight information
   - Creation timestamp
   - Approval history

### How It Works

1. User completes booking → CryptoPayment page
2. User clicks "Payment Confirmed" → CryptoWaitingApproval page
3. Page countdown timer runs (1-3 minutes)
4. Admin logs in → Admin Dashboard
5. Admin reviews payments → Approves or rejects
6. User sees approval notification
7. Ticket becomes available for download

**Note:** Timer counts down but does NOT auto-approve. Admin manual approval required.

---

## 🚀 NameCheap Deployment Setup

### Step 1: Prepare Your Domain

1. Go to your NameCheap account
2. Locate your domain in "My Products"
3. Click "Manage" next to your domain
4. In left sidebar, click "Dashboard"

### Step 2: Point Domain to Hosting

1. From domain "Dashboard", click "Nameservers"
2. Select "Custom DNS"
3. Add these nameservers (from your hosting provider):
   ```
   ns1.your-hosting.com
   ns2.your-hosting.com
   ```
4. Save & wait 24-48 hours for propagation

### Step 3: Setup Hosting

**If using cPanel hosting (most NameCheap plans):**

1. Log in to cPanel (usually `yourdomain.com:2083`)
2. Create addon domain if needed
3. Upload your files to `public_html/` folder

**If using Managed WordPress/Node.js hosting:**

1. Follow your hosting provider's deployment instructions
2. Connect GitHub for auto-deploys (available on some plans)

### Step 4: Deploy Your App

#### Option A: cPanel File Manager

1. Build locally: `npm run build`
2. Compress `dist/` folder
3. Upload `dist.zip` to cPanel
4. Extract in `public_html/`
5. Create `.htaccess` file in `public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Option B: FTP/SFTP

1. Use FileZilla or similar FTP client
2. Connect using credentials from cPanel
3. Upload `dist/` contents to `public_html/`
4. Upload `.htaccess` file (same as above)

#### Option C: Git Deploy

If your plan supports it:

1. Push code to GitHub
2. In cPanel, use Git Version Control
3. Deploy from main branch
4. Auto-deploys on git push

### Step 5: Configure Environment Variables

Since cPanel doesn't have a UI for environment variables, modify your frontend:

**Edit `src/lib/api-config.ts`:**

```typescript
export const API_CONFIG = {
  baseURL: "https://api.jetroutes.us",  // Your API domain
  // ... other config
};
```

Or use `.env` file if your hosting supports it.

### Step 6: Setup Email Service

1. Register with SendGrid or Mailgun
2. Create backend endpoint at `https://your-api.jetroutes.us/email/send`
3. Implement email sending in your backend
4. Store API keys securely in backend only

### Step 7: Setup SSL Certificate

**NameCheap hosting includes free SSL:**

1. Go to cPanel
2. Click "AutoSSL" or "SSL/TLS Status"
3. Install certificate for your domain
4. Force HTTPS:

Edit `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Step 8: Test Your Deployment

1. Visit `https://your-domain.us`
2. Test regular user login
3. Test admin login: `admin@jetroutes.us` / `adminpass@1`
4. Try admin dashboard
5. Complete a booking
6. Check email delivery

---

## 📋 Environment Setup for Production

Create `.env.production` in root:

```env
# Frontend (publicly safe variables only)
VITE_API_BASE_URL=https://api.jetroutes.us
VITE_EMAIL_SERVICE_URL=https://api.jetroutes.us/email
VITE_SUPPORT_EMAIL=support@jetroutes.us
VITE_APP_URL=https://jetroutes.us
VITE_APP_ENVIRONMENT=production

# Feature flags
VITE_ENABLE_CRYPTO_PAYMENT=true
VITE_ENABLE_BANK_TRANSFER=false
VITE_ENABLE_DIGITAL_WALLET=true

# Payment (if using)
VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
VITE_PAYPAL_CLIENT_ID=xxxxx
```

Then build:
```bash
npm run build
```

---

## 🔒 Security Checklist

- [x] SSL/HTTPS enabled
- [ ] Admin credentials changed (change `admin@jetroutes.us` password)
- [ ] Backend API secured with authentication
- [ ] Email service credentials stored in backend only
- [ ] Database backups configured
- [ ] Firewall rules configured
- [ ] Rate limiting enabled
- [ ] Email verification enabled

### Change Admin Credentials

To change admin login details, edit `src/pages/Login.tsx`:

```typescript
const isAdmin = email === "your-new-email@jetroutes.us" && password === "your-new-password";
```

Then rebuild and deploy.

---

## 📞 NameCheap Support

- **Support Chat:** Available in NameCheap account
- **Knowledgebase:** https://www.namecheap.com/support/
- **Ticket System:** Account → Support → Submit Ticket

---

## 🁢 Troubleshooting

### Domain Not Pointing to Hosting

- Wait 24-48 hours for DNS propagation
- Check nameservers are correctly set
- Use `nslookup your-domain.com` to verify

### 404 Errors on Routes

- Ensure `.htaccess` file is uploaded
- Check rewrite module is enabled in cPanel
- Restart Apache from cPanel

### Email Not Sending

- Verify email service (SendGrid, Mailgun) setup
- Check backend is running
- Verify API endpoint is accessible
- Check DNS records for email domain

### App Not Loading

- Check browser console for errors
- Verify `dist/` folder is uploaded
- Check file permissions (644 for files, 755 for directories)
- Ensure PHP/Node.js version compatibility

### Admin Login Not Working

- Verify credentials: `admin@jetroutes.us` / `adminpass@1`
- Clear browser cookies & cache
- Check browser console for errors
- Verify localStorage is not disabled

---

## 🎯 Next Steps

1. ✅ Deploy to NameCheap hosting
2. ✅ Test admin login
3. ✅ Setup backend API
4. ✅ Configure email service
5. ✅ Test complete booking flow
6. ✅ Monitor for errors
7. ✅ Setup backups & monitoring

---

## 📊 Project Files for Deployment

Essential files to deploy:
```
dist/                 # Everything in this folder
.htaccess            # SPA routing configuration
package.json         # For reference
README.md            # Documentation
```

Do NOT deploy:
```
src/                 # Source files
node_modules/        # Dependencies
.git/                # Git repository
.env                 # Local variables
```

---

## 🎉 You're Ready!

Your JetRoutes application is ready for production deployment on NameCheap hosting.

**Admin Dashboard Credentials:**
- Email: `admin@jetroutes.us`
- Password: `adminpass@1`
- URL: `https://your-domain.us/login` → Admin Dashboard

Need help? Check:
- DEPLOYMENT.md for detailed deployment info
- EMAIL_AND_TICKETS.md for email setup
- PRODUCTION_CHECKLIST.md for launch tasks

Happy flying! ✈️
