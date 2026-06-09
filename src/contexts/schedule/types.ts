export interface AcademicSchedule {
  id: string;
  date: string;
  day_of_week: string;
  subjects: string[];
  is_exam_day: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ScheduleWithFormattedDate extends AcademicSchedule {
  formattedDate: string;
  formattedDayOfWeek: string;
}

export interface SubjectMapping {
  [key: string]: string;
}

// Mapeamento de siglas para nomes completos conforme documento oficial do curso
export const SUBJECT_MAPPING: SubjectMapping = {
  'GPRO': 'Gestão de Produção',
  'EM': 'Economia e Mercado', 
  'FDQ': 'Ferramentas da Qualidade',
  'FOO': 'Ferramentas da Qualidade',
  'QA': 'Qualidade Ambiental',
  'GP': 'Gestão de Pessoas',
  'PT': 'Português Instrumental'
};