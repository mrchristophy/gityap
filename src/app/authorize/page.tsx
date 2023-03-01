import 'server-only';
import { createClient } from '@/util/supabase-server';
import { redirect } from 'next/navigation';
import { GITHUB_ACCESS_TOKEN_URL, GITHUB_USER_URL } from '@/constants/githubConstants';

const Authorize = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
  const supabase = createClient();

  const tokenRawResponse = await fetch(GITHUB_ACCESS_TOKEN_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: searchParams?.code,
    }),
  });

  const tokenResponse = await tokenRawResponse.json();

  // Check that user isn't already connected

  const useRawResponse = await fetch(GITHUB_USER_URL, {
    headers: {
      Authorization: `token ${tokenResponse.access_token}`,
    },
  });

  const userResponse = await useRawResponse.json();

  if (tokenResponse.access_token) {
    const insertResponse = await supabase.from('connection').insert({
      provider: 'github',
      access_token: tokenResponse.access_token,
      account_id: userResponse.id,
      account_name: userResponse.login,
    });

    // Todo: deal with error
    console.log(insertResponse);
  }

  redirect('/dashboard/connections');

  return <div>Authorizing...</div>;
};

export default Authorize;
