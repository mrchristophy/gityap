import style from './column-item.module.scss';
import { format, parseISO } from 'date-fns';
import Tag from '@/components/shared/atoms/tag/Tag';
interface Props {
  item: any;
}
const ColumnItem = ({ item }: Props) => {
  const date = format(parseISO(item.created_at), 'do MMM yyyy HH:mm');

  console.log('item', item);

  const typeText = item.type
    .replace('Event', '')
    .replace(/([A-Z])/g, ' $1')
    .trim();

  return (
    <div className={style.item}>
      <div className={style.header}>
        <div>{date}</div>
        <div className={style.tag}>
          <Tag>{typeText}</Tag>
        </div>
      </div>

      {item.payload.commits?.length > 0 &&
        item.payload.commits.map((commit: any) => (
          <>
            <div className={style.message}>{commit.message}</div>
            <div className={style.author}>{commit.author.name}</div>
          </>
        ))}
    </div>
  );
};

export default ColumnItem;
