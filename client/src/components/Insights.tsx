interface Insight {
  id: string;
  title: string;
}

interface InsightsProps {
  insights: Insight[];
}

export default function Insights({ insights }: InsightsProps) {
  return (
    <section id="insights" className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-4xl font-semibold text-foreground mb-8" data-testid="heading-insights">
          Insights
        </h2>
        <ul className="space-y-4">
          {insights.map((insight) => (
            <li
              key={insight.id}
              className="py-4 border-b border-border text-lg text-foreground hover-elevate px-4 rounded-md transition-all"
              data-testid={`insight-${insight.id}`}
            >
              {insight.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
