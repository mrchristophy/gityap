'use client';
import style from './columns-list.module.scss';
import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import { useEffect, useState } from 'react';
import Modal from '@/components/shared/organisms/modal/Modal';
import AddColumnForm from '@/app/dashboard/boards/[alias]/_components/add-column-form/AddColumnForm';
import { useSupabase } from '@/components/features/supabase/supabase-provider';
import { ColumnType } from '@/types/ColumnType';
import Column from '@/app/dashboard/boards/[alias]/_components/columns-list/_components/Column/Column';

interface Props {
  boardId: number;
  serverColumns: ColumnType[];
}

const ColumnsList = ({ boardId, serverColumns }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [columns, setColumns] = useState<ColumnType[]>(serverColumns);
  const { supabase } = useSupabase();

  useEffect(() => {
    setColumns(serverColumns);
  }, [serverColumns]);

  const fetchNewColumnData = async (id: number) => {
    const { data: columnsData } = await supabase
      .from('column')
      .select('id,created_at, repository, connection_id(*),board_id(*)')
      .eq('board_id', boardId)
      .eq('id', id);
    if (columnsData && columnsData.length > 0) {
      setColumns([...columns, columnsData[0] as ColumnType]);
    }
  };

  useEffect(() => {
    supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'column', filter: `board_id=eq.${boardId}` },
        (payload) => {
          // Payload doesn't include relations so need to load them
          fetchNewColumnData(payload.new.id).catch((err) => console.log(err));
        }
      )
      .subscribe();
  }, [supabase, setColumns, columns]);

  const deleteColumn = async (id: string) => {
    try {
      const response = await supabase.from('column').delete().eq('id', id);
      if (!response.error) {
        setColumns(columns.filter((column) => column.id !== id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={style.columns}>
        {columns.map((column: ColumnType) => (
          <Column key={column.id} column={column} deleteColumn={deleteColumn} />
        ))}
      </div>

      <ButtonPrimary onClick={() => setIsOpen(true)} title={'Add column'} />

      <Modal config={{ isOpen: isOpen }} setIsOpenFunction={setIsOpen}>
        <AddColumnForm boardId={boardId} onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};

export default ColumnsList;
