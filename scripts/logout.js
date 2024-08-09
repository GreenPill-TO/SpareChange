// scripts/logout.js
const { createClient } = require('@supabase/supabase-js');

// Replace with your actual Supabase URL and Anon Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during logout:', error.message);
  } else {
    // Clear local storage/session storage
    console.log('Successfully logged out');
    // Assuming you might store session info in localStorage
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('supabase.auth.token');
  }
}

logout();