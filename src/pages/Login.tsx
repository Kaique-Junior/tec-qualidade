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
            
            {/* Subtítulo */}
            <p className="text-slate-400 text-sm">
              Sua plataforma técnica de testes e qualidade.
            </p>
          </div>
          
          {/* Botões de autenticação */}
          <div className="space-y-4">
            <GoogleButton />
            
            {/* Botão de convidado com novo estilo */}
            <button
              onClick={() => {
                // Simular login como convidado
                console.log('Login como convidado');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700 rounded-lg transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Entrar como Convidado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}