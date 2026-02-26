/**
 * API Configuration Module
 * Handles all environment-based API endpoints and settings
 */

export const API_CONFIG = {
  // API Base URL
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  
  // API Timeout
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000"),
  
  // Email Service
  emailServiceURL: import.meta.env.VITE_EMAIL_SERVICE_URL || "http://localhost:3000/email",
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || "support@jetroutes.com",
  
  // Payment Service
  paymentAPIURL: import.meta.env.VITE_PAYMENT_API_URL || "http://localhost:3000/payment",
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || "",
  paypalClientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "",
  
  // Crypto Payment
  cryptoWalletAddress: import.meta.env.VITE_CRYPTO_WALLET_ADDRESS || "THQ8FBWSeRqWi9rSqkMa5xTuTL8pTbMTz7",
  cryptoNetwork: import.meta.env.VITE_CRYPTO_NETWORK || "tron",
  
  // App Info
  appName: import.meta.env.VITE_APP_NAME || "JetRoutes",
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",
  appURL: import.meta.env.VITE_APP_URL || "http://localhost:8080",
  appEnvironment: import.meta.env.VITE_APP_ENVIRONMENT || "development",
  
  // Feature Flags
  features: {
    cryptoPayment: import.meta.env.VITE_ENABLE_CRYPTO_PAYMENT === "true",
    bankTransfer: import.meta.env.VITE_ENABLE_BANK_TRANSFER === "true",
    digitalWallet: import.meta.env.VITE_ENABLE_DIGITAL_WALLET === "true",
  },
  
  // Optional: Analytics & Monitoring
  googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || "",
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || "",
  
  // Debug Mode
  debugMode: import.meta.env.VITE_DEBUG_MODE === "true",
};

/**
 * API Endpoints Helper
 * Returns full URL for API endpoints
 */
export const getApiEndpoint = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

/**
 * Get Payment Method Configuration
 */
export const getPaymentConfig = (method: "stripe" | "paypal" | "bank" | "crypto") => {
  const configMap = {
    stripe: {
      publicKey: API_CONFIG.stripePublicKey,
      enabled: true,
    },
    paypal: {
      clientId: API_CONFIG.paypalClientId,
      enabled: true,
    },
    bank: {
      enabled: API_CONFIG.features.bankTransfer,
    },
    crypto: {
      walletAddress: API_CONFIG.cryptoWalletAddress,
      network: API_CONFIG.cryptoNetwork,
      enabled: API_CONFIG.features.cryptoPayment,
    },
  };
  return configMap[method];
};

/**
 * Validate API Configuration
 * Throws error if required configs are missing
 */
export const validateApiConfig = (): boolean => {
  const required = ["baseURL", "supportEmail"];
  const missing = required.filter((key) => !API_CONFIG[key as keyof typeof API_CONFIG]);
  
  if (missing.length > 0 && API_CONFIG.debugMode) {
    console.warn(`Missing API configuration keys: ${missing.join(", ")}`);
  }
  
  return missing.length === 0;
};

export default API_CONFIG;
