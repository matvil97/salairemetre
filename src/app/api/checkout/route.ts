import { NextRequest, NextResponse } from 'next/server'
import { stripe, REPORT_PRICE_CENTS } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase'
import type { Report } from '@/types/database'

export async function GET(req: NextRequest) {
  const reportId = req.nextUrl.searchParams.get('reportId')

  if (!reportId) {
    return NextResponse.json({ error: 'reportId manquant' }, { status: 400 })
  }

  // Vérifier que le rapport existe
  const supabase = createServiceClient()
  const { data: report } = await supabase
    .from('reports')
    .select('*')
    .eq('id', reportId)
    .single() as { data: Report | null }

  if (!report) {
    return NextResponse.json({ error: 'Rapport introuvable' }, { status: 404 })
  }

  if (report.status === 'paid') {
    return NextResponse.redirect(
      new URL(`/resultat/${reportId}`, req.url)
    )
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: REPORT_PRICE_CENTS,
          product_data: {
            name: 'Rapport salarial SalaireMètre',
            description: 'Fourchette détaillée, impact des critères, conseils de négociation, projection 5 ans',
          },
        },
      },
    ],
    customer_email: report.email ?? undefined,
    metadata: { reportId },
    success_url: `${appUrl}/resultat/${reportId}?success=1`,
    cancel_url: `${appUrl}/resultat/${reportId}?cancelled=1`,
  })

  // Sauvegarder la session Stripe sur le rapport
  await supabase
    .from('reports')
    .update({ stripe_session_id: session.id })
    .eq('id', reportId)

  return NextResponse.redirect(session.url!)
}
