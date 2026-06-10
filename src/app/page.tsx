import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06080f] text-white overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">

        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[-5%] left-[-5%] w-[700px] h-[700px] bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-violet-600/12 rounded-full blur-[140px]" />
          <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-amber-500/8 rounded-full blur-[100px]" />
        </div>

        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-5xl w-full mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-5 py-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
            Données France · DARES · INSEE · APEC 2023
          </div>

          {/* Headline massive */}
          <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-6">
            Combien devrait-on<br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                réellement
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-50" />
            </span>
            {' '}vous payer ?
          </h1>

          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Entrez votre profil. Obtenez une fourchette salariale précise en 2 minutes.
            Basé sur des données réelles, pas des moyennes génériques.
          </p>

          {/* CTA groupe */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/formulaire"
              className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-lg px-10 py-5 rounded-2xl hover:scale-105 transition-all duration-200 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              Estimer mon salaire
              <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <div className="text-slate-500 text-sm">
              Aperçu <span className="text-white font-semibold">gratuit</span> · Rapport complet <span className="text-emerald-400 font-semibold">3,99€</span>
            </div>
          </div>

          {/* Salary mockup card flottant */}
          <div className="float max-w-sm mx-auto">
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 shadow-2xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-violet-500/5" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Votre estimation</span>
                </div>
                <p className="text-slate-500 text-xs mb-3">Développeur Full Stack · 5 ans · IDF</p>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Médiane</p>
                    <p className="text-4xl font-black text-white blur-[6px] select-none">54 200€</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Max</p>
                    <p className="text-2xl font-bold text-slate-300 blur-[6px] select-none">68 000€</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl py-2.5 text-center text-white text-sm font-bold">
                  Débloquer — 3,99€
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-white/5 bg-white/[0.02] py-8">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: '37', label: 'secteurs couverts' },
            { n: '400+', label: 'intitulés de poste' },
            { n: '2 min', label: 'pour un résultat' },
            { n: '3,99€', label: 'rapport complet' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-black text-white mb-1">{s.n}</p>
              <p className="text-slate-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-black text-center mb-3">
          Un rapport,{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            pas une vague estimation
          </span>
        </h2>
        <p className="text-slate-400 text-center mb-14 max-w-xl mx-auto">
          Chaque critère de votre profil est analysé et chiffré. Vous savez exactement ce qui impacte votre salaire.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              color: 'from-emerald-500/20 to-emerald-500/5',
              border: 'border-emerald-500/20',
              accent: 'text-emerald-400',
              title: 'Fourchette précise',
              desc: 'Min / médiane / max calculés sur votre profil exact. Pas une moyenne nationale.',
              detail: '± impact par critère',
            },
            {
              num: '02',
              color: 'from-violet-500/20 to-violet-500/5',
              border: 'border-violet-500/20',
              accent: 'text-violet-400',
              title: 'Critères détaillés',
              desc: 'Management, mobilité, région, taille entreprise, langues — chaque point chiffré en %.',
              detail: '12 variables analysées',
            },
            {
              num: '03',
              color: 'from-amber-500/20 to-amber-500/5',
              border: 'border-amber-500/20',
              accent: 'text-amber-400',
              title: 'Prêt à négocier',
              desc: 'Conseils personnalisés et projection à 2 et 5 ans pour défendre vos prétentions.',
              detail: 'Projection 5 ans incluse',
            },
          ].map((f) => (
            <div key={f.num}
              className={`relative rounded-3xl border ${f.border} bg-gradient-to-br ${f.color} p-8 hover:scale-[1.02] transition-transform duration-300`}>
              <p className={`text-6xl font-black opacity-20 mb-4 ${f.accent}`}>{f.num}</p>
              <h3 className="text-xl font-black text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.desc}</p>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${f.border} ${f.accent}`}>
                {f.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative overflow-hidden mx-6 mb-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-16 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-[-50%] right-[-10%] w-[400px] h-[400px] bg-teal-900/30 rounded-full blur-[80px]" />
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl font-black text-white mb-4">
            Votre salaire en 2 minutes
          </h2>
          <p className="text-emerald-100 text-xl mb-8 max-w-lg mx-auto">
            Remplissez le formulaire. Obtenez votre fourchette instantanément.
          </p>
          <Link href="/formulaire"
            className="inline-flex items-center gap-3 bg-white text-emerald-700 font-black text-lg px-10 py-5 rounded-2xl hover:scale-105 transition-all duration-200 shadow-xl">
            Commencer gratuitement
            <span className="text-xl">→</span>
          </Link>
          <p className="text-emerald-200/70 text-sm mt-4">Rapport complet à 3,99€ après l&apos;aperçu</p>
        </div>
      </section>

    </main>
  )
}
