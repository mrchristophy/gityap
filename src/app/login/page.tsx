import LoginForm from '@/app/login/LoginForm';
import style from './login.module.scss';
import Title from '@/components/shared/atoms/title/Title';
const Login = () => {
  return (
    <div className={style.loginPage}>
      <div className={style.loginFormWrapper}>
        <Title level={1}>Welcome back!</Title>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
