import style from './provider-icon.module.scss';

interface Props {
  provider: string;
  displayText?: boolean;
}

const ProviderIcon = ({ provider, displayText = true }: Props) => {
  return (
    <div className={`${style.providerIcon} ${style[provider]} `}>
      {displayText && <div className={style.text}>{provider}</div>}
    </div>
  );
};

export default ProviderIcon;
