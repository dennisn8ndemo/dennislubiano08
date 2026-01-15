import { Workflow, Code, Bot, BarChart3, FolderKanban, Database } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "No-Code Automation",
    description: "Streamlining repetitive tasks with automated workflows to save time and boost productivity.",
    tools: ["n8n", "Zapier", "Make.com", "Latenode", "Activepieces"],
    gradient: "bg-gradient-accent",
  },
  {
    icon: Code,
    title: "API Integration",
    description: "Connecting different tools and platforms seamlessly for improved data efficiency and synchronization.",
    tools: ["REST APIs", "Webhooks", "GraphQL", "Custom Integrations"],
    gradient: "bg-gradient-warm",
  },
  {
    icon: Bot,
    title: "Bot Development",
    description: "Creating intelligent bots for Discord, Telegram, and other platforms to automate communications.",
    tools: ["Discord Bots", "Telegram Bots", "Chat Automation"],
    gradient: "bg-gradient-accent",
  },
  {
    icon: BarChart3,
    title: "CRM & Analytics",
    description: "Organize customer data, track interactions, and optimize relationships for improved sales.",
    tools: ["HubSpot", "Apollo.io", "Hunter.io", "Xero", "Google Sheets"],
    gradient: "bg-gradient-warm",
  },
  {
    icon: FolderKanban,
    title: "Project Management",
    description: "Streamline project workflows and team communication to boost productivity.",
    tools: ["Asana", "Monday.com", "GoHighLevel", "Slack"],
    gradient: "bg-gradient-accent",
  },
  {
    icon: Database,
    title: "Data Processing",
    description: "Automated data extraction, transformation, and loading for business intelligence.",
    tools: ["Google Drive", "Airtable", "Database Sync", "ETL Pipelines"],
    gradient: "bg-gradient-warm",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-secondary font-semibold mb-2">What I Offer</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Services & <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive automation solutions and technical expertise to transform your business operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card p-6 rounded-xl shadow-card border border-border hover:shadow-glow transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-xl ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-xl mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
