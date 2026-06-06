import { useNavigate } from "react-router-dom";
import { useDisciplinas } from "@/contexts/disciplinas/hooks/useDisciplinas";
import { DisciplinaCard } from "@/contexts/disciplinas/components/DisciplinaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Zap } from "lucide-react";
import { Footer } from "@/components/Footer";

/**
 * Página de disciplinas com botão de voltar para a Home.
 * 
 * Exibe todas as disciplinas disponíveis para acesso aos quizzes.
 */
export default function Index() {
  const navigate = useNavigate();
  const { data: disciplinas, isLoading: isLoadingDisciplinas } = useDisciplinas();

  const handleBackToHome = () => {
    navigate("/home");
  };

  // Se estiver carregando disciplinas, mostra tela de loading
  if (isLoadingDisciplinas) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      {/* Header com botão de voltar */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar para a Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              <h1 className="text-slate-50 font-black text-2xl">Disciplinas</h1>
            </div>
            <div></div> {/* Espaço vazio para alinhar */}
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-50 mb-2">Acesse os Quizzes</h2>
          <p className="text-slate-400 text-lg">
            Escolha uma disciplina para começar seus estudos.
          </p>
        </div>

        {disciplinas && disciplinas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {disciplinas.map((disciplina) => (
              <DisciplinaCard 
                key={disciplina.id} 
                disciplina={disciplina} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-slate-600 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-50 mb-4">Nenhuma disciplina encontrada</h3>
            <p className="text-slate-400 text-lg mb-8">
              Não foram encontradas disciplinas no sistema.
            </p>
            <button
              onClick={handleBackToHome}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
            >
              Voltar para a Home
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}