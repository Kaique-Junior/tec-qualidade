import { useState } from "react";
import { CheckSquare, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodoFloatingButtonProps {
  onClick: () => void;
}

/**
 * Botão flutuante elegante para abrir o modal de tarefas.
 * 
 * Posicionado no canto inferior direito da tela.
 * Responsivo: funciona bem em mobile e desktop.
 */
export const TodoFloatingButton = ({ onClick }: TodoFloatingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="sm"
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
        "text-white rounded-full p-4 shadow-lg hover:shadow-xl",
        "transition-all duration-300 hover:scale-105",
        "border-2 border-white/20",
        "flex items-center justify-center"
      )}
    >
      <ListTodo className="w-6 h-6" />
    </Button>
  );
};