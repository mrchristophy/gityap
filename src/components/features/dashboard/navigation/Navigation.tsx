'use client';
import style from './navigation.module.scss';
import Title from '@/components/shared/atoms/title/Title';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className={style.navigation}>
      <Title level={2}>GITYAP</Title>
      <ul className={style.menu}>
        <li className={style.menuItem}>
          <Link href={'/dashboard'}>Home</Link>
        </li>
        <li className={style.menuItem}>
          <Link href={'/dashboard/connections'}>Connections</Link>
        </li>
        <li className={style.menuItem}>
          <Link href={'/dashboard/boards'}>Boards</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
