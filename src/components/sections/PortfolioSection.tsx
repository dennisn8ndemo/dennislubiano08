import { useState, useEffect } from "react";
import { Play, ThumbsUp, Heart, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = "all" | "n8n" | "make" | "other";

type ReactionType = "like" | "heart" | "wow";

const projects = [
  {
    id: 1,
    title: "Google Ads Daily Report",
    description: "Automated daily reporting workflow that pulls Google Ads performance data and generates comprehensive reports.",
    platform: "n8n" as Platform,
    videoUrl: "/videos/n8n-google-ads-report.mp4",
    tools: ["n8n", "Google Ads API", "Automated Reporting"],
    impact: "Automated daily ad performance tracking saving hours of manual work",
  },
  {
    id: 2,
    title: "Calendly Appointments to Airtable",
    description: "Automated workflow syncing Calendly appointments directly to Airtable for seamless scheduling management.",
    platform: "n8n" as Platform,
    videoUrl: "/videos/calendly-airtable.mp4",
    tools: ["n8n", "Calendly API", "Airtable API"],
    impact: "Eliminated manual data entry for appointment tracking",
  },
  {
    id: 3,
    title: "ASMR Video Maker Automation",
    description: "Automated ASMR video creation pipeline using n8n for content generation and publishing.",
    platform: "n8n" as Platform,
    videoUrl: "/videos/n8n-asmr-maker.mp4",
    tools: ["n8n", "Video Processing", "Content Automation"],
    impact: "Automated content creation pipeline saving 20+ hours weekly",
  },
  {
    id: 4,
    title: "Xero Bank Statements to Asana",
    description: "Automated workflow to process Xero bank statements and create tasks in Asana for reconciliation.",
    platform: "make" as Platform,
    videoUrl: "/videos/make-xero-asana.mp4",
    tools: ["Make.com", "Xero", "Asana", "Financial Automation"],
    impact: "Reduced accounting reconciliation time by 80%",
  },
];

const filters: { label: string; value: Platform }[] = [
  { label: "All Projects", value: "all" },
  { label: "n8n", value: "n8n" },
  { label: "Make.com", value: "make" },
  { label: "Other", value: "other" },
];

const reactionConfig: { type: ReactionType; icon: typeof ThumbsUp; label: string }[] = [
  { type: "like", icon: ThumbsUp, label: "Like" },
  { type: "heart", icon: Heart, label: "Heart" },
  { type: "wow", icon: Smile, label: "Wow" },
];

type Reactions = Record<number, Record<ReactionType, number>>;

const getStoredReactions = (): Reactions => {
  try {
    const stored = localStorage.getItem("portfolio_reactions");
    if (stored) return JSON.parse(stored);
  } catch {}
  // Default seed counts to look active
  return {
    1: { like: 24, heart: 18, wow: 9 },
    2: { like: 31, heart: 22, wow: 14 },
    3: { like: 19, heart: 15, wow: 7 },
    4: { like: 12, heart: 8, wow: 5 },
  };
};

const saveReactions = (reactions: Reactions) => {
  try {
    localStorage.setItem("portfolio_reactions", JSON.stringify(reactions));
  } catch {}
};

export const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState<Platform>("all");
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [reactions, setReactions] = useState<Reactions>(getStoredReactions);
  const [animating, setAnimating] = useState<string | null>(null);

  useEffect(() => {
    saveReactions(reactions);
  }, [reactions]);

  const handleReaction = (projectId: number, type: ReactionType) => {
    setReactions((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [type]: (prev[projectId]?.[type] || 0) + 1,
      },
    }));
    setAnimating(`${projectId}-${type}`);
    setTimeout(() => setAnimating(null), 400);
  };

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
                  <p className="text-sm mb-4">
                    <span className="font-semibold text-primary">Impact:</span>{" "}
                    <span className="text-muted-foreground">{project.impact}</span>
                  </p>

                  {/* Reactions */}
                  <div className="flex items-center gap-3">
                    {reactionConfig.map(({ type, icon: Icon, label }) => {
                      const count = reactions[project.id]?.[type] || 0;
                      const isAnimating = animating === `${project.id}-${type}`;
                      return (
                        <button
                          key={type}
                          onClick={() => handleReaction(project.id, type)}
                          className={cn(
                            "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95",
                            isAnimating && "scale-110"
                          )}
                          title={label}
                        >
                          <Icon
                            className={cn(
                              "w-4 h-4 transition-all duration-200",
                              type === "like" && "text-primary",
                              type === "heart" && "text-destructive",
                              type === "wow" && "text-secondary",
                              isAnimating && "scale-125"
                            )}
                            fill={type === "heart" ? "currentColor" : "none"}
                          />
                          {/* Counter badge */}
                          <span
                            className={cn(
                              "absolute -top-2 -right-1 min-w-[20px] h-5 flex items-center justify-center px-1 rounded-full text-[10px] font-bold bg-primary text-primary-foreground shadow-sm transition-transform duration-200",
                              isAnimating && "scale-125"
                            )}
                          >
                            {count}
                          </span>
                          <span className="text-xs text-muted-foreground font-medium sr-only">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
