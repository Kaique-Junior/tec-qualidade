import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Todo } from "../types";

/**
 * Hook para gerenciar todo o fluxo de tarefas do usuário.
 * 
 * Implementa funções para:
 * - Buscar tarefas do usuário logado
 * - Adicionar nova tarefa
 * - Alternar status de conclusão
 * - Deletar tarefa
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

  // Adicionar nova tarefa
  const { mutate: addTodo } = useMutation({
    mutationFn: async ({ title, dueDate }: { title: string; dueDate?: string }) => {
      try {
        const user = (await supabase.auth.getUser()).data.user;
        if (!user) throw new Error("Usuário não autenticado");

        const insertData: any = {
          title,
          user_id: user.id,
          is_completed: false,
        };

        // Se houver data de prazo, adiciona no formato YYYY-MM-DD
        if (dueDate) {
          insertData.duo_date = dueDate;
        }

        const { data, error } = await supabase
          .from("todolist")
          .insert([insertData])
          .select();

        if (error) throw new Error(error.message);
        return data?.[0];
      } catch (error) {
        toast.error("Erro ao adicionar tarefa: " + (error as Error).message);
        throw error;
      }
    },
    onSuccess: (newTodo) => {
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

  return {
    todos: activeTodos,
    completedTodos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}