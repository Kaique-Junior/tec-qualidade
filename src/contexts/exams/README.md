# Contexto de Exames (Provas)

Este contexto gerencia toda a lógica relacionada ao calendário de provas da plataforma KQUIZZ.

## Arquitetura

- **hooks/useExams.ts**: Hook principal para gerenciar operações de provas
- **components/ExamForm.tsx**: Formulário para adicionar novas provas
- **components/ExamList.tsx**: Lista de provas organizadas por meses
- **types.ts**: Tipos para exames

## Dependências

- Supabase client: `src/integrations/supabase/client.ts`
- TanStack Query: para gerenciamento de estados de API
- React Router: para navegação
- Sonner: para notificações
- Date-fns: para manipulação de datas

## Tabelas Utilizadas

- `public.exams`: Armazena provas dos usuários