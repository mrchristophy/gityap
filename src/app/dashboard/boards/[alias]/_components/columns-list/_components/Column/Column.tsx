import style from './column.module.scss';
import { ColumnType } from '@/types/ColumnType';
import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import { useEffect, useState } from 'react';
import Modal from '@/components/shared/organisms/modal/Modal';
import Title from '@/components/shared/atoms/title/Title';
import { GITHUB_API_BASE_URL } from '@/constants/githubConstants';
import ColumnItem from '@/app/dashboard/boards/[alias]/_components/columns-list/_components/Column/_components/ColumnItem';

interface Props {
  column: ColumnType;
  deleteColumn: (id: string) => void;
}

const Column = ({ column, deleteColumn }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [activity, setActivity] = useState<any[]>([]);

  const fetchActivity = async () => {
    const response = await fetch(`${GITHUB_API_BASE_URL}/repos/${column.repository}/events`, {
      method: 'GET',
      headers: {
        accept: 'application/vnd.github+json',
        Authorization: `Bearer ${column.connection_id.access_token}`,
      },
    });

    const responseJson = await response.json();

    if (responseJson) {
      setActivity(responseJson);
    }
  };

  useEffect(() => {
    fetchActivity().catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className={style.column}>
        <div className={style.header}>
          <Title level={4}>{column.repository}</Title>
          <ButtonPrimary title={'Delete'} onClick={() => setShowDeleteModal(true)} />
        </div>
        {activity.length > 0 && activity.map((item) => <ColumnItem key={item.id} item={item} />)}
      </div>

      <Modal config={{ isOpen: showDeleteModal }} setIsOpenFunction={setShowDeleteModal}>
        <Title level={2}>Are you sure you want to delete this column?</Title>
        <ButtonPrimary title={'Delete'} onClick={() => deleteColumn(column.id)} />
      </Modal>
    </>
  );
};

export default Column;
