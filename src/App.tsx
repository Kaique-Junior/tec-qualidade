import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import DisciplinaPage from "./pages/DisciplinaPage";
import NotFound from "./pages/NotFound";
import { TodoModal } from "./contexts/todolist/components/TodoModal";
import { TodoFloatingButton } from "./contexts/todolist/components/TodoFloatingButton";

const queryClient = new QueryClient();

const App = () => {
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/disciplina/:slug" element={<DisciplinaPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Botão flutuante de tarefas (aparece em todas as páginas exceto login) */}
          <TodoFloatingButton onClick={() => setIsTodoModalOpen(true)} />
          
          {/* Modal de tarefas (aparece em todas as páginas exceto login) */}
          <TodoModal 
            isOpen={isTodoModalOpen} 
            onClose={() => setIsTodoModalOpen(false)} 
          />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;