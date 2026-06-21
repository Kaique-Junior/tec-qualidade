import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { useSchedule } from "@/contexts/schedule/hooks/useSchedule";
import { ScheduleCard } from "@/contexts/schedule/components/ScheduleCard";
import { EmptySchedule } from "@/contexts/schedule/components/EmptySchedule";
import { Zap } from "lucide-react";
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

  if (!user && !loading) {
    window.location.href = '/login';
    return null;
  }

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
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Lado esquerdo - Logo KQUIZZ */}
            <div>
              <h1 className="font-black text-2xl bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                KQUIZZ
              </h1>
              <p className="text-sm text-slate-500 hidden sm:inline">| Técnico em Qualidade</p>
            </div>

            {/* Centro - Ícone Zap */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Zap className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            </div>

            {/* Lado direito - Usuário */}
            <div className="flex items-center">
              <span className="text-sm text-slate-400 hidden md:block">
                Bem-vindo, {user?.email || "Usuário"}!
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Botão Voltar */}
      <div className="flex justify-center py-4">
        <button
          onClick={handleBackToHome}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors px-4 py-2 rounded-lg hover:bg-slate-900/30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Voltar</span>
        </button>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-8">
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