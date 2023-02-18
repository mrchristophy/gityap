import './globals.scss';
import 'server-only';

import SupabaseListener from '@/components/features/supabase/supabase-listener';
import SupabaseProvider from '@/components/features/supabase/supabase-provider';
import { createClient } from '@/util/supabase-server';
import { Inter } from '@next/font/google';

export const revalidate = 0;

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
