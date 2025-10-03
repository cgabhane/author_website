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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Dark geometric wave pattern background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q 25 25, 50 50 T 100 50" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-foreground"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>

      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-10 lg:space-y-12">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-xs font-bold text-primary tracking-widest uppercase border border-primary/30 rounded-full px-5 py-2 bg-primary/5 backdrop-blur-sm">
                  Cloud & AI Evangelist
                </span>
              </div>
              
              {/* Name Typography */}
              <div className="space-y-2">
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-none tracking-tight">
                  Chetan
                </h1>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-none tracking-tight">
                  Gabhane
                </h1>
              </div>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-xl">
                Guiding enterprises through transformative cloud migrations and AI-driven strategies with nearly two decades of expertise
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="text-base px-8 py-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                onClick={() => handleScroll("books")}
                data-testid="button-explore-books"
              >
                Explore My Books
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 border-2 backdrop-blur-sm hover:scale-105 transition-all"
                onClick={() => handleScroll("contact")}
                data-testid="button-connect"
              >
                Connect With Me
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 lg:gap-12 pt-4">
              <div className="space-y-1">
                <div className="text-4xl lg:text-5xl font-bold text-foreground">20+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Years Experience</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl lg:text-5xl font-bold text-foreground">2</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Published Books</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl lg:text-5xl font-bold text-foreground">100+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Enterprise Projects</div>
              </div>
            </div>
          </div>

          {/* Right Column - Professional Photo with Modern Effects */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Photo Container with Effects */}
            <div className="relative group w-full max-w-lg">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl group-hover:blur-[80px] transition-all duration-500 opacity-40"></div>
              
              {/* Main Photo */}
              <div className="relative overflow-hidden rounded-3xl">
                {/* Subtle gradient overlay on photo */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 mix-blend-overlay z-10"></div>
                <img
                  src={profileImage}
                  alt="Chetan Gabhane"
                  className="relative w-full h-auto object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                  data-testid="img-hero-profile"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Tags Bar - Bottom of Hero */}
        <div className="mt-20 lg:mt-24 pt-12 border-t border-border/50">
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start items-center">
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider mr-2">
              Expertise:
            </span>
            {[
              "Cloud Strategy",
              "Infrastructure as Code", 
              "AI Leadership",
              "Enterprise Architecture",
              "VMware to Cloud",
              "Multicloud Solutions"
            ].map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all cursor-default"
                data-testid={`tag-expertise-${index}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
