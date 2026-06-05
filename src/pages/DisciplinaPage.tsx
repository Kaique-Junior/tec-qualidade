import { useNavigate } from "react-router-dom";
import { useDisciplinaBySlug } from "@/contexts/disciplinas/hooks/useDisciplinaBySlug";
import { useQuizzesByDisciplina } from "@/contexts/quizzes/hooks/useQuizzesByDisciplina";
import { QuizCard } from "@/contexts/quizzes/components/QuizCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

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
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 text-center">Carregando...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se não encontrar a disciplina
  if (!disciplina) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Disciplina não encontrada</h2>
                <p className="text-gray-600 mb-6">A disciplina que você procura não existe.</p>
                <button
                  onClick={handleBackToDashboard}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Voltar ao Painel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar ao Painel</span>
              </button>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">{disciplina.nome}</h1>
            <div></div> {/* Espaço vazio para alinhar */}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quizzes Disponíveis</h2>

              {quizzes && quizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quizzes.map((quiz) => (
                    <QuizCard 
                      key={quiz.id} 
                      quiz={quiz} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum quiz adicionado para esta matéria ainda.</h3>
                  <p className="text-gray-600 mb-6">
                    Fique de olho! Em breve novos quizzes serão disponibilizados aqui.
                  </p>
                  <button
                    onClick={handleBackToDashboard}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                  >
                    Voltar ao Painel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}