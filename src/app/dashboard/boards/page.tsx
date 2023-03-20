import Header from '@/app/dashboard/_components/header/Header';
import Main from '@/app/dashboard/_components/main/Main';
import { createClient } from '@/util/supabase-server';
import BoardsList from '@/app/dashboard/boards/_components/boards-list/BoardsList';

const Boards = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('board').select('id,created_at,name,alias');

  return (
    <>
      <Header title={'Boards'} />
      <Main>
        <BoardsList serverBoards={data || []} />
      </Main>
    </>
  );
};

export default Boards;
