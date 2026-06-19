import { Check, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Todo } from "../types";

interface TaskItemProps {
  todo: Todo;
  isAnimating: boolean;
  isLoading: boolean;
  onToggle: (id: string, isCompleted: boolean) => void;
  onEdit: (todo: { id: string; title: string; duo_date: string | null }) => void;
  onDelete: (id: string) => void;
  getDueDateBadgeInfo: (duoDate: string | null) => { text: string; className: string };
}

/**
 * Item individual de tarefa ativa com checkbox, título, badge e ações.
 */
export const TaskItem = ({ 
  todo, 
  isAnimating, 
  isLoading, 
  onToggle, 
  onEdit, 
  onDelete, 
  getDueDateBadgeInfo 
}: TaskItemProps) => {
  const badgeInfo = getDueDateBadgeInfo(todo.duo_date);
  
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 bg-slate-900/30 border border-slate-800 rounded-lg hover:bg-slate-900/50 transition-all duration-200 group",
      isAnimating && "opacity-60"
    )}>
      <button
        onClick={() => onToggle(todo.id, todo.is_completed)}
        disabled={isLoading || isAnimating}
        className={cn(
          "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200",
          isAnimating
            ? "bg-green-600 border-green-600 text-white animate-pulse"
            : todo.is_completed
            ? "bg-green-600 border-green-600 text-white"
            : "border-slate-600 hover:border-purple-500"
        )}
      >
        {(todo.is_completed || isAnimating) && <Check className="w-3 h-3" />}
      </button>

      <div className="flex flex-col flex-1 text-left min-w-0">
        <span className={cn(
          "text-slate-50 transition-all duration-200",
          todo.is_completed && "line-through opacity-60"
        )}>
          {todo.title}
        </span>
        <span className={badgeInfo.className}>
          {badgeInfo.text}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onEdit({ id: todo.id, title: todo.title, duo_date: todo.duo_date })}
          disabled={isLoading || isAnimating}
          className="text-slate-400 hover:text-purple-400 transition-colors p-1.5 rounded hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Editar tarefa"
        >
          <Edit2 className="w-4 h-4" />
        </button>

        <Button
          onClick={() => onDelete(todo.id)}
          disabled={isLoading}
          size="sm"
          variant="ghost"
          className={cn(
            "text-red-500 hover:text-red-400 hover:bg-red-500/10 p-1 transition-all duration-200 opacity-0 group-hover:opacity-100",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};