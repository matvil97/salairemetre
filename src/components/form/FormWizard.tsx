'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StepProfil from './StepProfil'
import StepPoste from './StepPoste'
import StepApetences from './StepApetences'
import type { SalaryFormData } from '@/types/database'

const STEPS = [
  { label: 'Profil', icon: '🎓' },
  { label: 'Poste', icon: '💼' },
  { label: 'Atouts', icon: '⚡' },
]

const defaultForm: SalaryFormData = {
  education_level: 'bac5',
  study_domain: 'ingenierie_informatique',
  years_experience: 0,
  sector: 'tech',
  job_title: '',
  company_size: 'pme',
  region: 'idf',
  is_manager: false,
  team_size: null,
  has_mobility: false,
  accepts_remote: false,
  speaks_english: false,
  has_other_language: false,
}

export default function FormWizard() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<SalaryFormData>(defaultForm)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function update(fields: Partial<SalaryFormData>) {
    setForm((prev) => ({ ...prev, ...fields }))
  }

  async function submit() {
    setLoading(true)
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.id) router.push(`/resultat/${data.id}`)
    } finally {
      setLoading(false)
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-3">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300
                ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white ring-4 ring-emerald-500/20' : 'bg-white/5 text-slate-600'}`}>
                {i < step ? '✓' : s.icon}
              </div>
              <span className={`text-sm font-bold hidden sm:block transition-colors ${i === step ? 'text-white' : i < step ? 'text-emerald-400' : 'text-slate-600'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        {/* Barre de progression */}
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="relative p-8">
          {step === 0 && <StepProfil form={form} update={update} />}
          {step === 1 && <StepPoste form={form} update={update} />}
          {step === 2 && <StepApetences form={form} update={update} />}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-slate-500 hover:text-white text-sm font-medium transition-colors">
                ← Retour
              </button>
            ) : <div />}

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !form.job_title}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-30 disabled:cursor-not-allowed text-white font-black px-8 py-3 rounded-2xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                Continuer →
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-60 text-white font-black px-8 py-3 rounded-2xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Calcul...
                  </>
                ) : 'Voir mon estimation →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
