import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const location = req.geo.country?.toLowerCase() || 'us'
  const response = NextResponse.next()
  response.cookies.set('ln', location)

  return response
}

export const config = {
  matcher: '/pricing'
}
