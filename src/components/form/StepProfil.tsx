'use client'

import type { SalaryFormData, EducationLevel, StudyDomain } from '@/types/database'

interface Props {
  form: SalaryFormData
  update: (fields: Partial<SalaryFormData>) => void
}

const EDUCATION_OPTIONS: { value: EducationLevel; label: string }[] = [
  { value: 'bac', label: 'Bac' },
  { value: 'bac2', label: 'Bac+2 (BTS, DUT)' },
  { value: 'bac3', label: 'Bac+3 (Licence, Bachelor)' },
  { value: 'bac5', label: 'Bac+5 (Master, École ingé / commerce)' },
  { value: 'doctorat', label: 'Doctorat / Bac+8' },
]

const DOMAIN_OPTIONS: { value: StudyDomain; label: string }[] = [
  { value: 'ingenierie_informatique', label: 'Ingénierie / Informatique' },
  { value: 'ingenierie_autre', label: 'Ingénierie autre' },
  { value: 'commerce_gestion', label: 'Commerce / Gestion' },
  { value: 'finance_compta', label: 'Finance / Comptabilité' },
  { value: 'droit', label: 'Droit' },
  { value: 'sante_pharma', label: 'Santé / Pharmacie' },
  { value: 'rh', label: 'Ressources Humaines' },
  { value: 'marketing_communication', label: 'Marketing / Communication' },
  { value: 'sciences_humaines', label: 'Sciences Humaines' },
  { value: 'autre', label: 'Autre' },
]

export default function StepProfil({ form, update }: Props) {
  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-bold text-white mb-0.5">Votre profil</h2>
        <p className="text-slate-500 text-sm">Formation et expérience professionnelle</p>
      </div>

      <Field label="Niveau d'études">
        <div className="grid grid-cols-1 gap-2">
          {EDUCATION_OPTIONS.map((opt) => (
            <label key={opt.value} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-150
              ${form.education_level === opt.value
                ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                : 'border-white/8 bg-white/[0.02] text-slate-400 hover:border-white/15 hover:text-slate-300'}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                ${form.education_level === opt.value ? 'border-emerald-500' : 'border-slate-600'}`}>
                {form.education_level === opt.value && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
              </div>
              <input type="radio" name="education_level" value={opt.value} checked={form.education_level === opt.value}
                onChange={() => update({ education_level: opt.value })} className="hidden" />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="Domaine d'études">
        <select
          value={form.study_domain}
          onChange={(e) => update({ study_domain: e.target.value as StudyDomain })}
          className="w-full bg-white/[0.03] border border-white/8 text-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer"
        >
          {DOMAIN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
          ))}
        </select>
      </Field>

      <Field label={`Années d'expérience — ${form.years_experience} an${form.years_experience > 1 ? 's' : ''}`}>
        <div className="pt-2">
          <input
            type="range" min={0} max={30} value={form.years_experience}
            onChange={(e) => update({ years_experience: Number(e.target.value) })}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-600 mt-2">
            <span>Débutant</span>
            <span>15 ans</span>
            <span>30 ans+</span>
          </div>
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
