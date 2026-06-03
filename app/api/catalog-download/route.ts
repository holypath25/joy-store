import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log('Catalog download request received:', body)
  const catalogUrl = process.env.CATALOG_PDF_URL
  if (!catalogUrl) {
    return NextResponse.json({ success: false, message: 'Catalog not available.' }, { status: 503 })
  }
  return NextResponse.json({ success: true, url: catalogUrl })
}
