import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    toast({
      title: "Thanks for subscribing!",
      description: "You'll receive updates and insights in your inbox.",
    });
    setEmail("");
  };

  return (
    <section id="newsletter" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(var(--primary-rgb,33,73,92),0.15),transparent_50%)]"></div>
      
      <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-border p-12 shadow-xl">
          <div className="text-center space-y-6">
            <div className="inline-block p-4 bg-primary/10 rounded-full">
              <Send className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-3">
              <h2 className="font-serif text-4xl font-semibold text-foreground" data-testid="heading-newsletter">
                Stay Connected
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Subscribe to get insights, articles, and book updates directly in your inbox
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto pt-4">
              <Input
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-base border-2"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" size="lg" className="h-12 px-8" data-testid="button-newsletter-subscribe">
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
            
            <p className="text-sm text-muted-foreground pt-2">
              Join thousands of professionals staying ahead in cloud and AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
