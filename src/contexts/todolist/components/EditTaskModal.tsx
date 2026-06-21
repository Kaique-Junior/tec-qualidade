import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EditTaskModalProps {
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
 * Modal para editar tarefa existente.
 */
export const EditTaskModal = ({ 
  isOpen, 
  onClose, 
  title, 
  setTitle, 
  dueDate, 
  setDueDate, 
  onSubmit, 
  isLoading 
}: EditTaskModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 shadow-2xl max-w-md">
        <DialogHeader className="border-b border-slate-800">
          <DialogTitle className="text-slate-50">Editar Tarefa</DialogTitle>
          <DialogDescription className="text-slate-400">
            Atualize o título e o prazo da tarefa
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="editTaskTitle" className="block text-sm font-medium text-slate-400 mb-2">
              Título da Tarefa
            </label>
            <input
              id="editTaskTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Estudar para a prova de Qualidade"
              autoFocus
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="editTaskDueDate" className="block text-sm font-medium text-slate-400 mb-2">
              Prazo Final (opcional)
            </label>
            <input
              id="editTaskDueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all accent-purple-500"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2 border-t border-slate-8000">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            Cancelar
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!title.trim() || isLoading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium px-4 py-2 transition-all duration-200"
          >
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};