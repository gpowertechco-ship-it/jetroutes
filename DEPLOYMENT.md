# JetRoutes Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured in `.env`
- [ ] Build succeeds without errors: `npm run build`
- [ ] No console errors in preview: `npm run preview`
- [ ] All payment integrations configured (Stripe, PayPal, Crypto)
- [ ] Email service configured (SendGrid, Mailgun, etc.)
- [ ] Authentication backend ready
- [ ] Database/API backend ready

## Environment Variables

Before deploying, ensure all required environment variables are set in your hosting platform:

### Critical Variables
```
VITE_API_BASE_URL=https://your-api.com
VITE_SUPPORT_EMAIL=support@yourcompany.com
VITE_APP_NAME=JetRoutes
VITE_APP_URL=https://your-domain.com
```

### Payment Integration
```
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx
VITE_PAYPAL_CLIENT_ID=xxx
VITE_CRYPTO_WALLET_ADDRESS=THQ8FBWSeRqWi9rSqkMa5xTuTL8pTbMTz7
```

### Optional
```
VITE_GOOGLE_ANALYTICS_ID=G-xxx
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

## Deployment Platforms

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Go to **Site Settings > Build & Deploy > Environment** and add environment variables
5. Deploy

**Key Settings:**
- Build: `npm run build`
- Publish: `dist`
- Node version: `18.17.0` or higher

### Vercel

1. Import your project from GitHub at [vercel.com](https://vercel.com)
2. Set Environment Variables in Project Settings
3. Deploy with default settings (Vercel auto-detects Vite)

**Settings:**
- Framework: Vite
- Build: `npm run build`
- Output: `dist`

### Traditional Hosting (cPanel, etc.)

1. Build locally: `npm run build`
2. Upload the `dist` folder to your web server's public directory
3. Ensure `.htaccess` is configured for SPA routing:

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

### AWS S3 + CloudFront

1. Build: `npm run build`
2. Upload `dist` folder to S3 bucket
3. Create CloudFront distribution pointing to S3
4. Configure S3 bucket policy for public read access
5. Set CloudFront to redirect all requests to `index.html` for SPA routing

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and deploy:
```bash
docker build -t jetroutes .
docker run -p 3000:3000 -e VITE_API_BASE_URL=https://api.example.com jetroutes
```

## SSL/HTTPS

All hosting platforms (Netlify, Vercel, etc.) provide free SSL certificates. Enable HTTPS in your platform settings.

**For traditional hosting:**
- Purchase SSL certificate or use Let's Encrypt
- Install certificate on web server
- Update `VITE_APP_URL` to use `https://`

## Database & Backend API

This frontend requires a backend API server. Ensure:

1. **Authentication Endpoints:**
   - `POST /auth/signup`
   - `POST /auth/login`
   - `POST /auth/logout`

2. **Booking Endpoints:**
   - `GET /flights` - Search flights
   - `POST /bookings` - Create booking
   - `GET /bookings/:id` - Get booking details

3. **Payment Endpoints:**
   - `POST /payment/process` - Process payment
   - `POST /payment/verify` - Verify payment

4. **Email Service:**
   - `POST /email/send-confirmation`
   - `POST /email/send-receipt`

See your backend documentation for full API specification.

## Testing Payments

### Stripe (Test Mode)
- Public Key: `pk_test_xxx`
- Test Card: `4242 4242 4242 4242`

### PayPal (Sandbox)
- Client ID: Use sandbox credentials
- Test Account: Create in PayPal developer dashboard

### Crypto (Testnet)
- Use Tron testnet for testing
- Wallet: Get from Tron faucet

## Monitoring & Analytics

1. **Google Analytics:**
   - Set `VITE_GOOGLE_ANALYTICS_ID` environment variable
   - Analytics code is included automatically

2. **Error Tracking (Sentry):**
   - Set `VITE_SENTRY_DSN` environment variable
   - Errors will be captured automatically

3. **Performance:**
   - Monitor Lighthouse scores
   - Check Core Web Vitals in Google Search Console

## Troubleshooting

### Blank page after deployment
- Check browser console for errors
- Verify environment variables are set
- Check dist folder uploaded correctly

### Login/API errors
- Verify `VITE_API_BASE_URL` is correct
- Check CORS headers on backend
- Test API endpoints with curl/Postman

### Images not loading
- Ensure image paths are relative or use absolute URLs
- Check public folder was deployed

### Payment issues
- Verify payment keys are correct (test vs. live)
- Check payment service configuration
- Test with test credentials first

## Production Best Practices

1. **Security:**
   - Use HTTPS everywhere
   - Set security headers (HSTS, CSP, etc.)
   - Protect sensitive credentials in environment variables

2. **Performance:**
   - Enable gzip compression on server
   - Use CDN for asset delivery
   - Monitor bundle size and optimize

3. **Monitoring:**
   - Set up error tracking
   - Monitor API response times
   - Track user interactions

4. **Backup:**
   - Regular backups of database
   - Version control all code
   - Document deployment process

## Support & Resources

- **Vite Docs:** https://vitejs.dev/
- **React Docs:** https://react.dev/
- **Netlify Docs:** https://docs.netlify.com/
- **Vercel Docs:** https://vercel.com/docs

For issues, check the troubleshooting guide or contact support at `support@jetroutes.com`.
