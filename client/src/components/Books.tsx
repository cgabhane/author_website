import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
    <section id="books" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-4xl font-semibold text-foreground mb-12" data-testid="heading-books">
          Books
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {books.map((book) => (
            <Card key={book.id} className="hover-elevate transition-all" data-testid={`card-book-${book.id}`}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="rounded-md shadow-lg w-64 h-auto object-cover"
                    data-testid={`img-book-${book.id}`}
                  />
                  <h3 className="font-serif text-2xl font-semibold text-foreground mt-4">
                    {book.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="justify-center pb-6">
                <Button
                  onClick={() => window.open(book.buyUrl, '_blank')}
                  data-testid={`button-buy-${book.id}`}
                >
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
