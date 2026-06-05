import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

/**
 * Componente de cabeçalho responsivo para toda a aplicação.
 * 
 * Layout em uma única linha horizontal com:
 * - Logo KQUIZZ à esquerda
 * - Ícone Zap no centro (entre logo e botão de logout)
 * - Botão de logout à direita
 */
export const Header = () => {
  const { user, signOut } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (error) {
      toast.error("Erro ao realizar logout. Tente novamente.");
    }
  };

  return (
    <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center w-full px-4 py-3">
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
        <div className="flex items-center">
          <Zap className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
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
  );
};