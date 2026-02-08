import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Andrew K.",
    role: "Onlinejobs.ph Client",
    content: "I am a beginner with n8n, and Dennis helped me automate my Facebook page and generate the necessary Access Tokens. He made a complex process very easy to understand.",
  },
  {
    name: "Robert J.",
    role: "Onlinejobs.ph Client",
    content: "Dennis helped me set up a simple form that captures all of my potential leads. Now, I have a reliable system where all my client data is automatically saved into our CRM and a Google Sheet for back up.",
  },
  {
    name: "Kyle K.",
    role: "Facebook Client",
    content: "I saw his short reels on Facebook and asked if he could teach me his process. He was generous enough to do a 1-on-1 online session with me. While you can learn workflows online, having someone guide you through n8n personally makes all the difference.",
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
