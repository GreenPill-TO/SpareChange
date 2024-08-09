// app/_app.tsx
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/context/ThemeContext'; // Ensure ThemeProvider is used
import { createClient } from '@/utils/supabase/client'; // Supabase client
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '@/styles/globals.css'; // Import global styles

const supabase = createClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        router.push('/main'); // Redirect logged-in users to /main
      }
    });

    return () => subscription?.unsubscribe();
  }, [router]);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
