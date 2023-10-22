import {
  notification,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from 'antd';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import colors from '@/constants/colors';
import { AiFillEdit } from 'react-icons/ai';
import { updateContractSchema } from '@/constants/validationSchema';
import dayjs from 'dayjs';
import endpoints from '@/constants/endpoints';
import useGetApi from '@/lib/hooks/useGetApi';
import { updateContract } from '@/lib/api/contract';

import styles from '../../styles/form.module.css';

const ContractModal = ({
  record,
  refetch,
  residentLoading,
  residentData,
}: any) => {
  const contractId = record?.id;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(updateContractSchema),
    values: {
      name: record?.name || '',
      amount: record?.amount || '',
      startDate: record?.startDate || '',
      endDate: record?.endDate || '',
      roomId: record?.roomId || '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [modalOpen, setToggleModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

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
        roomId: data?.roomId,
      };
      await updateContract(body, contractId);
      // refetch();
      location.reload();
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
        title={contractId ? 'Update resident' : 'Add resident'}
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
          <Row style={{ gap: 20 }}>
            <Form.Item label="Name" name="name" required>
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
            <Form.Item label="Amount" name="amount" required>
              <Controller
                name="amount"
                control={control}
                render={({
                  field: { ref, onChange, name, value },
                  fieldState: { error },
                }) => (
                  <>
                    <InputNumber
                      name={name}
                      onChange={onChange}
                      ref={ref}
                      style={{ width: '100%' }}
                      value={value}
                    />
                    {errors.amount && (
                      <p className={styles.error}>{error?.message}</p>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Row>
          <Row style={{ gap: 20 }}>
            <Form.Item label="StartDate" name="startDate" required>
              <Controller
                name="startDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker
                      onChange={(startDate: any) =>
                        setStartDate(startDate.toString())
                      }
                      value={dayjs(startDate)}
                    />
                    {errors.startDate && (
                      <p className={styles.error}>{error?.message}</p>
                    )}
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="EndDate" name="endDate" required>
              <Controller
                name="endDate"
                control={control}
                render={({ fieldState: { error } }) => (
                  <>
                    <DatePicker
                      onChange={(endDate: any) =>
                        setEndDate(endDate.toString())
                      }
                      value={dayjs(endDate)}
                    />
                    {errors.endDate && (
                      <p className={styles.error}>{error?.message}</p>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Row>
          <Form.Item label="Resident Id" name="residentId" required>
            <Select
              placeholder={'john doe'}
              loading={residentLoading}
              mode="multiple"
              allowClear
              disabled
              maxTagCount={2}
            >
              {residentData?.map((item: any) => (
                <Select.Option key={item.id} value={item?.id}>
                  {`${item?.firstName} ${item?.lastName}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContractModal;
