import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // TODO: Phase 7 — backend-cms-crm-automation will implement this
  // Will handle: validation, email notification, CRM webhook, rate limiting
  const body = await request.json()
  console.log('Quote request received:', body)
  return NextResponse.json({ success: true, message: 'Quote request received.' })
}
