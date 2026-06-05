import { MadeWithDyad } from "@/components/made-with-dyad";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { useDisciplinas } from "@/contexts/disciplinas/hooks/useDisciplinas";
import { DisciplinaCard } from "@/contexts/disciplinas/components/DisciplinaCard";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Página principal da plataforma Técnico em Qualidade.
 * 
 * Quando o usuário está autenticado, mostra o dashboard com todas as disciplinas.
 * Quando não está autenticado, redireciona para o login.
 */
export default function Index() {
  const { user, loading } = useAuth();
  const { data: disciplinas, isLoading: isLoadingDisciplinas } = useDisciplinas();

  // Se o usuário não estiver autenticado, redireciona para o login
  if (!user && !loading) {
    window.location.href = '/login';
    return null;
  }

  // Se estiver carregando autenticação ou disciplinas, mostra tela de loading
  if (loading || isLoadingDisciplinas) {
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
    <div className="min-h-screen bg-[#0b0f19]">
      {/* Header */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KQ</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-50">Técnico em Qualidade</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-400">
                Bem-vindo, {user?.email || "Usuário"}!
              </span>
              <button
                onClick={() => window.location.href = '/login'}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-50 mb-2">Disciplinas</h2>
            <p className="text-slate-400 text-lg">
              Acesse os quizzes e materiais de estudo para cada disciplina
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
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
              >
                Voltar ao Painel
              </button>
            </div>
          )}
        </div>
      </main>

      <MadeWithDyad />
    </div>
  );
}