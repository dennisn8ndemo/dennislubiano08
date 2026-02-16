import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
const profileImage = "/profile-picture.webp";
import heroBg from "@/assets/hero-bg.jpg";
import { OrbitingIcons } from "@/components/ui/OrbitingIcons";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-slide-up">
            <p className="text-secondary font-semibold text-lg">
              Hello, I'm a
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Workflow & AI{" "}
              <span className="text-gradient">Automation</span>{" "}
              <span className="text-gradient-warm">Specialist.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
              Former US KYC Officer turned automation expert. I help businesses scale efficiently using n8n, Make.com, Zapier, and GoHighLevel to streamline operations and boost productivity.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="hero" size="xl" asChild>
                <a href="#booking">
                  Schedule a Consultation
                  <ArrowRight className="ml-2" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#portfolio">
                  <Play className="mr-2" />
                  View Portfolio
                </a>
              </Button>
            </div>
          </div>

          {/* Profile Image with Orbiting AI Icons */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              {/* Orbiting AI Tool Icons */}
              <OrbitingIcons size={280} />
              
              {/* Image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-glow border-4 border-background animate-float z-10">
                <img
                  src={profileImage}
                  alt="Dennis Lubiano - Automation Specialist"
                  className="w-full h-full object-cover"
                  width={320}
                  height={320}
                  fetchPriority="high"
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -bottom-2 -left-4 bg-card px-4 py-2 rounded-full shadow-card border border-border z-20">
                <span className="text-sm font-semibold text-primary">n8n Expert</span>
              </div>
              <div className="absolute -top-2 -right-4 bg-card px-4 py-2 rounded-full shadow-card border border-border z-20">
                <span className="text-sm font-semibold text-secondary">KYC Background</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
