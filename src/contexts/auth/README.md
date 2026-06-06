# Contexto de Autenticação

Este contexto gerencia toda a lógica de autenticação da plataforma Técnico em Qualidade.

## Arquitetura

- **GoogleButton.tsx**: Componente isolado para login com Google OAuth
- **Login.tsx**: Página principal de autenticação
- **useAuth.ts**: Hook para gerenciar estado de autenticação

## Dependências

- Supabase client: `src/integrations/supabase/client.ts`
- Notificações: `sonner` para feedback ao usuário

## Tabelas Utilizadas

- `public.profiles`: Armazena dados estendidos dos usuários (nome, avatar, role)