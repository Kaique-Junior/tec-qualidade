import { useLocation } from "react-router-dom";
import { ListTodo, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Componente de navegação lateral para o aplicativo.
 * 
 * Fornece links para as principais páginas da plataforma:
 * - Dashboard (página inicial)
 * - Minhas Tarefas (página de ToDo List)
 */
export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-[#0f172a]/80 backdrop-blur-md border-r border-slate-800 z-10">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">KQ</span>
          </div>
          <div>
            <h1 className="font-black text-xl bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              KQUIZZ
            </h1>
            <p className="text-xs text-slate-500">Técnico em Qualidade</p>
          </div>
        </div>

        {/* Navegação */}
        <div className="space-y-2">
          {/* Dashboard */}
          <a
            href="/"
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
              isActive("/")
                ? "bg-purple-900/50 text-purple-300 border border-purple-700/50"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            )}
          >
            <Zap className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </a>

          {/* Minhas Tarefas */}
          <a
            href="/todo"
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
              isActive("/todo")
                ? "bg-purple-900/50 text-purple-300 border border-purple-700/50"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            )}
          >
            <ListTodo className="w-5 h-5" />
            <span className="font-medium">Minhas Tarefas</span>
          </a>
        </div>
      </div>
    </nav>
  );
};