import { useRef } from "react";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { useIntersection } from "@/hooks/useIntersection";
import { meta } from "@/data/portfolio";

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
  const visible = useIntersection(ref);

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
        </div>
      </div>
    </section>
  );
}
