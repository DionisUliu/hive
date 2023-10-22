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
import {
  deleteResident,
  updateResident,
} from '@/lib/api/residents';
import { GiThreeFriends } from 'react-icons/gi';

import ResidentsActions from './ResidentsActions';

const ResidentsTable = ({ refetch, residentData }: any) => {
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

  const onRoommateUpdate = async (residentId: string, isOpenForRoommates: boolean) => {
    setLoading(true);    

    try {
      const body: any = {
        openForRoomMates: isOpenForRoommates,
      };
      await updateResident(body, residentId);
      refetch();
      notification.success({ message: 'Roommate statis updated successfully' });
    } catch (error: any) {
      notification.error({ message: 'Unsuccessful, try again!' });
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
      title: 'First name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a: any, b: any) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      onFilter: (value: string | number, record: any) =>
        record.toString() === value.toString(),
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      onFilter: (value: string | number, record: any) =>
        record.toString() === value.toString(),
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      onFilter: (value: string | number, record: any) =>
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
      dataIndex: 'contract',
      key: 'contract',
      render: (contract: any) => {
        return (
          <Tag color={contract ? 'green' : 'red'}>
            {contract ? 'Active' : 'Inactive'}
          </Tag>
        );
      },
    },
    {
      title: 'Open for room-mate',
      dataIndex: 'openForRoomMates',
      key: 'openForRoomMates',
      render: (openForRoomMates: any) => {
        return (
          <Tag color={openForRoomMates ? 'green' : 'red'}>
            {openForRoomMates ? 'Yes' : 'No'}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <span style={{ display: 'flex', gap: 10 }}>
          <ResidentsActions record={record} refetch={refetch} />
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
          <Popconfirm
            title="Are you sure you want to update roommate status?"
            onConfirm={() => onRoommateUpdate(record?.id, !record?.openForRoomMates)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<GiThreeFriends style={{ marginBottom: -2 }} />}
              size="small"
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
        dataSource={residentData}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default ResidentsTable;
