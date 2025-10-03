import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic2, Podcast, Users, Briefcase } from "lucide-react";
import { BookingDialog } from "@/components/BookingDialog";

export default function SpeakingMedia() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const opportunities = [
    {
      icon: Mic2,
      title: "Keynote Speaking",
      description: "Inspiring conference presentations on cloud transformation, AI innovation, and enterprise strategy"
    },
    {
      icon: Podcast,
      title: "Podcast Conversations",
      description: "In-depth discussions on cloud migration, VMware transitions, and the future of AI-driven infrastructure"
    },
    {
      icon: Users,
      title: "Mentoring Sessions",
      description: "Hands-on sessions for teams navigating infrastructure automation and multicloud adoption"
    },
    {
      icon: Briefcase,
      title: "Strategic Guidance",
      description: "Advisory support for enterprises planning sovereign cloud strategies and AI integration"
    }
  ];

  return (
    <section id="speaking" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 to-transparent"></div>
      
      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl lg:text-6xl font-semibold text-foreground mb-6" data-testid="heading-speaking">
            Ways to Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Available for keynotes, podcasts, workshops, and advisory engagements
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {opportunities.map((item, index) => (
            <Card 
              key={index}
              className="group hover-elevate transition-all"
              data-testid={`card-speaking-${index}`}
            >
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            className="rounded-full"
            onClick={() => setIsDialogOpen(true)}
            data-testid="button-schedule-exchange"
          >
            Schedule a Knowledge Exchange
          </Button>
        </div>
      </div>

      <BookingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
}
