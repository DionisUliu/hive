import { Table, Tooltip, Button, Popconfirm, notification, Tag } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ISentenceData, ISentenceDataUpdate } from '@/lib/utilities/types';
import { deleteResident } from '@/lib/api/residents';
import ContractModal from './ContractModal';

const ContractTable = ({ refetch, contractData }: any) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async (record: string) => {
    setLoading(true);
    try {
      await deleteResident(record);
      refetch();
      notification.success({ message: 'Resident deleted successfully' });
    } catch (error: any) {
      notification.error({ message: 'Can not delete resident, try again!' });
    } finally {
      setLoading(false);
    }
  };

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
      render: (text: string) => (
        <Tooltip title={text}>
          <span>{text.slice(0, 5)}...</span>
        </Tooltip>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.firstName.localeCompare(b.name),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a: any, b: any) => a.lastName.localeCompare(b.amount),
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      key: 'startDate',
      onFilter: (value: string | number, record: ISentenceData) =>
        record.toString() === value.toString(),
      sorter: (a: any, b: any) => a.startDate.localeCompare(b.startDate),
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      key: 'endDate',
      onFilter: (value: string | number, record: ISentenceData) =>
        record.toString() === value.toString(),
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      onFilter: (value: string | number, record: ISentenceData) =>
        record.toString() === value.toString(),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: any) => {
        return dayjs(createdAt).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Status',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (contract: any) => {
        return (
          <Tag color={contract ? 'green' : 'red'}>
            {contract ? 'isPaid' : 'notPaid'}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: ISentenceDataUpdate) => (
        <span style={{ display: 'flex', gap: 10 }}>
          <ContractModal record={record} refetch={refetch} />
          <Popconfirm
            title="Are you sure you want to delete this resident?"
            onConfirm={() => onDelete(record?.id)}
            okText="Delete"
            cancelText="No"
          >
            <Button
              icon={<AiFillDelete style={{ marginBottom: -2 }} />}
              size="small"
              danger
            />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        size="small"
        columns={columns}
        dataSource={contractData}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default ContractTable;
