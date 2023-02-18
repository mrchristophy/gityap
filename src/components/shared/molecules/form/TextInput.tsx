import { useController } from 'react-hook-form';

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
    <div>
      {label && <label>{label}</label>}
      <div>
        <input ref={ref} type={inputType} placeholder={placeholder} {...inputProps} />
      </div>
      {invalid && <div>{errors[name].message}</div>}
    </div>
  );
}
