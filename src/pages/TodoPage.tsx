import { useTodoList } from "@/contexts/todolist/hooks/useTodoList";
import { TodoCard } from "@/contexts/todolist/components/TodoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Plus, ListTodo } from "lucide-react";
import { Footer } from "@/components/Footer";

/**
 * Página completa da lista de tarefas (ToDo List) em tela cheia.
 * 
 * Funcionalidades:
 * - Formulário para adicionar novas tarefas
 * - Separação visual entre tarefas ativas e concluídas
 * - Checkbox para marcar como concluída
 * - Botão de lixeira para deletar
 * - Estados de carregamento e feedback visual
 * 
 * Layout:
 * - Tela cheia responsiva
 * - Botão de voltar no topo
 * - Sem menus laterais quebrados
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

  const handleBackToHome = () => {
    window.location.href = "/home";
  };

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
      {/* Header com botão de voltar */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar para a Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <ListTodo className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              <h1 className="text-slate-50 font-black text-2xl">Minhas Tarefas</h1>
            </div>
            <div></div> {/* Espaço vazio para alinhar */}
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
      </main>

      <Footer />
    </div>
  );
}