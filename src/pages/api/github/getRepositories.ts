import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GITHUB_REPOS_URL } from '@/constants/githubConstants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);

  const supabase = createServerSupabaseClient({
    req,
    res,
  });

  // Todo: better error handling
  const { data, error } = await supabase.from('connection').select('*').eq('id', body.connectionId);

  if (data && data.length > 0) {
    const connection = data[0];

    const repoRawResponse = await fetch(GITHUB_REPOS_URL, {
      headers: {
        Authorization: `token ${connection.access_token}`,
      },
    });

    const repoResponse = await repoRawResponse.json();

    return res.status(200).json(repoResponse);
  }

  res.status(500).json({ error: 'Unknown error' });
}
