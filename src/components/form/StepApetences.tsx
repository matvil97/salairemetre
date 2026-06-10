'use client'

import type { SalaryFormData } from '@/types/database'

interface Props {
  form: SalaryFormData
  update: (fields: Partial<SalaryFormData>) => void
}

export default function StepApetences({ form, update }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white mb-0.5">Vos atouts</h2>
        <p className="text-slate-500 text-sm">Ces critères peuvent faire varier votre salaire de ±15%</p>
      </div>

      <Toggle
        label="Manager une équipe"
        description="Vous encadrez des collaborateurs"
        checked={form.is_manager}
        onChange={(v) => update({ is_manager: v, team_size: v ? (form.team_size ?? 3) : null })}
      />

      {form.is_manager && (
        <div className="ml-4 pl-4 border-l border-white/10">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            Taille de l&apos;équipe — {form.team_size} personne{(form.team_size ?? 0) > 1 ? 's' : ''}
          </label>
          <input
            type="range" min={1} max={50} value={form.team_size ?? 1}
            onChange={(e) => update({ team_size: Number(e.target.value) })}
            className="w-full accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>1</span><span>25</span><span>50+</span>
          </div>
        </div>
      )}

      <Toggle
        label="Déplacements fréquents"
        description="Vous êtes régulièrement en déplacement professionnel"
        checked={form.has_mobility}
        onChange={(v) => update({ has_mobility: v })}
      />

      <Toggle
        label="Télétravail accepté"
        description="Poste en télétravail partiel ou total"
        checked={form.accepts_remote}
        onChange={(v) => update({ accepts_remote: v })}
      />

      <Toggle
        label="Anglais professionnel"
        description="Vous travaillez couramment en anglais"
        checked={form.speaks_english}
        onChange={(v) => update({ speaks_english: v })}
      />

      <Toggle
        label="Autre langue étrangère"
        description="Espagnol, allemand, mandarin, arabe..."
        checked={form.has_other_language}
        onChange={(v) => update({ has_other_language: v })}
      />

      <div className="pt-2">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Email (optionnel)
        </label>
        <input
          type="email" value={form.email ?? ''}
          onChange={(e) => update({ email: e.target.value || undefined })}
          placeholder="recevoir votre rapport par email"
          className="w-full bg-white/[0.03] border border-white/8 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>
    </div>
  )
}

function Toggle({
  label, description, checked, onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-150
      ${checked ? 'border-emerald-500/40 bg-emerald-500/8' : 'border-white/8 bg-white/[0.02] hover:border-white/15'}`}>
      <div>
        <p className={`text-sm font-medium ${checked ? 'text-white' : 'text-slate-300'}`}>{label}</p>
        <p className="text-slate-500 text-xs mt-0.5">{description}</p>
      </div>
      <div className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 shrink-0 ml-4 ${checked ? 'bg-emerald-500' : 'bg-white/10'}`}
        style={{ height: '22px' }}>
        <div className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0.5'}`}
          style={{ width: '18px', height: '18px' }} />
      </div>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="hidden" />
    </label>
  )
}
