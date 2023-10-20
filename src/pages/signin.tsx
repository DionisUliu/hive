import styles from '../styles/form.module.css';
import colors from '@/constants/colors';
import { Form, Input, Button, Space, Divider, notification } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import EmailVerification from '../components/EmailVerification';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinSchema } from '@/constants/validationSchema';
import { useRouter } from 'next/router';
import { BiHive } from 'react-icons/bi';

const Signin = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signinSchema) });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/app/profile',
      });
      notification.success({ message: 'Signin successful!' });
    } catch (error) {
      notification.error({ message: 'Signin unsuccessful, please try again!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!showEmailVerification && (
        <div className={styles.mainFormContainer}>
          <Form
            onFinish={handleSubmit(onSubmit)}
            className={styles.formContainer}
            style={{ borderColor: colors.PRIMARY }}
            layout="vertical"
          >
            <span className={styles.title}>
              <BiHive className={styles.icon} />
              <h1>{` Hive`}</h1>
            </span>
            <Divider plain>Log in into your account</Divider>
            <Form.Item label="Email" name="email" required>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} />
                    {errors.email && (
                      <p className={styles.error}>{errors.email.message}</p>
                    )}
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Password" name="password" required>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <>
                    <Input.Password {...field} />
                    {errors.password && (
                      <p className={styles.error}>{errors.password.message}</p>
                    )}
                  </>
                )}
              />
            </Form.Item>
            <Form.Item className={styles.buttonSection}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                  style={{ backgroundColor: colors.PRIMARY }}
                  block
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Log in
                </Button>
                <span
                  style={{
                    width: '100%',
                    display: 'flex',
                    marginTop: '1rem',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    type="link"
                    onClick={() => router.push('/signup')}
                    href="/signup"
                  >
                    {'Do not have an account?'}
                  </Button>
                  <Button
                    type="link"
                    onClick={() => setShowEmailVerification(true)}
                  >
                    {'Forget password?'}
                  </Button>
                </span>
              </Space>
            </Form.Item>
          </Form>
        </div>
      )}
      {showEmailVerification && (
        <EmailVerification
          setShowEmailVerification={setShowEmailVerification}
        />
      )}
    </>
  );
};

export default Signin;
