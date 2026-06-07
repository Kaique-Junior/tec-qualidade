import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Exam } from "../types";

interface ExamCardProps {
  exam: Exam;
  onDeleteExam: (id: string) => void;
  isLoading?: boolean;
}

/**
 * Componente de card individual para exibição de prova.
 * 
 * Layout limpo com informações da prova e botão de deletar.
 */
export const ExamCard = ({ exam, onDeleteExam, isLoading }: ExamCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-800 rounded-lg hover:bg-slate-900/50 transition-all duration-200 group">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-slate-400">
            {new Date(exam.exam_date).toLocaleDateString("pt-BR")}
          </span>
          <span className="px-2 py-1 bg-purple-950/60 text-purple-300 border border-purple-800/40 rounded-full text-xs font-semibold">
            Prova
          </span>
        </div>
        <h4 className="font-semibold text-slate-50 mb-1">
          {exam.title}
        </h4>
        {exam.description && (
          <p className="text-sm text-slate-400 line-clamp-2">
            {exam.description}
          </p>
        )}
      </div>
      
      <Button
        onClick={() => onDeleteExam(exam.id)}
        disabled={isLoading}
        size="sm"
        variant="ghost"
        className={cn(
          "text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 transition-all duration-200 opacity-0 group-hover:opacity-100",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};