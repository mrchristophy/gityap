import style from './header.module.scss';
import Title from '@/components/shared/atoms/title/Title';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <div className={style.header}>
      <Title level={1}>{title}</Title>
    </div>
  );
};

export default Header;
