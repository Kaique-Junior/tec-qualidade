import { useTodoList } from "../hooks/useTodoList";
import { TodoCard } from "./TodoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { TodoFormData } from "../types";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal flutuante para gerenciamento de tarefas.
 * 
 * Responsivo:
 * - Mobile: ocupa tela inteira
 * - Desktop: card centralizado de tamanho controlado
 * 
 * Funcionalidades:
 * - Formulário para adicionar novas tarefas
 * - Lista separada de tarefas ativas e concluídas
 * - Checkbox para marcar como concluída
 * - Botão de lixeira para deletar
 * - Estados de carregamento e feedback visual
 */
export const TodoModal = ({ isOpen, onClose }: TodoModalProps) => {
  const [newTodo, setNewTodo] = useState("");
  const { 
    activeTodos, 
    completedTodos, 
    createTodo, 
    updateTodo, 
    deleteTodo,
    isCreating,
    isUpdating,
    isDeleting 
  } = useTodoList();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      createTodo({ title: newTodo.trim() });
      setNewTodo("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isCreating) {
      handleAddTodo();
    }
  };

  const handleToggleTodo = (id: string, completed: boolean) => {
    updateTodo({ id, is_completed: completed });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "max-w-4xl w-full",
          "max-h-[90vh] overflow-y-auto",
          "bg-[#0b0f19] border-slate-800",
          "p-0 sm:p-6",
          "rounded-lg"
        )}
      >
        {/* Header do modal */}
        <DialogHeader className="px-6 pb-4 pt-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-slate-50 flex items-center space-x-2">
              <ListTodo className="w-6 h-6 text-purple-400" />
              <span>Minhas Tarefas</span>
            </DialogTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-slate-200 p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Conteúdo do modal */}
        <div className="px-6 pb-6">
          {/* Formulário de adicionar tarefa */}
          <div className="mb-6">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Adicionar nova tarefa..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isCreating}
                className="flex-1 bg-slate-900/80 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
              />
              <Button
                onClick={handleAddTodo}
                disabled={isCreating || !newTodo.trim()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                {isCreating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Lista de tarefas ativas */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-slate-300 mb-4 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Tarefas Ativas ({activeTodos.length})
            </h2>
            
            {activeTodos.length > 0 ? (
              <div className="space-y-3">
                {activeTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    isUpdating={isUpdating}
                    isDeleting={isDeleting}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-900/30 rounded-lg border border-slate-800">
                <div className="text-slate-600 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-50 mb-2">Nenhuma tarefa ativa</h3>
                <p className="text-slate-400 text-sm">
                  Adicione novas tarefas usando o campo acima para começar.
                </p>
              </div>
            )}
          </section>

          {/* Lista de tarefas concluídas */}
          <section>
            <h2 className="text-lg font-semibold text-slate-300 mb-4 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Tarefas Concluídas ({completedTodos.length})
            </h2>
            
            {completedTodos.length > 0 ? (
              <div className="space-y-3">
                {completedTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    isUpdating={isUpdating}
                    isDeleting={isDeleting}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-900/30 rounded-lg border border-slate-800">
                <div className="text-slate-600 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-50 mb-2">Nenhuma tarefa concluída</h3>
                <p className="text-slate-400 text-sm">
                  Marque suas tarefas como concluídas quando terminar!
                </p>
              </div>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};