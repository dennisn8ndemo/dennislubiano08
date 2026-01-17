import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
const navLinks = [{
  href: "#home",
  label: "Home"
}, {
  href: "#about",
  label: "About"
}, {
  href: "#services",
  label: "Services"
}, {
  href: "#portfolio",
  label: "Portfolio"
}, {
  href: "#contact",
  label: "Contact"
}];
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft py-3" : "bg-transparent py-5")}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#home" className="text-4xl md:text-5xl font-bold text-gradient">
          Dennis Lubiano
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => <a key={link.href} href={link.href} className="text-foreground/80 hover:text-primary transition-colors font-medium">
              {link.label}
            </a>)}
          <Button variant="hero" size="lg" asChild>
            <a href="#contact">$10/hr Part-time, Full-Time & One-Time Gigs</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-soft border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map(link => <a key={link.href} href={link.href} className="text-foreground/80 hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                {link.label}
              </a>)}
            <Button variant="hero" size="lg" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>}
    </nav>;
};