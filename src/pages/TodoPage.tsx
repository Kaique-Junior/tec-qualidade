import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { useTodoList } from "@/contexts/todolist/hooks/useTodoList";
import { Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Trash2, Plus, Check, Edit2, Undo2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Página de gerenciamento de tarefas do usuário.
 *
 * Layout limpo e responsivo com:
 * - Header padrão
 * - Botão de voltar centralizado
 * - Modal para adicionar tarefas
 * - Modal para editar tarefas
 * - Modal para confirmar mover para lixeira
 * - Modal para confirmar exclusão permanente
 * - Listas de tarefas ativas e lixeira/histórico
 * - Estados vazios amigáveis
 * - Contador regressivo de dias
 * - Animação de 2s ao concluir tarefa
 */
export default function TodoPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDueDate, setEditTaskDueDate] = useState("");
  const [taskToEdit, setTaskToEdit] = useState<{
    id: string;
    title: string;
    duo_date: string | null;
  } | null>(null);
  const [taskToTrash, setTaskToTrash] = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [animatingTaskId, setAnimatingTaskId] = useState<string | null>(null);
  const [showTrash, setShowTrash] = useState(false);

  const {
    todos,
    completedTodos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    moveToTrash,
    restoreFromTrash,
  } = useTodoList();

  if (!user && !loading) {
    window.location.href = "/login";
    return null;
  }

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

  const handleBackToHome = () => {
    navigate("/");
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
      addTodo({
        title: newTaskTitle.trim(),
        dueDate: newTaskDueDate || undefined,
      });
      handleCloseModal();
    }
  };

  const handleOpenEditModal = (todo: {
    id: string;
    title: string;
    duo_date: string | null;
  }) => {
    setTaskToEdit(todo);
    setEditTaskTitle(todo.title);
    setEditTaskDueDate(todo.duo_date || "");
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
    setEditTaskTitle("");
    setEditTaskDueDate("");
  };

  const handleUpdateTask = async () => {
    if (!taskToEdit || !editTaskTitle.trim()) return;

    try {
      const { error } = await supabase
        .from("todolist")
        .update({
          title: editTaskTitle.trim(),
          duo_date: editTaskDueDate || null,
        })
        .eq("id", taskToEdit.id);

      if (error) throw new Error(error.message);

      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Tarefa atualizada com sucesso!");
      handleCloseEditModal();
    } catch (error) {
      toast.error("Erro ao atualizar tarefa: " + (error as Error).message);
    }
  };

  const handleOpenTrashModal = (id: string) => {
    setTaskToTrash(id);
    setIsTrashModalOpen(true);
  };

  const handleCloseTrashModal = () => {
    setIsTrashModalOpen(false);
    setTaskToTrash(null);
  };

  const handleConfirmMoveToTrash = () => {
    if (taskToTrash) {
      moveToTrash(taskToTrash);
      handleCloseTrashModal();
    }
  };

  const handleRestoreTask = (id: string) => {
    restoreFromTrash(id);
  };

  const handleOpenDeleteModal = (id: string) => {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTodo(taskToDelete);
      handleCloseDeleteModal();
    }
  };

  const handleToggleTodo = (id: string, isCompleted: boolean) => {
    if (!isCompleted && !animatingTaskId) {
      setAnimatingTaskId(id);
      setTimeout(() => {
        toggleTodo({ id, is_completed: true });
        setAnimatingTaskId(null);
      }, 2000);
    } else if (isCompleted) {
      toggleTodo({ id, is_completed: false });
    }
  };

  const getDaysRemaining = (duoDateStr: string) => {
    if (!duoDateStr) return null;

    const [year, month, day] = duoDateStr.split("-").map(Number);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(year, month - 1, day);
    deadline.setHours(0, 0, 0, 0);

    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const renderDueDateBadge = (duoDate: string | null) => {
    if (!duoDate) {
      return (
        <span className="text-[11px] text-slate-500 mt-0.5">
          📅 Sem prazo definido
        </span>
      );
    }

    const days = getDaysRemaining(duoDate);
    if (days === null) {
      return (
        <span className="text-[11px] text-slate-500 mt-0.5">
          Erro ao calcular data
        </span>
      );
    }

    if (days > 1) {
      return (
        <span className="text-[11px] text-purple-400 mt-0.5">
          📅 Faltam {days} dias
        </span>
      );
    }
    if (days === 1) {
      return (
        <span className="text-[11px] text-amber-400 mt-0.5">
          📅 Falta 1 dia (Amanhã)
        </span>
      );
    }
    if (days === 0) {
      return (
        <span className="text-[11px] text-rose-400 font-bold mt-0.5 animate-pulse">
          🚨 Termina hoje!
        </span>
      );
    }
    return (
      <span className="text-[11px] text-rose-500 font-semibold mt-0.5">
        ⚠️ Atrasada há {Math.abs(days)} dias
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      {/* Header */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KQ</span>
            </div>
            <div>
              <h1 className="font-black text-2xl bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                KQUIZZ
              </h1>
              <p className="text-sm text-slate-500 hidden sm:inline">
                | Técnico em Qualidade
              </p>
            </div>
          </div>

          <div className="flex-1 flex justify-center mb-4 md:mb-0">
            <div className="relative">
              <Zap className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400 hidden md:block">
              Bem-vindo, {user?.email || "Usuário"}!
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Botão Voltar - centralizado no corpo da página */}
        <div className="flex justify-center py-4">
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors px-4 py-2 rounded-lg hover:bg-slate-900/30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Voltar</span>
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
                        onClick={() =>
                          handleToggleTodo(todo.id, todo.is_completed)
                        }
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

                      {/* Texto da tarefa + Badge de prazo */}
                      <div className="flex flex-col flex-1 text-left min-w-0">
                        <span
                          className={cn(
                            "text-slate-50 transition-all duration-200",
                            todo.is_completed && "line-through opacity-60"
                          )}
                        >
                          {todo.title}
                        </span>
                        {renderDueDateBadge(todo.duo_date)}
                      </div>

                      {/* Botões de ação: Editar e Mover para Lixeira */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            handleOpenEditModal({
                              id: todo.id,
                              title: todo.title,
                              duo_date: todo.duo_date,
                            })
                          }
                          disabled={isLoading || isAnimating}
                          className="text-slate-400 hover:text-purple-400 transition-colors p-1.5 rounded hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Editar tarefa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <Button
                          onClick={() => handleOpenTrashModal(todo.id)}
                          disabled={isLoading}
                          size="sm"
                          variant="ghost"
                          className={cn(
                            "text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 p-1.5 transition-all duration-200 opacity-0 group-hover:opacity-100",
                            isLoading && "opacity-50 cursor-not-allowed"
                          )}
                          aria-label="Mover para lixeira"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-slate-600 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-50 mb-2">
                  Nenhuma tarefa ativa
                </h3>
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
                <span className="font-semibold text-slate-50">
                  🗑️ Lixeira / Histórico
                </span>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showTrash && (
              <div className="border-t border-slate-800 p-4">
                {completedTodos.length > 0 ? (
                  <div className="space-y-3">
                    {completedTodos.map((todo) => {
                      return (
                        <div
                          key={todo.id}
                          className="flex items-center gap-3 p-3 bg-slate-900/30 border border-slate-800 rounded-lg hover:bg-slate-900/50 transition-all duration-200"
                        >
                          <div className="w-5 h-5 rounded border-2 bg-green-600 border-green-600 text-white flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3" />
                          </div>

                          <div className="flex flex-col flex-1 text-left min-w-0">
                            <span className="text-slate-50 line-through opacity-60">
                              {todo.title}
                            </span>
                            {renderDueDateBadge(todo.duo_date)}
                          </div>

                          <Button
                            onClick={() => handleRestoreTask(todo.id)}
                            disabled={isLoading}
                            size="sm"
                            variant="ghost"
                            className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 p-1.5 transition-all duration-200"
                            aria-label="Restaurar tarefa"
                          >
                            <Undo2 className="w-4 h-4" />
                          </Button>

                          <Button
                            onClick={() => handleOpenDeleteModal(todo.id)}
                            disabled={isLoading}
                            size="sm"
                            variant="ghost"
                            className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 p-1.5 transition-all duration-200"
                            aria-label="Excluir permanentemente"
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
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">
                      Lixeira vazia
                    </h3>
                    <p className="text-slate-400">
                      Tarefas movidas para lixeira aparecerão aqui.
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
            <div>
              <label
                htmlFor="taskTitle"
                className="block text-sm font-medium text-slate-400 mb-2"
              >
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

            <div>
              <label
                htmlFor="taskDueDate"
                className="block text-sm font-medium text-slate-400 mb-2"
              >
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

      {/* Modal de Edição de Tarefa */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 shadow-2xl max-w-md">
          <DialogHeader className="border-b border-slate-800">
            <DialogTitle className="text-slate-50">Editar Tarefa</DialogTitle>
            <DialogDescription className="text-slate-400">
              Atualize o título e o prazo da tarefa
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label
                htmlFor="editTaskTitle"
                className="block text-sm font-medium text-slate-400 mb-2"
              >
                Título da Tarefa
              </label>
              <input
                id="editTaskTitle"
                type="text"
                value={editTaskTitle}
                onChange={(e) => setEditTaskTitle(e.target.value)}
                placeholder="Ex: Estudar para a prova de Qualidade"
                autoFocus
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="editTaskDueDate"
                className="block text-sm font-medium text-slate-400 mb-2"
              >
                Prazo Final (opcional)
              </label>
              <input
                id="editTaskDueDate"
                type="date"
                value={editTaskDueDate}
                onChange={(e) => setEditTaskDueDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all accent-purple-500"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2 border-t border-slate-800">
            <Button
              variant="outline"
              onClick={handleCloseEditModal}
              className="flex-1 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpdateTask}
              disabled={!editTaskTitle.trim() || isLoading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium px-4 py-2 transition-all duration-200"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação - Mover para Lixeira */}
      <Dialog open={isTrashModalOpen} onOpenChange={setIsTrashModalOpen}>
        <DialogContent className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 shadow-2xl max-w-md">
          <DialogHeader className="border-b border-slate-800">
            <DialogTitle className="text-slate-50 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-amber-500" />
              Mover para Lixeira
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Tem certeza que deseja mover esta tarefa para a lixeira? Você
              pode restaurá-la depois.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2 border-t border-slate-800">
            <Button
              variant="outline"
              onClick={handleCloseTrashModal}
              className="flex-1 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmMoveToTrash}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-medium px-4 py-2 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Mover para Lixeira
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação - Exclusão Permanente */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 shadow-2xl max-w-md">
          <DialogHeader className="border-b border-slate-800">
            <DialogTitle className="text-slate-50 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-500" />
              Excluir Permanentemente
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Tem certeza que deseja excluir permanentemente esta tarefa? Esta
              ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2 border-t border-slate-800">
            <Button
              variant="outline"
              onClick={handleCloseDeleteModal}
              className="flex-1 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-medium px-4 py-2 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Permanentemente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}