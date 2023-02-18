'use client';
import { useForm } from 'react-hook-form';
import TextInput from '@/components/shared/molecules/form/TextInput';
import { useSupabase } from '@/components/features/supabase/supabase-provider';
import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import style from './login.module.scss';

export interface LoginCredentials {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { supabase } = useSupabase();

  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async ({ email, password }: LoginCredentials) => {
    const response = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(response);
  };

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

      <ButtonPrimary title={"Let's go!"} type={'submit'} size={'large'} />
    </form>
  );
};

export default LoginForm;
