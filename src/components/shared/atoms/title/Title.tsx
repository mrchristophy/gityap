import React from 'react';
import style from './title.module.scss';

interface Props {
  level: number;
  children: React.ReactNode;
}

const Title = ({ level, children }: Props) => {
  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;

  return <HeaderTag className={style.title}>{children}</HeaderTag>;
};

export default Title;
