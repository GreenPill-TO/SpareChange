import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabase) {

    // Log the environment variables to ensure they are set correctly
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase API Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
    );
  }
  console.log('Supabase client initialized:', supabase);
  console.log('LocalStorage:', localStorage);
  return supabase;
};
