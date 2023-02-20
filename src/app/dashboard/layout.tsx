import React from 'react';
import style from './dashboard.module.scss';
import Navigation from '@/components/features/dashboard/navigation/Navigation';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.dashboard}>
      <div className={style.navigation}>
        <Navigation />
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
