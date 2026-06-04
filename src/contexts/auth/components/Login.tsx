import { useAuth } from "../hooks/useAuth";
import { GoogleButton } from "./GoogleButton";

/**
 * Página de login da plataforma Técnico em Qualidade.
 * 
 * Utiliza o hook useAuth para verificar estado de autenticação.
 * Se o usuário já estiver autenticado, redireciona para a página principal.
 */
export const Login = () => {
  const { user, loading } = useAuth();

  // Se o usuário já estiver autenticado, redireciona
  if (user) {
    window.location.href = "/";
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Plataforma Técnico em Qualidade
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Acesse sua conta para continuar
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <GoogleButton />
        </div>
      </div>
    </div>
  );
};