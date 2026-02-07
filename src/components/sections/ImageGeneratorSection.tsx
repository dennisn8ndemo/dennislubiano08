import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Download, Loader2, Wand2, Facebook, CheckCircle } from "lucide-react";

const POLLINATIONS_API_KEY = "sk_g6F0UOKrtccpNiHDoxkWzv69sqxCQrbu";

export const ImageGeneratorSection = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter an image idea first!");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImageUrl(null);
    setShowLeadCapture(false);
    setShowThankYou(false);

    try {
      // Pollinations.ai image generation URL
      const encodedPrompt = encodeURIComponent(prompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${Date.now()}`;
      
      // Pre-load the image to ensure it's generated
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to generate image"));
        img.src = imageUrl;
      });

      setGeneratedImageUrl(imageUrl);
      setShowLeadCapture(true);
    } catch (err) {
      setError("Failed to generate image. Please try again!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLeadSubmit = () => {
    if (!clientName.trim() || !clientEmail.trim()) {
      setError("Please enter your name and email!");
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      setError("Please enter a valid email address!");
      return;
    }

    setShowLeadCapture(false);
    setShowThankYou(true);
    setError(null);
  };

  const downloadImage = async () => {
    if (!generatedImageUrl) return;
    
    try {
      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Fallback: open in new tab
      window.open(generatedImageUrl, "_blank");
    }
  };

  const resetGenerator = () => {
    setPrompt("");
    setGeneratedImageUrl(null);
    setShowLeadCapture(false);
    setShowThankYou(false);
    setClientName("");
    setClientEmail("");
    setError(null);
  };

  return (
    <section id="image-generator" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Free AI Image Generator</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Create your image idea here</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your imagination into stunning visuals with AI. Just describe what you want to see!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl">
            <CardContent className="p-6 md:p-8">
              {/* Input Section */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Describe your image idea... (e.g., 'A futuristic city at sunset with flying cars')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !isGenerating && generateImage()}
                    className="pr-12 h-14 text-lg bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                    disabled={isGenerating}
                  />
                  <Wand2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                
                <Button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating your masterpiece...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-center text-destructive mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  {error}
                </div>
              )}

              {/* Generated Image */}
              {generatedImageUrl && (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-lg">
                    <img
                      src={generatedImageUrl}
                      alt={prompt}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={downloadImage}
                        className="backdrop-blur-sm bg-background/80"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* Lead Capture Form */}
                  {showLeadCapture && (
                    <div className="p-6 rounded-xl bg-muted/50 border border-border/50 space-y-4">
                      <h3 className="text-lg font-semibold text-center">
                        📧 Want to receive this image?
                      </h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Enter your details below and we'll send it to you!
                      </p>
                      <div className="grid gap-3">
                        <Input
                          type="text"
                          placeholder="Your Name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="bg-background/50"
                        />
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="bg-background/50"
                        />
                        <Button
                          onClick={handleLeadSubmit}
                          className="w-full"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Submit
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Thank You Message */}
                  {showThankYou && (
                    <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 space-y-4 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-2">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">
                        Thank you for visiting my site, {clientName}! 🎉
                      </h3>
                      <p className="text-muted-foreground">
                        Here is your image powered by <span className="font-semibold text-primary">dennisn8ndemo</span> and <span className="font-semibold text-primary">Pollinations.ai</span>
                      </p>
                      
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-sm text-muted-foreground mb-3">
                          Follow me for more AI content and see my scheduled workflow working everyday!
                        </p>
                        <a
                          href="https://www.facebook.com/profile.php?id=61583900486439"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1877f2] text-white font-semibold hover:bg-[#1877f2]/90 transition-all"
                        >
                          <Facebook className="w-5 h-5" />
                          Follow me on Facebook
                        </a>
                      </div>

                      <Button
                        variant="outline"
                        onClick={resetGenerator}
                        className="mt-4"
                      >
                        Generate Another Image
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Powered By */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Powered by{" "}
              <a
                href="https://pollinations.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Pollinations.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
