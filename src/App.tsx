import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Recommendation from "./pages/Recommendation";
import Simulator from "./pages/Simulator";
import { PlanningPreviewProvider } from "./contexts/PlanningPreview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PlanningPreviewProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/datos" element={<Onboarding />} />
            <Route path="/inicio" element={<Dashboard />} />
            <Route path="/recomendacion" element={<Recommendation />} />
            <Route path="/simulador" element={<Simulator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PlanningPreviewProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
