import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Todo, TodoFormData } from "../types";

/**
 * Hook para gerenciar a lista de tarefas do usuário.
 * 
 * Fornece:
 * - Lista de tarefas separadas por status (ativas/concluídas)
 * - Estados de carregamento e erro
 * - Funções para criar, atualizar e deletar tarefas
 */
export function useTodoList() {
  const queryClient = useQueryClient();

  // Buscar todas as tarefas do usuário autenticado
  const { data: todos, isLoading, error } = useQuery({
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

  // Criar nova tarefa
  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationFn: async (todoData: TodoFormData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("todolist")
        .insert({
          user_id: user.id,
          title: todoData.title,
          is_completed: false,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Tarefa criada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar tarefa: " + (error as Error).message);
    },
  });

  // Atualizar tarefa (completar/incompletar)
  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, is_completed }: { id: string; is_completed: boolean }) => {
      const { data, error } = await supabase
        .from("todolist")
        .update({ is_completed })
        .eq("id", id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Tarefa atualizada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar tarefa: " + (error as Error).message);
    },
  });

  // Deletar tarefa
  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("todolist")
        .delete()
        .eq("id", id);

      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Tarefa deletada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao deletar tarefa: " + (error as Error).message);
    },
  });

  // Separar tarefas por status
  const activeTodos = todos?.filter(todo => !todo.is_completed) || [];
  const completedTodos = todos?.filter(todo => todo.is_completed) || [];

  return {
    todos,
    activeTodos,
    completedTodos,
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    isCreating,
    isUpdating,
    isDeleting,
  };
}