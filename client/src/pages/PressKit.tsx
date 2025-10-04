import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, Linkedin, Globe, FileText } from "lucide-react";
import profileImage from '@assets/profile_1759318487930.jpg';
import profileImage2 from '@assets/profile2_1759318518565.jpg';
import book1Cover from '@assets/book1_1759315863433.jpg';
import book2Cover from '@assets/book2_1759315940962.jpg';

export default function PressKit() {
  const speakingTopics = [
    { title: "Why Most Cloud Migrations Fail – and How to Fix It", category: "Cloud Strategy" },
    { title: "The Rise of AI Agents in Cloud Operations", category: "AI Operations" },
    { title: "Sovereign Cloud: Balancing Compliance and Innovation", category: "Compliance" },
    { title: "AI-Driven Private Cloud: Building Enterprise Resilience", category: "Infrastructure" },
    { title: "The Future of Multicloud in 2025 and Beyond", category: "Industry Trends" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageHeader title="Press Kit" subtitle="For Media • Speaking • Event Organizers" />

      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-24">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-4xl font-semibold text-foreground mb-2">Author Bio</h2>
                <p className="text-muted-foreground">Professional background and expertise</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted/30 border-l-4 border-l-primary rounded-lg p-6">
                  <p className="font-semibold text-sm text-primary mb-3 uppercase tracking-wide">Short Bio (100 words)</p>
                  <p className="text-foreground leading-relaxed text-sm">
                    Chetan Gabhane is a Cloud Professional Evangelist, Author, and Strategic Advisor helping
                    enterprises accelerate their cloud and AI journeys. With nearly two decades of experience
                    across multicloud, private cloud, and automation, he has guided organizations through
                    VMware-to-cloud transitions, sovereign cloud strategies, and AI-driven infrastructure
                    adoption. He is the author of <em>Reverse Engineering with Terraform</em> and{" "}
                    <em>Navigating VMware Turmoil in the Broadcom Era</em>.
                  </p>
                </div>
                <Button variant="outline" className="w-full" data-testid="button-download-bio">
                  <Download className="mr-2 h-4 w-4" />
                  Download Extended Bio PDF
                </Button>
              </div>
            </div>

            <Card className="border-2">
              <CardContent className="p-8">
                <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Quick Facts
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Experience", value: "20+ Years" },
                    { label: "Specialization", value: "Cloud & AI Strategy" },
                    { label: "Published Books", value: "2 Technical Guides" },
                    { label: "Geographic Focus", value: "Europe & India" },
                    { label: "Industries", value: "Enterprise Technology" }
                  ].map((fact, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{fact.label}</span>
                      <span className="font-semibold text-foreground">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="font-serif text-4xl font-semibold text-foreground mb-2">Professional Headshots</h2>
              <p className="text-muted-foreground">High-resolution images for media use</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { img: profileImage, label: "Formal Executive Portrait", testId: "1" },
                { img: profileImage2, label: "Casual Business Portrait", testId: "2" }
              ].map((photo) => (
                <Card key={photo.testId} className="group hover-elevate transition-all border-2">
                  <CardContent className="p-6 space-y-4">
                    <div className="aspect-square overflow-hidden rounded-lg bg-muted/30">
                      <img
                        src={photo.img}
                        alt={photo.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        data-testid={`img-headshot-${photo.testId}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">{photo.label}</p>
                      <Button variant="secondary" className="w-full" data-testid={`button-download-headshot-${photo.testId}`}>
                        <Download className="mr-2 h-4 w-4" />
                        Download High-Res
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="font-serif text-4xl font-semibold text-foreground mb-2">Published Books</h2>
              <p className="text-muted-foreground">Available on major platforms</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  img: book1Cover,
                  title: "Reverse Engineering with Terraform",
                  subtitle: "Practical automation, integration & scalability",
                  testId: "terraform",
                  buyUrl: "https://www.amazon.in/Reverse-Engineering-Terraform-Introduction-Infrastructure/dp/B0CKSDNNNX"
                },
                {
                  img: book2Cover,
                  title: "Navigating VMware Turmoil",
                  subtitle: "Strategic insights for cloud transitions",
                  testId: "vmware",
                  buyUrl: "https://www.amazon.in/Navigating-VMware-Turmoil-Broadcom-Transitioning-ebook/dp/B0DZSNX7P1"
                }
              ].map((book) => (
                <Card key={book.testId} className="group hover-elevate transition-all border-2">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={book.img}
                          alt={book.title}
                          className="rounded-lg shadow-lg w-32 h-auto group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-foreground">{book.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{book.subtitle}</p>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => window.open(book.buyUrl, '_blank')}
                          data-testid={`button-buy-${book.testId}`}
                        >
                          Purchase Book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="font-serif text-4xl font-semibold text-foreground mb-2">Speaking Topics</h2>
              <p className="text-muted-foreground">Available for conferences, workshops, and corporate events</p>
            </div>
            <div className="grid gap-4 mb-6">
              {speakingTopics.map((topic, index) => (
                <Card key={index} className="hover-elevate transition-all border-l-4 border-l-primary" data-testid={`topic-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{topic.title}</h3>
                        <span className="text-xs text-primary/70 bg-primary/10 px-2 py-1 rounded-full">{topic.category}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="outline" size="lg" className="w-full md:w-auto" data-testid="button-download-topics">
              <Download className="mr-2 h-4 w-4" />
              Download Speaker Topics PDF
            </Button>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="font-serif text-4xl font-semibold text-foreground mb-2">Media Contact</h2>
              <p className="text-muted-foreground">Get in touch for interviews and collaborations</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Mail, label: "Email", value: "media@chetangabhane.in", href: "mailto:media@chetangabhane.in" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/chetangabhane", href: "https://linkedin.com/in/chetangabhane" },
                { icon: Globe, label: "Website", value: "chetangabhane.in", href: "/" }
              ].map((contact, i) => (
                <Card key={i} className="hover-elevate transition-all cursor-pointer" onClick={() => window.open(contact.href, '_blank')}>
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <contact.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{contact.label}</p>
                      <p className="text-xs text-primary hover:underline break-words mt-1">{contact.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
