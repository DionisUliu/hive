import styles from '../styles/form.module.css';
import colors from '@/constants/colors';
import {
  Form,
  Input,
  Button,
  Space,
  message,
  Divider,
  notification,
  Select,
  Row,
} from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { createUser } from '@/lib/api/users';
import { useState } from 'react';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '@/constants/validationSchema';
import { useRouter } from 'next/router';
import { IUserRegistration } from '@/lib/utilities/types';
import errorMessages from '@/constants/errorMessages';
import { BiHive } from 'react-icons/bi';

const Signup = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const body: IUserRegistration = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
      };
      await createUser(body);
      notification.success({ message: 'Registration successful' });
      router.push('/signin');
    } catch (error: any) {
      if (error.message === errorMessages.SIGNUP.USER_EXIST)
        return message.error(error.message);
      else message.error('Registration unsuccessful, try again!');
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
        <Divider plain>Create an account</Divider>

        <Form.Item label="First Name" name="firstName" required>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <>
                <Input {...field} />
                {errors.firstName && (
                  <p className={styles.error}>{errors.firstName.message}</p>
                )}
              </>
            )}
          />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName" required>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <>
                <Input {...field} />
                {errors.lastName && (
                  <p className={styles.error}>{errors.lastName.message}</p>
                )}
              </>
            )}
          />
        </Form.Item>

        <Form.Item label="Gender" name="gender" required>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                <Select allowClear {...field}>
                  <Select.Option value={'male'}>{'Male'}</Select.Option>
                  <Select.Option value={'female'}>{'Female'}</Select.Option>
                </Select>
                {errors.gender && (
                  <p className={styles.error}>{errors.gender.message}</p>
                )}
              </>
            )}
          />
        </Form.Item>
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
              Sign Up
            </Button>
            <span
              style={{
                width: '100%',
                display: 'flex',
                marginTop: '1rem',
                justifyContent: 'space-between',
              }}
            >
              <Button type="link" onClick={() => router.push('/signin')}>
                Go to signin
              </Button>
            </span>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Signup;
