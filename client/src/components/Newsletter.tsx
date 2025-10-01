import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
    <section id="newsletter" className="py-20 bg-muted/30">
      <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-serif text-4xl font-semibold text-foreground mb-4" data-testid="heading-newsletter">
          Stay Connected
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Subscribe to get insights, articles, and book updates directly in your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 max-w-md"
            data-testid="input-newsletter-email"
          />
          <Button type="submit" size="lg" data-testid="button-newsletter-subscribe">
            Subscribe
          </Button>
        </form>
        <p className="text-sm text-muted-foreground mt-4">
          *This form is a placeholder. You can later integrate it with LinkedIn, Mailchimp, or any email service.
        </p>
      </div>
    </section>
  );
}
