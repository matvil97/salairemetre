'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface ReportRow {
  id: string
  status: string
  teaser_range: string | null
  created_at: string
  paid_at: string | null
  email: string | null
  form_data: {
    job_title: string
    sector: string
    years_experience: number
    region: string
  }
}

export default function AdminPage() {
  const [secret, setSecret] = useState('')
  const [authed, setAuthed] = useState(false)
  const [reports, setReports] = useState<ReportRow[]>([])
  const [loading, setLoading] = useState(false)
  const [bypassing, setBypassing] = useState<string | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  const fetchReports = useCallback(async (s: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/reports', {
        headers: { 'x-admin-secret': s },
      })
      if (res.status === 401) { setError('Mot de passe incorrect'); return }
      const data = await res.json()
      setReports(data)
      setAuthed(true)
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }, [])

  async function markPaid(reportId: string) {
    setBypassing(reportId)
    try {
      const res = await fetch('/api/admin/mark-paid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret,
        },
        body: JSON.stringify({ reportId }),
      })
      if (res.ok) {
        setReports((prev) =>
          prev.map((r) => r.id === reportId ? { ...r, status: 'paid', paid_at: new Date().toISOString() } : r)
        )
      }
    } finally {
      setBypassing(null)
    }
  }

  function viewReport(id: string) {
    router.push(`/resultat/${id}`)
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#080b14] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-black text-white mb-2 text-center">Admin</h1>
          <p className="text-slate-500 text-sm text-center mb-8">SalaireMètre</p>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Mot de passe admin
            </label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchReports(secret)}
              placeholder="••••••••"
              className="w-full bg-white/[0.03] border border-white/8 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors mb-4"
            />
            {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
            <button
              onClick={() => fetchReports(secret)}
              disabled={loading || !secret}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 text-white font-semibold py-3 rounded-xl text-sm transition-all"
            >
              {loading ? 'Connexion...' : 'Accéder →'}
            </button>
          </div>
        </div>
      </main>
    )
  }

  const paid = reports.filter((r) => r.status === 'paid').length
  const pending = reports.filter((r) => r.status === 'pending').length

  return (
    <main className="min-h-screen bg-[#080b14] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black">Admin — SalaireMètre</h1>
            <p className="text-slate-500 text-sm mt-0.5">{reports.length} rapports au total</p>
          </div>
          <button
            onClick={() => fetchReports(secret)}
            className="text-slate-400 hover:text-white text-sm border border-white/8 rounded-xl px-4 py-2 hover:border-white/20 transition-all"
          >
            Rafraîchir
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total', value: reports.length, color: 'text-white' },
            { label: 'Payés', value: paid, color: 'text-emerald-400' },
            { label: 'En attente', value: pending, color: 'text-slate-400' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">{s.label}</p>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/5 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            <span>Profil</span>
            <span>Fourchette</span>
            <span>Date</span>
            <span>Statut</span>
            <span>Actions</span>
          </div>

          {reports.length === 0 && (
            <p className="text-slate-600 text-sm text-center py-12">Aucun rapport pour l&apos;instant</p>
          )}

          {reports.map((report) => (
            <div key={report.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
              {/* Profil */}
              <div>
                <p className="text-sm text-white font-medium">
                  {report.form_data?.job_title || '—'}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {report.form_data?.sector} · {report.form_data?.years_experience} ans · {report.form_data?.region?.toUpperCase()}
                  {report.email && ` · ${report.email}`}
                </p>
              </div>

              {/* Fourchette */}
              <span className="text-xs text-slate-400 whitespace-nowrap">
                {report.teaser_range ?? '—'}
              </span>

              {/* Date */}
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {new Date(report.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>

              {/* Statut */}
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap
                ${report.status === 'paid'
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-slate-700/50 text-slate-400'}`}>
                {report.status === 'paid' ? '✓ Payé' : '⏳ Attente'}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2 whitespace-nowrap">
                <button
                  onClick={() => viewReport(report.id)}
                  className="text-xs text-slate-400 hover:text-white border border-white/8 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all"
                >
                  Voir
                </button>
                {report.status !== 'paid' && (
                  <button
                    onClick={() => markPaid(report.id)}
                    disabled={bypassing === report.id}
                    className="text-xs text-white bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                  >
                    {bypassing === report.id ? '...' : 'Bypasser'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
