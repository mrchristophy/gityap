import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({
    req,
    res,
  });

  const { data, error } = await supabase.from('connection').select('*').order('id', { ascending: true });

  res.status(200).json(data);
}
