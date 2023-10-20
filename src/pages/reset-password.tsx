import styles from '../styles/form.module.css';
import colors from '@/constants/colors';
import { Form, Input, Button, Space, Divider, notification } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import * as api from '@/lib/api/auth';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '@/constants/validationSchema';
import { useRouter, useSearchParams } from 'next/navigation';
import { BiHive } from 'react-icons/bi';

const ResetPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const verificationCode = params?.get('verification') as string;
  const identifier = params?.get('id') as string;

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await api.resetPassword({
        verificationCode,
        id: identifier,
        password: data.password,
      });
      notification.success({ message: 'Password reset successfully' });
      router.push('/signin');
    } catch (error) {
      notification.error({
        message: 'Password reset unsuccessful, please try again!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <Divider plain>Enter your new password</Divider>
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
        <Form.Item label="Confirm password" name="confirmPassword" required>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <>
                <Input.Password {...field} />
                {errors.confirmPassword && (
                  <p className={styles.error}>
                    {errors.confirmPassword.message}
                  </p>
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
              Sumbit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
