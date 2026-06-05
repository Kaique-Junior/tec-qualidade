import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Disciplina } from "../types";

/**
 * Hook para buscar disciplinas do Supabase.
 * 
 * Busca todas as disciplinas e filtra as do Módulo 1 para exibição.
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

/**
 * Filtra disciplinas do Módulo 1 para exibição no dashboard.
 * 
 * @param disciplinas - Lista completa de disciplinas
 * @returns Disciplinas filtradas do Módulo 1
 */
export function getDisciplinasModulo1(disciplinas: Disciplina[]) {
  return disciplinas.filter(disciplina => 
    disciplina.nome.toLowerCase().includes("módulo 1") ||
    disciplina.nome.toLowerCase().includes("modulo 1")
  );
}