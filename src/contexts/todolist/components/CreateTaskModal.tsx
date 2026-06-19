import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: (title: string) => void;
  dueDate: string;
  setDueDate: (date: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

/**
 * Modal para criar nova tarefa.
 */
export const CreateTaskModal = ({ 
  isOpen, 
  onClose, 
  title, 
  setTitle, 
  dueDate, 
  setDueDate, 
  onSubmit, 
  isLoading 
}: CreateTaskModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111827] border border-slate-700/50 shadow-2xl max-w-md">
        <DialogHeader className="border-b border-slate-800">
          <DialogTitle className="text-slate-50">Nova Tarefa</DialogTitle>
          <DialogDescription className="text-slate-400">
            Adicione uma nova tarefa à sua lista
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="taskTitle" className="block text-sm font-medium text-slate-400 mb-2">
              Título da Tarefa
            </label>
            <input
              id="taskTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Estudar para a prova de Qualidade"
              autoFocus
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="taskDueDate" className="block text-sm font-medium text-slate-400 mb-2">
              Prazo Final (opcional)
            </label>
            <input
              id="taskDueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all accent-purple-500"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2 border-t border-slate-800">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-slate-700 text-slate-400 hover:bg-slate-800"
          >
            Cancelar
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!title.trim() || isLoading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Salvar Tarefa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};