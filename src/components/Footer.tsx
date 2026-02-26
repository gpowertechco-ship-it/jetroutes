import { Plane } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  "About JetRoutes": [
    { label: "About us", href: "about-us" },
    { label: "Careers", href: "careers" },
    { label: "Media", href: "media" },
    { label: "Community investment", href: "community" },
  ],
  "Help": [
    { label: "Contact us", href: "/contact-us" },
    { label: "FAQs", href: "/help" },
    { label: "Accessibility", href: "accessibility" },
    { label: "Travel advisories", href: "advisories" },
  ],
  "Legal": [
    { label: "Terms of use", href: "terms" },
    { label: "Privacy policy", href: "privacy" },
    { label: "Cookie policy", href: "cookies" },
    { label: "Conditions of carriage", href: "conditions" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary/95 to-primary text-primary-foreground border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6" />
              <span className="font-bold text-lg">JetRoutes</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Global flight booking platform. Flying you to over 100 destinations.
            </p>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold mb-4 text-sm tracking-wide uppercase text-primary-foreground/90">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60 text-xs">
          © 2026 JetRoutes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
