'use client'

import type { Report } from '@/types/database'

interface Props {
  report: Report
}

export default function TeaserBlur({ report }: Props) {
  return (
    <div className="space-y-5">

      {/* Hero card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">

        {/* Gradient fond */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-500/10 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-glow" />
              <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Résultat calculé</span>
            </div>
            <span className="text-xs text-slate-600 border border-white/8 rounded-full px-3 py-1">
              {report.form_data?.job_title || 'Votre profil'}
            </span>
          </div>

          {/* Chiffres floutés — imposants */}
          <div className="text-center py-6">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">Salaire brut annuel estimé</p>

            <div className="flex items-end justify-center gap-8 mb-2">
              <div className="text-center">
                <p className="text-slate-600 text-xs uppercase tracking-widest mb-2">Min</p>
                <p className="text-3xl font-black text-white blur-md select-none">38k€</p>
              </div>
              <div className="text-center relative">
                <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">Médiane</p>
                <p className="text-[3.5rem] font-black leading-none text-white blur-md select-none">52k€</p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/40 rounded-xl px-4 py-2 mt-6">
                    <p className="text-emerald-300 text-xs font-black tracking-widest">🔒 VERROUILLÉ</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-slate-600 text-xs uppercase tracking-widest mb-2">Max</p>
                <p className="text-3xl font-black text-white blur-md select-none">67k€</p>
              </div>
            </div>
          </div>

          {/* Aperçu flou des critères */}
          <div className="border-t border-white/5 pt-5 mb-6">
            <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3">Impact de vos critères</p>
            <div className="space-y-2 blur-sm select-none pointer-events-none">
              {['+12%', '+8%', '+5%'].map((pct, i) => (
                <div key={i} className="flex items-center justify-between bg-white/[0.02] rounded-xl px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-white/10" />
                    <span className="text-slate-400 text-sm">Critère {i + 1}</span>
                  </div>
                  <span className="text-emerald-400 font-black text-sm">{pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA principal */}
          <button
            onClick={() => window.location.href = `/api/checkout?reportId=${report.id}`}
            className="w-full relative group"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 blur opacity-60 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-lg px-8 py-5 rounded-2xl flex items-center justify-center gap-3 group-hover:scale-[1.01] transition-transform">
              Débloquer mon rapport complet
              <span className="bg-white/20 rounded-xl px-3 py-1 text-base">3,99€</span>
            </div>
          </button>

          <p className="text-slate-600 text-xs text-center mt-3">
            Paiement sécurisé Stripe · PDF inclus · Accès immédiat
          </p>
        </div>
      </div>

      {/* Ce que contient le rapport */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: '📊', title: 'Min / Médiane / Max', desc: 'Fourchette exacte' },
          { icon: '🎯', title: 'Impact chiffré', desc: 'Chaque critère en %' },
          { icon: '💡', title: 'Négo personnalisée', desc: 'Conseils concrets' },
          { icon: '📈', title: 'Projection 5 ans', desc: 'Évolution de carrière' },
        ].map((item) => (
          <div key={item.title}
            className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 hover:border-emerald-500/20 transition-colors">
            <span className="text-xl">{item.icon}</span>
            <div>
              <p className="text-white text-sm font-bold">{item.title}</p>
              <p className="text-slate-500 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
