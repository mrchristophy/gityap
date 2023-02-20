import { createClient } from '@/util/supabase-server';
import ConnectionsList from '@/app/dashboard/connections/ConnectionsList';

const Connections = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('connection').select('id,created_at,provider');

  console.log(data);

  return <ConnectionsList serverConnections={data || []} />;
};

export default Connections;
