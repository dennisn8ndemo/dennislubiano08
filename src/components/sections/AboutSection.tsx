import { Shield, Zap, Users, Award } from "lucide-react";

const highlights = [
  {
    icon: Shield,
    title: "Former US KYC Officer",
    description: "Compliance expertise ensuring secure, reliable automation workflows",
  },
  {
    icon: Zap,
    title: "Automation Expert",
    description: "Mastery in n8n, Make.com, Zapier, Latenode & Activepieces",
  },
  {
    icon: Users,
    title: "CRM Specialist",
    description: "HubSpot, Asana, Monday.com, Apollo.io & Hunter.io proficient",
  },
  {
    icon: Award,
    title: "GHL Certified",
    description: "GoHighLevel automation and marketing expert",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <p className="text-secondary font-semibold">Let me introduce myself</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              From Compliance to{" "}
              <span className="text-gradient">Automation Excellence</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                With a strong foundation in KYC compliance and regulatory processes from my experience as a US KYC Officer, I transitioned into workflow automation to help businesses achieve operational excellence.
              </p>
              <p>
                My compliance background gives me a unique perspective on building secure, reliable, and auditable automation workflows. I understand the importance of data accuracy, process documentation, and risk management.
              </p>
              <p>
                Today, I specialize in creating intelligent automations that save businesses hundreds of hours monthly while maintaining the highest standards of data integrity and security.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="bg-card p-6 rounded-xl shadow-card border border-border hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
