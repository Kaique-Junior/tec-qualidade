import { MadeWithDyad } from "@/components/made-with-dyad";
import { useAuth } from "@/contexts/auth/hooks/useAuth";

/**
 * Página principal da plataforma Técnico em Qualidade.
 * 
 * Quando o usuário não está autenticado, redireciona para o login.
 */
const Index = () => {
  const { user, userProfile, loading, signOut } = useAuth();

  // Se o usuário não estiver autenticado, redireciona para o login
  if (!user && !loading) {
    // Usando window.location.href para redirecionamento imediato
    window.location.href = '/login';
    return null;
  }

  // Se estiver carregando, mostra tela de loading
  if (loading) {
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
                Bem-vindo, {userProfile?.full_name || user?.email || "Usuário"}!
              </span>
              <button
                onClick={signOut}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900">Total de Projetos</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-2">24</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-900">Projetos Ativos</h3>
                  <p className="text-2xl font-bold text-green-600 mt-2">18</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-yellow-900">Tarefas Pendentes</h3>
                  <p className="text-2xl font-bold text-yellow-600 mt-2">7</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Próximas Ações</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">Revisar relatório de qualidade Q4</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">Atualizar padrões de inspeção</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">Agendar auditoria interna</span>
                  </li>
                </ul>
              </div>

              {/* Seção de informações do usuário */}
              <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informações do Usuário</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nome</p>
                    <p className="text-sm font-medium text-gray-900">{userProfile?.full_name || 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Função</p>
                    <p className="text-sm font-medium text-gray-900">{userProfile?.role || 'student'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Membro desde</p>
                    <p className="text-sm font-medium text-gray-900">
                      {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'Não informado'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MadeWithDyad />
    </div>
  );
};

export default Index;