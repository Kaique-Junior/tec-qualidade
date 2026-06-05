# Contexto de Quizzes

Este contexto gerencia toda a lógica relacionada a quizzes da plataforma Técnico em Qualidade.

## Arquitetura

- **components/QuizCard.tsx**: Componente para exibição de quizzes
- **hooks/useQuizzesByDisciplina.ts**: Hook para buscar quizzes por disciplina
- **types.ts**: Tipos para quizzes

## Dependências

- Supabase client: `src/integrations/supabase/client.ts`
- TanStack Query: para gerenciamento de estados de API
- React Router: para navegação

## Tabelas Utilizadas

- `public.quizzes`: Armazena quizzes por disciplina