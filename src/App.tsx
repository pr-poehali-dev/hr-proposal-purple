import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KazarmaProposal from "./pages/KazarmaProposal";
import KazarmaRoadmap from "./pages/KazarmaRoadmap";
import NotFound from "./pages/NotFound";
import Valentine from "./pages/Valentine";
import Aksinia from "./pages/Aksinia";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/kazarma" element={<KazarmaProposal />} />
            <Route path="/kazarma/roadmap" element={<KazarmaRoadmap />} />
            <Route path="/valentine" element={<Valentine />} />
            <Route path="/aksinia" element={<Aksinia />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;