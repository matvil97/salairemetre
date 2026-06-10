export type EducationLevel = 'bac' | 'bac2' | 'bac3' | 'bac5' | 'doctorat'
export type StudyDomain =
  | 'ingenierie_informatique'
  | 'ingenierie_autre'
  | 'commerce_gestion'
  | 'finance_compta'
  | 'droit'
  | 'sante_pharma'
  | 'rh'
  | 'marketing_communication'
  | 'sciences_humaines'
  | 'autre'
export type CompanySize = 'tpe' | 'pme' | 'eti' | 'grand_groupe'
export type RegionCategory = 'idf' | 'province'
export type ReportStatus = 'pending' | 'paid' | 'failed'

export interface SalaryReference {
  id: string
  job_title: string
  sector: string
  education_level: EducationLevel
  study_domain: StudyDomain
  experience_min: number
  experience_max: number
  company_size: CompanySize
  region: RegionCategory
  salary_min: number
  salary_median: number
  salary_max: number
  impact_management: number
  impact_mobility: number
  impact_remote: number
  impact_language: number
  source: string
  reference_year: number
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  form_data: SalaryFormData
  salary_min: number | null
  salary_median: number | null
  salary_max: number | null
  teaser_range: string | null
  report_content: ReportContent | null
  pdf_url: string | null
  status: ReportStatus
  stripe_session_id: string | null
  stripe_payment_intent: string | null
  email: string | null
  created_at: string
  paid_at: string | null
}

export interface SalaryFormData {
  // Profil
  education_level: EducationLevel
  study_domain: StudyDomain
  years_experience: number
  // Poste
  sector: string
  job_title: string
  company_size: CompanySize
  region: RegionCategory
  // Soft skills / appétences
  is_manager: boolean
  team_size: number | null
  has_mobility: boolean
  accepts_remote: boolean
  speaks_english: boolean
  has_other_language: boolean
  // Contact
  email?: string
}

export interface ReportContent {
  salary_min: number
  salary_median: number
  salary_max: number
  sector_average: number
  criteria_impact: CriterionImpact[]
  negotiation_tips: string[]
  evolution_2y: number
  evolution_5y: number
}

export interface CriterionImpact {
  label: string
  impact_percent: number
  description: string
}

// Supabase Database type (used by createClient<Database>)
export interface Database {
  public: {
    Tables: {
      salary_reference: {
        Row: SalaryReference
        Insert: Omit<SalaryReference, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<SalaryReference, 'id' | 'created_at'>>
      }
      reports: {
        Row: Report
        Insert: Omit<Report, 'id' | 'created_at'>
        Update: Partial<Omit<Report, 'id' | 'created_at'>>
      }
    }
  }
}
