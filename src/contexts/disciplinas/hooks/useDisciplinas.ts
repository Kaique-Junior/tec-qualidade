import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Disciplina } from "../types";

/**
 * Hook para buscar todas as disciplinas do Supabase.
 * 
 * Busca todas as disciplinas da tabela sem filtros de módulo.
 * Utilizado pelo componente principal da página.
 */
export function useDisciplinas() {
  return useQuery({
    queryKey: ["disciplinas"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("disciplinas")
          .select("*")
          .order("nome");

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        toast.error("Erro ao carregar disciplinas: " + (error as Error).message);
        throw error;
      }
    },
  });
}