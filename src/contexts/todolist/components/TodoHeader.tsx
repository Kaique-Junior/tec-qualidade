import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoHeaderProps {
  user: { email?: string } | null;
  onBackClick: () => void;
  onLogoutClick: () => void;
  showLogoutDialog: boolean;
  setShowLogoutDialog: (show: boolean) => void;
}

/**
 * Header da página de tarefas com logo, ícone central e logout.
 */
export const TodoHeader = ({ user, onBackClick, onLogoutClick, showLogoutDialog, setShowLogoutDialog }: TodoHeaderProps) => {
  return (
    <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-60000 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">KQ</span>
          </div>
          <div>
            <h1 className="font-black text-2xl bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              KQUIZZ
            </h1>
            <p className="text-sm text-slate-500 hidden sm:inline">| Técnico em Qualidade</p>
          </div>
        </div>
        <div className="flex-1 flex justify-center mb-4 md:mb-0">
          <Zap className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-400 hidden md:block">
            Bem-vindo, {user?.email || "Usuário"}!
          </span>
        </div>
      </div>
    </header>
  );
};