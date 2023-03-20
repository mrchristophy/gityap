import { createClient } from '@/util/supabase-server';
import ConnectionsList from '@/app/dashboard/connections/_components/connections-list/ConnectionsList';
import Header from '@/app/dashboard/_components/header/Header';
import Main from '@/app/dashboard/_components/main/Main';
import { ConnectionType } from '@/types/ConnectionType';

const Connections = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('connection').select('id,created_at,provider, account_name');

  return (
    <>
      <Header title={'Connections'} />
      <Main>
        <ConnectionsList serverConnections={(data as ConnectionType[]) || []} />
      </Main>
    </>
  );
};

export default Connections;
