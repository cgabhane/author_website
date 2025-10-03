import { Mail, Linkedin, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@chetangabhane.in",
      href: "mailto:contact@chetangabhane.in",
      description: "For general inquiries and collaborations"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/chetangabhane",
      href: "https://linkedin.com/in/chetangabhane",
      description: "Connect and stay updated"
    },
    {
      icon: MessageSquare,
      label: "Speaking",
      value: "Available for conferences and workshops",
      href: "mailto:contact@chetangabhane.in?subject=Speaking Inquiry",
      description: "Book for keynotes and events"
    }
  ];

  return (
    <section id="contact" className="py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl lg:text-6xl font-semibold text-foreground mb-6" data-testid="heading-contact">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            For media inquiries, speaking engagements, or advisory consultations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => (
            <Card 
              key={index}
              className="group hover-elevate transition-all cursor-pointer"
              onClick={() => window.open(method.href, '_blank')}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <method.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground text-lg">{method.label}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  <p className="text-primary font-medium text-sm group-hover:underline break-words">
                    {method.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
