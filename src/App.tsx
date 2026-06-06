import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import DisciplinaPage from "./pages/DisciplinaPage";
import TodoPage from "./pages/TodoPage";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { DesktopLayout } from "./components/common/DesktopLayout";
import { MobileNavbar } from "./components/common/MobileNavbar";

const queryClient = new QueryClient();

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rota de Login - sem menu */}
            <Route path="/login" element={<Login />} />
            
            {/* Rotas protegidas - com menu */}
            <Route path="/" element={
              <ProtectedRoute>
                <DesktopLayout>
                  <Index />
                </DesktopLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/disciplina/:slug" element={
              <ProtectedRoute>
                <DesktopLayout>
                  <DisciplinaPage />
                </DesktopLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/todo" element={
              <ProtectedRoute>
                <DesktopLayout>
                  <TodoPage />
                </DesktopLayout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;