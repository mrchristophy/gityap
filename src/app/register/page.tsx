import RegisterForm from '@/app/register/RegisterForm';
import style from './register.module.scss';
import Title from '@/components/shared/atoms/title/Title';
import Link from 'next/link';
const Register = () => {
  return (
    <div className={style.registerPage}>
      <div className={style.registerFormWrapper}>
        <Title level={1}>Create an account</Title>
        <RegisterForm />
        <p>
          Already have an account? <Link href={'/login'}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
