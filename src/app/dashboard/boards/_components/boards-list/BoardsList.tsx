'use client';
import { BoardType } from '@/types/BoardType';
import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import Modal from '@/components/shared/organisms/modal/Modal';
import { useEffect, useState } from 'react';
import AddBoardForm from '@/app/dashboard/boards/_components/add-board-form/AddBoardForm';
import { useSupabase } from '@/components/features/supabase/supabase-provider';
import { bool } from 'prop-types';
import { ConnectionType } from '@/types/ConnectionType';
import CardList from '@/components/shared/organisms/card-list/CardList';
import BoardCard from '@/app/dashboard/boards/_components/board-card/BoardCard';

interface Props {
  serverBoards: BoardType[];
}

const BoardsList = ({ serverBoards }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [boards, setBoards] = useState<BoardType[]>(serverBoards);
  const { supabase } = useSupabase();

  useEffect(() => {
    setBoards(serverBoards);
  }, [serverBoards]);

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'board' }, (payload) =>
        setBoards((board) => [...boards, payload.new as BoardType])
      )
      .subscribe();
  }, [supabase, setBoards, boards]);

  return (
    <>
      <div>
        <CardList>
          {boards.map((board: BoardType) => (
            <BoardCard board={board} key={board.id} />
          ))}
        </CardList>
        <ButtonPrimary onClick={() => setIsOpen(true)} title={'Add board'} />
      </div>

      <Modal config={{ isOpen: isOpen }} setIsOpenFunction={setIsOpen}>
        <AddBoardForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};

export default BoardsList;
