import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Login from "./pages/Login";
import DisciplinaPage from "./pages/DisciplinaPage";
import TodoPage from "./pages/TodoPage";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const { user, loading } = useAuth();

  // Redirecionar não usuários para login
  useEffect(() => {
    if (!user && !loading) {
      window.location.href = '/login';
    }
  }, [user, loading]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rota de Login */}
            <Route path="/login" element={<Login />} />
            
            {/* Rotas principais - raiz agora é a tela de introdução */}
            <Route path="/" element={<Home />} />
            
            {/* Rota de disciplinas */}
            <Route path="/disciplinas" element={<Index />} />
            
            {/* Rota de ToDo List */}
            <Route path="/todo" element={<TodoPage />} />
            
            {/* Rota dinâmica para quizzes de disciplina */}
            <Route path="/disciplina/:slug" element={<DisciplinaPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;