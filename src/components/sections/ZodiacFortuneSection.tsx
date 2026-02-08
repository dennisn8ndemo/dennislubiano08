import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Moon } from "lucide-react";
import { ZodiacForm } from "./zodiac/ZodiacForm";
import { ZodiacResult } from "./zodiac/ZodiacResult";
import { getChineseZodiacReading, type ZodiacReading } from "./zodiac/zodiacData";

export const ZodiacFortuneSection = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [reading, setReading] = useState<ZodiacReading | null>(null);
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
    const year = dob.getFullYear();
    setReading(getChineseZodiacReading(year));
    setError(null);
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setDateOfBirth("");
    setReading(null);
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
            <span className="text-gradient">Zodiac Fortune</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your Chinese zodiac sign and receive a personalized cosmic message! 🌸
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl">
            <CardContent className="p-6 md:p-8">
              {!reading ? (
                <ZodiacForm
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  dateOfBirth={dateOfBirth}
                  error={error}
                  onFirstNameChange={setFirstName}
                  onLastNameChange={setLastName}
                  onEmailChange={setEmail}
                  onDateOfBirthChange={setDateOfBirth}
                  onSubmit={handleReveal}
                />
              ) : (
                <ZodiacResult firstName={firstName} reading={reading} onReset={handleReset} />
              )}
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Made with ❤️ and a sprinkle of ✨ magic
        </p>
      </div>
    </section>
  );
};
