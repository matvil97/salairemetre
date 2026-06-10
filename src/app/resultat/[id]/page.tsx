import { createServiceClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import TeaserBlur from './TeaserBlur'
import type { Report } from '@/types/database'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ success?: string; cancelled?: string }>
}

export default async function ResultatPage({ params, searchParams }: Props) {
  const { id } = await params
  const { success, cancelled } = await searchParams
  const supabase = createServiceClient()

  const { data: report } = await supabase
    .from('reports')
    .select('*')
    .eq('id', id)
    .single() as { data: Report | null }

  if (!report) notFound()

  const isPaid = report.status === 'paid'

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← Accueil
        </Link>

        {success && isPaid && (
          <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-emerald-400 text-sm">
            Paiement confirmé — voici votre rapport complet.
          </div>
        )}

        {cancelled && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
            Paiement annulé. Vous pouvez réessayer ci-dessous.
          </div>
        )}

        <div className="mt-8 text-center mb-10">
          <p className="text-slate-400 text-sm mb-2">Estimation salariale pour votre profil</p>
          <h1 className="text-3xl font-bold">Votre fourchette de salaire</h1>
        </div>

        {isPaid ? (
          <FullReport report={report} />
        ) : (
          <TeaserBlur report={report} />
        )}
      </div>
    </main>
  )
}

function FullReport({ report }: { report: Report }) {
  const content = report.report_content
  if (!content) return null

  const impacts = content.criteria_impact
  const tips = content.negotiation_tips

  return (
    <div className="space-y-6">
      {/* Fourchette principale */}
      <div className="bg-slate-800 border border-emerald-500/30 rounded-2xl p-8 text-center">
        <p className="text-slate-400 text-sm mb-4">Salaire brut annuel estimé</p>
        <div className="flex items-end justify-center gap-6">
          <div className="text-center">
            <p className="text-slate-400 text-xs mb-1">Minimum</p>
            <p className="text-2xl font-bold text-slate-300">{fmt(report.salary_min!)}</p>
          </div>
          <div className="text-center">
            <p className="text-emerald-400 text-xs mb-1 font-medium">Médiane</p>
            <p className="text-4xl font-bold text-emerald-400">{fmt(report.salary_median!)}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-xs mb-1">Maximum</p>
            <p className="text-2xl font-bold text-slate-300">{fmt(report.salary_max!)}</p>
          </div>
        </div>
      </div>

      {/* Impact des critères */}
      {impacts?.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Impact de vos critères</h2>
          <div className="space-y-3">
            {impacts.map((impact) => (
              <div key={impact.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{impact.label}</p>
                  <p className="text-xs text-slate-400">{impact.description}</p>
                </div>
                <span className={`text-sm font-semibold ${impact.impact_percent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {impact.impact_percent > 0 ? '+' : ''}{impact.impact_percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Évolution */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-4">Projection de carrière</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-slate-700/50 rounded-xl">
            <p className="text-slate-400 text-xs mb-1">Dans 2 ans</p>
            <p className="text-xl font-bold text-white">{fmt(content.evolution_2y)}</p>
          </div>
          <div className="text-center p-4 bg-slate-700/50 rounded-xl">
            <p className="text-slate-400 text-xs mb-1">Dans 5 ans</p>
            <p className="text-xl font-bold text-white">{fmt(content.evolution_5y)}</p>
          </div>
        </div>
      </div>

      {/* Conseils */}
      {tips?.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Conseils de négociation</h2>
          <ul className="space-y-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="text-emerald-400 shrink-0">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Partage */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center">
        <p className="text-slate-400 text-sm mb-3">Partagez votre résultat</p>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0077B5] hover:bg-[#006396] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Partager sur LinkedIn
        </a>
      </div>
    </div>
  )
}

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}
