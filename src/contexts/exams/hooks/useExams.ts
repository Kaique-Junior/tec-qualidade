import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format, isThisMonth, isToday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Exam } from "../types";

/**
 * Hook para gerenciar todo o fluxo de provas do usuário.
 * 
 * Implementa funções para:
 * - Buscar provas do usuário logado
 * - Adicionar nova prova
 * - Deletar prova
 */
export function useExams() {
  const queryClient = useQueryClient();

  // Buscar todas as provas do usuário
  const { data: exams, isLoading } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("exams")
          .select("*")
          .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
          .order("exam_date", { ascending: true });

        if (error) throw new Error(error.message);
        return data;
      } catch (error) {
        toast.error("Erro ao carregar provas: " + (error as Error).message);
        throw error;
      }
    },
  });

  // Adicionar nova prova
  const { mutate: addExam } = useMutation({
    mutationFn: async (examData: Omit<Exam, "id" | "user_id" | "created_at">) => {
      try {
        const { data, error } = await supabase
          .from("exams")
          .insert({
            ...examData,
            user_id: (await supabase.auth.getUser()).data.user?.id,
          })
          .select()
          .single();

        if (error) throw new Error(error.message);
        return data;
      } catch (error) {
        toast.error("Erro ao adicionar prova: " + (error as Error).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast.success("Prova adicionada com sucesso!");
    },
  });

  // Deletar prova
  const { mutate: deleteExam } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from("exams")
          .delete()
          .eq("id", id);

        if (error) throw new Error(error.message);
        return id;
      } catch (error) {
        toast.error("Erro ao deletar prova: " + (error as Error).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast.success("Prova deletada com sucesso!");
    },
  });

  // Organizar provas por mês
  const examsByMonth = exams?.reduce((acc, exam) => {
    const date = parseISO(exam.exam_date);
    const monthYear = format(date, "MMMM yyyy", { locale: ptBR });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push({
      ...exam,
      formattedDate: format(date, "dd/MM/yyyy"),
      month: format(date, "MMMM", { locale: ptBR }),
      year: date.getFullYear(),
    });
    return acc;
  }, {} as Record<string, any[]>) || {};

  // Provas do mês atual
  const currentMonthExams = exams?.filter(exam => {
    const date = parseISO(exam.exam_date);
    return isThisMonth(date);
  }) || [];

  // Provas de hoje
  const todayExams = exams?.filter(exam => {
    const date = parseISO(exam.exam_date);
    return isToday(date);
  }) || [];

  return {
    exams,
    examsByMonth,
    currentMonthExams,
    todayExams,
    isLoading,
    addExam,
    deleteExam,
  };
}