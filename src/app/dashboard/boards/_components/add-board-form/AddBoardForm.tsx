'use client';
import Title from '@/components/shared/atoms/title/Title';
import { createClient } from '@/util/supabase-browser';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '@/components/shared/molecules/form/TextInput';
import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import Error from '@/components/shared/atoms/error/Error';
import { stringToAlias } from '@/util/strong-to-alias';

interface Props {
  onSuccess: () => void;
}

const AddBoardForm = ({ onSuccess }: Props) => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>();

  const onSubmit = async (data: { name: string }) => {
    setLoading(true);

    const alias = stringToAlias(data.name);

    // Check if alias exists
    const aliasCheckResponse = await supabase.from('board').select('id').eq('alias', alias);

    if (aliasCheckResponse.data && aliasCheckResponse.data.length > 0) {
      setErrorMsg('Name already exists, please use a different name');
    } else {
      const response = await supabase.from('board').insert({ name: data.name, alias: alias });

      reset();
      if (onSuccess) {
        onSuccess();
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <Title level={2}>Add a board</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          control={control}
          name={'name'}
          label={'Board Name'}
          rules={{
            required: {
              value: true,
            },
          }}
        />

        <ButtonPrimary title={'Add board'} type={'submit'} size={'large'} loading={loading} fullWidth={true} />

        {errorMsg !== '' && <Error text={errorMsg} />}
      </form>
    </div>
  );
};

export default AddBoardForm;
