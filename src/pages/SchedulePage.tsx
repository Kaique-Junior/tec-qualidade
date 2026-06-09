import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { useSchedule } from "@/contexts/schedule/hooks/useSchedule";
import { ScheduleCard } from "@/contexts/schedule/components/ScheduleCard";
import { EmptySchedule } from "@/contexts/schedule/components/EmptySchedule";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useState } from "react";

/**
 * Página do Calendário Académico Dinâmico.
 * 
 * Exibe o horário do dia atual com base na data do sistema do usuário.
 * Destaca matérias, provas e feriados com badges coloridos.
 * Mobile-first design com layout responsivo.
 */
export default function SchedulePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { todaySchedule, isLoading, isTodaySchedule } = useSchedule();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Se o usuário não estiver autenticado, redireciona para o login
  if (!user && !loading) {
    window.location.href = '/login';
    return null;
  }

  // Se estiver carregando autenticação ou horário, mostra tela de loading
  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Carregando horário...</p>
        </div>
      </div>
    );
  }

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      {/* Header */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>⬅️ Voltar para Funcionalidades</span>
            </button>
            <div className="flex items-center space-x-2">
              <h1 className="text-slate-50 font-black text-2xl bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Calendário Académico
              </h1>
            </div>
            <div></div> {/* Espaço vazio para alinhar */}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Card do dia atual */}
          {todaySchedule && isTodaySchedule ? (
            <ScheduleCard schedule={todaySchedule} />
          ) : (
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg border border-slate-800 shadow-xl p-8">
              <EmptySchedule />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}