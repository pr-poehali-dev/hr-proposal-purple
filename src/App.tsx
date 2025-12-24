import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Определяем, на каком поддомене мы находимся
  const hostname = window.location.hostname;
  const isRoadmapSubdomain = hostname.startsWith('roadmap.');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Если roadmap.* поддомен, показываем только Roadmap */}
            {isRoadmapSubdomain ? (
              <>
                <Route path="/" element={<Roadmap />} />
                <Route path="*" element={<Roadmap />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;