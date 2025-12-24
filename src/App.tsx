import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const queryClient = new QueryClient();

const MainApp = () => {
  const [activeTab, setActiveTab] = useState<'hr' | 'roadmap'>('hr');

  return (
    <div className="min-h-screen">
      {/* Tab Navigation */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-white/95 backdrop-blur-lg rounded-full shadow-xl border border-purple-200 p-1">
        <div className="flex gap-1">
          <Button
            onClick={() => setActiveTab('hr')}
            variant={activeTab === 'hr' ? 'default' : 'ghost'}
            className={`rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base transition-all ${
              activeTab === 'hr'
                ? 'bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Icon name="Users" size={16} className="mr-2" />
            <span className="hidden sm:inline">Подбор команды</span>
            <span className="sm:hidden">Команда</span>
          </Button>
          <Button
            onClick={() => setActiveTab('roadmap')}
            variant={activeTab === 'roadmap' ? 'default' : 'ghost'}
            className={`rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base transition-all ${
              activeTab === 'roadmap'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Icon name="Map" size={16} className="mr-2" />
            <span className="hidden sm:inline">Дорожная карта</span>
            <span className="sm:hidden">Карта</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-0">
        {activeTab === 'hr' ? <Index /> : <Roadmap />}
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainApp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;