import style from './card-list.module.scss';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const CardList = ({ children }: Props) => {
  return <div className={style.cardList}>{children}</div>;
};

export default CardList;
