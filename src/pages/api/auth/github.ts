import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { createClient } from '@/util/supabase-browser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient();
  const body = JSON.parse(req.body);

  const params = {
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: body.code,
  };
  console.log(params);

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', params, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.data.error) {
      res.status(200).json(response.data);
    } else {
      console.log('error', response.data.error);
    }
  } catch (err) {
    console.log('error');
  }

  res.status(500).json({ error: 'Some error' });
}
