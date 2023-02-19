import style from '../register.module.scss';
import Title from '@/components/shared/atoms/title/Title';
const RegisterSuccess = () => {
  return (
    <div className={style.registerPage}>
      <div className={style.registerFormWrapper}>
        <Title level={1}>Success!</Title>
        <p>Please check your email to activate your account.</p>
      </div>
    </div>
  );
};

export default RegisterSuccess;
