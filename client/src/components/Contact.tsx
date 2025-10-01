import { Mail, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-4xl font-semibold text-foreground mb-8" data-testid="heading-contact">
          Contact
        </h2>
        <p className="text-lg text-foreground mb-6">
          For media, speaking, or advisory inquiries:
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-lg">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:contact@chetangabhane.in"
                className="text-primary hover:underline"
                data-testid="link-email"
              >
                contact@chetangabhane.in
              </a>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Linkedin className="h-5 w-5 text-primary" />
            <span className="text-lg">
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://linkedin.com/in/chetangabhane"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                data-testid="link-linkedin"
              >
                linkedin.com/in/chetangabhane
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
