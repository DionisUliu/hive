import Link from 'next/link';
import styles from '../styles/form.module.css';
import colors from '@/constants/colors';
import { Form, Input, Button, Space, Divider, notification } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import * as api from '@/lib/api/auth';
import { Dispatch, SetStateAction, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailVerificationSchema } from '@/constants/validationSchema';
import { useRouter } from 'next/router';
import { BiHive } from 'react-icons/bi';

type EmailVerificationProps = {
  setShowEmailVerification: Dispatch<SetStateAction<boolean>>;
};

const EmailVerification = ({
  setShowEmailVerification,
}: EmailVerificationProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(emailVerificationSchema) });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleShowSignin = () => {
    setShowEmailVerification(false);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await api.sendResetPasswordLink(data);
      notification.success({ message: 'Email successfully sent' });
      router.push('/signin');
    } catch (error) {
      notification.error({ message: 'Email unsuccessful, please try again!' });
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
        <Divider plain>Enter your email to get a reset link</Divider>
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
            <span
              style={{
                width: '100%',
                display: 'flex',
                marginTop: '1rem',
                justifyContent: 'space-between',
              }}
            >
              <Button type="link" onClick={handleShowSignin}>
                {'Go to signin'}
              </Button>
            </span>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmailVerification;
