import { Heart } from "lucide-react";

const platformLogos = [
  { name: "n8n", color: "text-primary" },
  { name: "Make.com", color: "text-secondary" },
  { name: "Zapier", color: "text-accent" },
  { name: "GHL", color: "text-primary" },
  { name: "HubSpot", color: "text-secondary" },
];

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Platform Logos */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {platformLogos.map((platform) => (
            <span
              key={platform.name}
              className={`text-sm font-semibold ${platform.color} opacity-70 hover:opacity-100 transition-opacity`}
            >
              {platform.name}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Dennis Lubiano. Made with{" "}
            <Heart className="w-4 h-4 text-secondary fill-secondary" /> for automation
          </p>
          <p className="text-sm mt-2">
            Workflow & AI Automation Specialist | Former US KYC Officer
          </p>
        </div>
      </div>
    </footer>
  );
};
