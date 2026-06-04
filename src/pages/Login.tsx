import { Login } from "@/contexts/auth/components/Login";

/**
 * Página principal de autenticação da plataforma.
 * 
 * Esta página utiliza o componente Login do contexto de autenticação,
 * que encapsula a lógica de login com Google OAuth.
 * 
 * @see src/contexts/auth/components/Login
 */
export default function LoginPage() {
  return <Login />;
}