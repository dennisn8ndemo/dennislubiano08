import { Button } from "@/components/ui/button";
import { CheckCircle, Facebook, AlertTriangle, Lightbulb, RefreshCw } from "lucide-react";
import type { ZodiacReading } from "./zodiacData";

interface ZodiacResultProps {
  firstName: string;
  reading: ZodiacReading;
  onReset: () => void;
}

export const ZodiacResult = ({ firstName, reading, onReset }: ZodiacResultProps) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="text-center">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary">
        ✨ Your Zodiac Reading ✨
      </span>
      <h3 className="text-3xl font-bold mt-4">Hello, {firstName}! 🌸</h3>
    </div>

    {/* Animal & Element */}
    <div className="p-5 rounded-xl bg-muted/50 border border-border/50 text-center space-y-3">
      <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/15 text-lg font-bold text-primary">
        {reading.yearLabel} {reading.animal.emoji}
      </span>
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <span>{reading.element.emoji} {reading.element.name} Element</span>
        <span>✨</span>
        <span>{reading.animal.emoji} {reading.animal.name} Year</span>
      </div>
    </div>

    {/* Animal emoji display */}
    <div className="text-center text-7xl py-2">
      {reading.animal.emoji}
    </div>

    {/* Description */}
    <div className="p-5 rounded-xl bg-accent/10 border border-accent/20">
      <p className="text-base leading-relaxed text-center">{reading.description}</p>
    </div>

    {/* 2026 Outlook */}
    <div className="p-5 rounded-xl bg-primary/5 border border-primary/15">
      <p className="text-base leading-relaxed text-center italic">{reading.outlook2026}</p>
    </div>

    {/* Predictions Table */}
    <div>
      <h4 className="text-xl font-bold mb-4 text-center">
        {reading.animal.emoji} The {reading.yearLabel}: 2026 Outlook
      </h4>
      <div className="rounded-xl border border-border/50 overflow-hidden">
        <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] text-sm font-semibold border-b border-border/50 bg-muted/30">
          <div className="p-3">Category</div>
          <div className="p-3">2026 Prediction</div>
        </div>
        {reading.predictions.map((pred) => (
          <div key={pred.category} className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] border-b border-border/30 last:border-b-0">
            <div className="p-3 flex items-center gap-2 font-semibold">
              <span>{pred.emoji}</span>
              <span>{pred.category}</span>
            </div>
            <div className="p-3 text-muted-foreground leading-relaxed">{pred.prediction}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Strategic Advice */}
    <div className="p-5 rounded-xl bg-muted/50 border border-border/50 space-y-4">
      <h4 className="text-lg font-bold flex items-center gap-2">
        🛡️ {reading.advice.title}
      </h4>
      <p className="text-muted-foreground">{reading.advice.description}</p>

      <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/15">
        <p className="text-sm">
          <span className="font-semibold flex items-center gap-1 mb-1"><AlertTriangle className="w-4 h-4 text-destructive" /> The Challenge:</span>
          {reading.advice.challenge}
        </p>
      </div>

      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
        <p className="text-sm">
          <span className="font-semibold flex items-center gap-1 mb-1"><Lightbulb className="w-4 h-4 text-primary" /> The Solution:</span>
          {reading.advice.solution}
        </p>
      </div>
    </div>

    {/* Branding */}
    <div className="p-5 rounded-xl bg-primary/10 border border-primary/20 space-y-3 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
        <CheckCircle className="w-6 h-6 text-primary" />
      </div>
      <h4 className="text-lg font-bold">Thank you, {firstName}! 🎉</h4>
      <p className="text-sm text-muted-foreground">
        Your cosmic reading powered by <span className="font-semibold text-primary">dennisn8ndemo</span>
      </p>
      <div className="pt-3 border-t border-border/50">
        <p className="text-sm text-muted-foreground mb-3">Follow me for more fun tools and AI content!</p>
        <a
          href="https://www.facebook.com/profile.php?id=61583900486439"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1877f2] text-primary-foreground font-semibold hover:bg-[#1877f2]/90 transition-all"
        >
          <Facebook className="w-5 h-5" />
          Follow me on Facebook
        </a>
      </div>
    </div>

    <Button variant="outline" onClick={onReset} className="w-full h-12 text-base">
      <RefreshCw className="w-4 h-4 mr-2" />
      Try Another Reading
    </Button>
  </div>
);
