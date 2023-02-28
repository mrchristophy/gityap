'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useEffectOnce } from '@/hooks/useEffectOnce';

const Authorize = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');

  useEffectOnce(() => {
    if (code) {
      getGithubAccessToken().catch((error) => {
        console.log(error);
      });
      console.log(code);
    }

    return () => {
      console.log('unmounted');
    };
  });

  const getGithubAccessToken = async () => {
    const response = await fetch('/api/auth/github', {
      method: 'POST',
      body: JSON.stringify({
        code: code,
      }),
    });

    const { accessToken } = await response.json();

    return accessToken;
  };

  return <div>This is auth</div>;
};

export default Authorize;
