import { Mail, MapPin, Calendar, Linkedin, Youtube, Facebook } from "lucide-react";
import telegramQr from "@/assets/telegram-qr.jpg";
import whatsappQr from "@/assets/whatsapp-qr.jpg";

// Custom TikTok icon since lucide doesn't have one
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "dennislubiano08@yahoo.com",
    href: "mailto:dennislubiano08@yahoo.com",
  },
  {
    icon: Mail,
    label: "Email",
    value: "cloudfonenew1990@gmail.com",
    href: "mailto:cloudfonenew1990@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Philippines (Remote)",
    href: null,
  },
  {
    icon: Calendar,
    label: "Availability",
    value: "Open for Projects",
    href: null,
  },
];

const socials = [
  { icon: TikTokIcon, href: "https://www.tiktok.com/@trueviralaishorts", label: "TikTok" },
  { icon: Youtube, href: "https://www.youtube.com/@trueviralaishorts", label: "YouTube" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61583900486439", label: "Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/dennis-lubiano-7b978416b/", label: "LinkedIn" },
];

const qrCodes = [
  { image: telegramQr, label: "Telegram", description: "Scan to message on Telegram" },
  { image: whatsappQr, label: "WhatsApp", description: "Scan to message on WhatsApp" },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-secondary font-semibold mb-2">Let's Work Together</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to automate your business processes? Let's discuss how I can help streamline your operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={`${item.label}-${index}`} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-11 h-11 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Intro Video & QR Codes */}
          <div className="space-y-8">
            {/* Intro Video */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
              <video
                src="/videos/intro-video.mp4"
                controls
                className="w-full aspect-video"
                poster=""
              />
              <div className="p-4">
                <p className="font-semibold text-lg">Watch My Introduction</p>
                <p className="text-sm text-muted-foreground">Learn more about my background and expertise in AI automation</p>
              </div>
            </div>

            {/* QR Codes */}
            <div className="grid sm:grid-cols-2 gap-6">
              {qrCodes.map((qr) => (
                <div 
                  key={qr.label} 
                  className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-glow transition-all duration-300 text-center"
                >
                  <div className="bg-white rounded-xl p-4 mb-4 inline-block">
                    <img 
                      src={qr.image} 
                      alt={`${qr.label} QR Code`} 
                      className="w-36 h-36 object-contain mx-auto"
                    />
                  </div>
                  <p className="font-semibold text-lg">{qr.label}</p>
                  <p className="text-sm text-muted-foreground">{qr.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
