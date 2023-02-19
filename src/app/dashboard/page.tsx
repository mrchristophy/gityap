import { createClient } from '@/util/supabase-server';
import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import AccountInfo from '@/app/dashboard/AccountInfo';

const Dashboard = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      {session && (
        <div>
          <p>Email: {session.user.email}</p>
          <AccountInfo />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
