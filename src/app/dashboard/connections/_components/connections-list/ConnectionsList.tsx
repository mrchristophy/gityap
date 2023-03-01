'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/components/features/supabase/supabase-provider';
import Connection from '@/components/shared/molecules/card/connection/Connection';
import style from './connections-list.module.scss';
import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import { ConnectionType } from '@/types/ConnectionType';

interface Props {
  serverConnections: ConnectionType[];
}

const connectGithub = async () => {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
};

const ConnectionsList = ({ serverConnections }: Props) => {
  const [connections, setConnections] = useState<ConnectionType[]>(serverConnections);
  const { supabase } = useSupabase();

  useEffect(() => {
    setConnections(serverConnections);
  }, [serverConnections]);

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'connection' }, (payload) =>
        setConnections((connection) => [...connections, payload.new as ConnectionType])
      )
      .subscribe();
  }, [supabase, setConnections, connections]);

  return (
    <>
      <div className={style.connectionsList}>
        {connections.map((connection) => (
          <Connection key={connection.id} connection={connection} />
        ))}
      </div>

      <ButtonPrimary onClick={connectGithub} title={'Connect a new Github account'} />
    </>
  );
};

export default ConnectionsList;
