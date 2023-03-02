import { BoardType } from '@/types/BoardType';
import Card from '@/components/shared/molecules/card/Card';
import Title from '@/components/shared/atoms/title/Title';
import Link from 'next/link';
interface Props {
  board: BoardType;
}

const BoardCard = ({ board }: Props) => {
  return (
    <Link href={`/dashboard/boards/${board.alias}`}>
      <Card>
        <Title level={3}>{board.name}</Title>
      </Card>
    </Link>
  );
};

export default BoardCard;
