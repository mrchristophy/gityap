import Link from 'next/link';
import style from './buttons.module.scss';

interface Props {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const ButtonPrimary = ({ title, type, href, onClick, size = 'medium' }: Props) => {
  return (
    <>
      {href && (
        <Link className={style.buttonPrimary} onClick={onClick} href={href}>
          title
        </Link>
      )}
      {!href && (
        <button type={type} className={`${style.buttonPrimary} ${style[size]}`} onClick={onClick}>
          {title}
        </button>
      )}
    </>
  );
};

export default ButtonPrimary;
