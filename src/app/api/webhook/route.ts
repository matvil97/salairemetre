import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase'
import type Stripe from 'stripe'

// Désactiver le body parser Next.js — Stripe a besoin du raw body pour valider la signature
export const config = { api: { bodyParser: false } }

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const reportId = session.metadata?.reportId

    if (!reportId) {
      return NextResponse.json({ error: 'reportId manquant dans metadata' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { error } = await supabase
      .from('reports')
      .update({
        status: 'paid',
        stripe_payment_intent: session.payment_intent as string,
        paid_at: new Date().toISOString(),
      })
      .eq('id', reportId)

    if (error) {
      console.error('Erreur mise à jour rapport:', error)
      return NextResponse.json({ error: 'Erreur BDD' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
