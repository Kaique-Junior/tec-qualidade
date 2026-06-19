import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddTaskButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Botão para abrir modal de nova tarefa.
 */
export const AddTaskButton = ({ onClick, disabled }: AddTaskButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg p-2 transition-all duration-200"
      aria-label="Adicionar nova tarefa"
    >
      <Plus className="w-5 h-5" />
    </Button>
  );
};