import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Disciplina } from "../types";

interface DisciplinaCardProps {
  disciplina: Disciplina;
  className?: string;
}

/**
 * Componente de card moderno para exibição de uma disciplina.
 * 
 * Layout inspirado em plataformas de estudos como Udemy/Alura.
 * Exibe imagem de capa, badge, título e botão para acessar quizzes.
 */
export const DisciplinaCard = ({ disciplina, className }: DisciplinaCardProps) => {
  const handleAccessQuizzes = () => {
    window.location.href = `/disciplina/${disciplina.slug}`;
  };

  return (
    <Card className={cn(
      "flex flex-col bg-[#111827] border border-slate-800 shadow-sm transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:-translate-y-1 overflow-hidden",
      className
    )}>
      {/* Imagem de capa */}
      <div className="h-40 w-full relative">
        <img
          src={disciplina.icone}
          alt={`Capa da disciplina ${disciplina.nome}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const imgElement = e.target as HTMLImageElement;
            imgElement.style.display = 'none';
            const fallbackDiv = imgElement.parentElement?.querySelector('.fallback-image') as HTMLDivElement | null;
            if (fallbackDiv) {
              fallbackDiv.style.display = 'flex';
            }
          }}
        />
        <div className="fallback-image hidden absolute inset-0 bg-[#111827] flex items-center justify-center">
          <span className="text-4xl text-slate-600">{disciplina.icone}</span>
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Badge */}
        <Badge variant="secondary" className="w-fit mb-3 bg-purple-950/40 text-purple-300 border border-purple-800/30">
          Módulo 1
        </Badge>
        
        {/* Título */}
        <CardTitle className="font-bold text-lg text-slate-50 line-clamp-2 min-h-[3.5rem] mb-6">
          {disciplina.nome}
        </CardTitle>
        
        {/* Botão */}
        <div className="mt-auto">
          <Button 
            onClick={handleAccessQuizzes}
            className="w-full bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-purple-700 hover:to-indigo-600 text-white rounded-lg transition-all duration-300"
          >
            Acessar
          </Button>
        </div>
      </div>
    </Card>
  );
};