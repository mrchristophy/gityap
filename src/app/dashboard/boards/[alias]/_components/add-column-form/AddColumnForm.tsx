'use client';
import { createClient } from '@/util/supabase-browser';
import { useEffect, useRef, useState } from 'react';
import { ConnectionType } from '@/types/ConnectionType';
import { useForm } from 'react-hook-form';
import SelectInput from '@/components/shared/molecules/form/SelectInput';
import Title from '@/components/shared/atoms/title/Title';
import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';

interface Props {
  boardId: number;
  onSuccess?: () => void;
}

const AddColumnForm = ({ boardId, onSuccess }: Props) => {
  const supabase = createClient();
  const [connections, setConnections] = useState<ConnectionType[]>([]);
  const [repository, setRepository] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<any[]>([]);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<{ connection: string }>();

  const getConnections = async () => {
    const { data, error } = await supabase.from('connection').select('*').order('id', { ascending: true });
    if (error) {
      console.log(error);
    }
    if (data) {
      setConnections(data as ConnectionType[]);
    }
  };

  useEffect(() => {
    getConnections().catch((e) => console.log(e));
  }, []);

  // todo: update any
  const onSubmit = async (data: any) => {
    setLoading(true);

    const response = await supabase
      .from('column')
      .insert({ board_id: boardId, connection_id: data.connection, repository: data.repository });

    setLoading(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  const connection = useRef({});
  connection.current = watch('connection', '');

  useEffect(() => {
    const getGithubRepos = async () => {
      const reposRawResponse = await fetch('/api/github/getRepositories', {
        method: 'POST',
        body: JSON.stringify({
          connectionId: connection.current,
        }),
      });

      const reposResponse = await reposRawResponse.json();

      if (reposResponse) {
        setRepositories(reposResponse);
      }
    };

    if (connection.current) {
      getGithubRepos().catch((e) => console.log(e));
    }
  }, [connection.current]);

  return (
    <div>
      <Title level={2}>Add a column</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        {connections.length > 0 && (
          <>
            <SelectInput
              name={'connection'}
              label={'Connection'}
              control={control}
              rules={{
                required: true,
              }}
              options={connections.map((connection) => ({
                value: connection.id,
                label: `${connection.provider} - ${connection.account_name}`,
              }))}
            />

            {repositories.length > 0 && (
              <SelectInput
                name={'repository'}
                label={'Repository'}
                control={control}
                rules={{
                  required: true,
                }}
                options={repositories.map((repository) => ({
                  value: repository.full_name,
                  label: `${repository.name}`,
                }))}
              />
            )}
          </>
        )}

        <ButtonPrimary title={'Add column'} type={'submit'} size={'large'} loading={loading} fullWidth={true} />
      </form>
    </div>
  );
};

export default AddColumnForm;
