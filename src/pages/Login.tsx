import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { GoogleButton } from "@/contexts/auth/components/GoogleButton";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Página de login da plataforma KQUIZZ com autenticação por e-mail/senha e Google OAuth.
 * 
 * Design minimalista e premium com tema escuro, ícone de raio e gradiente roxo.
 * Inclui abas para alternar entre Entrar e Cadastrar.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Validação de confirmação de senha
        if (formData.password !== formData.confirmPassword) {
          toast.error("As senhas não coincidem");
          setIsLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast.success("Conta criada com sucesso! Verifique seu e-mail para confirmar.");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast.success("Login realizado com sucesso!");
        navigate("/");
      }
    } catch (error) {
      const message = (error as Error).message;
      if (isSignUp) {
        toast.error(`Erro ao criar conta: ${message}`);
      } else {
        toast.error(`Erro ao entrar: ${message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: "signin" | "signup") => {
    setIsSignUp(tab === "signup");
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

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
            
            {/* Subtítulo dinâmico */}
            <p className="text-slate-400 text-sm">
              {isSignUp ? "Crie sua conta para começar" : "Bem-vindo de volta"}
            </p>
          </div>
          
          {/* Abas de alternância */}
          <div className="flex mb-6 border-b border-slate-800">
            <button
              onClick={() => handleTabChange("signin")}
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px",
                !isSignUp
                  ? "text-purple-400 border-purple-400"
                  : "text-slate-500 hover:text-slate-300 border-transparent"
              )}
            >
              Entrar
            </button>
            <button
              onClick={() => handleTabChange("signup")}
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px",
                isSignUp
                  ? "text-purple-400 border-purple-400"
                  : "text-slate-500 hover:text-slate-300 border-transparent"
              )}
            >
              Cadastrar
            </button>
          </div>

          {/* Formulário de autenticação */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Campo E-mail */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E-mail"
                required
                autoComplete="email"
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/40 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Campo Senha */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Senha"
                required
                autoComplete={isSignUp ? "new-password" : "current-password"}
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/40 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Campo Confirmar Senha (apenas no cadastro) */}
            {isSignUp && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmar senha"
                  required
                  autoComplete="new-password"
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/40 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            )}

            {/* Botão de ação principal */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isSignUp ? "Criando conta..." : "Entrando..."}
                </>
              ) : (
                isSignUp ? "Criar Conta" : "Entrar"
              )}
            </button>
          </form>

          {/* Divisor visual */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#111827] text-slate-500">ou continue com</span>
            </div>
          </div>

          {/* Botão do Google (existente) */}
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}