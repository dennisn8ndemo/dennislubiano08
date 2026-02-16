import { useState } from "react";

const BookingSection = () => {
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <section id="booking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Book a Consultation
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Schedule a free consultation to discuss your automation needs
          </p>
        </div>
        <div className="w-full max-w-6xl mx-auto">
          {showCalendly ? (
            <iframe
              src="https://calendly.com/cloudfonenew1990/dennis-lubiano-automation-specialist?hide_gdpr_banner=1"
              width="100%"
              height="700"
              frameBorder="0"
              scrolling="no"
              title="Schedule a consultation with Dennis Lubiano"
              className="rounded-lg overflow-hidden"
              loading="lazy"
            />
          ) : (
            <div
              className="h-[700px] rounded-lg bg-muted/50 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/70 transition-colors"
              onClick={() => setShowCalendly(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowCalendly(true); }}
            >
              <p className="text-foreground text-xl font-semibold mb-2">📅 Click to Open Booking Calendar</p>
              <p className="text-muted-foreground">Click here to load the scheduling widget</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { BookingSection };
