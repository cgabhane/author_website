import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, Linkedin, Globe } from "lucide-react";
import profileImage from '@assets/generated_images/Professional_executive_headshot_portrait_0ce85843.png';
import profileImage2 from '@assets/generated_images/Casual_business_executive_portrait_0f809cc6.png';
import book1Cover from '@assets/generated_images/Terraform_book_cover_design_cd903b98.png';
import book2Cover from '@assets/generated_images/VMware_strategy_book_cover_1194819c.png';

export default function PressKit() {
  const speakingTopics = [
    "Why Most Cloud Migrations Fail – and How to Fix It",
    "The Rise of AI Agents in Cloud Operations",
    "Sovereign Cloud: Balancing Compliance and Innovation",
    "AI-Driven Private Cloud: Building Enterprise Resilience",
    "The Future of Multicloud in 2025 and Beyond"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageHeader title="Press Kit" subtitle="For Media • Speaking • Event Organizers" />

      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 space-y-20">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">Author Bio</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-lg mb-2">Short Bio (100 words)</p>
                <p className="text-foreground leading-relaxed">
                  Chetan Gabhane is a Cloud Professional Leader, Author, and Strategic Advisor helping
                  enterprises accelerate their cloud and AI journeys. With nearly two decades of experience
                  across multicloud, private cloud, and automation, he has guided organizations through
                  VMware-to-cloud transitions, sovereign cloud strategies, and AI-driven infrastructure
                  adoption. He is the author of <em>Reverse Engineering with Terraform</em> and{" "}
                  <em>Navigating VMware Turmoil in the Broadcom Era</em>.
                </p>
              </div>
              <Button variant="outline" data-testid="button-download-bio">
                <Download className="mr-2 h-4 w-4" />
                Download Extended Bio PDF
              </Button>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
              Professional Headshots
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <img
                    src={profileImage}
                    alt="Chetan Gabhane Headshot"
                    className="rounded-md shadow-lg w-full max-w-xs mx-auto"
                    data-testid="img-headshot-1"
                  />
                  <Button variant="secondary" data-testid="button-download-headshot-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <img
                    src={profileImage2}
                    alt="Chetan Gabhane Executive Photo"
                    className="rounded-md shadow-lg w-full max-w-xs mx-auto"
                    data-testid="img-headshot-2"
                  />
                  <Button variant="secondary" data-testid="button-download-headshot-2">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">Books</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <img
                    src={book1Cover}
                    alt="Reverse Engineering with Terraform"
                    className="rounded-md shadow-lg w-48 mx-auto"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-semibold">
                      Reverse Engineering with Terraform
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Practical automation, integration & scalability with Terraform.
                    </p>
                    <Button className="mt-4" data-testid="button-buy-terraform">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <img
                    src={book2Cover}
                    alt="Navigating VMware Turmoil"
                    className="rounded-md shadow-lg w-48 mx-auto"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-semibold">
                      Navigating VMware Turmoil in the Broadcom Era
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Strategic insights for enterprises transitioning from VMware.
                    </p>
                    <Button className="mt-4" data-testid="button-buy-vmware">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
              Speaking Topics
            </h2>
            <ul className="space-y-3 mb-6">
              {speakingTopics.map((topic, index) => (
                <li
                  key={index}
                  className="py-3 px-4 border-b border-border text-lg hover-elevate rounded-md transition-all"
                  data-testid={`topic-${index}`}
                >
                  {topic}
                </li>
              ))}
            </ul>
            <Button variant="outline" data-testid="button-download-topics">
              <Download className="mr-2 h-4 w-4" />
              Download Topics PDF
            </Button>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
              Media Contact
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-lg">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:media@chetangabhane.in"
                    className="text-primary hover:underline"
                  >
                    media@chetangabhane.in
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
                  >
                    linkedin.com/in/chetangabhane
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <span className="text-lg">
                  <strong>Website:</strong>{" "}
                  <a href="/" className="text-primary hover:underline">
                    chetangabhane.in
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
