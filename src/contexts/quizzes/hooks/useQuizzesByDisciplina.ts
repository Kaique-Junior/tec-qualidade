import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Quiz } from "../types";

interface UseQuizzesByDisciplinaParams {
  disciplinaId: number;
}

/**
 * Hook para buscar quizzes de uma disciplina específica.
 * 
 * @param disciplinaId - ID da disciplina para buscar quizzes
 * @return Lista de quizzes da disciplina
 */
export function useQuizzesByDisciplina({ disciplinaId }: UseQuizzesByDisciplinaParams) {
  return useQuery({
    queryKey: ["quizzes", disciplinaId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("quizzes")
          .select("*")
          .eq("disciplina_id", disciplinaId)
          .order("created_at");

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        toast.error("Erro ao carregar quizzes: " + (error as Error).message);
        throw error;
      }
    },
    enabled: !!disciplinaId, // Só busca se tiver disciplinaId
  });
}