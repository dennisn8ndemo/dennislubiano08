import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Star, Moon, CheckCircle, Facebook } from "lucide-react";

interface ZodiacInfo {
  sign: string;
  emoji: string;
  element: string;
  fortune: string;
}

const ZODIAC_SIGNS: { name: string; emoji: string; element: string; startMonth: number; startDay: number; endMonth: number; endDay: number }[] = [
  { name: "Capricorn", emoji: "♑", element: "Earth", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: "Aquarius", emoji: "♒", element: "Air", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: "Pisces", emoji: "♓", element: "Water", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: "Aries", emoji: "♈", element: "Fire", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: "Taurus", emoji: "♉", element: "Earth", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: "Gemini", emoji: "♊", element: "Air", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { name: "Cancer", emoji: "♋", element: "Water", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { name: "Leo", emoji: "♌", element: "Fire", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: "Virgo", emoji: "♍", element: "Earth", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: "Libra", emoji: "♎", element: "Air", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { name: "Scorpio", emoji: "♏", element: "Water", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { name: "Sagittarius", emoji: "♐", element: "Fire", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
];

const FORTUNES: Record<string, string[]> = {
  Fire: [
    "Your passion ignites new opportunities this week. Bold moves lead to breakthroughs! 🔥",
    "A creative surge is coming your way. Channel your energy into something meaningful! ✨",
    "Leadership opportunities arise. Trust your instincts and take charge! 💪",
  ],
  Earth: [
    "Stability and growth define your path ahead. Plant seeds for long-term success! 🌱",
    "Financial opportunities are aligning. Stay grounded and make wise investments! 💎",
    "Your patience pays off soon. Keep building toward your goals! 🏔️",
  ],
  Air: [
    "Communication is your superpower right now. Share your ideas boldly! 💨",
    "New connections bring unexpected blessings. Stay open to social opportunities! 🌬️",
    "Your intellectual curiosity leads to a discovery. Follow your questions! 🧠",
  ],
  Water: [
    "Trust your intuition—it's especially strong right now. Deep insights await! 🌊",
    "Emotional healing opens doors to new beginnings. Embrace vulnerability! 💧",
    "A creative or spiritual breakthrough is near. Dive deep into your passions! 🐚",
  ],
};

const getZodiacSign = (month: number, day: number): ZodiacInfo => {
  for (const sign of ZODIAC_SIGNS) {
    if (sign.name === "Capricorn") {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        const fortunes = FORTUNES[sign.element];
        return { sign: sign.name, emoji: sign.emoji, element: sign.element, fortune: fortunes[Math.floor(Math.random() * fortunes.length)] };
      }
    } else if (
      (month === sign.startMonth && day >= sign.startDay) ||
      (month === sign.endMonth && day <= sign.endDay)
    ) {
      const fortunes = FORTUNES[sign.element];
      return { sign: sign.name, emoji: sign.emoji, element: sign.element, fortune: fortunes[Math.floor(Math.random() * fortunes.length)] };
    }
  }
  const fallback = ZODIAC_SIGNS[0];
  const fortunes = FORTUNES[fallback.element];
  return { sign: fallback.name, emoji: fallback.emoji, element: fallback.element, fortune: fortunes[0] };
};

export const ZodiacFortuneSection = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [zodiacResult, setZodiacResult] = useState<ZodiacInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReveal = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !dateOfBirth) {
      setError("Please fill in all fields!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    const dob = new Date(dateOfBirth);
    const month = dob.getMonth() + 1;
    const day = dob.getDate();
    const result = getZodiacSign(month, day);
    setZodiacResult(result);
    setError(null);
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setDateOfBirth("");
    setZodiacResult(null);
    setError(null);
  };

  return (
    <section id="zodiac-fortune" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Moon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Zodiac Fortune</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Discover Your Zodiac Fortune</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter your details and reveal your zodiac sign with a personalized cosmic message! 🌟
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl">
            <CardContent className="p-6 md:p-8">
              {!zodiacResult ? (
                <div className="space-y-5">
                  <div className="text-center mb-2">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 text-sm text-muted-foreground">
                      🔮 Enter your details below 🔮
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name ✨</label>
                      <Input
                        placeholder="Your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name 🌟</label>
                      <Input
                        placeholder="Your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address 💌</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date of Birth 🎂</label>
                    <Input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>

                  {error && (
                    <div className="text-center text-destructive p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm">
                      {error}
                    </div>
                  )}

                  <Button onClick={handleReveal} className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Reveal My Zodiac Sign
                    <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="text-7xl mb-2">{zodiacResult.emoji}</div>
                  <div>
                    <h3 className="text-3xl font-bold mb-1">{zodiacResult.sign}</h3>
                    <p className="text-sm text-muted-foreground">
                      Element: <span className="font-semibold text-primary">{zodiacResult.element}</span>
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-muted/50 border border-border/50">
                    <Star className="w-6 h-6 text-primary mx-auto mb-3" />
                    <p className="text-lg leading-relaxed">{zodiacResult.fortune}</p>
                  </div>

                  <div className="p-5 rounded-xl bg-primary/10 border border-primary/20 space-y-3">
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

                  <Button variant="outline" onClick={handleReset}>
                    Try Another Reading
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
