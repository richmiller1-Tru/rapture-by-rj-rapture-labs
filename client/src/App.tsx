import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ChroniclesHub from "@/pages/chronicles/index";
import AuthPage from "@/pages/auth";
import PiCoinPage from "@/pages/picoin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chronicles" component={ChroniclesHub} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/picoin" component={PiCoinPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
