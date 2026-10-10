import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Analytics from "@/components/Analytics";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import PressKit from "@/pages/PressKit";
import Subscribers from "@/pages/Subscribers";
import VisualGenerator from "@/pages/VisualGenerator";
import CareerAssessment from "@/pages/CareerAssessment";
import AiReadiness from "@/pages/AiReadiness";
import AiReadinessGuide from "@/pages/AiReadinessGuide";
import AiReadinessRole from "@/pages/AiReadinessRole";
import NotFound from "@/pages/not-found";

// Start each new page at the top. Links to a section (e.g. /#contact) keep
// their own scrolling behaviour.
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/press-kit" component={PressKit} />
      <Route path="/visual-generator" component={VisualGenerator} />
      <Route path="/career-assessment" component={CareerAssessment} />
      <Route path="/ai-readiness" component={AiReadiness} />
      <Route path="/ai-readiness/roles/:slug" component={AiReadinessRole} />
      <Route path="/ai-readiness/:slug" component={AiReadinessGuide} />
      <Route path="/admin/subscribers" component={Subscribers} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Analytics />
        <ScrollToTop />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
