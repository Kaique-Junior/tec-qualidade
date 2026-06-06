# Contexto de Autenticação

Este contexto gerencia toda a lógica de autenticação da plataforma KQUIZZ.

## Arquitetura

- **Login.tsx**: Página principal de autenticação com login via Google OAuth e login como convidado
- **GoogleButton.tsx**: Componente isolado com botões de autenticação
- **useAuth.ts**: Hook para gerenciar estado de autenticação (session, loading, signOut)

## Dependências

- Supabase client: `src/integrations/supabase/client.ts`
- Notificações: `sonner` para feedback ao usuário
- React Router: para navegação

## Tabelas Utilizadas

- `public.profiles`: Armazena dados estendidos dos usuários (nome, avatar, role)