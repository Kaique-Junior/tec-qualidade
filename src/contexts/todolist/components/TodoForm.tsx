import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoFormProps {
  onAddTodo: (title: string, due_date?: string) => void;
  isLoading?: boolean;
}

/**
 * Formulário moderno para adicionar novas tarefas com data de prazo.
 * 
 * Design integrado com efeito de hover e focus states.
 * Inclui campo de data opcional.
 */
export const TodoForm = ({ onAddTodo, isLoading }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim(), dueDate || undefined);
      setTitle("");
      setDueDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Adicione uma nova tarefa..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={cn(
            "flex-1 bg-slate-900/50 border-slate-700 text-slate-50 placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
          )}
          disabled={isLoading}
        />
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={cn(
            "bg-slate-900/50 border-slate-700 text-slate-50 focus:border-purple-500 focus:ring-purple-500/20 w-32"
          )}
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg px-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};