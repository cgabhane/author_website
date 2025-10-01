export default function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-4xl font-semibold text-foreground mb-8" data-testid="heading-about">
          About Me
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-foreground leading-relaxed mb-6">
            I am a Cloud and AI Evangelist, Author, and Strategic Advisor with nearly two decades of
            experience guiding enterprises through complex technology transformations. My work focuses
            on VMware-to-Cloud transitions, AI-driven private cloud strategies, infrastructure automation,
            and sovereign cloud adoption across Europe and India.
          </p>
          <p className="text-lg text-foreground leading-relaxed mb-6">
            As an author, I translate advanced concepts in cloud infrastructure, AI, and automation into
            practical guidance for engineers and executives alike. My mission is to help organizations
            embrace cloud confidently, securely, and intelligently — ensuring technology adoption delivers
            measurable business value.
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            I continue to champion cloud and AI evangelism, enabling enterprises to rethink how automation,
            intelligence, and modern infrastructure can power the next wave of digital transformation.
          </p>
        </div>
      </div>
    </section>
  );
}
