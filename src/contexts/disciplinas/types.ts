export interface Disciplina {
  id: number;
  nome: string;
  slug: string;
  icone: string;
  created_at: string;
}

export interface Quiz {
  id: number;
  disciplina_id: number;
  titulo: string;
  url_link: string;
  descricao?: string;
  created_at: string;
}

export interface DisciplinaWithQuizzes extends Disciplina {
  quizzes: Quiz[];
}