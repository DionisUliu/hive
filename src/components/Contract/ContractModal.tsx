import styles from '../../styles/form.module.css';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  notification,
} from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createContractSchema } from '@/constants/validationSchema';
import colors from '@/constants/colors';
import { createResident, updateResident } from '@/lib/api/residents';
import { AiFillEdit, AiOutlinePlusCircle } from 'react-icons/ai';

const ContractModal = ({ record, refetch }: any) => {
  const residentId = record?.id;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createContractSchema),
    values: {
      name: record?.name || '',
      amount: record?.amount || '',
      startDate: record?.startDate || '',
      endDate: record?.endDate || '',
      residentId: record?.residentId || '',
      roomId: record?.roomId || '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [modalOpen, setToggleModal] = useState<boolean>(false);

  const toggleModal = () => {
    setToggleModal(!modalOpen);
  };

  const onSubmit = async (data: any) => {
    toggleModal();
    setLoading(true);

    try {
      const body: any = {
        name: data?.name,
        amount: data?.amount,
        startDate: data?.startDate,
        endDate: data?.endDate,
        residentId: data?.residentId,
        roomId: data?.roomId,
      };
      await updateResident(body, residentId);
      refetch();
      notification.success({ message: 'Sentence updated successfully' });
    } catch (error: any) {
      notification.error({ message: 'Unsuccessful, try again!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        icon={<AiFillEdit style={{ marginBottom: -2 }} />}
        size="small"
        type="primary"
        onClick={toggleModal}
      />
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
            label="Name"
            name="name"
            required
            style={{ marginTop: 30 }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input allowClear {...field} placeholder="Contract1" />
                  {errors.name && (
                    <p className={styles.error}>{error?.message}</p>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            required
            style={{ marginTop: 30 }}
          >
            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <InputNumber min={1} max={10} {...field} />
                  {errors.amount && (
                    <p className={styles.error}>{error?.message}</p>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item
            label="StartDate"
            name="startDate"
            required
            style={{ marginTop: 30 }}
          >
            <Controller
              name="startDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <DatePicker allowClear {...field} />
                  {errors.startDate && (
                    <p className={styles.error}>{error?.message}</p>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item
            label="EndDate"
            name="endDate"
            required
            style={{ marginTop: 30 }}
          >
            <Controller
              name="endDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <DatePicker allowClear {...field} />
                  {errors.endDate && (
                    <p className={styles.error}>{error?.message}</p>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Resident Id"
            name="residentId"
            required
            style={{ marginTop: 30 }}
          >
            <Controller
              name="residentId"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select allowClear {...field}>
                    <Select.Option value={'male'}>{'Male'}</Select.Option>
                    <Select.Option value={'female'}>{'Female'}</Select.Option>
                  </Select>
                  {errors.residentId && (
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

export default ContractModal;
