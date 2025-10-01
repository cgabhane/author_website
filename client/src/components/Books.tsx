import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  buyUrl: string;
}

interface BooksProps {
  books: Book[];
}

export default function Books({ books }: BooksProps) {
  return (
    <section id="books" className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb,33,73,92),0.03),transparent_70%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl font-semibold text-foreground mb-4" data-testid="heading-books">
            Published Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practical insights and strategic guidance for modern cloud infrastructure
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {books.map((book, index) => (
            <Card 
              key={book.id} 
              className="group hover-elevate transition-all duration-300 border-2 hover:shadow-2xl overflow-hidden bg-card/50 backdrop-blur-sm" 
              data-testid={`card-book-${book.id}`}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-accent/10 p-8 flex justify-center items-center min-h-[320px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="relative rounded-lg shadow-2xl w-48 h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                    data-testid={`img-book-${book.id}`}
                  />
                </div>
                
                <div className="p-8 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-2xl font-semibold text-foreground leading-tight flex-1">
                      {book.title}
                    </h3>
                    <span className="text-sm font-medium text-primary/70 bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                      Book {index + 1}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {book.description}
                  </p>
                  
                  <Button
                    onClick={() => window.open(book.buyUrl, '_blank')}
                    className="w-full mt-4 group/btn"
                    size="lg"
                    data-testid={`button-buy-${book.id}`}
                  >
                    <span>Get This Book</span>
                    <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
