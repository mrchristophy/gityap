import style from './error.module.scss';

interface Props {
  text: string;
}

const Error = ({ text }: Props) => {
  return <div className={style.error}>{text}</div>;
};

export default Error;
