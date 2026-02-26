import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CryptoPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const { totalPrice, flight, searchParams } = (location.state as any) || {};
  const walletAddress = "THQ8FBWSeRqWi9rSqkMa5xTuTL8pTbMTz7";

  if (!totalPrice) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Payment information not available. Please go back and try again.</p>
            <Button onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}>Back to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentComplete = () => {
    navigate("/crypto-waiting-approval", {
      state: {
        flight,
        searchParams,
        totalPrice,
        selectedMethod: "wallet",
        selectedWallet: "crypto"
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <Button
            variant="ghost"
            className="mb-8 gap-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Payment
          </Button>

          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Crypto Payment</h1>
              <p className="text-muted-foreground text-lg">Send USDT (Tron Network - TRC20) to the wallet address below</p>
            </div>

            {/* Payment Details Card */}
            <Card className="border-border/50 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
                <h2 className="text-2xl font-bold">Payment Instructions</h2>
              </div>

              <div className="p-8 space-y-8">
                {/* QR Code / Address Image */}
                <div className="text-center">
                  <div className="bg-secondary/50 p-6 rounded-lg inline-block mb-4">
                    <img 
                      src="/crypto-address.jpg" 
                      alt="Crypto Wallet QR Code" 
                      className="h-64 w-64 object-contain"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Scan the QR code with your wallet app</p>
                </div>

                {/* Wallet Address Section */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-foreground">Wallet Address (TRC20)</label>
                  <div className="flex items-center gap-2 bg-secondary/50 p-4 rounded-lg">
                    <code className="flex-1 font-mono text-sm text-foreground break-all">{walletAddress}</code>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-shrink-0 gap-2"
                      onClick={handleCopyAddress}
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>

                {/* Payment Amount */}
                <div className="bg-primary/10 p-6 rounded-lg space-y-2">
                  <p className="text-muted-foreground text-sm">Amount to Pay</p>
                  <p className="text-4xl font-bold text-primary">{totalPrice.toFixed(2)} USDT</p>
                  <p className="text-xs text-muted-foreground">Tron Network (TRC20)</p>
                </div>

                {/* Instructions */}
                <div className="space-y-3 bg-secondary/30 p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">Payment Steps:</h3>
                  <ol className="space-y-2 text-sm text-foreground list-decimal list-inside">
                    <li>Open your crypto wallet (MetaMask, Trust Wallet, etc.)</li>
                    <li>Select USDT on the Tron Network (TRC20)</li>
                    <li>Copy the wallet address or scan the QR code above</li>
                    <li>Enter <span className="font-semibold">{totalPrice.toFixed(2)} USDT</span> as the amount</li>
                    <li>Confirm and send the transaction</li>
                    <li>Click "Payment Confirmed" below after sending</li>
                  </ol>
                </div>

                {/* Important Notice */}
                <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-lg">
                  <p className="text-sm text-amber-900">
                    <strong>Important:</strong> Please ensure you're sending USDT on the Tron Network (TRC20). Sending from other networks may result in permanent loss of funds.
                  </p>
                </div>

                {/* Confirmation Button */}
                <Button
                  size="lg"
                  className="w-full text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
                  onClick={handlePaymentComplete}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Payment Confirmed
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Click the button above once you have sent the payment to the wallet address
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CryptoPayment;
