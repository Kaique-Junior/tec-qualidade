export interface Todo {
  id: string;
  user_id: string;
  title: string;
  is_completed: boolean;
  created_at: string;
  due_date?: string | null; // Nova coluna opcional para data de prazo
}