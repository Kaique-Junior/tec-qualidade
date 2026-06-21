import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { LogOut, Zap, BookOpen, CheckSquare, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import { useState } from "react";

/**
 * Página principal da plataforma KQUIZZ - Home moderna com grid de cards.
 * 
 * Layout responsivo com título e três cards principais.
 * Segue as diretrizes de design do projeto com cards integrados.
 */
export default function Index() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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

  const handleNavigateToDisciplinas = () => {
    navigate('/disciplinas');
  };

  const handleNavigateToTodo = () => {
    navigate('/todo');
  };

  const handleNavigateToExams = () => {
    navigate('/provas');
  };

  const handleNavigateToSchedule = () => {
    navigate('/calendario');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      {/* Header centralizado */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Lado esquerdo - Logo KQUIZZ */}
            <div className="flex items-center space-x-2">
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

            {/* Centro - Ícone Zap */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Zap className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            </div>

            {/* Lado direito - Usuário e Logout */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400 hidden md:block">
                Bem-vindo, {user?.email || "Usuário"}!
              </span>
              <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <DialogTrigger asChild>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors p-1 flex items-center gap-1">
                    <LogOut className="w-4 h-4" />
                    <span className="hidden md:inline">Logout</span>
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
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        {/* Título principal e subtítulo */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-50 mb-4 leading-tight">
            FUNCIONALIDADES
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Bem-vindo, {user?.email || "Usuário"}!
          </p>
        </div>

        {/* Grid de cards - agora com 4 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {/* Card 1 - Disciplinas e Quizzes */}
          <button
            onClick={handleNavigateToDisciplinas}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 hover:bg-slate-900/70 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            {/* Ícone */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-30 scale-110 group-hover:opacity-50 transition-all duration-300"></div>
                <div className="relative">
                  <BookOpen className="w-12 h-12 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]" />
                </div>
              </div>
            </div>
            
            {/* Título */}
            <h2 className="text-xl font-bold text-white text-center mb-3">
              Disciplinas e Quizzes
            </h2>
            
            {/* Descrição */}
            <p className="text-slate-400 text-center text-sm">
              Acesse os módulos e responda aos simulados.
            </p>
          </button>

          {/* Card 2 - Minhas Tarefas */}
          <button
            onClick={handleNavigateToTodo}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 hover:bg-slate-900/70 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            {/* Ícone */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-30 scale-110 group-hover:opacity-50 transition-all duration-300"></div>
                <div className="relative">
                  <CheckSquare className="w-12 h-12 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]" />
                </div>
              </div>
            </div>
            
            {/* Título */}
            <h2 className="text-xl font-bold text-white text-center mb-3">
              Minhas Tarefas
            </h2>
            
            {/* Descrição */}
            <p className="text-slate-400 text-center text-sm">
              Organize sua rotina de estudos e metas.
            </p>
          </button>

          {/* Card 3 - Calendário Escolar */}
          <button
            onClick={handleNavigateToSchedule}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 hover:bg-slate-900/70 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            {/* Ícone */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-30 scale-110 group-hover:opacity-50 transition-all duration-300"></div>
                <div className="relative">
                  <Calendar className="w-12 h-12 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]" />
                </div>
              </div>
            </div>
            
            {/* Título */}
            <h2 className="text-xl font-bold text-white text-center mb-3">
              Horário das Aulas
            </h2>
            
            {/* Descrição */}
            <p className="text-slate-400 text-center text-sm">
              Veja as disciplinas e eventos agendados para o dia de hoje.
            </p>
          </button>

          {/* Card 4 - Calendário de Provas */}
          <button
            onClick={handleNavigateToExams}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 hover:bg-slate-900/70 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            {/* Ícone */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-30 scale-110 group-hover:opacity-50 transition-all duration-300"></div>
                <div className="relative">
                  <Calendar className="w-12 h-12 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]" />
                </div>
              </div>
            </div>
            
            {/* Título */}
            <h2 className="text-xl font-bold text-white text-center mb-3">
              Calendário de Provas
            </h2>
            
            {/* Descrição */}
            <p className="text-slate-400 text-center text-sm">
              Monitore suas datas importantes e avaliações.
            </p>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}