import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, Mail, Search, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book a flight?",
      answer: "Search for your destination using our flight search form, select your preferred flight, and follow the booking process to complete your reservation.",
    },
    {
      question: "Can I modify or cancel my booking?",
      answer: "Yes, you can manage your trips in your account. Cancellation and modification policies depend on your ticket type.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, debit cards, digital wallets, and bank transfers for your convenience.",
    },
    {
      question: "How early should I arrive for my flight?",
      answer: "We recommend arriving 2-3 hours before international flights and 1-2 hours before domestic flights.",
    },
    {
      question: "What is your baggage allowance?",
      answer: "Baggage allowance varies by airline and ticket type. Check your booking details for specific information.",
    },
    {
      question: "Do you offer travel insurance?",
      answer: "Yes, travel insurance options are available during the checkout process to protect your trip.",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-white py-12 px-4">
        <div className="flex justify-center text-center">
          <div className="w-full">
            <h1 className="text-5xl font-bold mb-4">How can we help?</h1>
            <p className="text-xl text-white/80">Find answers to your questions and get support</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Search Box */}
          <div className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg border-2 border-border"
            />
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Link
            to="/contact-us"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-2 border-border hover:border-primary"
          >
            <MessageCircle className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">Contact Us</h3>
            <p className="text-muted-foreground text-sm">Send us a message and we'll respond within 24 hours</p>
          </Link>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-2 border-border">
            <Phone className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">Call Us</h3>
            <p className="text-muted-foreground text-sm">+1 (800) 555-0123</p>
            <p className="text-muted-foreground text-sm">Mon-Fri, 8am-8pm EST</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-2 border-border">
            <Mail className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground text-sm break-all">support@jetroutes.com</p>
            <p className="text-muted-foreground text-sm">Response time: 24 hours</p>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border-2 border-border hover:border-primary transition-colors"
                >
                  <button
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === index ? null : index)
                    }
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors"
                  >
                    <span className="text-lg font-semibold text-foreground text-left">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-primary transition-transform ${
                        expandedFAQ === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 py-4 border-t-2 border-border bg-primary/5">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-lg">
                  No results found for "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Help;
