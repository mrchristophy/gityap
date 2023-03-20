import style from './header.module.scss';
import Title from '@/components/shared/atoms/title/Title';
import React from 'react';

interface Props {
  title: string;
  children?: React.ReactNode;
}

const Header = ({ title, children }: Props) => {
  return (
    <div className={style.header}>
      <Title level={1}>{title}</Title>

      {children && <div className={style.actions}>{children}</div>}
    </div>
  );
};

export default Header;
