import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Todo } from "../types";

interface CompletedTaskItemProps {
  todo: Todo;
  isLoading: boolean;
  onDelete: (id: string) => void;
  getDueDateBadgeInfo: (duoDate: string | null) => { text: string; className: string };
}

/**
 * Item de tarefa concluída exibido na seção Lixeira/Histórico.
 */
export const CompletedTaskItem = ({ 
  todo, 
  isLoading, 
  onDelete, 
  getDueDateBadgeInfo 
}: CompletedTaskItemProps) => {
  const badgeInfo = getDueDateBadgeInfo(todo.duo_date);
  
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-900/30 border border-slate-800 rounded-lg hover:bg-slate-900/50 transition-all duration-200">
      <div className="w-5 h-5 rounded border-2 bg-green-600 border-green-600 text-white flex items-center justify-center flex-shrink-0">
        <Check className="w-3 h-3" />
      </div>

      <div className="flex flex-col flex-1 text-left min-w-0">
        <span className="text-slate-50 line-through opacity-60">
          {todo.title}
        </span>
        <span className={badgeInfo.className}>
          {badgeInfo.text}
        </span>
      </div>

      <Button
        onClick={() => onDelete(todo.id)}
        disabled={isLoading}
        size="sm"
        variant="ghost"
        className={cn(
          "text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 p-1 transition-all duration-200",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};