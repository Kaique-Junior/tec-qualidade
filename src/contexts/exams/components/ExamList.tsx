import { Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ExamWithFormattedDate } from "../types";

interface ExamListProps {
  examsByMonth: Record<string, ExamWithFormattedDate[]>;
  onDeleteExam: (id: string) => void;
  isLoading?: boolean;
}

/**
 * Componente de lista de provas organizadas por meses.
 * 
 * Agrupa provas por mês com cabeçalhos destacados e lista detalhada.
 */
export const ExamList = ({ examsByMonth, onDeleteExam, isLoading }: ExamListProps) => {
  const monthNames = Object.keys(examsByMonth).sort((a, b) => {
    const [monthA, yearA] = a.split(" ");
    const [monthB, yearB] = b.split(" ");
    return new Date(`${monthA} ${yearA}`).getTime() - new Date(`${monthB} ${yearB}`).getTime();
  });

  return (
    <div className="space-y-8">
      {monthNames.map((monthYear) => (
        <div key={monthYear}>
          <h3 className="text-xl font-bold text-purple-400 mb-4 border-b border-slate-800 pb-2">
            {monthYear}
          </h3>
          
          <div className="space-y-3">
            {examsByMonth[monthYear].map((exam) => (
              <div
                key={exam.id}
                className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-800 rounded-lg hover:bg-slate-900/50 transition-all duration-200 group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-400">
                      {exam.formattedDate}
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
            ))}
          </div>
        </div>
      ))}
      
      {monthNames.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-600 mb-4">
            <Calendar className="w-16 h-16 mx-auto opacity-50" />
          </div>
          <h3 className="text-xl font-semibold text-slate-50 mb-2">Nenhuma prova cadastrada</h3>
          <p className="text-slate-400">
            Comece adicionando suas provas e datas importantes!
          </p>
        </div>
      )}
    </div>
  );
};