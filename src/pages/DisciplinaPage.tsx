import { useNavigate } from "react-router-dom";
import { useDisciplinaBySlug } from "@/contexts/disciplinas/hooks/useDisciplinaBySlug";
import { useQuizzesByDisciplina } from "@/contexts/quizzes/hooks/useQuizzesByDisciplina";
import { QuizCard } from "@/contexts/quizzes/components/QuizCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Zap } from "lucide-react";
import { Footer } from "@/components/Footer";
import type { Quiz } from "@/contexts/quizzes/types";

/**
 * Página dinâmica para exibir quizzes de uma disciplina específica.
 * 
 * Busca a disciplina pelo slug da URL e exibe seus quizzes.
 * Se não houver quizzes, mostra mensagem amigável.
 */
export default function DisciplinaPage() {
  const navigate = useNavigate();
  
  // Pega o slug da URL
  const slug = window.location.pathname.split('/disciplina/')[1];
  
  const { data: disciplina, isLoading: isLoadingDisciplina } = useDisciplinaBySlug({ slug });
  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuizzesByDisciplina({ 
    disciplinaId: disciplina?.id 
  });

  const handleBackToDashboard = () => {
    navigate("/");
  };

  // Se estiver carregando disciplina ou quizzes, mostra tela de loading
  if (isLoadingDisciplina || isLoadingQuizzes) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não encontrar a disciplina
  if (!disciplina) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center">
          <div className="max-w-md bg-[#111827] rounded-lg border border-slate-800 shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-50 mb-4">Disciplina não encontrada</h2>
            <p className="text-slate-400 mb-6">A disciplina que você procura não existe.</p>
            <button
              onClick={handleBackToDashboard}
              className="bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-purple-700 hover:to-indigo-600 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-[0_0_10px_rgba(168,85,247,0.1)]"
            >
              Voltar ao Pain
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      {/* Header */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar ao Painel</span>
            </button>
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              <h1 className="text-slate-50 font-black text-2xl">{disciplina.nome}</h1>
            </div>
            <div></div> {/* Espaço vazio para alinhar */}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg border border-slate-800 shadow-xl">
            <div className="p-6">
              <h2 className="text-slate-200 font-bold mb-6">Quizzes Disponíveis</h2>

              {quizzes && quizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="bg-[#111827] border border-slate-800 rounded-lg p-6 flex flex-col items-center text-center">
                      {/* Badge da etapa */}
                      {quiz.etapa && (
                        <span className="bg-purple-950/60 text-purple-300 border border-purple-800/40 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 inline-block">
                          Etapa {quiz.etapa}
                        </span>
                      )}
                      
                      {/* Título do quiz */}
                      <h3 className="text-xl font-extrabold text-white mb-2">
                        {quiz.titulo}
                      </h3>
                      
                      {/* Descrição do quiz */}
                      {quiz.descricao && (
                        <p className="text-slate-400 text-sm mb-5 max-w-[250px]">
                          {quiz.descricao}
                        </p>
                      )}
                      
                      {/* Botão iniciar quiz */}
                      <button 
                        onClick={() => window.open(quiz.url_link, "_blank")}
                        className="bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-purple-700 hover:to-indigo-600 text-white font-medium rounded-lg py-2 px-4 w-full transition-all duration-200 shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                      >
                        Iniciar Quiz
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-slate-600 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-50 mb-4">Nenhum quiz adicionado</h3>
                  <p className="text-slate-400 mb-6">
                    Fique de olho! Em breve novos quizzes serão disponibilizados.
                  </p>
                  <button
                    onClick={handleBackToDashboard}
                    className="bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-purple-700 hover:to-indigo-600 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                  >
                    Voltar ao Painel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}