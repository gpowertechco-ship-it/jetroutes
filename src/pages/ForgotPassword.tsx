import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-accent/20 flex flex-col">
      <div className="flex-1 flex justify-center items-center px-4 py-12">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-r from-primary to-accent rounded-full mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Reset Password</h1>
            <p className="text-muted-foreground">
              {submitted
                ? "Check your email for reset instructions"
                : "Enter your email address and we'll send you a link to reset your password"}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold rounded-lg py-3"
              >
                Send Reset Link
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link to="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
                <p className="text-emerald-800 text-sm">
                  Password reset link has been sent to <strong>{email}</strong>. Please check your inbox and spam folder.
                </p>
              </div>
              <Button
                onClick={() => navigate("/login")}
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold rounded-lg py-3"
              >
                Back to Sign In
              </Button>
            </div>
          )}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
