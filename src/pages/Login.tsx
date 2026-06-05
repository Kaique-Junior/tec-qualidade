import { GoogleButton } from "@/contexts/auth/components/GoogleButton";

/**
 * Página de login da plataforma KQUIZZ.
 * 
 * Design minimalista e premium com tema escuro, ícone de raio e gradiente roxo.
 * Combina visualmente com o restante da plataforma.
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4">
      {/* Card centralizado */}
      <div className="w-full max-w-md bg-[#111827] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        {/* Conteúdo do card */}
        <div className="p-8">
          {/* Logo e identidade */}
          <div className="text-center mb-8">
            {/* Ícone de raio com efeito de brilho */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-400 rounded-full blur-md opacity-50 scale-150 animate-pulse"></div>
                <div className="relative">
                  <svg className="w-12 h-12 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Nome da plataforma com gradiente */}
            <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              KQUIZZ
            </h1>            
          </div>
          
          {/* Botões de autenticação */}
          <div className="space-y-4">
            <GoogleButton />
          </div>
        </div>
      </div>
    </div>
  );
}