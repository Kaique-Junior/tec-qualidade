import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Disciplina } from "../types";

interface UseDisciplinaBySlugParams {
  slug: string;
}

/**
 * Hook para buscar uma disciplina específica pelo slug.
 * 
 * @param slug - Slug da disciplina para buscar
 * @return Dados da disciplina
 */
export function useDisciplinaBySlug({ slug }: UseDisciplinaBySlugParams) {
  return useQuery({
    queryKey: ["disciplina", slug],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("disciplinas")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        toast.error("Erro ao carregar disciplina: " + (error as Error).message);
        throw error;
      }
    },
    enabled: !!slug, // Só busca se tiver slug
  });
}