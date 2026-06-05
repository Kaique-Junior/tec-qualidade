import { GoogleButton } from "./GoogleButton";

/**
 * Página de login da plataforma Técnico em Qualidade.
 * 
 * Utiliza o componente GoogleButton para autenticação via OAuth do Google.
 * O redirecionamento após login é configurado para a origem atual da aplicação.
 */
export const Login = () => {
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