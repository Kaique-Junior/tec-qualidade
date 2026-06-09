import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AcademicSchedule } from "../types";

interface ScheduleCardProps {
  schedule: AcademicSchedule;
  className?: string;
}

/**
 * Componente de card para exibir o horário do dia atual.
 * 
 * Exibe data, dia da semana, matérias e badges especiais.
 * Renderiza apenas os 2 primeiros períodos de aula (13:00-14:40 e 15:00-16:30).
 */
export const ScheduleCard = ({ schedule, className }: ScheduleCardProps) => {
  // Dicionário de tradução estático para siglas
  const disciplineMap: Record<string, string> = {
    'GPRO': 'Gestão de Produção',
    'EM': 'Economia e Mercado',
    'FDQ': 'Ferramentas da Qualidade',
    'FOO': 'Ferramentas da Qualidade',
    'QA': 'Qualidade Ambiental',
    'GP': 'Gestão de Pessoas',
    'PT': 'Português Instrumental',
    'DA': 'Desenho Auxiliado',
    'GA': 'Gestão Ambiental',
    'GHO': 'Gestão de Higiene e Ocupacional',
    'CHR': 'Carga Horária Restante'
  };

  // Função para obter nome da disciplina ou fallback
  const getDisciplineName = (sigla: string): string => {
    return disciplineMap[sigla] || sigla;
  };

  const formatDate = schedule.date;
  const dayOfWeek = schedule.day_of_week;
  
  // Determinar badge especial
  const getSpecialBadge = () => {
    if (schedule.is_exam_day) {
      return (
        <Badge variant="destructive" className="w-fit mb-3">
          📝 Dia de Prova
        </Badge>
      );
    }
    
    if (schedule.notes?.includes('FERIADO')) {
      return (
        <Badge variant="secondary" className="w-fit mb-3 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
          🎉 Feriado
        </Badge>
      );
    }
    
    if (schedule.notes?.includes('RECESSO')) {
      return (
        <Badge variant="secondary" className="w-fit mb-3 bg-blue-500/20 text-blue-300 border-blue-500/30">
          🏖️ Recesso
        </Badge>
      );
    }
    
    return null;
  };

  // Limitar apenas os 2 primeiros períodos de aula
  const classTimes = [
    { time: "13:00 - 14:40", period: "1º Período" },
    { time: "15:00 - 16:30", period: "2º Período" }
  ];

  return (
    <Card className={cn(
      "bg-[#111827] border border-slate-800 shadow-lg overflow-hidden",
      className
    )}>
      {/* Header */}
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <CardTitle className="text-xl font-bold text-slate-50">
              Aulas de Hoje — {formatDate} ({dayOfWeek})
            </CardTitle>
          </div>
        </div>
        {getSpecialBadge()}
      </CardHeader>
      
      {/* Conteúdo */}
      <CardContent className="space-y-4">
        {/* Observações */}
        {schedule.notes && !schedule.is_exam_day && (
          <div className="bg-slate-800/50 rounded-lg p-3">
            <p className="text-sm text-slate-400 italic">
              {schedule.notes}
            </p>
          </div>
        )}

        {/* Lista de aulas - apenas 2 períodos */}
        {schedule.subjects && schedule.subjects.length > 0 ? (
          <div className="space-y-3">
            {classTimes.map((classTime, index) => {
              const subject = schedule.subjects[index];
              const subjectName = subject ? getDisciplineName(subject) : "";
              
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                  {/* Indicador visual esquerdo com ícone */}
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-1 h-full bg-purple-500/30 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-purple-400">
                        {classTime.period}
                      </span>
                      <p className="text-slate-50 font-medium">
                        {classTime.time}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {subject && (
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-purple-400" />
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-950/60 text-purple-300 border border-purple-800/40">
                            {subjectName}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-slate-400">
              Sem atividades letivas agendadas para hoje. Aproveite para descansar ou revisar a matéria!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};