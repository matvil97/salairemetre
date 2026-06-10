import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import type { Report } from '@/types/database'

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret')

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('reports')
    .select('id, status, teaser_range, created_at, paid_at, email, form_data')
    .order('created_at', { ascending: false })
    .limit(50) as { data: Partial<Report>[] | null; error: unknown }

  if (error) {
    return NextResponse.json({ error: 'Erreur BDD' }, { status: 500 })
  }

  return NextResponse.json(data ?? [])
}
