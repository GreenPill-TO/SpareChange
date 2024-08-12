const { getSupabaseClient } = require('../utils/supabase/client'); // Adjust the path as necessary

const supabase = getSupabaseClient(); // Get the singleton Supabase client instance

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
