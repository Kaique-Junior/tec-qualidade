import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Todo } from "../types";

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

/**
 * Componente de card para exibição de uma tarefa individual.
 * 
 * Exibe título, checkbox para marcar como concluída e botão de deletar.
 * Animações suaves para transições de estado.
 */
export const TodoCard = ({ 
  todo, 
  onToggle, 
  onDelete, 
  isUpdating = false, 
  isDeleting = false 
}: TodoCardProps) => {
  const handleToggle = (checked: boolean) => {
    onToggle(todo.id, checked);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <Card className={cn(
      "transition-all duration-200",
      todo.is_completed 
        ? "bg-slate-800/50 border-slate-700" 
        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Checkbox
              checked={todo.is_completed}
              onCheckedChange={handleToggle}
              disabled={isUpdating}
              className={cn(
                "w-5 h-5 rounded",
                todo.is_completed ? "bg-green-600 border-green-600" : ""
              )}
            />
            <span 
              className={cn(
                "text-base transition-colors duration-200",
                todo.is_completed 
                  ? "text-slate-500 line-through" 
                  : "text-slate-200"
              )}
            >
              {todo.title}
            </span>
          </div>
          
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="ghost"
            size="sm"
            className={cn(
              "p-2 h-auto text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-colors duration-200",
              isDeleting && "text-slate-600"
            )}
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};