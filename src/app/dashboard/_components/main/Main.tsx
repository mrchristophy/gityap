import React from 'react';
import style from './main.module.scss';

interface Props {
  children: React.ReactNode;
}
const Main = ({ children }: Props) => {
  return <main className={style.main}>{children}</main>;
};

export default Main;
