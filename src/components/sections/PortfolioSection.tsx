import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Platform = "all" | "n8n" | "make" | "other";

const projects = [
  {
    id: 1,
    title: "ASMR Video Maker Automation",
    description: "Automated ASMR video creation pipeline using n8n for content generation and publishing.",
    platform: "n8n" as Platform,
    videoUrl: "/videos/n8n-asmr-maker.mp4",
    tools: ["n8n", "Video Processing", "Content Automation"],
    impact: "Automated content creation pipeline saving 20+ hours weekly",
  },
  {
    id: 2,
    title: "Google Drive to Facebook Publisher",
    description: "Download images from Google Drive and automatically post to Facebook pages with scheduling.",
    platform: "n8n" as Platform,
    videoUrl: "/videos/n8n-gdrive-facebook.mp4",
    tools: ["n8n", "Google Drive API", "Facebook Graph API"],
    impact: "Streamlined social media management for multiple clients",
  },
  {
    id: 3,
    title: "Xero Bank Statements to Asana",
    description: "Automated workflow to process Xero bank statements and create tasks in Asana for reconciliation.",
    platform: "make" as Platform,
    videoUrl: "/videos/make-xero-asana.mp4",
    tools: ["Make.com", "Xero", "Asana", "Financial Automation"],
    impact: "Reduced accounting reconciliation time by 80%",
  },
  {
    id: 4,
    title: "Telegram & Discord Bot",
    description: "Custom bot development for cross-platform communication and automation.",
    platform: "other" as Platform,
    videoUrl: "/videos/telegram-discord-bot.mp4",
    tools: ["Bot Development", "Telegram API", "Discord API"],
    impact: "24/7 automated customer engagement and notifications",
  },
];

const filters: { label: string; value: Platform }[] = [
  { label: "All Projects", value: "all" },
  { label: "n8n", value: "n8n" },
  { label: "Make.com", value: "make" },
  { label: "Other", value: "other" },
];

export const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState<Platform>("all");
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.platform === activeFilter
  );

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-secondary font-semibold mb-2">My Work</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Portfolio <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world automation solutions with video demonstrations
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-5 py-2 rounded-full font-medium transition-all duration-300",
                activeFilter === filter.value
                  ? "bg-gradient-accent text-primary-foreground shadow-glow"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-glow transition-all duration-300"
            >
              {/* Video Container */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                <video
                  src={project.videoUrl}
                  className="w-full h-full object-cover"
                  controls={playingVideo === project.id}
                  onPlay={() => setPlayingVideo(project.id)}
                  onPause={() => setPlayingVideo(null)}
                  poster=""
                />
                {playingVideo !== project.id && (
                  <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setPlayingVideo(project.id);
                        const video = document.querySelector(`video[src="${project.videoUrl}"]`) as HTMLVideoElement;
                        video?.play();
                      }}
                      className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
                    >
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </button>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary">
                    {project.platform === "n8n" ? "n8n" : project.platform === "make" ? "Make.com" : "Custom"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm">
                    <span className="font-semibold text-primary">Impact:</span>{" "}
                    <span className="text-muted-foreground">{project.impact}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
