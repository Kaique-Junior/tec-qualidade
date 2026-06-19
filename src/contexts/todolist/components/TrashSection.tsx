import { Trash2 } from "lucide-react";
import { Check, Trash2 } from "lucide-react";
import { CompletedTaskItem } from "./CompletedTaskItem";
import { cn } from "@/lib/utils";
import type { Todo } from "../types";

interface TrashSectionProps {
  completedTodos: Todo[];
  isLoading: boolean;
  showTrash: boolean;
  setShowTrash: (show: boolean) => void;
  onDelete: (id: string) => void;
  getDueDateBadgeInfo: (duoDate: string | null) => { text: string; className: string };
}

/**
 * Seção colapsável de Lixeira/Histórico com tarefas concluídas.
 */
export const TrashSection = ({ 
  completedTodos, 
  isLoading, 
  showTrash, 
  setShowTrash, 
  onDelete, 
  getDueDateBadgeInfo 
}: TrashSectionProps) => {
  return (
    <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/30">
      <button
        onClick={() => setShowTrash(!showTrash)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-900/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Trash2 className="w-5 h-5 text-slate-400" />
          <span className="font-semibold text-slate-50">🗑️ Lixeira / Histórico</span>
          {completedTodos.length > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-800 text-slate-400">
              {completedTodos.length}
            </span>
          )}
        </div>
        <svg
          className={cn(
            "w-4 h-4 text-slate-400 transition-transform duration-200",
            showTrash && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showTrash && (
        <div className="border-t border-slate-800 p-4">
          {completedTodos.length > 0 ? (
            <div className="space-y-3">
              {completedTodos.map((todo) => (
                <CompletedTaskItem
                  key={todo.id}
                  todo={todo}
                  isLoading={isLoading}
                  onDelete={onDelete}
                  getDueDateBadgeInfo={getDueDateBadgeInfo}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trash2 className="w-12 h-12 mx-auto text-slate-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Lixeira vazia</h3>
              <p className="text-slate-400">Tarefas concluídas aparecerão aqui.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};