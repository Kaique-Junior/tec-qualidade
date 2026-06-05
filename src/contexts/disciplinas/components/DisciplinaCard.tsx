import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
      "flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden",
      className
    )}>
      {/* Imagem de capa */}
      <div className="h-40 w-full">
        <img
          src={disciplina.icone}
          alt={`Capa da disciplina ${disciplina.nome}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback caso o link da imagem quebre
            (e.target as HTMLImageElement).style.display = 'none';
            const fallbackDiv = e.target.parentElement?.querySelector('.fallback-image');
            if (fallbackDiv) {
              fallbackDiv.style.display = 'flex';
            }
          }}
        />
        <div className="fallback-image hidden absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-4xl text-gray-400">{disciplina.icone}</span>
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Badge */}
        <Badge variant="secondary" className="w-fit mb-3 bg-blue-50 text-blue-700">
          Módulo 1
        </Badge>
        
        {/* Título */}
        <CardTitle className="font-bold text-lg text-slate-800 line-clamp-2 min-h-[3.5rem] mb-6">
          {disciplina.nome}
        </CardTitle>
        
        {/* Botão */}
        <div className="mt-auto">
          <Button 
            onClick={handleAccessQuizzes}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Acessar Quizzes
          </Button>
        </div>
      </div>
    </Card>
  );
};