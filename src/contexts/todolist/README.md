# Contexto de Todo List

Este contexto gerencia toda a lógica relacionada à lista de tarefas da plataforma KQUIZZ.

## Arquitetura

- **hooks/useTodoList.ts**: Hook principal para gerenciar operações de tarefas
- **types.ts**: Tipos para tarefas
- **components/TodoItem.tsx**: Componente individual de tarefa
- **components/TodoForm.tsx**: Formulário para adicionar novas tarefas

## Dependências

- Supabase client: `src/integrations/supabase/client.ts`
- TanStack Query: para gerenciamento de estados de API
- React Router: para navegação
- Sonner: para notificações

## Tabelas Utilizadas

- `public.todolist`: Armazena tarefas dos usuários