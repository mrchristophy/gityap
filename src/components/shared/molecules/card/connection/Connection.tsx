import style from './connection.module.scss';
import ProviderIcon from '@/components/shared/atoms/provider-icon/ProviderIcon';
import { ConnectionType } from '@/types/ConnectionType';
import Date from '@/components/shared/atoms/date/Date';
import Meta from '@/components/shared/molecules/card/_components/meta/Meta';

interface Props {
  connection: ConnectionType;
}
const Connection = ({ connection }: Props) => {
  return (
    <div className={style.connection}>
      <ProviderIcon provider={connection.provider} />
      <div className={style.accountName}>{connection.account_name}</div>
      <Meta>
        Connected <Date isoDate={connection.created_at} />
      </Meta>
    </div>
  );
};

export default Connection;
