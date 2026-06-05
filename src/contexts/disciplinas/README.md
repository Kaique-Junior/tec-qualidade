# Contexto de Disciplinas

Este contexto gerencia toda a lógica relacionada a disciplinas e quizzes da plataforma Técnico em Qualidade.

## Arquitetura

- **components/DisciplinaCard.tsx**: Componente para exibição de disciplinas
- **hooks/useDisciplinas.ts**: Hook para buscar disciplinas do Supabase
- **types.ts**: Tipos para disciplinas e quizzes

## Dependências

- Supabase client: `src/integrations/supabase/client.ts`
- TanStack Query: para gerenciamento de estados de API
- React Router: para navegação

## Tabelas Utilizadas

- `public.disciplinas`: Armazena dados das disciplinas
- `public.quizzes`: Armazena quizzes por disciplina