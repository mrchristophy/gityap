import Header from '@/app/dashboard/_components/header/Header';
import { createClient } from '@/util/supabase-server';
import ColumnsList from '@/app/dashboard/boards/[alias]/_components/columns-list/ColumnsList';

const BoardPage = async ({ params }: { params: { alias: number } }) => {
  const supabase = createClient();

  const board = await supabase.from('board').select('*').eq('alias', params.alias).single();

  if (!board.data) {
    return <div>Board not found</div>;
  }

  return (
    <>
      <Header title={`Board - ${board.data.name}`} />
      <ColumnsList boardId={board.data.id} />
    </>
  );
};

export default BoardPage;
