import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { useTodoList } from "@/contexts/todolist/hooks/useTodoList";
import { Zap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { TodoItem } from "@/contexts/todolist/components/TodoItem";
import { cn } from "@/lib/utils";
import { Calendar, Trash2, Plus, X, Check } from "lucide-react";

/**
 * Página de gerenciamento de tarefas do usuário.
 * 
 * Layout limpo e responsivo com:
 * - Header padrão
 * - Botão de voltar
 * - Modal para adicionar tarefas
 * - Listas de tarefas ativas e concluídas (Lixeira)
 * - Estados vazios amigáveis
 * - Contador regressivo de dias
 * - Animação de 2s ao concluir tarefa
 */
export default function TodoPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [animatingTaskId, setAnimatingTaskId] = useState<string | null>(null);
  const [showTrash, setShowTrash] = useState(false);

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewTaskTitle("");
    setNewTaskDueDate("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTaskTitle("");
    setNewTaskDueDate("");
  };

  const handleSubmitTask = () => {
    if (newTaskTitle.trim()) {
      addTodo(newTaskTitle.trim());
      handleCloseModal();
    }
  };

  const handleToggleTodo = (id: string, isCompleted: boolean) => {
    if (!isCompleted && !animatingTaskId) {
      // Iniciar animação de conclusão
      setAnimatingTaskId(id);
      setTimeout(() => {
        toggleTodo({ id, is_completed: true });
        setAnimatingTaskId(null);
      }, 2000);
    } else if (isCompleted) {
      // Reabrir tarefa concluída
      toggleTodo({ id, is_completed: false });
    }
  };

  const handleDeletePermanent = (id: string) => {
    if (confirm("Tem certeza que deseja excluir permanentemente esta tarefa?")) {
      deleteTodo(id);
    }
  };

  // Função para calcular dias restantes
  const getDaysRemaining = (dueDate: string | null) => {
    if (!dueDate) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Função para obter badge de prazo
  const getDueDateBadge = (dueDate: string | null) => {
    const days = getDaysRemaining(dueDate);
    
    if (days === null) return null;
    
    if (days > 0) {
      return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
          Faltam {days} {days === 1 ? "dia" : "dias"}
        </span>
      );
    } else if (days === 0) {
      return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-950/60 text-amber-400 border border-amber-800/40 animate-pulse">
          Prazo encerra hoje!
        </span>
      );
    } else {
      return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-rose-950/60 text-rose-400 border border-rose-800/40">
          Atrasada há {Math.abs(days)} {Math.abs(days) === 1 ? "dia" : "dias"}
        </span>
      );
    }
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

          {/* Lado direito - Apenas mensagem de boas-vindas sem logout */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400 hidden md:block">
              Bem-vindo, {user?.email || "Usuário"}!
            </span>
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
          {/* Header com botão de adicionar */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-50">Tarefas Ativas</h2>
            <button
              onClick={handleOpenModal}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg p-2 transition-all duration-200"
              aria-label="Adicionar nova tarefa"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de tarefas ativas */}
          <div className="mb-8">
            {todos.length > 0 ? (
              <div className="space-y-3">
                {todos.map((todo) => {
                  const isAnimating = animatingTaskId === todo.id;
                  const dueDateBadge = getDueDateBadge(todo.duo_date);
                  
                  return (
                    <div
                      key={todo.id}
                      className={cn(
                        "flex items-center gap-3 p-3 bg-slate-900/30 border border-slate-800 rounded-lg hover:bg-slate-900/50 transition-all duration-200 group",
                        isAnimating && "opacity-60"
                      )}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => handleToggleTodo(todo.id, todo.is_completed)}
                        disabled={isLoading || isAnimating}
                        className={cn(
                          "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200",
                          isAnimating
                            ? "bg-green-600 border-green-600 text-white animate-pulse"
                            : todo.is_completed
                            ? "bg-green-600 border-green-600 text-white"
                            : "border-slate-600 hover:border-purple-500"
                        )}
                      >
                        {todo.is_completed || isAnimating ? (
                          <Check className="w-3 h-3" />
                        ) : null}
                      </button>

                      {/* Texto da tarefa */}
                      <div className="flex-1 min-w-0">
                        <span
                          className={cn(
                            "text-slate-50 transition-all duration-200",
                            todo.is_completed && "line-through opacity-60"
                          )}
                        >
                          {todo.title}
                        </span>
                        {dueDateBadge && (
                          <div className="mt-1 flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {dueDateBadge}
                          </div>
                        )}
                      </div>

                      {/* Botão de deletar (só aparece no hover para tarefas ativas) */}
                      <Button
                        onClick={() => handleDeletePermanent(todo.id)}
                        disabled={isLoading}
                        size="sm"
                        variant="ghost"
                        className={cn(
                          "text-red-500 hover:text-red-400 hover:bg-red-500/10 p-1 transition-all duration-200 opacity-0 group-hover:opacity-100",
                          isLoading && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
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

          {/* Seção Lixeira / Histórico - Accordion */}
          <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/30">
            <button
              onClick={() => setShowTrash(!showTrash)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-slate-400" />
                <span className="font-semibold text-slate-50">🗑️ Lixeira / Histórico</span>
                {completedTodos.length > 0 && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-800 text-slate-400">
                    {completedTodos.length}
                  </span>
                )}
              </div>
              <svg
                className={cn(
                  "w-4 h-4 text-slate-400 transition-transform duration-200",
                  showTrash && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showTrash && (
              <div className="border-t border-slate-800 p-4">
                {completedTodos.length > 0 ? (
                  <div className="space-y-3">
                    {completedTodos.map((todo) => {
                      const dueDateBadge = getDueDateBadge(todo.duo_date);
                      
                      return (
                        <div
                          key={todo.id}
                          className="flex items-center gap-3 p-3 bg-slate-900/30 border border-slate-800 rounded-lg hover:bg-slate-900/50 transition-all duration-200"
                        >
                          <div className="w-5 h-5 rounded border-2 bg-green-600 border-green-600 text-white flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="text-slate-50 line-through opacity-60">
                              {todo.title}
                            </span>
                            {dueDateBadge && (
                              <div className="mt-1 flex items-center gap-2">
                                <Calendar className="w-3 h-3 text-slate-500" />
                                {dueDateBadge}
                              </div>
                            )}
                          </div>

                          <Button
                            onClick={() => handleDeletePermanent(todo.id)}
                            disabled={isLoading}
                            size="sm"
                            variant="ghost"
                            className={cn(
                              "text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 p-1 transition-all duration-200",
                              isLoading && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trash2 className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">Lixeira vazia</h3>
                    <p className="text-slate-400">
                      Tarefas concluídas aparecerão aqui.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Criação de Tarefa */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#111827] border border-slate-700/50 shadow-2xl max-w-md">
          <DialogHeader className="border-b border-slate-800">
            <DialogTitle className="text-slate-50">Nova Tarefa</DialogTitle>
            <DialogDescription className="text-slate-400">
              Adicione uma nova tarefa à sua lista
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Campo Título */}
            <div>
              <label htmlFor="taskTitle" className="block text-sm font-medium text-slate-400 mb-2">
                Título da Tarefa
              </label>
              <input
                id="taskTitle"
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Ex: Estudar para a prova de Qualidade"
                autoFocus
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Campo Data de Prazo */}
            <div>
              <label htmlFor="taskDueDate" className="block text-sm font-medium text-slate-400 mb-2">
                Prazo Final (opcional)
              </label>
              <input
                id="taskDueDate"
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all accent-purple-500"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2 border-t border-slate-800">
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="flex-1 border-slate-700 text-slate-400 hover:bg-slate-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitTask}
              disabled={!newTaskTitle.trim() || isLoading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Salvar Tarefa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}