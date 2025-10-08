import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Insight {
  id: string;
  title: string;
  category?: string;
  url?: string;
}

interface InsightsProps {
  insights: Insight[];
  isLoading?: boolean;
}

export default function Insights({ insights, isLoading = false }: InsightsProps) {
  const defaultCategories = ["Cloud Strategy", "AI Operations", "Compliance"];
  
  const handleInsightClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <section id="insights" className="py-32 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl lg:text-6xl font-semibold text-foreground mb-6" data-testid="heading-insights">
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thought leadership on cloud transformation, AI innovation, and enterprise strategy
          </p>
        </div>

        <div className="grid gap-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={`skeleton-${index}`} className="border-l-4 border-l-primary/50">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-full" />
                    </div>
                    <Skeleton className="h-5 w-5 flex-shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            insights.map((insight, index) => (
              <Card 
                key={insight.id}
                className="group hover-elevate transition-all cursor-pointer border-l-4 border-l-primary/50 hover:border-l-primary"
                onClick={() => handleInsightClick(insight.url)}
                data-testid={`insight-${insight.id}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                          {insight.category || defaultCategories[index % defaultCategories.length]}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {insight.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
