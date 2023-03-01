import { format, parseISO } from 'date-fns';

interface Props {
  isoDate: string;
}

const Date = ({ isoDate }: Props) => {
  const date = parseISO(isoDate);
  return <>{format(date, 'dd MMM yyyy')}</>;
};

export default Date;
