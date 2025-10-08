import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Mail, Tag } from "lucide-react";
import type { Subscriber } from "@shared/schema";

export default function Subscribers() {
  const { data: subscribers, isLoading } = useQuery<Subscriber[]>({
    queryKey: ["/api/subscribers"],
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-semibold text-foreground flex items-center gap-3" data-testid="heading-subscribers">
              <Users className="w-8 h-8 text-primary" />
              Subscribers
            </h1>
            <p className="text-lg text-muted-foreground">
              View and manage newsletter subscribers
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-64" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-96" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : !subscribers || subscribers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">No subscribers yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Total Subscribers: {subscribers.length}
                  </CardTitle>
                </CardHeader>
              </Card>

              {subscribers.map((subscriber) => (
                <Card key={subscriber.id} data-testid={`card-subscriber-${subscriber.id}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Mail className="w-5 h-5 text-primary" />
                      {subscriber.email}
                    </CardTitle>
                    <CardDescription>
                      Subscribed on {new Date(subscriber.subscribedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Tag className="w-4 h-4" />
                        <span className="font-medium">Interests:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {subscriber.interests.map((interest) => (
                          <Badge key={interest} variant="secondary" data-testid={`badge-interest-${interest}`}>
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
