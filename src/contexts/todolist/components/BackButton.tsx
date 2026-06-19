import { cn } from "@/lib/utils";

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * Botão padrão de voltar para a home.
 */
export const BackButton = ({ onClick, className }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors px-4 py-2 rounded-lg hover:bg-slate-900/30",
        className
      )}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>Voltar para Funcionalidades</span>
    </button>
  );
};