import { useController } from 'react-hook-form';
import style from './form.module.scss';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  control: any;
  rules?: object;
  defaultValue?: string;
  inputType?: string;
  onChange?: (e: any) => void;
};

export default function TextInput({
  name,
  label,
  placeholder,
  control,
  rules,
  inputType = 'text',
  defaultValue = '',
  onChange,
}: Props) {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields, errors },
  } = useController({ name, control, rules, defaultValue });

  return (
    <div className={`${style.formElement} ${style.textElement}`}>
      {label && <label className={style.label}>{label}</label>}
      <div>
        <input
          className={`${style.input} ${style.textInput}`}
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          {...inputProps}
        />
        {/* todo: fix typescript */}
        {errors && errors[name] && <p className={style.error}>{(errors[name] as any).message}</p>}
      </div>
    </div>
  );
}
