import { TaskItem } from "./TaskItem";
import { cn } from "@/lib/utils";

interface TaskListProps {
  todos: Todo[];
  isLoading: boolean;
  animatingTaskId: string | null;
  onToggle: (id: string, isCompleted: boolean) => void;
  onEdit: (todo: { id: string; title: string; duo_date: string | null }) => void;
  onDelete: (id: string) => void;
  renderDueDateBadge: (duoDate: string | null) => React.ReactNode;
}

/**
 * Lista de tarefas ativas com mensagem de estado vazio.
 */
export const TaskList = ({ 
  todos, 
  isLoading, 
  animatingTaskId, 
  onToggle, 
  onEdit, 
  onDelete, 
  renderDueDateBadge 
}: TaskListProps) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-600 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-50 mb-2">Nenhuma tarefa ativa</h3>
        <p className="text-slate-400">Adicione novas tarefas para começar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          todo={todo}
          isAnimating={animatingTaskId === todo.id}
          isLoading={isLoading}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          renderDueDateBadge={renderDueDateBadge}
        />
      ))}
    </div>
  );
};