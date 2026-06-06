# Contexto de Quizzes

Este contexto gerencia toda a lógica relacionada a quizzes da plataforma KQUIZZ.

## Arquitetura

- **QuizCard.tsx**: Componente de card para exibição de quizzes
- **useQuizzesByDisciplina.ts**: Hook para buscar quizzes por disciplina específica

## Dependências

- Supabase client: `src/integrations/supabase/client.ts`
- TanStack Query: para gerenciamento de estados de API
- React Router: para navegação

## Tabelas Utilizadas

- `public.quizzes`: Armazena quizzes por disciplina (id, disciplina_id, titulo, url_link, descricao, created_at)