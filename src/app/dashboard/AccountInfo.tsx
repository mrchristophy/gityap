'use client';

import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import { createClient } from '@/util/supabase-browser';

const AccountInfo = () => {
  const supabase = createClient();

  // const fetchSession = async () => {
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();
  // }

  return <ButtonPrimary title={'Sign out'} onClick={() => supabase.auth.signOut()} />;
};

export default AccountInfo;
