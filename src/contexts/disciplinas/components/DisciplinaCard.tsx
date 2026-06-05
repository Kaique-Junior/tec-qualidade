import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Disciplina } from "../types";

interface DisciplinaCardProps {
  disciplina: Disciplina;
  className?: string;
}

/**
 * Componente de card para exibição de uma disciplina.
 * 
 * Exibe nome da disciplina, ícone e botão para acessar quizzes.
 * Redireciona para a rota /disciplina/[slug] quando o botão é clicado.
 */
export const DisciplinaCard = ({ disciplina, className }: DisciplinaCardProps) => {
  const handleAccessQuizzes = () => {
    window.location.href = `/disciplina/${disciplina.slug}`;
  };

  return (
    <Card className={cn("h-full flex flex-col hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">{disciplina.icone}</span>
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {disciplina.nome}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 mt-1">
                Disciplina Técnica
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            Módulo 1
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Acesse os quizzes e materiais de estudo para esta disciplina.
          </p>
        </div>
        
        <Button 
          onClick={handleAccessQuizzes}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Acessar Quizzes
        </Button>
      </CardContent>
    </Card>
  );
};