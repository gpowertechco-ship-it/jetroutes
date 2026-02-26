import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane, Mail, Lock, Eye, EyeOff, ArrowRight, X } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      if (!email || !password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      // Check for admin credentials
      const isAdmin = email === "admin@jetroutes.us" && password === "adminpass@1";
      
      if (isAdmin) {
        // Admin login
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({ email, firstName: "Admin", lastName: "", isAdmin: true }));
        setIsLoading(false);
        navigate("/admin-dashboard", { replace: true });
        return;
      }

      // Regular user login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ email, firstName: email.split("@")[0], lastName: "" }));
      setIsLoading(false);
      
      // Redirect to checkout if coming from there
      const redirectState = location.state as any;
      if (redirectState?.redirect === "/checkout") {
        navigate("/checkout", { state: redirectState, replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }, 500);
  };

  const handleClose = () => {
    navigate(-1);
  };

  const benefits = [
    { title: "Best Deals", description: "Access exclusive flight offers and discounts" },
    { title: "Secure Booking", description: "Your transactions are fully protected" },
    { title: "Instant Confirmation", description: "Get your booking details right away" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-accent/20 flex items-center justify-center relative">
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .slide-in-right { animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .fade-in-backdrop { animation: fadeInBackdrop 0.4s ease-out; }
        .slide-up { animation: slideInUp 0.6s ease-out; }
        .slide-down { animation: slideInDown 0.6s ease-out; }
        .fade-in { animation: fadeIn 0.8s ease-out; }
      `}</style>

      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 fade-in-backdrop backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Main Container */}
      <div className="fixed inset-0 z-50 flex overflow-hidden">
        {/* Left Content - Hidden on mobile, visible on md+ */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center px-12 py-12 fade-in">
          <div className="max-w-lg">
            {/* Logo */}
            <div className="mb-12 slide-down">
              <Link to="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-all duration-300 group mb-8">
                <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                  <Plane className="h-6 w-6 group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <span className="font-bold text-2xl">JetRoutes</span>
              </Link>

              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">Your Journey<br />Starts Here</h1>
              <p className="text-lg text-white/80">Sign in to access exclusive travel deals, manage your bookings, and earn rewards on every flight.</p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 slide-up" style={{ animationDelay: `${0.2 + index * 0.08}s` }}>
                  <div className="text-white/60 font-medium text-sm">•</div>
                  <div>
                    <h3 className="font-semibold text-white">{benefit.title}</h3>
                    <p className="text-white/70 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-2 gap-6 slide-up" style={{ animationDelay: "0.44s" }}>
              <div>
                <p className="text-2xl font-bold text-white">50K+</p>
                <p className="text-white/70 text-sm">Happy Travelers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">1000+</p>
                <p className="text-white/70 text-sm">Routes Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className={`fixed md:relative right-0 top-0 h-full w-full sm:w-[440px] md:w-1/2 bg-white shadow-2xl z-50 flex flex-col slide-in-right overflow-y-auto`}>
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 left-6 sm:left-6 md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
          {/* Content */}
          <div className="flex-1 flex flex-col justify-between p-8 pt-16 sm:pt-8">
            {/* Header */}
            <div>
              <div className="mb-8 slide-down">
                <div className="flex items-center gap-3 mb-6 md:hidden">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Plane className="h-6 w-6 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">JetRoutes</h1>
                </div>
                <div className="hidden md:block mb-6">
                  <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
                </div>
                <p className="text-muted-foreground text-sm md:text-base">Sign in to continue your journey with JetRoutes</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium slide-up">
                    {error}
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2.5 slide-up" style={{ animationDelay: "0.1s" }}>
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-lg border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 bg-white"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2.5 slide-up" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Password
                    </Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-xs text-primary hover:text-primary/80 transition-colors font-medium hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-lg border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 bg-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 group slide-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-muted-foreground">New to JetRoutes?</span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <Link
                  to="/signup"
                  className="w-full block text-center py-3 px-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all duration-300 hover:border-primary/80 slide-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  Create an Account
                </Link>
              </form>
            </div>

            {/* Security Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground text-sm slide-up" style={{ animationDelay: "0.5s" }}>
              <div className="w-2 h-2 bg-primary/60 rounded-full" />
              <span>Secured with AES-256 Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
