import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { RetroBreakSection } from "@/components/sections/RetroBreakSection";
import { ZodiacFortuneSection } from "@/components/sections/ZodiacFortuneSection";
import { ImageGeneratorSection } from "@/components/sections/ImageGeneratorSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <BookingSection />
        <ContactSection />
        <RetroBreakSection />
        <ZodiacFortuneSection />
        <ImageGeneratorSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
