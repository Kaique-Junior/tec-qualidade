# Contexto de Todo List

Este contexto gerencia toda a lógica relacionada à lista de tarefas da plataforma KQUIZZ.

## Arquitetura

- **useTodoList.ts**: Hook principal para gerenciar operações de tarefas (CRUD)
- **TodoForm.tsx**: Formulário moderno para adicionar novas tarefas
- **TodoItem.tsx**: Componente individual de tarefa com checkbox e botão de deletar

## Dependências

- Supabase client: `src/integrations/supabase/client.ts`
- TanStack Query: para gerenciamento de estados de API
- React Router: para navegação
- Sonner: para notificações

## Tabelas Utilizadas

- `public.todolist`: Armazena tarefas dos usuários (id, user_id, title, is_completed, created_at)