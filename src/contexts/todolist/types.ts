export interface Todo {
  id: string;
  user_id: string;
  title: string;
  is_completed: boolean;
  created_at: string;
}

export interface TodoFormData {
  title: string;
}

export interface TodoFilters {
  status: 'all' | 'active' | 'completed';
}