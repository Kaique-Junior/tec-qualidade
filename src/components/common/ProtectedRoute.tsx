import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente de proteção de rotas para rotas internas.
 * 
 * Verifica se o usuário está autenticado antes de renderizar o conteúdo.
 * Se não houver sessão ativa, redireciona para a página de login.
 * 
 * @param children - Conteúdo a ser renderizado se o usuário estiver autenticado
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (!session || !session.user) {
          // Redireciona para login se não houver sessão
          navigate('/login', { replace: true });
        } else {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        // Em caso de erro, redireciona para login
        navigate('/login', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Se estiver carregando, não renderiza nada para evitar flicker
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não houver usuário, não renderiza nada (já redirecionou)
  if (!user) {
    return null;
  }

  // Se tiver usuário, renderiza o conteúdo protegido
  return <>{children}</>;
};