interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="py-16 bg-muted/30 text-center">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <h1 className="font-serif text-5xl font-bold text-foreground mb-3" data-testid="heading-page-title">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-muted-foreground" data-testid="text-page-subtitle">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
