import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { useExams } from "@/contexts/exams/hooks/useExams";
import { ExamForm } from "@/contexts/exams/components/ExamForm";
import { ExamList } from "@/contexts/exams/components/ExamList";
import { Calendar } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useState } from "react";

/**
 * Página de calendário de provas do usuário.
 * 
 * Layout limpo e responsivo com:
 * - Header padrão
 * - Botão de voltar centralizado
 * - Formulário de adicionar provas
 * - Lista de provas organizadas por meses
 * - Estados vazios amigáveis
 */
export default function ExamsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const { examsByMonth, isLoading, addExam, deleteExam } = useExams();

  if (!user && !loading) {
    window.location.href = '/login';
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Carregando...</p>
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
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KQ</span>
            </div>
            <div>
              <h1 className="font-black text-2xl bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                KQUIZZ
              </h1>
              <p className="text-sm text-slate-500 hidden sm:inline">| Técnico em Qualidade</p>
            </div>
          </div>

          <div className="flex-1 flex justify-center mb-4 md:mb-0">
            <div className="relative">
              <Calendar className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400 hidden md:block">
              Bem-vindo, {user?.email || "Usuário"}!
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Botão Voltar - centralizado no corpo da página */}
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
        <div className="flex-1 max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-8">
            <ExamForm onAddExam={addExam} isLoading={isLoading} />

            <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg border border-slate-800 shadow-xl p-6">
              <h2 className="text-2xl font-bold text-slate-50 mb-6">Calendário de Provas</h2>
              <ExamList 
                examsByMonth={examsByMonth} 
                onDeleteExam={deleteExam} 
                isLoading={isLoading} 
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}