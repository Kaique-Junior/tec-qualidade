import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { useDisciplinas } from "@/contexts/disciplinas/hooks/useDisciplinas";
import { DisciplinaCard } from "@/contexts/disciplinas/components/DisciplinaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import { useState } from "react";

/**
 * Página principal da plataforma Técnico em Qualidade.
 * 
 * Quando o usuário está autenticado, mostra o dashboard com todas as disciplinas.
 * Quando não está autenticado, redireciona para o login.
 */
export default function Index() {
  const { user, loading, signOut } = useAuth();
  const { data: disciplinas, isLoading: isLoadingDisciplinas } = useDisciplinas();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (error) {
      toast.error("Erro ao realizar logout. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      {/* Header */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-3">
          {/* Lado esquerdo */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KQ</span>
            </div>
            <div>
              <h1 className="font-black text-2xl bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                KQUIZZ
              </h1>
              <p className="text-sm text-slate-500 hidden sm:inline">| Técnico em Qualidade</p>
            </div>
          </div>

          {/* Centro - Raio */}
          <div className="flex-1 flex justify-center mb-4 md:mb-0">
            <div className="relative">
              <Zap className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            </div>
          </div>

          {/* Lado direito - Usuário e Logout */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400 hidden md:block">
              Bem-vindo, {user?.email || "Usuário"}!
            </span>
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
              <DialogTrigger asChild>
                <button className="text-purple-400 hover:text-purple-300 transition-colors p-1">
                  <LogOut className="w-4 h-4 md:hidden" />
                  <span className="hidden md:inline ml-1">Logout</span>
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#111827] border border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-slate-50">Confirmar Saída</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Deseja realmente sair da plataforma?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowLogoutDialog(false)}
                    className="border-slate-700 text-slate-400 hover:bg-slate-800"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600"
                  >
                    Sair
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-50 mb-2">Disciplinas</h2>
            <p className="text-slate-400 text-lg">
              Acesse quizzes de cada matéria separadamente.
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

      <Footer />
    </div>
  );
}