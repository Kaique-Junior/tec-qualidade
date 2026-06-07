import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamFormProps {
  onAddExam: (title: string, exam_date: string, description?: string) => void;
  isLoading?: boolean;
}

/**
 * Formulário moderno para adicionar novas provas.
 * 
 * Design integrado com inputs de data e textarea para descrição.
 */
export const ExamForm = ({ onAddExam, isLoading }: ExamFormProps) => {
  const [title, setTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && examDate) {
      onAddExam(title.trim(), examDate, description.trim() || undefined);
      setTitle("");
      setExamDate("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-50 mb-4">Adicionar Nova Prova</h3>
      
      <div className="space-y-4">
        {/* Nome da Prova */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-400 mb-2">
            Nome da Prova
          </label>
          <Input
            id="title"
            type="text"
            placeholder="Ex: Prova de Qualidade de Software"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
            disabled={isLoading}
          />
        </div>

        {/* Data da Prova */}
        <div>
          <label htmlFor="examDate" className="block text-sm font-medium text-slate-400 mb-2">
            Data da Prova
          </label>
          <Input
            id="examDate"
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
            disabled={isLoading}
          />
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-2">
            Descrição (opcional)
          </label>
          <Textarea
            id="description"
            placeholder="Adicione anotações ou detalhes sobre a prova..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500/20 resize-none"
            rows={3}
            disabled={isLoading}
          />
        </div>

        {/* Botão de submit */}
        <Button
          type="submit"
          disabled={isLoading || !title.trim() || !examDate}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Adicionar Prova
        </Button>
      </div>
    </form>
  );
};