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
 * - userProfile: Dados extendidos do usuário
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão atual
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Buscar dados do perfil
          const { data: profileData, error: profileError } = await supabase.rpc('get_user_dashboard_data');
          if (profileError) {
            console.error("Error fetching profile:", profileError);
          } else {
            setUserProfile(profileData[0]);
          }
        }
      } catch (error) {
        console.error("Error getting session:", error);
        setUser(null);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Monitorar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Buscar dados do perfil quando o usuário fizer login
          const { data: profileData, error: profileError } = await supabase.rpc('get_user_dashboard_data');
          if (profileError) {
            console.error("Error fetching profile:", profileError);
          } else {
            setUserProfile(profileData[0]);
          }
        } else {
          setUserProfile(null);
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

  const updateProfile = async (profileData: { full_name?: string; avatar_url?: string; role?: string }) => {
    try {
      const { data, error } = await supabase.rpc('update_user_profile', {
        p_full_name: profileData.full_name,
        p_avatar_url: profileData.avatar_url,
        p_role: profileData.role
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        // Atualizar o perfil local
        const { data: updatedProfile } = await supabase.rpc('get_user_dashboard_data');
        setUserProfile(updatedProfile[0]);
        toast.success("Perfil atualizado com sucesso!");
      }
      
      return data;
    } catch (error) {
      toast.error("Erro ao atualizar perfil. Tente novamente.");
      throw error;
    }
  };

  return {
    user,
    userProfile,
    loading,
    isAuthenticated: !!user,
    signOut,
    updateProfile
  };
}