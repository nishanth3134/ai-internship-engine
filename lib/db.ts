// Re-export Supabase clients from the proper SSR setup
export { createClient } from '@/lib/supabase/client';
export { createClient as createServerClient, createServiceClient } from '@/lib/supabase/server';

// Legacy exports for backwards compatibility
// These are deprecated - use the createClient/createServiceClient functions instead
import { createBrowserClient } from '@supabase/ssr';

// Create a lazy-initialized browser client for client components
let _supabase: ReturnType<typeof createBrowserClient> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof createBrowserClient>, {
  get(_, prop) {
    if (!_supabase) {
      _supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
    }
    return (_supabase as any)[prop];
  },
});

// For server-side operations, use createServiceClient() instead
// This export is kept for backwards compatibility but should not be used
export const supabaseServer = supabase;

export async function connectDB() {
  // Supabase is already initialized above
  return { connected: true };
}
