'use client'

import type { SalaryFormData, CompanySize, RegionCategory } from '@/types/database'

interface Props {
  form: SalaryFormData
  update: (fields: Partial<SalaryFormData>) => void
}

const SECTORS = [
  { value: 'tech', label: '💻 Tech / Informatique' },
  { value: 'finance', label: '🏦 Finance / Banque' },
  { value: 'sante', label: '🏥 Santé' },
  { value: 'industrie', label: '🏭 Industrie' },
  { value: 'commerce', label: '🛒 Commerce' },
  { value: 'marketing', label: '📣 Marketing / Com.' },
  { value: 'rh', label: '👥 RH' },
  { value: 'droit', label: '⚖️ Droit' },
  { value: 'conseil', label: '📋 Conseil' },
  { value: 'autre', label: '🔧 Autre' },
]

const COMPANY_SIZES: { value: CompanySize; label: string; desc: string }[] = [
  { value: 'tpe', label: 'TPE', desc: '< 10' },
  { value: 'pme', label: 'PME', desc: '10–249' },
  { value: 'eti', label: 'ETI', desc: '250–4 999' },
  { value: 'grand_groupe', label: 'Grand groupe', desc: '5 000+' },
]

const JOB_TITLES_BY_SECTOR: Record<string, string[]> = {
  tech: ['Développeur Full Stack', 'Développeur Front-end', 'Développeur Back-end', 'Data Scientist', 'DevOps / SRE', 'Chef de Projet IT', 'Product Manager', 'UX Designer', 'Architecte logiciel', 'CTO'],
  finance: ['Analyste Financier', 'Contrôleur de Gestion', 'Auditeur', 'Comptable', 'Trader', 'DAF'],
  sante: ['Médecin salarié (hôpital)', 'Infirmier(e)', 'Pharmacien(ne)', 'Kinésithérapeute'],
  industrie: ['Ingénieur Mécanique', 'Ingénieur Qualité', 'Responsable Production', 'Technicien de maintenance'],
  commerce: ['Commercial(e) B2B', 'Responsable Commercial', 'Acheteur', 'Category Manager'],
  marketing: ['Chef de Projet Marketing', 'Responsable Marketing Digital', 'Community Manager', 'Directeur Marketing'],
  rh: ['Chargé(e) RH', 'HRBP / RRH', 'Responsable recrutement', 'DRH'],
  droit: ['Juriste d\'entreprise', 'Avocat salarié', 'Responsable juridique'],
  conseil: ['Consultant junior', 'Consultant senior', 'Manager', 'Associé / Partner'],
  autre: [],
}

export default function StepPoste({ form, update }: Props) {
  const suggestions = JOB_TITLES_BY_SECTOR[form.sector] ?? []

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-bold text-white mb-0.5">Votre poste</h2>
        <p className="text-slate-500 text-sm">Contexte et environnement professionnel</p>
      </div>

      <Field label="Secteur d'activité">
        <div className="grid grid-cols-2 gap-2">
          {SECTORS.map((s) => (
            <label key={s.value} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-all text-sm
              ${form.sector === s.value
                ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                : 'border-white/8 bg-white/[0.02] text-slate-400 hover:border-white/15 hover:text-slate-300'}`}>
              <input type="radio" name="sector" value={s.value} checked={form.sector === s.value}
                onChange={() => update({ sector: s.value, job_title: '' })} className="hidden" />
              {s.label}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Intitulé de poste">
        <input
          type="text" value={form.job_title}
          onChange={(e) => update({ job_title: e.target.value })}
          placeholder="Ex : Développeur Full Stack"
          className="w-full bg-white/[0.03] border border-white/8 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => update({ job_title: s })}
                className={`text-xs px-3 py-1 rounded-full border transition-all
                  ${form.job_title === s
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                    : 'border-white/8 text-slate-500 hover:border-white/20 hover:text-slate-400'}`}>
                {s}
              </button>
            ))}
          </div>
        )}
      </Field>

      <Field label="Taille d'entreprise">
        <div className="grid grid-cols-4 gap-2">
          {COMPANY_SIZES.map((opt) => (
            <label key={opt.value} className={`flex flex-col items-center p-3 rounded-xl border cursor-pointer transition-all text-center
              ${form.company_size === opt.value
                ? 'border-emerald-500/50 bg-emerald-500/10'
                : 'border-white/8 bg-white/[0.02] hover:border-white/15'}`}>
              <input type="radio" name="company_size" value={opt.value} checked={form.company_size === opt.value}
                onChange={() => update({ company_size: opt.value })} className="hidden" />
              <span className={`text-sm font-semibold ${form.company_size === opt.value ? 'text-white' : 'text-slate-400'}`}>{opt.label}</span>
              <span className="text-xs text-slate-600 mt-0.5">{opt.desc}</span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="Région">
        <div className="grid grid-cols-2 gap-2">
          {([
            { value: 'idf', label: '🗼 Île-de-France', sub: 'Paris & région' },
            { value: 'province', label: '🌿 Province', sub: 'Reste de la France' },
          ] as { value: RegionCategory; label: string; sub: string }[]).map((opt) => (
            <label key={opt.value} className={`flex flex-col items-center p-4 rounded-xl border cursor-pointer transition-all
              ${form.region === opt.value
                ? 'border-emerald-500/50 bg-emerald-500/10'
                : 'border-white/8 bg-white/[0.02] hover:border-white/15'}`}>
              <input type="radio" name="region" value={opt.value} checked={form.region === opt.value}
                onChange={() => update({ region: opt.value })} className="hidden" />
              <span className={`font-semibold text-sm ${form.region === opt.value ? 'text-white' : 'text-slate-400'}`}>{opt.label}</span>
              <span className="text-xs text-slate-600 mt-0.5">{opt.sub}</span>
            </label>
          ))}
        </div>
      </Field>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">{label}</label>
      {children}
    </div>
  )
}
