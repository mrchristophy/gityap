import './globals.css';
import 'server-only';

import SupabaseListener from '@/components/features/supabase/supabase-listener';
import SupabaseProvider from '@/components/features/supabase/supabase-provider';
import { createClient } from '@/util/supabase-server';

export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
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
