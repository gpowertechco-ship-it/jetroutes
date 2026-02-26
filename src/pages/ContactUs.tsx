import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Footer from "@/components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-white py-12 px-4">
        <div className="flex justify-center text-center">
          <div className="w-full">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-white/80">We'd love to hear from you</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-border">
            <Mail className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground break-all">support@jetroutes.com</p>
            <p className="text-muted-foreground text-sm mt-2">We'll respond within 24 hours</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-border">
            <Phone className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">Phone</h3>
            <p className="text-muted-foreground">+1 (800) 555-0123</p>
            <p className="text-muted-foreground text-sm mt-2">Mon-Fri, 8am-8pm EST</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-border">
            <MapPin className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">Address</h3>
            <p className="text-muted-foreground text-sm">
              123 Airline Boulevard<br />
              New York, NY 10001
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-border p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Send us a message</h2>

          {submitted ? (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6 text-center">
              <p className="text-emerald-800 font-semibold text-lg">
                Thank you for your message!
              </p>
              <p className="text-emerald-700 mt-2">
                We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  required
                  className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors bg-white min-h-[150px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-lg py-3 flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Send Message
              </Button>
            </form>
          )}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
