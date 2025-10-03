import { Cloud, Cpu, Lightbulb, Globe } from "lucide-react";

export default function About() {
  const expertise = [
    {
      icon: Cloud,
      title: "Cloud Migration",
      description: "VMware-to-Cloud transitions and sovereign cloud strategies"
    },
    {
      icon: Cpu,
      title: "AI-Driven Solutions",
      description: "Private cloud strategies powered by artificial intelligence"
    },
    {
      icon: Lightbulb,
      title: "Strategic Advisory",
      description: "Enterprise transformation and infrastructure automation"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Cloud adoption across US, Europe, India, and beyond"
    }
  ];

  return (
    <section id="about" className="py-32 bg-background relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-8">
            <div>
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">About Me</span>
              <h2 className="font-serif text-5xl lg:text-6xl font-semibold text-foreground mt-4 mb-6 leading-tight" data-testid="heading-about">
                Empowering Enterprises Through Cloud Innovation
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none space-y-4">
              <p className="text-lg text-foreground leading-relaxed">
                I am a <strong>Cloud and AI Evangelist, Author, and Strategic Advisor</strong> with nearly two decades of
                experience guiding enterprises through complex technology transformations.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                My work focuses on VMware-to-Cloud transitions, AI-driven private cloud strategies, infrastructure automation,
                and sovereign cloud adoption across Europe and India.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                As an author, I translate advanced concepts in cloud infrastructure, AI, and automation into
                practical guidance for engineers and executives alike. My mission is to help organizations
                embrace cloud confidently, securely, and intelligently — ensuring technology adoption delivers
                measurable business value.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-border bg-card/50 hover-elevate transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
