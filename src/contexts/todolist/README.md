# Contexto de ToDo List

Este contexto gerencia toda a lógica relacionada à lista de tarefas da plataforma Técnico em Qualidade.

## Arquitetura

- **components/TodoModal.tsx**: Modal flutuante para gerenciamento de tarefas
- **components/TodoFloatingButton.tsx**: Botão flutuante para abrir o modal
- **components/TodoCard.tsx**: Componente para exibição individual de uma tarefa
- **hooks/useTodoList.ts**: Hook para gerenciar o estado das tarefas
- **types.ts**: Tipos para tarefas e filtros

## Dependências

- Supabase client: `src/integrations/supabase/client.ts`
- TanStack Query: para gerenciamento de estados de API
- React Hook Form + Zod: para validação de formulários
- Sonner: para feedback ao usuário

## Tabelas Utilizadas

- `public.todolist`: Armazena as tarefas dos usuários