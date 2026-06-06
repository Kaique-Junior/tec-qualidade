import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

/**
 * Componente individual de tarefa com checkbox e botão de deletar.
 * 
 * Layout limpo com animações suaves e feedback visual.
 */
export const TodoItem = ({ todo, onToggle, onDelete, isLoading }: TodoItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-900/30 border border-slate-800 rounded-lg hover:bg-slate-900/50 transition-all duration-200 group">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id, !todo.is_completed)}
        disabled={isLoading}
        className={cn(
          "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200",
          todo.is_completed
            ? "bg-green-600 border-green-600 text-white"
            : "border-slate-600 hover:border-purple-500"
        )}
      >
        {todo.is_completed && (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Texto da tarefa */}
      <span
        className={cn(
          "flex-1 text-slate-50 transition-all duration-200",
          todo.is_completed && "line-through opacity-60"
        )}
      >
        {todo.title}
      </span>

      {/* Botão de deletar */}
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
  );
};