import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, CheckCircle, Clock, Trash2, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PendingPayment {
  id: string;
  type: string;
  amount: number;
  currency: string;
  flight: any;
  searchParams: any;
  status: string;
  createdAt: string;
  userEmail: string;
  approvedAt?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PendingPayment | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check admin login on mount
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!adminLoggedIn) {
      navigate("/login");
      return;
    }
    setIsLoggedIn(true);

    // Load pending payments
    const payments = JSON.parse(localStorage.getItem("pendingCryptoPayments") || "[]");
    setPendingPayments(payments);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleApprovePayment = (paymentId: string) => {
    const updated = pendingPayments.map((p) => {
      if (p.id === paymentId) {
        return { ...p, status: "approved", approvedAt: new Date().toISOString() };
      }
      return p;
    });
    setPendingPayments(updated);
    localStorage.setItem("pendingCryptoPayments", JSON.stringify(updated));

    // Update current pending payment if it's being viewed
    const payment = updated.find((p) => p.id === paymentId);
    if (payment) {
      localStorage.setItem("currentPendingPayment", JSON.stringify(payment));
    }

    setSelectedPayment(null);
    alert("Payment approved successfully!");
  };

  const handleRejectPayment = (paymentId: string) => {
    const updated = pendingPayments.filter((p) => p.id !== paymentId);
    setPendingPayments(updated);
    localStorage.setItem("pendingCryptoPayments", JSON.stringify(updated));
    setSelectedPayment(null);
    alert("Payment rejected and removed!");
  };

  if (!isLoggedIn) {
    return null;
  }

  const pendingCount = pendingPayments.filter((p) => p.status === "pending_approval").length;
  const approvedCount = pendingPayments.filter((p) => p.status === "approved").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage cryptocurrency payment approvals</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 border-border/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Payments</p>
                  <p className="text-3xl font-bold text-foreground">{pendingPayments.length}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Approval</p>
                  <p className="text-3xl font-bold text-amber-600">{pendingCount}</p>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payments List */}
            <div className="lg:col-span-2">
              <Card className="border-border/50 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                  <h2 className="text-2xl font-bold">Pending Payments</h2>
                </div>

                <div className="p-6">
                  {pendingPayments.length === 0 ? (
                    <div className="text-center py-12">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-muted-foreground">No pending payments</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingPayments.map((payment) => (
                        <div
                          key={payment.id}
                          onClick={() => setSelectedPayment(payment)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedPayment?.id === payment.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50 bg-secondary/30"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  payment.status === "approved" ? "bg-green-500" : "bg-amber-500"
                                }`}
                              />
                              <div>
                                <p className="font-semibold text-foreground">{payment.id}</p>
                                <p className="text-sm text-muted-foreground">{payment.userEmail}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-foreground">
                                ${payment.amount.toFixed(2)} {payment.currency}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(payment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                payment.status === "approved"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              }`}
                            >
                              {payment.status.replace("_", " ").toUpperCase()}
                            </span>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {payment.flight.departure} → {payment.flight.arrival}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Payment Details */}
            <div>
              {selectedPayment ? (
                <Card className="border-border/50 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-accent to-accent/80 p-6 text-white">
                    <h3 className="text-xl font-bold">Payment Details</h3>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Booking Reference */}
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground font-semibold mb-1">BOOKING ID</p>
                      <p className="text-lg font-bold text-foreground font-mono">{selectedPayment.id}</p>
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">AMOUNT</p>
                        <p className="text-2xl font-bold text-primary">
                          ${selectedPayment.amount.toFixed(2)} {selectedPayment.currency}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">PAYER EMAIL</p>
                        <p className="text-foreground">{selectedPayment.userEmail}</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">PAYMENT TYPE</p>
                        <p className="text-foreground capitalize">{selectedPayment.type}</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">STATUS</p>
                        <span
                          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                            selectedPayment.status === "approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          }`}
                        >
                          {selectedPayment.status.replace("_", " ").toUpperCase()}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">CREATED</p>
                        <p className="text-foreground text-sm">
                          {new Date(selectedPayment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Flight Info */}
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground font-semibold mb-2">FLIGHT</p>
                      <div className="space-y-1 text-sm">
                        <p className="font-semibold">
                          {selectedPayment.flight.departure} → {selectedPayment.flight.arrival}
                        </p>
                        <p className="text-muted-foreground">{selectedPayment.flight.airlineData?.name}</p>
                        <p className="text-muted-foreground">Flight {selectedPayment.flight.flightNumber}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    {selectedPayment.status === "pending_approval" && (
                      <div className="space-y-3 pt-6 border-t border-border">
                        <Button
                          size="lg"
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                          onClick={() => handleApprovePayment(selectedPayment.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Payment
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full text-red-600 hover:text-red-700"
                          onClick={() => handleRejectPayment(selectedPayment.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Reject Payment
                        </Button>
                      </div>
                    )}

                    {selectedPayment.status === "approved" && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 p-4 rounded-lg">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          ✓ Payment approved by admin
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                          Approved: {new Date(selectedPayment.approvedAt!).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              ) : (
                <Card className="border-border/50 shadow-lg p-8 text-center">
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Select a payment to view details</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
