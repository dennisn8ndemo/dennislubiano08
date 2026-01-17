import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah J.",
    role: "Small Business",
    content: "Dennis used his KYC expertise to slash my onboarding time by 30% while catching every red flag.",
  },
  {
    name: "Mike R.",
    role: "Forex Trader",
    content: "He solved my VPS and MetaTrader issues in minutes and automated my entire alert system.",
  },
  {
    name: "Amanda B.",
    role: "Shop Owner",
    content: "Dennis turned my manual data entry nightmare into a fully automated lead machine with Make.com.",
  },
  {
    name: "Dave M.",
    role: "Realtor",
    content: "The CRM automation Dennis built actually sounds human and has completely transformed my follow-ups.",
  },
  {
    name: "Jess F.",
    role: "Consultant",
    content: "Dennis is a rare find who perfectly bridges the gap between identity verification and tech automation.",
  },
  {
    name: "Rob E.",
    role: "Marketer",
    content: "He streamlined my TikTok leads into my CRM with zero friction—fast, technical, and highly effective.",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-secondary font-semibold mb-2">Client Feedback</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What People <span className="text-gradient">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real testimonials from clients I've helped with automation and compliance solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-glow transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-secondary text-secondary"
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.content}"
              </p>

              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-primary">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
