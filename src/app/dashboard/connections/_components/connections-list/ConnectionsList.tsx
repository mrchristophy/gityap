'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/components/features/supabase/supabase-provider';
import ConnectionCard from '@/app/dashboard/connections/_components/connection-card/ConnectionCard';
import style from './connections-list.module.scss';
import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import { ConnectionType } from '@/types/ConnectionType';
import CardList from '@/components/shared/organisms/card-list/CardList';

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
      <CardList>
        {connections.map((connection) => (
          <ConnectionCard key={connection.id} connection={connection} />
        ))}
      </CardList>

      <ButtonPrimary onClick={connectGithub} title={'Connect a new Github account'} />
    </>
  );
};

export default ConnectionsList;
