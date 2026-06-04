import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Técnico em Qualidade</h1>
        <p className="text-xl text-gray-600 mb-8">
          Plataforma para gestão de qualidade técnica
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Bem-vindo!</h2>
          <p className="text-gray-600 mb-6">
            Esta é a página principal da plataforma Técnico em Qualidade.
            Acesse o login para continuar.
          </p>
          <div className="text-sm text-gray-500">
            <p>Status: Em desenvolvimento</p>
            <p>Acesse: <a href="/login" className="text-blue-500 hover:underline">/login</a></p>
          </div>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;