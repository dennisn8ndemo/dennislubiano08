import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

interface ZodiacFormProps {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  error: string | null;
  onFirstNameChange: (v: string) => void;
  onLastNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onDateOfBirthChange: (v: string) => void;
  onSubmit: () => void;
}

export const ZodiacForm = ({
  firstName, lastName, email, dateOfBirth, error,
  onFirstNameChange, onLastNameChange, onEmailChange, onDateOfBirthChange, onSubmit,
}: ZodiacFormProps) => (
  <div className="space-y-5">
    <div className="text-center mb-2">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 text-sm text-muted-foreground">
        🔮 Enter your details below 🔮
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">First Name ✨</label>
        <Input placeholder="Your first name" value={firstName} onChange={(e) => onFirstNameChange(e.target.value)} className="bg-background/50" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Last Name 🌟</label>
        <Input placeholder="Your last name" value={lastName} onChange={(e) => onLastNameChange(e.target.value)} className="bg-background/50" />
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Email Address 💌</label>
      <Input type="email" placeholder="your.email@example.com" value={email} onChange={(e) => onEmailChange(e.target.value)} className="bg-background/50" />
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Date of Birth 🎂</label>
      <Input type="date" value={dateOfBirth} onChange={(e) => onDateOfBirthChange(e.target.value)} className="bg-background/50" />
    </div>

    {error && (
      <div className="text-center text-destructive p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm">
        {error}
      </div>
    )}

    <Button onClick={onSubmit} className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all">
      <Sparkles className="w-5 h-5 mr-2" />
      Reveal My Zodiac Sign
      <Sparkles className="w-5 h-5 ml-2" />
    </Button>
  </div>
);
