import Link from 'next/link'
import FormWizard from '@/components/form/FormWizard'

export default function FormulairePage() {
  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[120px]" />
      </div>
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="text-slate-500 hover:text-slate-300 text-sm transition-colors flex items-center gap-2">
            ← Retour
          </Link>
          <span className="text-xs font-bold text-slate-500 border border-white/8 rounded-full px-4 py-1.5 uppercase tracking-widest">
            Aperçu gratuit · 3,99€
          </span>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Votre estimation{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              sur-mesure
            </span>
          </h1>
          <p className="text-slate-500 text-sm">3 étapes · 2 minutes · résultat immédiat</p>
        </div>

        <FormWizard />
      </div>
    </main>
  )
}
