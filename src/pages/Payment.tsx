import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, Smartphone, Building, Lock, CheckCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedWallet, setSelectedWallet] = useState("apple");
  const [isProcessing, setIsProcessing] = useState(false);

  const { flight, searchParams, totalPrice, passengerInfo } = (location.state as any) || {};

  if (!flight) {
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

  const handlePayment = () => {
    // If crypto is selected, redirect to crypto payment page
    if (selectedMethod === "wallet" && selectedWallet === "crypto") {
      navigate("/crypto-payment", {
        state: {
          totalPrice,
          flight,
          searchParams,
          passengerInfo
        }
      });
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      navigate("/confirmation", {
        state: {
          flight,
          searchParams,
          totalPrice,
          passengerInfo,
          selectedMethod,
          selectedWallet: selectedMethod === "wallet" ? selectedWallet : null
        }
      });
    }, 2000);
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
      color: "from-blue-600 to-blue-700",
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      description: "Apple Pay, PayPal, Crypto",
      icon: Smartphone,
      color: "from-purple-600 to-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center px-4 py-8 lg:py-12">
        <div className="w-full max-w-5xl mx-auto px-0 lg:px-6">
          <Button
            variant="ghost"
            className="mb-8 gap-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Checkout
          </Button>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-2">Payment Method</h1>
            <p className="text-muted-foreground text-lg">Select your preferred way to complete your booking</p>
          </div>

          {/* Main Grid - 2 Columns */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {/* Left Column - Payment Methods & Form */}
            <div className="space-y-6">
              {/* Payment Methods */}
              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <Card
                      key={method.id}
                      className={`overflow-hidden cursor-pointer border-2 transition-all duration-300 hover:shadow-md ${
                        selectedMethod === method.id
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-border/50 hover:border-primary/30"
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="p-6 flex items-center gap-6">
                        {/* Icon Background */}
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${method.color} text-white flex-shrink-0`}>
                          <IconComponent className="h-8 w-8" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-1">{method.name}</h3>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>

                        {/* Radio Button */}
                        <div className="flex-shrink-0">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedMethod === method.id
                              ? "border-primary bg-primary"
                              : "border-border"
                          }`}>
                            {selectedMethod === method.id && (
                              <CheckCircle className="h-5 w-5 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Payment Form - Card */}
              {selectedMethod === "card" && (
                <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
                  <div className="bg-red-50 border-b-2 border-red-200 p-4 flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-700">Internal Error</p>
                      <p className="text-xs text-red-600">Credit card payment is temporarily unavailable. Please try another payment method.</p>
                    </div>
                  </div>
                  <form className="p-6 space-y-4 opacity-50 pointer-events-none">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </form>
                </Card>
              )}

              {/* Payment Form - Wallet */}
              {selectedMethod === "wallet" && (
                <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-nav to-nav/80 p-6 text-white">
                    <h3 className="text-xl font-bold">Select Wallet Provider</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      {[
                        { id: "apple", name: "Apple Pay", description: "Fast and secure payments with your Apple device" },
                        { id: "paypal", name: "PayPal", description: "Use your PayPal account for secure checkout" },
                        { id: "crypto", name: "Crypto", description: "Pay with cryptocurrency" },
                      ].map((wallet) => (
                        <label key={wallet.id} className="flex items-center gap-4 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary/30 transition-colors" style={{borderColor: selectedWallet === wallet.id ? "var(--color-primary)" : undefined}}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            selectedWallet === wallet.id
                              ? "border-primary bg-primary"
                              : "border-border"
                          }`}>
                            {selectedWallet === wallet.id && (
                              <div className="w-2.5 h-2.5 bg-primary-foreground rounded-full" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{wallet.name}</p>
                            <p className="text-xs text-muted-foreground">{wallet.description}</p>
                          </div>
                          <input
                            type="radio"
                            name="wallet"
                            value={wallet.id}
                            checked={selectedWallet === wallet.id}
                            onChange={(e) => setSelectedWallet(e.target.value)}
                            className="hidden"
                          />
                        </label>
                      ))}
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg flex items-center gap-3 mt-6">
                      <Lock className="h-5 w-5 text-primary flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">You'll be redirected to {selectedWallet === "apple" ? "Apple Pay" : selectedWallet === "paypal" ? "PayPal" : "your crypto wallet"} to complete the payment securely</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden sticky top-8">
                <div className="bg-gradient-to-r from-nav to-nav/80 p-6 text-white">
                  <h3 className="text-xl font-bold">Order Summary</h3>
                </div>

                <div className="p-6 space-y-6">
                  {/* Flight Info */}
                  <div className="space-y-2 pb-4 border-b border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Flight</p>
                        <p className="font-semibold text-foreground">{flight.airline}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>{searchParams?.from} → {searchParams?.to}</p>
                      <p>{searchParams?.departDate}</p>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 pb-4 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">${(flight.price * ((searchParams?.adults || 0) + (searchParams?.children || 0))).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxes & Fees</span>
                      <span className="font-medium text-foreground">${(totalPrice - (flight.price * ((searchParams?.adults || 0) + (searchParams?.children || 0)))).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                    <p className="text-4xl font-bold text-primary">${totalPrice.toFixed(2)}</p>
                  </div>

                  {/* Payment Button */}
                  <Button
                    size="lg"
                    className="w-full text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Complete Payment
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
