import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { LogOut, Zap, BookOpen, Trophy } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import { useState } from "react";

/**
 * Página principal da plataforma KQUIZZ - Home de introdução.
 * 
 * Design responsivo com mensagem de boas-vindas e botão principal.
 * Utiliza Flexbox para layout responsivo e espaçamento adequado.
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

  const handleAccessDisciplinas = () => {
    navigate('/disciplinas');
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

      {/* Main content com Flexbox responsivo */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* Container principal com espaçamento adequado */}
          <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-12">
            
            {/* Mensagem de boas-vindas */}
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="relative">
                {/* Ícone decorativo com efeito de brilho */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-lg opacity-60 scale-110"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-[#111827] rounded-full flex items-center justify-center border border-purple-500/30">
                    <BookOpen className="w-10 h-10 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                  </div>
                </div>
              </div>
              
              {/* Título principal marcante */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent leading-tight">
                Pronto para os estudos?
              </h1>
              
              {/* Subtítulo explicativo */}
              <p className="text-lg sm:text-xl text-slate-400 text-center leading-relaxed">
                
              </p>
            </div>

            {/* Card/Botão de acesso principal */}
            <div className="w-full max-w-md">
              <button
                onClick={handleAccessDisciplinas}
                className="w-full bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-purple-700 hover:to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] flex items-center justify-center space-x-3 group"
              >
                {/* Ícone do botão com animação */}
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-50 scale-75 group-hover:scale-100 transition-all duration-300"></div>
                  <Trophy className="relative w-6 h-6 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
                </div>
                
                {/* Texto do botão */}
                <span className="text-lg sm:text-xl">Disciplinas e Quizzes</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}