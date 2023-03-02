'use client';
import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import { useState } from 'react';
import Modal from '@/components/shared/organisms/modal/Modal';
import AddColumnForm from '@/app/dashboard/boards/[alias]/_components/add-column-form/AddColumnForm';

interface Props {
  boardId: number;
}

const ColumnsList = ({ boardId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div>Columns list</div>
      <ButtonPrimary onClick={() => setIsOpen(true)} title={'Add column'} />

      <Modal config={{ isOpen: isOpen }} setIsOpenFunction={setIsOpen}>
        <AddColumnForm boardId={boardId} onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};

export default ColumnsList;
