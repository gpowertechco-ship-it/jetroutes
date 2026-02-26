import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle2, MapPin, Home, Zap, Award, Wifi, Shield, Sparkles, ArrowLeft } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Get the redirect and checkout info from location state
  const redirectTo = (location.state as any)?.redirect;
  const checkoutFlight = (location.state as any)?.flight;
  const checkoutSearchParams = (location.state as any)?.searchParams;

  const [formData, setFormData] = useState({
    // Step 1: Credentials
    email: "",
    password: "",
    confirmPassword: "",
    // Step 2: Personal
    firstName: "",
    lastName: "",
    phone: "",
    // Step 3: Address
    street: "",
    city: "",
    province: "",
    postalCode: "",
    // Step 4: Preferences
    agreeToTerms: false,
  });

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateStep1 = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (!formData.confirmPassword) {
      setError("Please confirm your password");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.street.trim()) {
      setError("Street address is required");
      return false;
    }
    if (!formData.city.trim()) {
      setError("City is required");
      return false;
    }
    if (!formData.province.trim()) {
      setError("Province/State is required");
      return false;
    }
    if (!formData.postalCode.trim()) {
      setError("Postal code is required");
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateStep4()) return;

    setIsLoading(true);

    setTimeout(() => {
      const user = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
      };
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user));
      
      // If coming from checkout, store checkout data and redirect back to checkout
      if (redirectTo === "/checkout" && checkoutFlight && checkoutSearchParams) {
        navigate(redirectTo, { 
          state: { 
            flight: checkoutFlight, 
            searchParams: checkoutSearchParams 
          },
          replace: true 
        });
      } else {
        navigate(redirectTo || "/", { replace: true });
      }
      setIsLoading(false);
    }, 500);
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-300";
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Logo Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 group w-fit">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
              <Plane className="h-6 w-6 text-primary group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="font-bold text-xl text-gray-900">JetRoutes</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Progress Bar */}
              <div className="bg-gradient-to-r from-primary to-primary/80 p-8">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-6 w-6" />
                    Create your JetRoutes account
                  </h1>
                  <p className="text-white/80 text-sm font-medium">Step {currentStep} of 4</p>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={currentStep === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="p-8">
                {error && (
                  <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                    {error}
                  </div>
                )}

                {/* Step 1: Email & Password */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-gray-300"
                      />
                      <p className="text-xs text-gray-500 mt-2">We'll send a verification code to this email</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Lock className="h-4 w-4 text-primary" />
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-gray-300 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>

                      {formData.password && (
                        <div className="mt-3 space-y-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div
                                key={i}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                  i <= passwordStrength ? getStrengthColor() : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            {passwordStrength === 0 && "Enter a password"}
                            {passwordStrength <= 2 && passwordStrength > 0 && "Weak password"}
                            {passwordStrength === 3 && "Good password"}
                            {passwordStrength >= 4 && "Strong password"}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Lock className="h-4 w-4 text-primary" />
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-gray-300 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {formData.password && formData.confirmPassword === formData.password && (
                        <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Passwords match
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-blue-900 font-medium">Password must have:</p>
                      <ul className="text-xs text-blue-800 mt-2 space-y-1">
                        <li>✓ Minimum 10 characters</li>
                        <li>✓ 1 uppercase letter</li>
                        <li>✓ 1 lowercase letter</li>
                        <li>✓ 1 number</li>
                        <li>✓ 1 special character</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-gray-300"
                      />
                    </div>

                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <p className="text-sm text-teal-900 font-medium">Complete your profile</p>
                      <p className="text-xs text-teal-800 mt-1">Adding a phone number helps us contact you for booking updates</p>
                    </div>
                  </div>
                )}

                {/* Step 3: Address */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Home className="h-4 w-4 text-primary" />
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="street"
                        placeholder="123 Main Street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-gray-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          placeholder="New York"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          Province/State
                        </label>
                        <input
                          type="text"
                          name="province"
                          placeholder="New York"
                          value={formData.province}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="10001"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 hover:border-gray-300"
                      />
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm text-purple-900 font-medium">Your address is secure</p>
                      <p className="text-xs text-purple-800 mt-1">We use your address for shipping confirmations and customer support</p>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Terms */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        Review your details
                      </h3>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-gray-500 text-xs">Email</p>
                          <p className="font-medium text-gray-900 truncate">{formData.email}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-gray-500 text-xs">Full Name</p>
                          <p className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-gray-500 text-xs">City</p>
                          <p className="font-medium text-gray-900">{formData.city}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-gray-500 text-xs">Province</p>
                          <p className="font-medium text-gray-900">{formData.province}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="mt-1 w-5 h-5 border-2 border-blue-300 rounded accent-primary cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          I agree to the{" "}
                          <Link to="#" className="text-primary font-semibold hover:underline">
                            Terms & Conditions
                          </Link>
                          {" "}and{" "}
                          <Link to="#" className="text-primary font-semibold hover:underline">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mt-1 w-5 h-5 border-2 border-blue-300 rounded accent-primary cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          Send me exclusive deals and travel inspiration
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 mt-8">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="h-5 w-5" />
                      Back
                    </Button>
                  )}
                  {currentStep < 4 && (
                    <Button
                      type="submit"
                      className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                    >
                      Next
                    </Button>
                  )}
                  {currentStep === 4 && (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 h-12 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-5 w-5" />
                          Create Account
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Sign In Link */}
                {currentStep === 1 && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                        Sign In
                      </Link>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right: Benefits Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  Being a member has its perks
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Perk 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Start earning JetRoutes points today</p>
                    <p className="text-gray-600 text-xs mt-1">Earn points on flights, vacations, checked bags and more.</p>
                  </div>
                </div>

                {/* Perk 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                      <Sparkles className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Go further with Rewards partners</p>
                    <p className="text-gray-600 text-xs mt-1">Link your account and get exclusive perks with partners like TELUS and Skip.</p>
                  </div>
                </div>

                {/* Perk 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100">
                      <Wifi className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Stay connected</p>
                    <p className="text-gray-600 text-xs mt-1">Work, stream, and play while you're in the air with access to JetRoutes Wi-Fi.</p>
                  </div>
                </div>

                {/* Perk 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100">
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Member exclusives</p>
                    <p className="text-gray-600 text-xs mt-1">You'll be the first to know about seat sales, new destinations, and exclusive offers.</p>
                  </div>
                </div>

                {/* Perk 5 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
                      <Shield className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Unlock top-tier benefits</p>
                    <p className="text-gray-600 text-xs mt-1">Earn tier qualifying spend on flights, seat selection, cabin upgrades and more.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Signup;
