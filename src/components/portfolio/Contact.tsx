import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2 } from "lucide-react";
import { useIntersection } from "@/hooks/useIntersection";
import { meta } from "@/data/portfolio";
import emailjs from "@emailjs/browser";
import { toast } from "@/hooks/use-toast";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: meta.email,
    href: `mailto:${meta.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: meta.phone,
    href: `tel:${meta.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: meta.location,
    href: null,
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: meta.github,
    username: "MuhammadZaighamAsif",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: meta.linkedin,
    username: "zaigham-asif-5a5499240",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const visible = useIntersection(ref);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace these with your EmailJS credentials
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check if credentials are configured
      if (!serviceId || !templateId || !publicKey || 
          serviceId === "YOUR_SERVICE_ID" || 
          templateId === "YOUR_TEMPLATE_ID" || 
          publicKey === "YOUR_PUBLIC_KEY") {
        toast({
          title: "EmailJS not configured",
          description: "Please set up your EmailJS credentials in the .env file. Check EMAILJS_SETUP.md for instructions.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (formRef.current) {
        // Get form data
        const formData = new FormData(formRef.current);
        const templateParams = {
          user_name: formData.get('user_name'),
          user_email: formData.get('user_email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        };

        // Send email using send() method instead of sendForm()
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon InshaAllah.",
        });
        
        formRef.current.reset();
      }
    } catch (error: any) {
      console.error("Email send error:", error);
      console.error("Error details:", {
        text: error?.text,
        status: error?.status,
        message: error?.message
      });
      
      // More detailed error message
      let errorMessage = "Please try again or contact me directly via email.";
      let errorTitle = "Failed to send message";
      
      if (error?.text) {
        // Check for specific error messages
        if (error.text.includes("template") || error.text.includes("Template")) {
          errorTitle = "Template Error";
          errorMessage = "Template ID not found. Please check EMAILJS_TEMPLATE.md or FIX_TEMPLATE_ID.md for help.";
        } else if (error.text.includes("service") || error.text.includes("Service")) {
          errorTitle = "Service Error";
          errorMessage = "Service ID not found. Please verify your EmailJS service is connected.";
        } else if (error.text.includes("public key") || error.text.includes("Public Key")) {
          errorTitle = "Authentication Error";
          errorMessage = "Invalid Public Key. Please check your EmailJS account settings.";
        } else {
          errorMessage = error.text;
        }
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-container">
      <div
        ref={ref}
        className={`section-inner transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-header">
          <span className="section-tag">Get in touch</span>
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            I'm open to collaborations, internships, and exciting opportunities. Let's connect!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {contactItems.map((item, i) => (
              <div key={i} className="glass-card p-5 text-center group">
                <div className="contact-icon-wrap mx-auto mb-3">
                  <item.icon size={20} className="text-primary-color" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground-subtle mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm text-foreground-default hover:text-primary-color transition-colors font-medium break-all"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-foreground-default font-medium">{item.value}</p>
                )}
              </div>
            ))}
          </div>
          {/* Social profiles */}
          <div className="glass-card p-6">
            <h3 className="text-center font-semibold text-foreground-default mb-6">
              Find me on the web
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-profile-card group"
                >
                  <div className="social-profile-icon">
                    <link.icon size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground-default group-hover:text-primary-color transition-colors">
                      {link.label}
                    </p>
                    <p className="text-xs text-foreground-subtle">@{link.username}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <br />
          {/* Contact Form */}
          <div className="glass-card p-8 mb-8">
            <h3 className="text-xl font-semibold text-foreground-default mb-6 text-center">
              Send Me a Message
            </h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-foreground-default mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    required
                    style={{ color: 'black' }}
                    className="w-full px-4 py-3 rounded-lg bg-surface-elevated border border-outline-default placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium text-foreground-default mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    required
                    style={{ color: 'black' }}
                    className="w-full px-4 py-3 rounded-lg bg-surface-elevated border border-outline-default placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground-default mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  style={{ color: 'black' }}
                  className="w-full px-4 py-3 rounded-lg bg-surface-elevated border border-outline-default placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground-default mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  style={{ color: 'black' }}
                  className="w-full px-4 py-3 rounded-lg bg-surface-elevated border border-outline-default placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
