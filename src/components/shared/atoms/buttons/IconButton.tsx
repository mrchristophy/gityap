import Icon from '@mdi/react';
import { mdiCog, mdiDelete } from '@mdi/js';
import style from './buttons.module.scss';

interface Props {
  icon: string;
  title: string;
  onClick: () => void;
  size?: number;
}

const IconButton = ({ icon, title, onClick, size = 1 }: Props) => {
  let iconPath = null;
  switch (icon) {
    case 'delete':
      iconPath = mdiDelete;
      break;
    case 'settings':
      iconPath = mdiCog;
      break;
    default:
      iconPath = null;
      break;
  }

  if (!iconPath) {
    return <></>;
  }

  return (
    <a className={style.iconButton} onClick={onClick}>
      <Icon path={iconPath} title={title} size={0.95} color="#999" />
    </a>
  );
};

export default IconButton;
