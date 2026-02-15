import { Button } from "@/components/ui/button";
import { ArrowRight, Play, FileDown } from "lucide-react";
import profileImage from "@/assets/profile-picture.png";
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
          <div className="flex flex-col items-center lg:items-end animate-fade-in">
            <div className="relative flex items-center justify-center" style={{ width: 420, height: 420 }}>
              {/* Orbiting AI Tool Icons */}
              <OrbitingIcons size={280} />
              
              {/* Image container - centered inside the rings */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden shadow-glow border-4 border-background animate-float z-10">
                <img
                  src={profileImage}
                  alt="Dennis Lubiano - Automation Specialist"
                  className="w-full h-full object-cover"
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
            
            {/* Resume Download - below the rings */}
            <div className="mt-6 z-20">
              <a
                href="/Dennis_Lubiano_Resume.pdf"
                download="Dennis_Lubiano_Resume.pdf"
                className="inline-flex items-center gap-3 bg-card px-8 py-4 rounded-full shadow-card border border-border hover:border-primary hover:shadow-glow transition-all duration-300"
              >
                <FileDown className="w-6 h-6 text-primary" />
                <span className="text-base font-semibold text-foreground">Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
