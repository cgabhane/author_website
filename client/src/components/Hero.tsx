import { Button } from "@/components/ui/button";

interface HeroProps {
  profileImage: string;
}

export default function Hero({ profileImage }: HeroProps) {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb,33,73,92),0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--accent-rgb,33,73,92),0.06),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-24 w-full">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-sm font-semibold text-primary tracking-wider uppercase border border-primary/30 rounded-full px-4 py-1.5 bg-primary/5">
                  Cloud & AI Evangelist
                </span>
              </div>
              <h1 className="font-serif text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Chetan Gabhane
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                Guiding enterprises through transformative cloud migrations and AI-driven strategies with nearly two decades of expertise
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="text-base px-8 shadow-lg hover:shadow-xl transition-all"
                onClick={() => handleScroll("books")}
                data-testid="button-explore-books"
              >
                Explore My Books
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 border-2"
                onClick={() => handleScroll("contact")}
                data-testid="button-connect"
              >
                Connect With Me
              </Button>
            </div>
            <div className="flex gap-8 pt-6">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">20+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">2</div>
                <div className="text-sm text-muted-foreground">Published Books</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">100+</div>
                <div className="text-sm text-muted-foreground">Enterprise Projects</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all opacity-60"></div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl"></div>
                <img
                  src={profileImage}
                  alt="Chetan Gabhane"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover border border-border/50"
                  data-testid="img-hero-profile"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
