import {
  notification,
  Alert,
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import { useState } from 'react';
import {
  useForm,
  Controller,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createContractSchema } from '@/constants/validationSchema';
import colors from '@/constants/colors';
import moment from 'moment';
import useGetApi from '@/lib/hooks/useGetApi';
import endpoints from '@/constants/endpoints';
import { createContract } from '@/lib/api/contract';

import styles from '../../styles/form.module.css';

const { RangePicker } = DatePicker;

const ContractDrawer = ({ refetch, roomId, residentLimit, setOpenDrawer }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createContractSchema),
  });

  const { data: residentData, loading: residentLoading } = useGetApi<any[]>(
    `${endpoints.RESIDENTS}`,
  );

  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState<any>(null);
  const [residentLimitError, setResidentLimitError] = useState<boolean>(false);

  const startDatePicker = moment(range[0]).format('YYYY-MM-DD HH:mm:ss');
  const endDatePicker = moment(range[1]).format('YYYY-MM-DD HH:mm:ss');

  console.log('startDatePicker', startDatePicker, moment(range[0]));
  console.log('endDatePicker', endDatePicker, range[1]);
  

  const onSubmit = async (data: any) => {
    setLoading(true);

    if (data?.residentId.length > residentLimit) {
      setResidentLimitError(true);
      setLoading(false);
      throw '';
    }

    try {
      const amountPerPerson = data?.amount / data?.residentId.length;
      const promises = data?.residentId.map((residentId: any) => {
        const body: any = {
          name: data?.name,
          amount: amountPerPerson,
          startDate: startDatePicker,
          endDate: endDatePicker,
          residentId: residentId,
          roomId,
          isPaid: true,
        };

        return createContract(body);
      });
      await Promise.all(promises);
      setOpenDrawer(false);
      notification.success({ message: 'Contract created successfully' });
      refetch();
    } catch (error: any) {
      notification.error({ message: 'Unsuccessful, try again!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
              render={({ field, fieldState: { error } }) => (
                <>
                  <InputNumber defaultValue={1} min={1} {...field} />
                  {errors.amount && (
                    <p className={styles.error}>{error?.message}</p>
                  )}
                </>
              )}
            />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label="Start date - End date" name="dateRange" required>
            <Controller
              name="dateRange"
              control={control}
              render={({ field }) => (
                <>
                  <RangePicker
                    value={range}
                    onChange={(value) => {
                      console.log(value);
                      
                      setRange(value)
                    }}
                  />
                </>
              )}
            />
          </Form.Item>
        </Row>
        <Form.Item label="Resident Id" name="residentId" required>
          <Controller
            name="residentId"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <Select
                  placeholder={'john doe'}
                  loading={residentLoading}
                  mode="multiple"
                  allowClear
                  maxTagCount={2}
                  {...field}
                >
                  {residentData?.map((item: any) => (
                    <Select.Option key={item.id} value={item?.id}>
                      {`${item?.firstName} ${item?.lastName}`}
                    </Select.Option>
                  ))}
                </Select>
                {errors.residentId && (
                  <p className={styles.error}>{error?.message}</p>
                )}
              </>
            )}
          />
        </Form.Item>

        <Button
          loading={loading}
          type="primary"
          block
          onClick={handleSubmit(onSubmit)}
        >
          Create contract
        </Button>
        {residentLimitError && (
          <Alert
            message={`Resident capacity is ${residentLimit}`}
            type="error"
            showIcon
            style={{ marginTop: 10 }}
          />
        )}
      </Form>
      <Divider style={{ marginTop: 40 }} plain>
        Created contracts
      </Divider>
    </div>
  );
};

export default ContractDrawer;
