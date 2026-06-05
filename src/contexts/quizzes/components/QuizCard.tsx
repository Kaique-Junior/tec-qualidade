import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Quiz } from "../types";

interface QuizCardProps {
  quiz: Quiz;
  className?: string;
}

/**
 * Componente de card para exibição de um quiz.
 * 
 * Exibe título, descrição e botão para iniciar o quiz.
 * Abre o link em uma nova aba quando o botão é clicado.
 */
export const QuizCard = ({ quiz, className }: QuizCardProps) => {
  const handleStartQuiz = () => {
    window.open(quiz.url_link, "_blank");
  };

  return (
    <Card className={cn("h-full flex flex-col hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {quiz.titulo}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">
              Quiz de Avaliação
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="mb-4">
          {quiz.descricao ? (
            <p className="text-sm text-gray-600">
              {quiz.descricao}
            </p>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Nenhuma descrição disponível
            </p>
          )}
        </div>
        
        <Button 
          onClick={handleStartQuiz}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Iniciar Quiz
        </Button>
      </CardContent>
    </Card>
  );
};