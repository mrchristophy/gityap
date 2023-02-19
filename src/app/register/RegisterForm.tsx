'use client';
import { useForm } from 'react-hook-form';
import TextInput from '@/components/shared/molecules/form/TextInput';
import { useSupabase } from '@/components/features/supabase/supabase-provider';
import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import style from './register.module.scss';
import { useRef, useState } from 'react';
import Error from '@/components/shared/atoms/error/Error';
import { useRouter } from 'next/navigation';

export interface LoginCredentials {
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const router = useRouter();

  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async ({ email, password }: LoginCredentials) => {
    setLoading(true);
    const response = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (response.error) {
      setErrorMsg(response.error.message);
      setLoading(false);
    } else {
      setErrorMsg('');
      await router.push('/register/success');
    }
  };
  const password = useRef({});
  password.current = watch('password', '');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        control={control}
        name={'email'}
        label={'Email'}
        inputType={'email'}
        rules={{
          required: {
            value: true,
          },
        }}
      />
      <TextInput
        control={control}
        name={'password'}
        label={'Password'}
        inputType={'password'}
        rules={{
          required: {
            value: true,
          },
        }}
      />

      <TextInput
        control={control}
        name={'password_confirm'}
        label={'Confirm Password'}
        inputType={'password'}
        rules={{
          required: {
            value: true,
          },
          validate: (value: string) => value === password.current || "Password doesn't match",
        }}
      />

      <ButtonPrimary title={"Let's go!"} type={'submit'} size={'large'} loading={loading} />

      {errorMsg !== '' && <Error text={errorMsg} />}
    </form>
  );
};

export default RegisterForm;
