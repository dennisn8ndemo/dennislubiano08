const BookingSection = () => {
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
          <iframe
            src="https://calendly.com/cloudfonenew1990/dennis-lubiano-automation-specialist?hide_gdpr_banner=1"
            width="100%"
            height="700"
            frameBorder="0"
            scrolling="no"
            title="Schedule a consultation with Dennis Lubiano"
            className="rounded-lg overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
};

export { BookingSection };
