import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { useTodoList } from "./useTodoList";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Todo } from "../types";

/**
 * Hook customizado para gerenciar toda a lógica da página de tarefas.
 * Separa a lógica de negócio do componente de apresentação.
 */
export function useTodoPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { todos, completedTodos, isLoading, addTodo, toggleTodo, deleteTodo } = useTodoList();

  // Estados de UI
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDueDate, setEditTaskDueDate] = useState("");
  const [taskToEdit, setTaskToEdit] = useState<{ id: string; title: string; duo_date: string | null } | null>(null);
  const [animatingTaskId, setAnimatingTaskId] = useState<string | null>(null);
  const [showTrash, setShowTrash] = useState(false);

  // Handlers de navegação
  const handleBackToHome = () => navigate('/');

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (error) {
      toast.error("Erro ao realizar logout. Tente novamente.");
    }
  };

  // Handlers do modal de criação
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
      addTodo({ title: newTaskTitle.trim(), dueDate: newTaskDueDate || undefined });
      handleCloseModal();
    }
  };

  // Handlers do modal de edição
  const handleOpenEditModal = (todo: { id: string; title: string; duo_date: string | null }) => {
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
          duo_date: editTaskDueDate || null
        })
        .eq("id", taskToEdit.id);

      if (error) throw new Error(error.message);

      toast.success("Tarefa atualizada com sucesso!");
      handleCloseEditModal();
      window.location.reload();
    } catch (error) {
      toast.error("Erro ao atualizar tarefa: " + (error as Error).message);
    }
  };

  // Handler de toggle (conclusão)
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

  // Handler de delete
  const handleDeletePermanent = (id: string) => {
    if (confirm("Tem certeza que deseja excluir permanentemente esta tarefa?")) {
      deleteTodo(id);
    }
  };

  // Utilitários de data
  const getDaysRemaining = (duoDateStr: string) => {
    if (!duoDateStr) return null;
    const [year, month, day] = duoDateStr.split('-').map(Number);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(year, month - 1, day);
    deadline.setHours(0, 0, 0, 0);
    const diffTime = deadline.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getDueDateBadgeInfo = (duoDate: string | null) => {
    if (!duoDate) {
      return { text: "📅 Sem prazo definido", className: "text-[11px] text-slate-500 mt-0.5" };
    }
    const days = getDaysRemaining(duoDate);
    if (days === null) return { text: "Erro ao calcular data", className: "text-[11px] text-slate-500 mt-0.5" };
    if (days > 1) return { text: `📅 Faltam ${days} dias`, className: "text-[11px] text-purple-400 mt-0.5" };
    if (days === 1) return { text: "📅 Falta 1 dia (Amanhã)", className: "text-[11px] text-amber-400 mt-0.5" };
    if (days === 0) return { text: "🚨 Termina hoje!", className: "text-[11px] text-rose-400 font-bold mt-0.5 animate-pulse" };
    return { text: `⚠️ Atrasada há ${Math.abs(days)} dias`, className: "text-[11px] text-rose-500 font-semibold mt-0.5" };
  };

  return {
    // Auth
    user,
    authLoading,
    showLogoutDialog,
    setShowLogoutDialog,
    handleLogout,
    handleBackToHome,
    // Data
    todos,
    completedTodos,
    isLoading,
    // UI State
    isModalOpen,
    setIsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    newTaskTitle,
    setNewTaskTitle,
    newTaskDueDate,
    setNewTaskDueDate,
    editTaskTitle,
    setEditTaskTitle,
    editTaskDueDate,
    setEditTaskDueDate,
    taskToEdit,
    setTaskToEdit,
    animatingTaskId,
    showTrash,
    setShowTrash,
    // Handlers
    handleOpenModal,
    handleCloseModal,
    handleSubmitTask,
    handleOpenEditModal,
    handleCloseEditModal,
    handleUpdateTask,
    handleToggleTodo,
    handleDeletePermanent,
    // Utils
    getDueDateBadgeInfo,
  };
}