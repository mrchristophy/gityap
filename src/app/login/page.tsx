import LoginForm from '@/app/login/LoginForm';
import style from './login.module.scss';
import Title from '@/components/shared/atoms/title/Title';
import Link from 'next/link';
const Login = async () => {
  return (
    <div className={style.loginPage}>
      <div className={style.loginFormWrapper}>
        <Title level={1}>Welcome back!</Title>
        <LoginForm />
        <p>
          Not registered yet? <Link href={'/register'}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
