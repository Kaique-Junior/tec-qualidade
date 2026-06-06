import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

/**
 * Hook para gerenciar estado de autenticação da plataforma.
 * 
 * Fornece:
 * - user: Dados do usuário autenticado ou null
 * - loading: Estado de carregamento inicial
 * - isAuthenticated: Se o usuário está autenticado
 * - signOut: Função para deslogar
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão atual
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error getting session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Monitorar mudanças de autenticação usando a API correta
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        // Redirecionar para raiz após login bem-sucedido
        if (event === 'SIGNED_IN') {
          window.location.href = '/';
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao realizar logout. Tente novamente.");
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signOut
  };
}