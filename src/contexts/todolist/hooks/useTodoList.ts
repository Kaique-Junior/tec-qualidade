import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Todo } from "../types";

/**
 * Hook para gerenciar todo o fluxo de tarefas do usuário.
 * 
 * Implementa funções para:
 * - Buscar tarefas ativas do usuário logado
 * - Buscar tarefas na lixeira (completed)
 * - Adicionar nova tarefa
 * - Alternar status de conclusão
 * - Mover para lixeira (soft delete - marca is_completed = true)
 * - Restaurar da lixeira (marca is_completed = false)
 * - Deletar permanentemente
 */
export function useTodoList() {
  const queryClient = useQueryClient();

  // Buscar todas as tarefas do usuário (ativas e lixeira)
  const { data: allTodos, isLoading } = useQuery({
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

  // Filtrar tarefas ativas (não concluídas)
  const todos = allTodos?.filter(todo => !todo.is_completed) || [];

  // Filtrar tarefas na lixeira (concluídas)
  const completedTodos = allTodos?.filter(todo => todo.is_completed) || [];

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

  // Mover para lixeira (soft delete - apenas marca is_completed = true)
  const { mutate: moveToTrash } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from("todolist")
          .update({ is_completed: true })
          .eq("id", id);

        if (error) throw new Error(error.message);
        return id;
      } catch (error) {
        toast.error("Erro ao mover para lixeira: " + (error as Error).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Tarefa movida para a lixeira!");
    },
  });

  // Restaurar da lixeira (marca is_completed = false)
  const { mutate: restoreFromTrash } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from("todolist")
          .update({ is_completed: false })
          .eq("id", id);

        if (error) throw new Error(error.message);
        return id;
      } catch (error) {
        toast.error("Erro ao restaurar tarefa: " + (error as Error).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Tarefa restaurada com sucesso!");
    },
  });

  // Deletar permanentemente
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
      toast.success("Tarefa excluída permanentemente!");
    },
  });

  return {
    todos,
    completedTodos,
    isLoading,
    addTodo,
    toggleTodo,
    moveToTrash,
    restoreFromTrash,
    deleteTodo,
  };
}