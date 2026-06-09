import { Calendar, Coffee } from "lucide-react";

/**
 * Componente para exibir mensagem de dia sem aulas.
 * 
 * Mensagem amigável para fins de semana e feriados.
 */
export const EmptySchedule = () => {
  return (
    <div className="text-center py-16">
      <div className="text-slate-600 mb-6">
        <Calendar className="w-20 h-20 mx-auto opacity-50" />
      </div>
      <h3 className="text-2xl font-semibold text-slate-50 mb-4">Sem atividades letivas agendadas para hoje</h3>
      <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
        Aproveite para descansar ou revisar a matéria!
      </p>
      <div className="flex justify-center space-x-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Coffee className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500">Pausa</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500">Planejar</p>
        </div>
      </div>
    </div>
  );
};