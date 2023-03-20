import React from 'react';
import style from './tag.module.scss';

interface Props {
  children: React.ReactNode;
}
const Tag = ({ children }: Props) => {
  return <div className={style.tag}>{children}</div>;
};

export default Tag;
