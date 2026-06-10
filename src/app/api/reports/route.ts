import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { calculateSalary } from '@/lib/calculator'
import type { SalaryFormData } from '@/types/database'

export async function POST(req: NextRequest) {
  try {
    const form: SalaryFormData = await req.json()

    const reportContent = await calculateSalary(form)

    const teaser = `entre ${Math.round(reportContent.salary_min / 1000)}k€ et ${Math.round(reportContent.salary_max / 1000)}k€`

    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('reports')
      .insert({
        form_data: form,
        salary_min: reportContent.salary_min,
        salary_median: reportContent.salary_median,
        salary_max: reportContent.salary_max,
        teaser_range: teaser,
        report_content: reportContent,
        status: 'pending',
        email: form.email ?? null,
      })
      .select('id')
      .single() as { data: { id: string } | null; error: unknown }

    if (error) throw error

    return NextResponse.json({ id: (data as { id: string }).id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
