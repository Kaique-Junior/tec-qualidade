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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Técnico em Qualidade</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bem-vindo, {user?.email || "Usuário"}!
              </span>
              <button
                onClick={() => window.location.href = '/login'}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Disciplinas</h2>
                  <p className="text-gray-600">
                    Acesse os quizzes e materiais de estudo para cada disciplina
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>📚</span>
                  <span>{disciplinas?.length || 0} disciplinas</span>
                </div>
              </div>

              {disciplinas && disciplinas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {disciplinas.map((disciplina) => (
                    <DisciplinaCard 
                      key={disciplina.id} 
                      disciplina={disciplina} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma disciplina encontrada</h3>
                  <p className="text-gray-600">
                    Não foram encontradas disciplinas no sistema.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <MadeWithDyad />
    </div>
  );
}