import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AcademicSchedule } from "../types";
import { SUBJECT_MAPPING } from "../types";

interface ScheduleCardProps {
  schedule: AcademicSchedule;
  className?: string;
}

/**
 * Componente de card para exibir o horário do dia atual.
 * 
 * Exibe data, dia da semana, matérias e badges especiais.
 */
export const ScheduleCard = ({ schedule, className }: ScheduleCardProps) => {
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

  // Obter horários das aulas (13:00 às 17:30)
  const classTimes = [
    { time: "13:00 - 14:30", period: "1ª Aula" },
    { time: "14:45 - 16:15", period: "2ª Aula" },
    { time: "16:30 - 18:00", period: "3ª Aula" },
    { time: "18:15 - 19:45", period: "4ª Aula" },
    { time: "20:00 - 21:30", period: "5ª Aula" },
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

        {/* Lista de aulas */}
        {schedule.subjects.length > 0 ? (
          <div className="space-y-3">
            {classTimes.map((classTime, index) => {
              const subject = schedule.subjects[index];
              const subjectName = subject ? SUBJECT_MAPPING[subject] || subject : "";
              
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-purple-400">
                      {classTime.period}
                    </span>
                    <p className="text-slate-50 font-medium">
                      {classTime.time}
                    </p>
                  </div>
                  <div className="text-right">
                    {subject && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-950/60 text-purple-300 border border-purple-800/40">
                        {subjectName}
                      </span>
                    )}
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