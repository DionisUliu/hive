import {
  notification,
  Button,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ISentenceDataUpdate } from '@/lib/utilities/types';
import { deleteResident } from '@/lib/api/residents';
import moment from 'moment';

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
      title: 'Contract title',
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
      title: 'Resident',
      dataIndex: 'resident',
      key: 'resident',
      render: (resident: any) => `${resident.firstName} ${resident.lastName}`
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate: string) => (moment(startDate).format('DD.MM.YYYY'))
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (endDate: string) => (moment(endDate).format('DD.MM.YYYY'))
    },
    {
      title: 'Phone number',
      dataIndex: 'resident',
      key: 'resident',
      render: (resident: any) => resident.phoneNumber
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
