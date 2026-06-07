export interface Exam {
  id: string;
  user_id: string;
  title: string;
  exam_date: string;
  description?: string;
  created_at: string;
}

export interface ExamWithFormattedDate extends Exam {
  formattedDate: string;
  month: string;
  year: number;
}