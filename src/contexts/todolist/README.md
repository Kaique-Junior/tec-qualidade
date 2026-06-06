# Contexto de ToDo List

Este contexto gerencia toda a lógica relacionada à lista de tarefas da plataforma Técnico em Qualidade.

## Arquitetura

- **components/TodoCard.tsx**: Componente para exibição individual de uma tarefa
- **hooks/useTodoList.ts**: Hook para gerenciar o estado das tarefas
- **types.ts**: Tipos para tarefas e filtros
- **pages/TodoPage.tsx**: Página principal da lista de tarefas

## Dependências

- Supabase client: `src/integrations/supabase/client.ts`
- TanStack Query: para gerenciamento de estados de API
- React Hook Form + Zod: para validação de formulários
- Sonner: para feedback ao usuário

## Tabelas Utilizadas

- `public.todolist`: Armazena as tarefas dos usuários