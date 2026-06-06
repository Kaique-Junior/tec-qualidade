import { useState } from "react";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, isCompleted: boolean) => void;
  onEdit: (id: string, title: string, due_date?: string) => void;
  onDelete: (id: string) => void;
  getDaysRemaining?: (due_date?: string | null) => { status: string; days: number } | null;
  isLoading?: boolean;
}

/**
 * Componente individual de tarefa com checkbox, contador de prazo e funcionalidade de edição.
 * 
 * Layout limpo com animações suaves e feedback visual.
 * Permite edição inline do título e data.
 */
export const TodoItem = ({ 
  todo, 
  onToggle, 
  onEdit, 
  onDelete, 
  getDaysRemaining,
  isLoading 
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDueDate, setEditDueDate] = useState(todo.due_date || "");

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle.trim(), editDueDate || undefined);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDueDate(todo.due_date || "");
    setIsEditing(false);
  };

  const daysRemaining = getDaysRemaining?.(todo.due_date);

  const renderDueDateBadge = () => {
    if (!todo.due_date || !daysRemaining) return null;

    const { status, days } = daysRemaining;

    if (status === 'overdue') {
      return (
        <span className="text-xs bg-red-900/50 text-red-300 border border-red-800/50 px-2 py-1 rounded-full">
          Atrasada
        </span>
      );
    }

    if (status === 'today') {
      return (
        <span className="text-xs bg-yellow-900/50 text-yellow-300 border border-yellow-800/50 px-2 py-1 rounded-full">
          Vence hoje
        </span>
      );
    }

    return (
      <span className="text-xs bg-purple-900/50 text-purple-300 border border-purple-800/50 px-2 py-1 rounded-full">
        Faltam {days} dias
      </span>
    );
  };

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

      {/* Conteúdo principal */}
      <div className="flex-1 flex items-center gap-2">
        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="flex-1 bg-slate-800 border-slate-600 text-slate-50 placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
              disabled={isLoading}
            />
            <Input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="bg-slate-800 border-slate-600 text-slate-50 focus:border-purple-500 focus:ring-purple-500/20 w-32"
              disabled={isLoading}
            />
          </div>
        ) : (
          <>
            {/* Texto da tarefa */}
            <span
              className={cn(
                "flex-1 text-slate-50 transition-all duration-200",
                todo.is_completed && "line-through opacity-60"
              )}
            >
              {todo.title}
            </span>

            {/* Badge de data de prazo */}
            {renderDueDateBadge()}
          </>
        )}
      </div>

      {/* Botões de ação */}
      <div className="flex items-center gap-1">
        {isEditing ? (
          <>
            <Button
              onClick={handleSaveEdit}
              disabled={isLoading || !editTitle.trim()}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white p-1"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleCancelEdit}
              disabled={isLoading}
              size="sm"
              variant="ghost"
              className="text-slate-400 hover:text-slate-300 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            {/* Botão de editar */}
            <Button
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
              size="sm"
              variant="ghost"
              className={cn(
                "text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-1 transition-all duration-200 opacity-0 group-hover:opacity-100",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              <Edit2 className="w-4 h-4" />
            </Button>

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
          </>
        )}
      </div>
    </div>
  );
};