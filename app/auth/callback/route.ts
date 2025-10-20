import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Success - redirect to home
      return NextResponse.redirect(new URL('/home', request.url))
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(new URL('/error', request.url))
}