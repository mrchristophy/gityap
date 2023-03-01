import React from 'react';
import style from './meta.module.scss';

interface Props {
  children: React.ReactNode;
}

const Meta = ({ children }: Props) => {
  return <div className={style.meta}>{children}</div>;
};

export default Meta;
