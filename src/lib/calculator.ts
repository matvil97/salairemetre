import { createServiceClient } from './supabase'
import type { SalaryFormData, SalaryReference, ReportContent, CriterionImpact } from '@/types/database'

export async function calculateSalary(form: SalaryFormData): Promise<ReportContent> {
  const supabase = createServiceClient()

  // Trouver la tranche d'expérience correspondante
  const { data: refs } = await supabase
    .from('salary_reference')
    .select('*')
    .eq('sector', form.sector)
    .eq('region', form.region)
    .eq('company_size', form.company_size)
    .lte('experience_min', form.years_experience)
    .gte('experience_max', form.years_experience) as { data: SalaryReference[] | null }

  let ref: SalaryReference | null = null

  if (refs && refs.length > 0) {
    // Priorité : même intitulé de poste exact
    const exact = refs.find(
      (r) => r.job_title.toLowerCase() === form.job_title.toLowerCase()
    )
    ref = exact ?? refs[0]
  }

  // Fallback : même secteur sans contrainte de taille ou région
  if (!ref) {
    const { data: fallback } = await supabase
      .from('salary_reference')
      .select('*')
      .eq('sector', form.sector)
      .lte('experience_min', form.years_experience)
      .gte('experience_max', form.years_experience)
      .limit(1)
      .single() as { data: SalaryReference | null }
    ref = fallback
  }

  // Fallback final : moyenne nationale par niveau d'études
  if (!ref) {
    const defaults: Record<string, [number, number, number]> = {
      bac: [20000, 24000, 29000],
      bac2: [22000, 27000, 33000],
      bac3: [25000, 31000, 38000],
      bac5: [32000, 42000, 55000],
      doctorat: [38000, 50000, 70000],
    }
    const [min, median, max] = defaults[form.education_level] ?? [25000, 33000, 42000]
    return buildReport(min, median, max, min, form, null)
  }

  // Appliquer les facteurs d'impact
  let multiplier = 1

  const impacts: CriterionImpact[] = []

  if (form.is_manager && ref.impact_management > 0) {
    const pct = ref.impact_management + Math.min((form.team_size ?? 1) * 0.5, 10)
    multiplier += pct / 100
    impacts.push({ label: 'Management', impact_percent: Math.round(pct), description: `Vous encadrez ${form.team_size} personne${(form.team_size ?? 1) > 1 ? 's' : ''}` })
  }

  if (form.has_mobility && ref.impact_mobility > 0) {
    multiplier += ref.impact_mobility / 100
    impacts.push({ label: 'Mobilité', impact_percent: ref.impact_mobility, description: 'Déplacements fréquents valorisés dans ce secteur' })
  }

  if (form.accepts_remote && ref.impact_remote !== 0) {
    multiplier += ref.impact_remote / 100
    const sign = ref.impact_remote > 0 ? '+' : ''
    impacts.push({ label: 'Télétravail', impact_percent: ref.impact_remote, description: `Impact ${sign}${ref.impact_remote}% dans ce secteur` })
  }

  if (form.speaks_english && ref.impact_language > 0) {
    multiplier += ref.impact_language / 100
    impacts.push({ label: 'Anglais', impact_percent: ref.impact_language, description: 'Anglais professionnel valorisé' })
  }

  if (form.has_other_language) {
    multiplier += 0.03
    impacts.push({ label: 'Autre langue', impact_percent: 3, description: 'Langue étrangère supplémentaire' })
  }

  const base_median = ref.salary_median
  const adjusted_median = Math.round(base_median * multiplier)
  const ratio = adjusted_median / base_median
  const adjusted_min = Math.round(ref.salary_min * ratio)
  const adjusted_max = Math.round(ref.salary_max * ratio)

  return buildReport(adjusted_min, adjusted_median, adjusted_max, base_median, form, impacts)
}

function buildReport(
  min: number,
  median: number,
  max: number,
  sector_average: number,
  form: SalaryFormData,
  impacts: CriterionImpact[] | null
): ReportContent {
  const tips = generateTips(form, median, sector_average)

  return {
    salary_min: min,
    salary_median: median,
    salary_max: max,
    sector_average,
    criteria_impact: impacts ?? [],
    negotiation_tips: tips,
    evolution_2y: Math.round(median * 1.12),
    evolution_5y: Math.round(median * 1.28),
  }
}

function generateTips(form: SalaryFormData, median: number, average: number): string[] {
  const tips: string[] = []

  if (median > average * 1.05) {
    tips.push('Votre profil est au-dessus de la moyenne du secteur — assumez vos prétentions.')
  } else if (median < average * 0.95) {
    tips.push("Négociez sur d'autres avantages : télétravail, formation, variable...")
  }

  if (!form.speaks_english) {
    tips.push("Maîtriser l'anglais professionnel peut augmenter votre salaire de 5 à 15%.")
  }

  if (!form.is_manager && form.years_experience >= 5) {
    tips.push('Avec votre expérience, une responsabilité managériale vous donnerait accès à une tranche supérieure.')
  }

  if (form.region === 'province' && form.sector === 'tech') {
    tips.push('La tech en province offre un excellent rapport salaire / coût de la vie par rapport à Paris.')
  }

  if (form.company_size === 'tpe' || form.company_size === 'pme') {
    tips.push("Les grands groupes offrent en moyenne 10-20% de plus, compensés par moins d'autonomie.")
  }

  return tips.slice(0, 3)
}
