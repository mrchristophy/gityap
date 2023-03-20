import Header from '@/app/dashboard/_components/header/Header';
import { createClient } from '@/util/supabase-server';
import ColumnsList from '@/app/dashboard/boards/[alias]/_components/columns-list/ColumnsList';
import { ColumnType } from '@/types/ColumnType';

const BoardPage = async ({ params }: { params: { alias: number } }) => {
  const supabase = createClient();

  const { data: boardData } = await supabase
    .from('board')
    .select('id,created_at,name,alias')
    .eq('alias', params.alias)
    .single();
  const { data: columnsData } = await supabase
    .from('column')
    .select('id,created_at, repository, connection_id(*),board_id(*)')
    .eq('board_id', boardData?.id);

  if (!boardData) {
    return <div>Board not found</div>;
  }

  return (
    <>
      <Header title={`Board - ${boardData.name}`}></Header>
      <ColumnsList boardId={boardData.id} serverColumns={columnsData as ColumnType[]} />
    </>
  );
};

export default BoardPage;
