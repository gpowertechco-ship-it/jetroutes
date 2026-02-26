import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, AlertCircle, CheckCircle, Home, MapPin, Users, Download, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CryptoWaitingApproval = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isApproved, setIsApproved] = useState(false);
  const [approvalStartTime] = useState(Date.now());
  // simulate blockchain confirmation countdown (blocks remaining)
  // roughly 1 block per second, so 60-180 blocks equals 1–3 minutes
  const [blocksLeft, setBlocksLeft] = useState(120);

  const { totalPrice, flight, searchParams } = (location.state as any) || {};

  // Generate booking reference
  const bookingReference = `JR${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  // Send admin notification on component mount
  useEffect(() => {
    if (flight && totalPrice) {
      // Store pending payment notification for admin
      const pendingPayment = {
        id: bookingReference,
        type: "crypto_payment",
        amount: totalPrice,
        currency: "USDT",
        flight: flight,
        searchParams: searchParams,
        status: "pending_approval",
        createdAt: new Date().toISOString(),
        userEmail: localStorage.getItem("userEmail") || "customer@example.com",
      };

      // Add to pending payments list (admin dashboard will read this)
      const pendingPayments = JSON.parse(localStorage.getItem("pendingCryptoPayments") || "[]");
      pendingPayments.push(pendingPayment);
      localStorage.setItem("pendingCryptoPayments", JSON.stringify(pendingPayments));

      // Store current pending payment info for this page
      localStorage.setItem("currentPendingPayment", JSON.stringify(pendingPayment));
    }
  }, []);

  // Countdown blocks and simulate admin approval
  useEffect(() => {
    const checkApprovalInterval = setInterval(() => {
      const currentPending = localStorage.getItem("currentPendingPayment");
      if (currentPending) {
        const pending = JSON.parse(currentPending);
        if (pending.status === "approved") {
          setIsApproved(true);
          clearInterval(checkApprovalInterval);
        }
      }
    }, 2000);

    return () => clearInterval(checkApprovalInterval);
  }, []);

  // block countdown timer (approximates confirmation time)
  // continues counting but does NOT auto-approve - admin must manually approve
  useEffect(() => {
    if (isApproved) return;
    const interval = setInterval(() => {
      setBlocksLeft((b) => {
        if (b <= 1) {
          // Timer reached 0, but do NOT auto-approve
          // Admin must manually approve via admin dashboard
          return 0;
        }
        return b - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isApproved]);

  const handleViewTicket = () => {
    navigate("/confirmation", {
      state: {
        flight,
        searchParams,
        totalPrice,
        selectedMethod: "wallet",
        selectedWallet: "crypto",
        bookingReference,
      },
    });
  };

  const handleBackHome = () => {
    navigate("/");
  };

  if (!flight) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Payment information not available.</p>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const timeElapsed = Math.floor((Date.now() - approvalStartTime) / 1000);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${isApproved ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}>
                {isApproved ? (
                  <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400 animate-bounce" />
                ) : (
                  <Clock className="h-16 w-16 text-amber-600 dark:text-amber-400 animate-spin" />
                )}
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {isApproved ? "Payment Approved!" : "Payment Pending Approval"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isApproved
                ? "Your crypto payment has been verified. Your ticket is ready!"
                : "Your payment is being verified by our team. This usually takes 5-15 minutes."}
            </p>
          </div>

          <div className="space-y-6">
  
            {/* Support Card */}
            <Card className="border-border/50 shadow-lg">
              <div className="p-8 bg-secondary/30 rounded-lg border border-border/50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Need Help?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If your payment isn't approved within 15 minutes, please contact our support team:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="mailto:support@jetroutes.com" className="flex items-center gap-2 text-primary hover:underline text-sm font-medium">
                    <Mail className="h-4 w-4" />
                    support@jetroutes.com
                  </a>
                  <a href="tel:+1-555-JETROUTES" className="flex items-center gap-2 text-primary hover:underline text-sm font-medium">
                    <Phone className="h-4 w-4" />
                    +1 (555) JETROUTES
                  </a>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isApproved && (
                <Button
                  size="lg"
                  className="flex-1 text-base font-semibold bg-green-600 hover:bg-green-700"
                  onClick={handleViewTicket}
                >
                  <Download className="h-5 w-5 mr-2" />
                  View & Download Ticket
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                className="flex-1 text-base font-semibold"
                onClick={handleBackHome}
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </div>

            {!isApproved && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  This page will automatically update when your payment is approved or when the blockchain confirms the transaction ({blocksLeft} blocks remaining).
                </p>
              </div>
            )}          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CryptoWaitingApproval;
