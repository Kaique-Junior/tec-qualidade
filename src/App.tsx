import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DisciplinasPage from "./pages/DisciplinasPage";
import TodoPage from "./pages/TodoPage";
import ExamsPage from "./pages/ExamsPage";
import Login from "./pages/Login";
import DisciplinaPage from "./pages/DisciplinaPage";
import SchedulePage from "./pages/SchedulePage";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { Suspense } from "react";

const queryClient = new QueryClient();

const App = () => {
  const { user, loading } = useAuth();

  // Se estiver carregando o estado de autenticação, mostra tela de carregamento
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não houver usuário, renderiza as rotas públicas (login e home)
  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Index />} />
              <Route path="/disciplinas" element={<Index />} />
              <Route path="/disciplina/:slug" element={<DisciplinaPage />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Se houver usuário, renderiza as rotas privadas
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/disciplinas" element={<DisciplinasPage />} />
            <Route path="/disciplina/:slug" element={<DisciplinaPage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/provas" element={<ExamsPage />} />
            <Route path="/calendario" element={<SchedulePage />} />
            <Route path="/login" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;