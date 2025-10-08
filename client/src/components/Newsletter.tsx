import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const INTEREST_OPTIONS = [
  { id: "cloud", label: "Cloud Strategy" },
  { id: "ai", label: "AI & Innovation" },
  { id: "leadership", label: "Tech Leadership" },
  { id: "compliance", label: "Compliance & Governance" },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (data: { email: string; interests: string[] }) => {
      return apiRequest("POST", "/api/subscribe", data);
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Check your email for a welcome message.",
      });
      setEmail("");
      setInterests([]);
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (interests.length === 0) {
      toast({
        title: "Please select interests",
        description: "Choose at least one topic you're interested in.",
        variant: "destructive",
      });
      return;
    }

    subscribeMutation.mutate({ email, interests });
  };

  const handleInterestToggle = (interestId: string) => {
    setInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  return (
    <section id="newsletter" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(var(--primary-rgb,33,73,92),0.15),transparent_50%)]"></div>
      
      <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-border p-12 lg:p-16 shadow-xl">
          <div className="text-center space-y-8">
            <div className="inline-block p-4 bg-primary/10 rounded-full">
              <Send className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-4">
              <h2 className="font-serif text-5xl lg:text-6xl font-semibold text-foreground" data-testid="heading-newsletter">
                Stay Connected
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Subscribe to get insights, articles, and updates directly in your inbox
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex flex-wrap gap-4 justify-center">
                {INTEREST_OPTIONS.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={interests.includes(option.id)}
                      onCheckedChange={() => handleInterestToggle(option.id)}
                      data-testid={`checkbox-interest-${option.id}`}
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
                <Input
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={subscribeMutation.isPending}
                  className="flex-1 h-12 text-base border-2"
                  data-testid="input-newsletter-email"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-12 px-8" 
                  disabled={subscribeMutation.isPending}
                  data-testid="button-newsletter-subscribe"
                >
                  {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <p className="text-sm text-muted-foreground pt-2">
              Join professionals staying ahead in cloud and AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
