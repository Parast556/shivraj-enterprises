import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

function getEnv() {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  return { url, anonKey }
}

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient

  const { url, anonKey } = getEnv()
  if (!url || !anonKey) return null

  supabaseClient = createClient(url, anonKey)
  return supabaseClient
}

