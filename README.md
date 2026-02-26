<<<<<<< HEAD
# JetRoutes - Modern Flight Booking Platform

A production-ready flight booking web application built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**. Features a complete booking flow with multiple payment options including crypto payments.

🚀 **Live Demo:** [jetroutes.com](https://jetroutes.com)  
📚 **Docs:** [See DEPLOYMENT.md](./DEPLOYMENT.md)

## Features

✈️ **Flight Search & Booking**
- Advanced flight search with filters
- Real-time availability
- Multiple airlines support

💳 **Payment Integration**
- Credit/Debit Card (Stripe)
- Digital Wallets (Apple Pay, PayPal)
- Bank Transfer
- Cryptocurrency (USDT on Tron Network)
- Manual crypto payment approval workflow

👤 **User Management**
- Complete signup/login system
- User profiles with saved flights
- Booking history & management
- Rewards program

📱 **Responsive Design**
- Mobile-first approach
- Works on all devices
- Progressive enhancement

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/jetroutes.git
cd jetroutes
```

2. Install dependencies:
```sh
npm install
```

3. Create `.env` file from `.env.example`:
```sh
cp .env.example .env
```

4. Start development server:
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server (Vite HMR enabled)
- `npm run build` - Build for production
- `npm run build:dev` - Build for development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode

## Deployment

### One-Click Deployment

**Netlify:**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/jetroutes)

**Vercel:**
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/jetroutes)

### Environment Variables

Critical variables needed for production:
```
VITE_API_BASE_URL=https://your-api.com
VITE_SUPPORT_EMAIL=support@example.com
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx
VITE_PAYPAL_CLIENT_ID=xxx
```

See [.env.example](.env.example) for complete list.

### Build & Deploy

```sh
# Build production bundle
npm run build

# Preview build locally
npm run preview

# Deploy dist/ folder to your hosting
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Environment Configuration

Create `.env` file in project root (copy from `.env.example`):

```env
# API
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT=30000

# Payment
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx
VITE_PAYPAL_CLIENT_ID=xxx
VITE_CRYPTO_WALLET_ADDRESS=THQ8FBWSeRqWi9rSqkMa5xTuTL8pTbMTz7

# App
VITE_APP_NAME=JetRoutes
VITE_APP_URL=https://jetroutes.com
VITE_APP_ENVIRONMENT=production
```

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Build:** Vite 5 with SWC minification
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Forms:** React Hook Form + Zod validation
- **Routing:** React Router v6
- **State Management:** React Query (TanStack Query)
- **Icons:** Lucide React (400+ icons)
- **Charts:** Recharts
- **Notifications:** Sonner + Radix Toast

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/              # Page components (one per route)
│   ├── Index.tsx       # Home page
│   ├── Signup.tsx      # Registration flow
│   ├── FlightResults.tsx
│   ├── Checkout.tsx
│   ├── Payment.tsx
│   ├── CryptoPayment.tsx
│   ├── CryptoWaitingApproval.tsx
│   ├── Confirmation.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
│   ├── api-config.ts   # Environment & API configuration
│   ├── email-service.ts
│   ├── airlines.ts
│   └── utils.ts
├── App.tsx             # Main app component with routes
├── main.tsx            # Entry point
└── index.css           # Global styles

public/                 # Static assets
dist/                   # Production build output
```

## API Integration

The frontend expects the following backend API endpoints:

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /flights` - Search flights
- `POST /bookings` - Create booking
- `POST /payment/process` - Process payment
- `POST /email/send` - Send emails

Use `src/lib/api-config.ts` to configure API endpoints.

## Payment Integration

### Stripe
```javascript
import { loadStripe } from '@stripe/js';
const stripe = await loadStripe(API_CONFIG.stripePublicKey);
```

### PayPal
Set `VITE_PAYPAL_CLIENT_ID` environment variable.

### Cryptocurrency (USDT on Tron)
Manual approval workflow:
1. User confirms payment on blockchain
2. Notification sent to admin
3. Admin approves in backend
4. Ticket auto-generated
5. User receives booking confirmation


## Testing

```sh
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test
npm run test -- FlightSearch.test.ts
```

## Performance

Production build metrics:
- **Total Size:** ~710 KB (uncompressed)
- **Gzipped:** ~184 KB
- **Chunk Strategy:** Vendor, UI, and Main chunks for optimal loading
- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)

## Security

- ✅ HTTPS enforced on production
- ✅ Security headers configured (CSP, HSTS, X-Frame-Options)
- ✅ Environment variables for sensitive data
- ✅ Input validation with Zod
- ✅ XSS protection
- ✅ CSRF token support

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a Pull Request

## Troubleshooting

### Build fails with "terser not found"
```sh
npm install terser --save-dev
```

### Port 8080 already in use
```sh
npm run dev -- --port 3000
```

### Module not found errors
```sh
rm -rf node_modules package-lock.json
npm install
```

### API calls failing
- Check `VITE_API_BASE_URL` in `.env`
- Verify backend is running
- Check CORS headers in backend
- See browser console for details

## Support

- 📧 **Email:** support@jetroutes.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/yourusername/jetroutes/issues)
- 📖 **Documentation:** [DEPLOYMENT.md](./DEPLOYMENT.md)

## License

MIT License - See [LICENSE](./LICENSE) file for details

## Credits

Built with:
- [React](https://react.dev) - UI library
- [Vite](https://vitejs.dev) - Build tool
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - Components
- [Lucide Icons](https://lucide.dev) - Icons

---

**Made with ❤️ by the JetRoutes team**
=======
# jetroutes
>>>>>>> eb0d3d5bec1f6226bcc2a13b7b76af35df169f7f
