import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format, parseISO, isToday, formatISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { AcademicSchedule } from "../types";

/**
 * Hook para gerenciar o calendário acadêmico.
 * 
 * Implementa funções para:
 * - Buscar horários do dia atual
 * - Adicionar/atualizar entradas do calendário
 * - Deletar entradas do calendário
 */
export function useSchedule() {
  const queryClient = useQueryClient();

  // Buscar horário do dia atual
  const { data: todaySchedule, isLoading } = useQuery({
    queryKey: ["academic_schedule", "today"],
    queryFn: async () => {
      try {
        // Obter data atual
        const today = new Date();
        const todayString = formatISO(today, { representation: 'date' });

        const { data, error } = await supabase
          .from("academic_schedule")
          .select("*")
          .eq("date", todayString)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        toast.error("Erro ao carregar horário do dia: " + (error as Error).message);
        throw error;
      }
    },
  });

  // Buscar todos os horários (para futuras funcionalidades)
  const { data: allSchedules } = useQuery({
    queryKey: ["academic_schedule"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("academic_schedule")
          .select("*")
          .order("date");

        if (error) throw new Error(error.message);
        return data;
      } catch (error) {
        toast.error("Erro ao carregar calendário: " + (error as Error).message);
        throw error;
      }
    },
  });

  // Adicionar/Atualizar horário
  const { mutate: upsertSchedule } = useMutation({
    mutationFn: async (scheduleData: Partial<AcademicSchedule>) => {
      try {
        const { data, error } = await supabase
          .from("academic_schedule")
          .upsert(scheduleData)
          .select()
          .single();

        if (error) throw new Error(error.message);
        return data;
      } catch (error) {
        toast.error("Erro ao salvar horário: " + (error as Error).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic_schedule"] });
      queryClient.invalidateQueries({ queryKey: ["academic_schedule", "today"] });
      toast.success("Horário atualizado com sucesso!");
    },
  });

  // Deletar horário
  const { mutate: deleteSchedule } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from("academic_schedule")
          .delete()
          .eq("id", id);

        if (error) throw new Error(error.message);
        return id;
      } catch (error) {
        toast.error("Erro ao deletar horário: " + (error as Error).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic_schedule"] });
      queryClient.invalidateQueries({ queryKey: ["academic_schedule", "today"] });
      toast.success("Horário deletado com sucesso!");
    },
  });

  // Verificar se é dia atual
  const isTodaySchedule = isToday(parseISO(todaySchedule?.date || ""));

  return {
    todaySchedule,
    allSchedules,
    isLoading,
    isTodaySchedule,
    upsertSchedule,
    deleteSchedule,
  };
}