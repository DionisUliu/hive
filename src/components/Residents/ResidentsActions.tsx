import styles from '../../styles/form.module.css';
import { Button, Form, Input, Modal, Select, notification } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createResidentsSchema } from '@/constants/validationSchema';
import colors from '@/constants/colors';
import { createResident, updateResident } from '@/lib/api/residents';
import { AiFillEdit, AiOutlinePlusCircle } from 'react-icons/ai';

const ResidentsActions = ({
  record,
  refetch,
  residentData,
  setResidents,
}: any) => {
  const residentId = record?.id;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createResidentsSchema),
    values: {
      firstName: record?.firstName || '',
      lastName: record?.lastName || '',
      email: record?.email || '',
      gender: record?.gender || '',
      phoneNumber: record?.phoneNumber || '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [modalOpen, setToggleModal] = useState<boolean>(false);

  const toggleModal = () => {
    setToggleModal(!modalOpen);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    if (!residentId) {
      try {
        const body: any = {
          firstName: data?.firstName,
          lastName: data?.lastName,
          email: data?.email,
          gender: data?.gender,
          phoneNumber: data?.phoneNumber,
        };
        await createResident(body);
        // refetch();
        location.reload();
        notification.success({ message: 'Resident created successfully' });
      } catch (error: any) {
        notification.error({ message: 'Unsuccessful, try again!' });
      } finally {
        setLoading(false);
        toggleModal();
      }
    } else {
      try {
        const body: any = {
          firstName: data?.firstName,
          lastName: data?.lastName,
          email: data?.email,
          gender: data?.gender,
          phoneNumber: data?.phoneNumber,
        };

        const resident = await updateResident(body, residentId);

        const residents = residentData.map((rsd: any) => {
          if (rsd.id === resident.id) {
            return resident;
          }
          return rsd;
        });

        setResidents(residents);

        // refetch();
        location.reload();

        notification.success({ message: 'Resident updated successfully' });
      } catch (error: any) {
        notification.error({ message: 'Unsuccessful, try again!' });
      } finally {
        setLoading(false);
        toggleModal();
      }
    }
  };

  return (
    <div>
      {!residentId ? (
        <Button
          icon={<AiOutlinePlusCircle style={{ marginBottom: -2 }} />}
          size="small"
          type="primary"
          onClick={toggleModal}
        >
          {'Add resident'}{' '}
        </Button>
      ) : (
        <Button
          icon={<AiFillEdit style={{ marginBottom: -2 }} />}
          size="small"
          type="primary"
          onClick={toggleModal}
        />
      )}
      <Modal
        title={residentId ? 'Update resident' : 'Add resident'}
        width={500}
        centered={true}
        okButtonProps={{
          loading,
        }}
        open={modalOpen}
        onOk={handleSubmit(onSubmit)}
        afterClose={() => {
          reset();
        }}
        onCancel={toggleModal}
      >
        <Form style={{ borderColor: colors.SECONDARY }} layout="vertical">
          <Form.Item
            label="First name"
            name="firstName"
            required
            style={{ marginTop: 30 }}
          >
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    minLength={50}
                    allowClear
                    {...field}
                    placeholder="Jon"
                  />
                  {errors.firstName && (
                    <p className={styles.error}>{error?.message}</p>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            required
            style={{ marginTop: 30 }}
          >
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    minLength={50}
                    allowClear
                    {...field}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className={styles.error}>{error?.message}</p>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            required
            style={{ marginTop: 30 }}
          >
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    minLength={50}
                    allowClear
                    {...field}
                    placeholder="example@mail.com"
                  />
                  {errors.email && (
                    <p className={styles.error}>{error?.message}</p>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            required
            style={{ marginTop: 30 }}
          >
            <Controller
              name="gender"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select allowClear {...field}>
                    <Select.Option value={'male'}>{'Male'}</Select.Option>
                    <Select.Option value={'female'}>{'Female'}</Select.Option>
                  </Select>
                  {errors.gender && (
                    <p className={styles.error}>{error?.message}</p>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            required
            style={{ marginTop: 30 }}
          >
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    minLength={50}
                    allowClear
                    {...field}
                    placeholder="+35567*******"
                  />
                  {errors.email && (
                    <p className={styles.error}>{error?.message}</p>
                  )}
                </>
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResidentsActions;
