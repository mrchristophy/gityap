'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/components/features/supabase/supabase-provider';

export interface ConnectionType {
  id: string;
  created_at: string;
  provider: string;
}

interface Props {
  serverConnections: ConnectionType[];
}

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
    <div>
      {connections.map((connection) => (
        <div key={connection.id}>
          {connection.id} {connection.provider}
        </div>
      ))}
    </div>
  );
};

export default ConnectionsList;
