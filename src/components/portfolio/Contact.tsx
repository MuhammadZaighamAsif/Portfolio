import { useRef, useState, useEffect } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2 } from "lucide-react";
import { meta } from "@/data/portfolio";
import emailjs from "@emailjs/browser";
import { toast } from "@/hooks/use-toast";
import { showAchievement } from "@/lib/achievement";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactBitsText from "@/components/ui/ReactBitsText";

gsap.registerPlugin(ScrollTrigger);

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
  const formRef = useRef<HTMLFormElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const heading = ref.current?.querySelector("h2");
      const description = ref.current?.querySelector(".text-body-large");

      // Soft rise for the closing invitation
      gsap.from(heading, {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 20,
        duration: 0.75,
        ease: "power2.out",
      });
      gsap.from(description, {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 12,
        duration: 0.65,
        delay: 0.12,
        ease: "power2.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

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
        
        showAchievement("Message Sent", "Thanks for reaching out!");

        formRef.current.reset();
      }
    } catch (error: unknown) {
      console.error("Email send error:", error);
      const errorObj = error as { text?: string; status?: number; message?: string };
      console.error("Error details:", {
        text: errorObj?.text,
        status: errorObj?.status,
        message: errorObj?.message
      });
      
      // More detailed error message
      let errorMessage = "Please try again or contact me directly via email.";
      let errorTitle = "Failed to send message";
      
      if (errorObj?.text) {
        // Check for specific error messages
        if (errorObj.text.includes("template") || errorObj.text.includes("Template")) {
          errorTitle = "Template Error";
          errorMessage = "Template ID not found. Please check your EmailJS configuration.";
        } else if (errorObj.text.includes("service") || errorObj.text.includes("Service")) {
          errorTitle = "Service Error";
          errorMessage = "Service ID not found. Please verify your EmailJS service is connected.";
        } else if (errorObj.text.includes("public key") || errorObj.text.includes("Public Key")) {
          errorTitle = "Authentication Error";
          errorMessage = "Invalid Public Key. Please check your EmailJS account settings.";
        } else {
          errorMessage = errorObj.text;
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
    <section id="contact" className="section section-contact">
      <div ref={ref} className="container-custom flex flex-col items-center text-center">
        {/* Header */}
        <div className="max-w-3xl mb-16 w-full">
          <p className="text-caption mb-4" style={{ color: "var(--accent)" }}>
            Get in touch
          </p>
          <ReactBitsText text="Contact" variant="slide" className="text-heading mb-6" />
          <p className="text-body-large">
            I'm open to collaborations, internships, and exciting opportunities. Let's connect!
          </p>
        </div>

        <div className="max-w-3xl w-full text-left">
          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {contactItems.map((item, i) => (
              <div 
                key={i} 
                className="card-minimal p-5 text-center group"
              >
                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-3"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)"
                  }}
                >
                  <item.icon size={20} />
                </div>
                <p 
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm font-medium break-all hover:underline"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Social profiles */}
          <div className="card-minimal p-6 mb-8">
            <h3 
              className="text-center font-semibold mb-6" 
              style={{ color: "var(--text-primary)" }}
            >
              Find me on the web
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border transition-all group w-full sm:w-auto"
                  style={{
                    borderColor: "var(--border-color)",
                    background: "var(--bg-secondary)"
                  }}
                >
                  <div 
                    className="w-10 h-10 flex items-center justify-center rounded-full"
                    style={{
                      background: "var(--accent)",
                      color: "var(--bg-primary)"
                    }}
                  >
                    <link.icon size={20} />
                  </div>
                  <div>
                    <p 
                      className="font-semibold text-sm transition-colors group-hover:underline"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {link.label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      @{link.username}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-minimal p-8">
            <h3 
              className="text-xl font-semibold mb-6 text-center"
              style={{ color: "var(--text-primary)" }}
            >
              Send Me a Message
            </h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label 
                    htmlFor="user_name" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none"
                    style={{
                      background: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)"
                    }}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="user_email" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none"
                    style={{
                      background: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)"
                    }}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label 
                  htmlFor="subject" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none"
                  style={{
                    background: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)"
                  }}
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none resize-none"
                  style={{
                    background: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)"
                  }}
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "var(--accent)",
                  color: "white"
                }}
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

        {/* Divider */}
        <div className="mt-24">
          <div className="line" />
        </div>
      </div>
    </section>
  );
}
