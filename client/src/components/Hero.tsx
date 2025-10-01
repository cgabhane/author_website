import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface HeroProps {
  profileImage: string;
}

export default function Hero({ profileImage }: HeroProps) {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[85vh] flex items-center bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-6">
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Chetan Gabhane
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground font-light">
              Cloud Professional Strategist • AI Evangelist • Author
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => handleScroll("books")}
                data-testid="button-explore-books"
              >
                Explore My Books
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleScroll("contact")}
                data-testid="button-connect"
              >
                Connect With Me
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={profileImage}
                alt="Chetan Gabhane"
                className="rounded-lg shadow-xl w-full max-w-sm object-cover"
                data-testid="img-hero-profile"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
