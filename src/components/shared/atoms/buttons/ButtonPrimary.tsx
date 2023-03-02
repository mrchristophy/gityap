import Link from 'next/link';
import style from './buttons.module.scss';
import Spinner from '@/components/shared/atoms/spinner/Spinner';

interface Props {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
}

const ButtonPrimary = ({ title, type, href, onClick, size = 'medium', loading, fullWidth }: Props) => {
  const classes = `${style.buttonPrimary} ${style[size]} ${loading && style.loading} ${fullWidth && style.fullWidth}`;

  return (
    <>
      {href && (
        <Link className={classes} onClick={onClick} href={href}>
          {title}
        </Link>
      )}
      {!href && (
        <button type={type} className={classes} onClick={onClick}>
          {title}
          {loading && (
            <div className={style.spinner}>
              <Spinner />
            </div>
          )}
        </button>
      )}
    </>
  );
};

export default ButtonPrimary;
