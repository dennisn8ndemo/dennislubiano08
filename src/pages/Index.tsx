import { lazy, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { Footer } from "@/components/layout/Footer";

const AboutSection = lazy(() => import("@/components/sections/AboutSection").then(m => ({ default: m.AboutSection })));
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection").then(m => ({ default: m.ServicesSection })));
const PortfolioSection = lazy(() => import("@/components/sections/PortfolioSection").then(m => ({ default: m.PortfolioSection })));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const BookingSection = lazy(() => import("@/components/sections/BookingSection").then(m => ({ default: m.BookingSection })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(m => ({ default: m.ContactSection })));
const RetroBreakSection = lazy(() => import("@/components/sections/RetroBreakSection").then(m => ({ default: m.RetroBreakSection })));
const ZodiacFortuneSection = lazy(() => import("@/components/sections/ZodiacFortuneSection").then(m => ({ default: m.ZodiacFortuneSection })));
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          <TestimonialsSection />
          <BookingSection />
          <ContactSection />
          <RetroBreakSection />
          <ZodiacFortuneSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
