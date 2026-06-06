import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { useTodoList } from "@/contexts/todolist/hooks/useTodoList";
import { LogOut, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { TodoForm } from "@/contexts/todolist/components/TodoForm";
import { TodoItem } from "@/contexts/todolist/components/TodoItem";

/**
 * Página de gerenciamento de tarefas do usuário.
 * 
 * Layout limpo e responsivo com:
 * - Header padrão
 * - Botão de voltar
 * - Formulário de adicionar tarefas
 * - Listas de tarefas ativas e concluídas
 * - Estados vazios amigáveis
 */
export default function TodoPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const { todos, completedTodos, isLoading, addTodo, toggleTodo, deleteTodo } = useTodoList();

  // Se o usuário não estiver autenticado, redireciona para o login
  if (!user && !loading) {
    window.location.href = '/login';
    return null;
  }

  // Se estiver carregando autenticação ou tarefas, mostra tela de loading
  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (error) {
      toast.error("Erro ao realizar logout. Tente novamente.");
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      {/* Header */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-3">
          {/* Lado esquerdo */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KQ</span>
            </div>
            <div>
              <h1 className="font-black text-2xl bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                KQUIZZ
              </h1>
              <p className="text-sm text-slate-500 hidden sm:inline">| Técnico em Qualidade</p>
            </div>
          </div>

          {/* Centro - Raio */}
          <div className="flex-1 flex justify-center mb-4 md:mb-0">
            <div className="relative">
              <Zap className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            </div>
          </div>

          {/* Lado direito - Usuário e Logout */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400 hidden md:block">
              Bem-vindo, {user?.email || "Usuário"}!
            </span>
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
              <DialogTrigger asChild>
                <button className="text-purple-400 hover:text-purple-300 transition-colors p-1">
                  <LogOut className="w-4 h-4 md:hidden" />
                  <span className="hidden md:inline ml-1">Logout</span>
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#111827] border border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-slate-50">Confirmar Saída</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Deseja realmente sair da plataforma?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowLogoutDialog(false)}
                    className="border-slate-700 text-slate-400 hover:bg-slate-800"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600"
                  >
                    Sair
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Botão de voltar */}
        <div className="py-4">
          <button
            onClick={handleBackToHome}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors px-4 py-2 rounded-lg hover:bg-slate-900/30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Voltar para Funcionalidades</span>
          </button>
        </div>

        {/* Conteúdo centralizado */}
        <div className="max-w-xl mx-auto w-full px-4 mt-6 mb-8">
          {/* Formulário de adicionar tarefa */}
          <TodoForm onAddTodo={addTodo} isLoading={isLoading} />

          {/* Lista de tarefas ativas */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-50 mb-4">Tarefas Ativas</h2>
            
            {todos.length > 0 ? (
              <div className="space-y-3">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-slate-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-50 mb-2">Nenhuma tarefa ativa</h3>
                <p className="text-slate-400">
                  Adicione novas tarefas para começar!
                </p>
              </div>
            )}
          </div>

          {/* Lista de tarefas concluídas */}
          {completedTodos.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-50 mb-4">Tarefas Concluídas</h2>
              <div className="space-y-3">
                {completedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}