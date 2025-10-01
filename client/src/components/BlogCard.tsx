import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "wouter";

interface BlogCardProps {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
}

export default function BlogCard({ id, title, date, readTime, excerpt }: BlogCardProps) {
  return (
    <Card className="hover-elevate transition-all" data-testid={`card-blog-${id}`}>
      <CardContent className="p-6 space-y-3">
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground italic">
          {date} • {readTime}
        </p>
        <p className="text-foreground leading-relaxed">
          {excerpt}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <Link href={`/blog/${id}`}>
          <Button variant="secondary" data-testid={`button-read-${id}`}>
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
