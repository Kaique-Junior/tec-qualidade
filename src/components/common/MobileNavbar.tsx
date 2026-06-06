import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MobileNavbarProps {
  onMenuToggle: () => void;
  isOpen: boolean;
}

/**
 * Navbar mobile responsiva para telas pequenas.
 * 
 * Exibe logo e botão hamburguer que abre o menu lateral como um drawer.
 */
export const MobileNavbar = ({ onMenuToggle, isOpen }: MobileNavbarProps) => {
  return (
    <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 fixed top-0 left-0 right-0 z-50 md:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
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

          {/* Botão hamburguer */}
          <Sheet open={isOpen} onOpenChange={onMenuToggle}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-6 h-6 text-slate-400" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-[#0f172a]/95 backdrop-blur-md border-r border-slate-800">
              <MobileMenuContent onMenuToggle={onMenuToggle} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

interface MobileMenuContentProps {
  onMenuToggle: () => void;
}

/**
 * Conteúdo do menu mobile para o drawer.
 */
const MobileMenuContent = ({ onMenuToggle }: MobileMenuContentProps) => {
  return (
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
        <a
          href="/"
          onClick={onMenuToggle}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 bg-purple-900/50 text-purple-300 border border-purple-700/50"
        >
          <Zap className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </a>

        <a
          href="/todo"
          onClick={onMenuToggle}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="font-medium">Minhas Tarefas</span>
        </a>
      </div>
    </div>
  );
};