import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, LogOut, Edit2, Save, X, CreditCard, Trash2, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { countries } from "@/lib/countries";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [nationality, setNationality] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Card form fields
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      navigate("/");
      return;
    }

    // Load user data
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setFirstName(parsedUser.firstName || "");
        setLastName(parsedUser.lastName || "");
        setEmail(parsedUser.email || "");
        setPhone(parsedUser.phone || "");
        setStreet(parsedUser.street || "");
        setCity(parsedUser.city || "");
        setProvince(parsedUser.province || "");
        setPostalCode(parsedUser.postalCode || "");
        setNationality(parsedUser.nationality || "");
        setDateOfBirth(parsedUser.dateOfBirth || "");
        setPassportNumber(parsedUser.passportNumber || "");
        setPassportExpiry(parsedUser.passportExpiry || "");
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }

    // Load saved cards
    const cardsData = localStorage.getItem("savedCards");
    if (cardsData) {
      try {
        setSavedCards(JSON.parse(cardsData));
      } catch (e) {
        console.error("Failed to parse cards data", e);
      }
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim() || !email.includes("@")) newErrors.email = "Valid email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const updatedUser = {
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      province,
      postalCode,
      nationality,
      dateOfBirth,
      passportNumber,
      passportExpiry,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/");
  };

  const validateCard = () => {
    const newErrors: Record<string, string> = {};

    if (!cardholderName.trim()) newErrors.cardholderName = "Cardholder name is required";
    if (!cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    if (cardNumber.replace(/\s/g, "").length !== 16) newErrors.cardNumber = "Card number must be 16 digits";
    if (!expiry.trim()) newErrors.expiry = "Expiry date is required";
    if (!/^\d{2}\/\d{2}$/.test(expiry)) newErrors.expiry = "Expiry must be in MM/YY format";
    if (!cvv.trim()) newErrors.cvv = "CVV is required";
    if (!/^\d{3,4}$/.test(cvv.replace(/\s/g, ""))) newErrors.cvv = "CVV must be 3-4 digits";

    setCardErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCard = () => {
    if (!validateCard()) return;

    const newCard = {
      id: Date.now().toString(),
      cardholderName,
      cardNumber: cardNumber.replace(/\s/g, ""),
      expiry,
      lastFour: cardNumber.slice(-4),
    };

    const updatedCards = [...savedCards, newCard];
    setSavedCards(updatedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));

    // Reset form
    setCardholderName("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setCardErrors({});
    setShowAddCard(false);
  };

  const handleDeleteCard = (cardId: string) => {
    const updatedCards = savedCards.filter((card) => card.id !== cardId);
    setSavedCards(updatedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <Button
            variant="ghost"
            className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>

          <Card className="border-border/50 shadow-lg overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-nav to-nav/80 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">My Profile</h1>
                    <p className="text-white/80">Manage your account information</p>
                  </div>
                </div>
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">Nationality</label>
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Passport Information Section */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Passport Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">Passport Number</label>
                    <input
                      type="text"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">Passport Expiry</label>
                    <input
                      type="date"
                      value={passportExpiry}
                      onChange={(e) => setPassportExpiry(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">Street Address</label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">Province/State</label>
                      <input
                        type="text"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Saved Cards Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Saved Cards
                  </h2>
                  {!showAddCard && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => setShowAddCard(true)}
                    >
                      <Plus className="h-4 w-4" />
                      Add Card
                    </Button>
                  )}
                </div>

                {showAddCard && (
                  <div className="bg-secondary/30 p-4 rounded-lg mb-4 space-y-4 border border-border">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                        />
                        {cardErrors.cardholderName && <p className="text-red-500 text-xs mt-1">{cardErrors.cardholderName}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                        />
                        {cardErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{cardErrors.cardNumber}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + "/" + value.slice(2, 4);
                            }
                            setExpiry(value);
                          }}
                          placeholder="12/25"
                          maxLength={5}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                        />
                        {cardErrors.expiry && <p className="text-red-500 text-xs mt-1">{cardErrors.expiry}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">CVV</label>
                        <input
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                        />
                        {cardErrors.cvv && <p className="text-red-500 text-xs mt-1">{cardErrors.cvv}</p>}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                        onClick={handleAddCard}
                      >
                        <Save className="h-4 w-4" />
                        Save Card
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 gap-2"
                        onClick={() => {
                          setShowAddCard(false);
                          setCardholderName("");
                          setCardNumber("");
                          setExpiry("");
                          setCvv("");
                          setCardErrors({});
                        }}
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {savedCards.length > 0 ? (
                  <div className="space-y-3">
                    {savedCards.map((card) => (
                      <div key={card.id} className="p-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg text-white flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <CreditCard className="h-8 w-8 opacity-80" />
                          <div>
                            <p className="font-semibold">{card.cardholderName}</p>
                            <p className="text-sm text-white/80">•••• •••• •••• {card.lastFour}</p>
                            <p className="text-xs text-white/60">Expires {card.expiry}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                          onClick={() => handleDeleteCard(card.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  !showAddCard && (
                    <p className="text-sm text-muted-foreground text-center py-4">No saved cards yet. Add your first card to get started.</p>
                  )
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                {isEditing ? (
                  <>
                    <Button
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => setIsEditing(false)}
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="destructive"
                    className="w-full gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
