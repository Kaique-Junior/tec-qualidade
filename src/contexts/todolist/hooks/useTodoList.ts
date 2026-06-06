import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Todo } from "../types";

/**
 * Hook para gerenciar todo o fluxo de tarefas do usuário.
 * 
 * Implementa funções para:
 * - Buscar tarefas do usuário logado
 * - Adicionar nova tarefa com data de prazo
 * - Alternar status de conclusão
 * - Deletar tarefa
 * - Editar tarefa (título e data)
 */
export function useTodoList() {
  const queryClient = useQueryClient();

  // Buscar todas as tarefas do usuário
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("todolist")
          .select("*")
          .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
          .order("created_at", { ascending: false });

        if (error) throw new Error(error.message);
        return data;
      } catch (error) {
        toast.error("Erro ao carregar tarefas: " + (error as Error).message);
        throw error;
      }
    },
  });

  // Adicionar nova tarefa com data de prazo
  const { mutate: addTodo } = useMutation({
    mutationFn: async ({ title, due_date }: { title: string; due_date?: string }) => {
      try {
        const { data, error } = await supabase
          .from("todolist")
          .insert({
            title,
            due_date,
            user_id: (await supabase.auth.getUser()).data.user?.id,
          })
          .select()
          .single();

        if (error) throw new Error(error.message);
        return data;
      } catch (error) {
        toast.error("Erro ao adicionar tarefa: " + (error as Error).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Tarefa adicionada com sucesso!");
    },
  });

  // Alternar status de conclusão
  const { mutate: toggleTodo } = useMutation({
    mutationFn: async ({ id, is_completed }: { id: string; is_completed: boolean }) => {
      try {
        const { error } = await supabase
          .from("todolist")
          .update({ is_completed })
          .eq("id", id);

        if (error) throw new Error(error.message);
        return { id, is_completed };
      } catch (error) {
        toast.error("Erro ao atualizar tarefa: " + (error as Error).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Editar tarefa (título e data)
  const { mutate: editTodo } = useMutation({
    mutationFn: async ({ id, title, due_date }: { id: string; title: string; due_date?: string }) => {
      try {
        const { error } = await supabase
          .from("todolist")
          .update({ title, due_date })
          .eq("id", id);

        if (error) throw new Error(error.message);
        return { id, title, due_date };
      } catch (error) {
        toast.error("Erro ao editar tarefa: " + (error as Error).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Tarefa atualizada com sucesso!");
    },
  });

  // Deletar tarefa
  const { mutate: deleteTodo } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from("todolist")
          .delete()
          .eq("id", id);

        if (error) throw new Error(error.message);
        return id;
      } catch (error) {
        toast.error("Erro ao deletar tarefa: " + (error as Error).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Tarefa deletada com sucesso!");
    },
  });

  // Separar tarefas ativas e concluídas
  const activeTodos = todos?.filter(todo => !todo.is_completed) || [];
  const completedTodos = todos?.filter(todo => todo.is_completed) || [];

  // Função para calcular dias restantes
  const getDaysRemaining = (due_date?: string | null) => {
    if (!due_date) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const due = new Date(due_date);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'overdue', days: Math.abs(diffDays) };
    if (diffDays === 0) return { status: 'today', days: 0 };
    return { status: 'upcoming', days: diffDays };
  };

  return {
    todos: activeTodos,
    completedTodos,
    isLoading,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    getDaysRemaining,
  };
}