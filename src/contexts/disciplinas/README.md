# Contexto de Disciplinas

Este contexto gerencia toda a lógica relacionada a disciplinas da plataforma KQUIZZ.

## Arquitetura

- **DisciplinaCard.tsx**: Componente de card moderno para exibição de disciplinas
- **useDisciplinas.ts**: Hook para buscar todas as disciplinas do Supabase
- **useDisciplinaBySlug.ts**: Hook para buscar disciplina específica pelo slug

## Dependências

- Supabase client: `src/integrations/supabase/client.ts`
- TanStack Query: para gerenciamento de estados de API
- React Router: para navegação

## Tabelas Utilizadas

- `public.disciplinas`: Armazena dados das disciplinas (id, nome, slug, icone, created_at)