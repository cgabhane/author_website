import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  category?: string;
}

export default function BlogCard({ id, title, date, readTime, excerpt, category = "Cloud Strategy" }: BlogCardProps) {
  return (
    <Card className="group hover-elevate transition-all border-2" data-testid={`card-blog-${id}`}>
      <CardContent className="p-8 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
            {category}
          </span>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime}
            </span>
          </div>
        </div>
        
        <h2 className="font-serif text-2xl font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
          {title}
        </h2>
        
        <p className="text-foreground/80 leading-relaxed">
          {excerpt}
        </p>
        
        <Link href={`/blog/${id}`}>
          <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent" data-testid={`button-read-${id}`}>
            <span className="text-primary font-semibold">Read Full Article</span>
            <ArrowRight className="ml-2 h-4 w-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
