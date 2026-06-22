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
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      if (formRef.current) {
        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
        
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Email send error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
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
                    className="w-full px-4 py-3 rounded-lg bg-surface-elevated border border-outline-default text-foreground-default placeholder-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 rounded-lg bg-surface-elevated border border-outline-default text-foreground-default placeholder-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 rounded-lg bg-surface-elevated border border-outline-default text-foreground-default placeholder-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 rounded-lg bg-surface-elevated border border-outline-default text-foreground-default placeholder-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all resize-none"
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
        </div>
      </div>
    </section>
  );
}
