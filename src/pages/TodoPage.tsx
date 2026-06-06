import { useTodoList } from "@/contexts/todolist/hooks/useTodoList";
import { TodoCard } from "@/contexts/todolist/components/TodoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, ListTodo } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { MobileNavbar } from "@/components/common/MobileNavbar";

/**
 * Página completa da lista de tarefas (ToDo List).
 * 
 * Funcionalidades:
 * - Formulário para adicionar novas tarefas
 * - Separação visual entre tarefas ativas e concluídas
 * - Checkbox para marcar como concluída
 * - Botão de lixeira para deletar
 * - Estados de carregamento e feedback visual
 * 
 * Layout Responsivo:
 * - Mobile: Navbar com hamburguer e drawer
 * - Desktop: Sidebar fixo com ml-64
 */
export default function TodoPage() {
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      {/* Mobile navbar */}
      <MobileNavbar 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isOpen={isMobileMenuOpen}
      />

      {/* Desktop content */}
      <main className="flex-1 ml-64 md:ml-64">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Formulário de adicionar tarefa */}
          <div className="mb-8">
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
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-slate-300 mb-4 flex items-center">
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
              <div className="text-center py-12 bg-slate-900/30 rounded-lg border border-slate-800">
                <div className="text-slate-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-50 mb-4">Nenhuma tarefa ativa</h3>
                <p className="text-slate-400">
                  Adicione novas tarefas usando o campo acima para começar.
                </p>
              </div>
            )}
          </section>

          {/* Lista de tarefas concluídas */}
          <section>
            <h2 className="text-xl font-semibold text-slate-300 mb-4 flex items-center">
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
              <div className="text-center py-12 bg-slate-900/30 rounded-lg border border-slate-800">
                <div className="text-slate-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-50 mb-4">Nenhuma tarefa concluída</h3>
                <p className="text-slate-400">
                  Marque suas tarefas como concluídas quando terminar!
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}