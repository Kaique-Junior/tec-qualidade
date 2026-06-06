import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente de rota protegida que verifica se o usuário está autenticado.
 * Se não estiver, redireciona para a página de login.
 * Se estiver, exibe o conteúdo.
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Se estiver carregando, mostrar tela de loading
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

  // Se não estiver autenticado, redirecionar para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, exibir o conteúdo
  return <>{children}</>;
};