import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret')

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { reportId } = await req.json()

  if (!reportId) {
    return NextResponse.json({ error: 'reportId manquant' }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { error } = await supabase
    .from('reports')
    .update({
      status: 'paid',
      paid_at: new Date().toISOString(),
      stripe_payment_intent: 'admin_bypass',
    })
    .eq('id', reportId)

  if (error) {
    return NextResponse.json({ error: 'Erreur BDD' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
