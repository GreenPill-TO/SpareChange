const { getSupabaseClient } = require('../utils/supabase/client'); // Adjust the path as necessary

const supabase = getSupabaseClient(); // Get the singleton Supabase client instance

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during logout:', error.message);
  } else {
    console.log('Successfully logged out');
    if (typeof window !== 'undefined') {
      // Clear local storage/session storage
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.removeItem('supabase.auth.token');
    }
  }
}


logout();
