import { Plane, Search, Bell, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Flights", href: "/flights" },
  { label: "Saved Flights", href: "/saved-flights" },
  { label: "Vacations", href: "/vacations" },
  { label: "Offers", href: "/offers" },
  { label: "Manage Trips", href: "/manage-trips" },
  { label: "Check in", href: "/check-in" },
  { label: "Flight status", href: "/flight-status" },
  { label: "Rewards", href: "/rewards" },
  { label: "Help", href: "/help" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUserName(user.firstName || "User");
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }
    }
  }, []);

  return (
    <header className="bg-gradient-to-r from-nav to-nav/95 backdrop-blur-md bg-opacity-95 border-b border-nav/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Plane className="h-7 w-7 text-nav-foreground" />
            <span className="text-nav-foreground font-bold text-xl tracking-tight">
              JetRoutes
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.label} to={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button className="text-nav-foreground/80 hover:text-nav-foreground transition-colors hidden sm:block">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-nav-foreground/80 hover:text-nav-foreground transition-colors hidden sm:block relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-deal-badge rounded-full" />
            </button>
            {isLoggedIn ? (
              <>
                <Link to="/profile">
                  <Button variant="nav" size="sm" className="hidden sm:flex gap-2">
                    <User className="h-4 w-4" />
                    {userName}
                  </Button>
                </Link>
                <Button
                  variant="nav"
                  size="sm"
                  className="hidden sm:flex gap-2"
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("user");
                    setIsLoggedIn(false);
                    navigate("/");
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="nav" size="sm" className="hidden sm:flex gap-2">
                    <User className="h-4 w-4" />
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="hidden sm:flex bg-accent text-accent-foreground hover:bg-accent/90">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            <button
              className="lg:hidden text-nav-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.label} to={item.href} className="nav-link py-2 border-b border-nav-foreground/10" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
