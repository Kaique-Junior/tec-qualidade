import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { useDisciplinaBySlug } from "@/contexts/disciplinas/hooks/useDisciplinaBySlug";
import { useQuizzesByDisciplina } from "@/contexts/quizzes/hooks/useQuizzesByDisciplina";
import { QuizCard } from "@/contexts/quizzes/components/QuizCard";
import { Loader2 } from "lucide-react";
import { ArrowLeft } from "lucide-react";

/**
 * Página dinâmica para exibir quizzes de uma disciplina específica.
 * 
 * Busca a disciplina pelo slug da URL e exibe seus quizzes.
 * Possui:
 * - Header com navegação e nome da disciplina
 * - Lista de quizzes disponíveis
 * - Estados de loading e erro
 * - Mensagens para disciplinas não encontradas ou sem quizzes
 */
export default function DisciplinaPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Obter slug da URL
  const slug = window.location.pathname.split('/disciplina/')[1];

  const { data: disciplina, isLoading: isLoadingDisciplina, error: disciplinaError } = useDisciplinaBySlug({ slug });
  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuizzesByDisciplina({ 
    disciplinaId: disciplina?.id 
  });

  // Se o usuário não estiver autenticado, redireciona para o login
  if (!user && !loading) {
    window.location.href = '/login';
    return null;
  }

  // Se estiver carregando autenticação, mostra tela de loading
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

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (error) {
      toast.error("Erro ao realizar logout. Tente novamente.");
    }
  };

  const handleBackToHome = () => {
    navigate('/disciplinas');
  };

  // Se a disciplina não foi encontrada
  if (disciplinaError || !disciplina) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col">
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
                <div className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              </div>
            </div>

            {/* Lado direito - Apenas logout */}
            <div className="flex items-center space-x-2">
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

        <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Disciplina não encontrada</h2>
            <p className="text-slate-400 mb-6">A disciplina que você procura não existe ou foi removida.</p>
            <Button onClick={handleBackToHome} className="bg-purple-600 hover:bg-purple-700">
              Voltar para Disciplinas
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Se estiver carregando os dados
  if (isLoadingDisciplina || isLoadingQuizzes) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col">
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
                <div className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
              </div>
            </div>

            {/* Lado direito - Apenas logout */}
            <div className="flex items-center space-x-2">
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

        <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
            <p className="text-slate-400">Carregando disciplina...</p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      {/* Header */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-3">
          {/* Lado esquerdo */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <button onClick={handleBackToHome} className="text-slate-400 hover:text-slate-200 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
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
          </div>

          {/* Centro - Raio */}
          <div className="flex-1 flex justify-center mb-4 md:mb-0">
            <div className="relative">
              <div className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
            </div>
          </div>

          {/* Lado direito - Apenas logout */}
          <div className="flex items-center space-x-2">
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
      <main className="flex-1 flex flex-col py-8 px-4 sm:px-6 lg:px-8">
        {/* Título da disciplina */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{disciplina.nome}</h2>
          <p className="text-slate-400">Acesse os quizzes disponíveis para esta disciplina</p>
        </div>

        {/* Lista de quizzes */}
        <div className="flex-1">
          {quizzes && quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Nenhum quiz disponível para esta disciplina.</p>
              <p className="text-slate-500 text-sm mt-2">Em breve mais conteúdo será adicionado!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}