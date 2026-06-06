import { useNavigate } from "react-router-dom";
import { Zap, BookOpen, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

/**
 * Tela de introdução e boas-vindas da plataforma.
 * 
 * Design limpo e responsivo com foco em mobile.
 * Oferece navegação clara para as duas principais ferramentas.
 */
export default function Home() {
  const navigate = useNavigate();

  const handleGoToDisciplinas = () => {
    navigate("/disciplinas");
  };

  const handleGoToTodoList = () => {
    navigate("/todo");
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo e título */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-400 rounded-full blur-md opacity-50 scale-150 animate-pulse"></div>
                <div className="relative">
                  <svg className="w-16 h-16 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent mb-4">
              Bem-vindo ao KQUIZZ
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Sua plataforma de estudos Técnico em Qualidade. Organize seu aprendizado com quizzes e tarefas.
            </p>
          </div>

          {/* Cards de navegação */}
          <div className="space-y-4">
            {/* Card de Disciplinas */}
            <Button
              onClick={handleGoToDisciplinas}
              className="w-full bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-purple-700 hover:to-indigo-600 text-white rounded-xl p-6 h-auto flex items-center space-x-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-white/20 p-3 rounded-lg">
                <BookOpen className="w-8 h-8 text-purple-300" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-white mb-1">Disciplinas</h3>
                <p className="text-purple-200 text-sm">Acesse quizzes por matéria</p>
              </div>
            </Button>

            {/* Card de ToDo List */}
            <Button
              onClick={handleGoToTodoList}
              className="w-full bg-gradient-to-r from-green-800 to-emerald-700 hover:from-green-700 hover:to-emerald-600 text-white rounded-xl p-6 h-auto flex items-center space-x-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-white/20 p-3 rounded-lg">
                <CheckSquare className="w-8 h-8 text-green-300" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-white mb-1">Minhas Tarefas</h3>
                <p className="text-green-200 text-sm">Gerencie seu aprendizado</p>
              </div>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}