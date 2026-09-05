import { lazy, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { Footer } from "@/components/layout/Footer";

const AboutSection = lazy(() => import("@/components/sections/AboutSection").then(m => ({ default: m.AboutSection })));
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection").then(m => ({ default: m.ServicesSection })));
const PortfolioSection = lazy(() => import("@/components/sections/PortfolioSection").then(m => ({ default: m.PortfolioSection })));
const BookingSection = lazy(() => import("@/components/sections/BookingSection").then(m => ({ default: m.BookingSection })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(m => ({ default: m.ContactSection })));
const RetroBreakSection = lazy(() => import("@/components/sections/RetroBreakSection").then(m => ({ default: m.RetroBreakSection })));
const ZodiacFortuneSection = lazy(() => import("@/components/sections/ZodiacFortuneSection").then(m => ({ default: m.ZodiacFortuneSection })));
const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Fixed Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-20 z-0"
      >
        <source src="/videos/hero-bg-video.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10">
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          <BookingSection />
          <ContactSection />
          <RetroBreakSection />
          <ZodiacFortuneSection />
        </Suspense>
      </main>
      <Footer />
      </div>
    </div>
  );
};

export default Index;
