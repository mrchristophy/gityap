import { useController } from 'react-hook-form';
import style from './form.module.scss';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  control: any;
  rules?: object;
  defaultValue?: string;
  onChange?: (e: any) => void;
  options: { value: string; label: string }[];
};

export default function SelectInput({
  name,
  label,
  placeholder,
  control,
  rules,
  defaultValue = '',
  onChange,
  options,
}: Props) {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields, errors },
  } = useController({ name, control, rules, defaultValue });

  return (
    <div className={`${style.formElement} ${style.selectElement}`}>
      {label && <label className={style.label}>{label}</label>}
      <div>
        <select className={`${style.input} ${style.textInput}`} ref={ref} placeholder={placeholder} {...inputProps}>
          <option value={''}>Please select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* todo: fix typescript */}
        {errors && errors[name] && <p className={style.error}>{(errors[name] as any).message}</p>}
      </div>
    </div>
  );
}
