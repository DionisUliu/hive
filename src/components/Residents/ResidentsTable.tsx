import { Table, Tooltip, Button, Popconfirm, notification } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ISentenceData, ISentenceDataUpdate } from '@/lib/utilities/types';
// import { deleteSentence } from '@/lib/api/sentence';
// import UpdateSentence from './UpdateSentence';

const ResidentsTable = ({ refetch, residentData }: any) => {
  const [loading, setLoading] = useState(false);

  //   const onDelete = async (record: string) => {
  //     setLoading(true);
  //     try {
  //       await deleteSentence(record);
  //       refetch();
  //       notification.success({ message: 'Sentence deleted successfully' });
  //     } catch (error: any) {
  //       notification.error({ message: 'Can not delete sentence, try again!' });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // Filter data based on the search text and selected frequency
  //   const filteredData = sentence?.filter((item: ISentenceData) => {
  //     const matchesSearch = item?.sentence
  //       .toLowerCase()
  //       .includes(searchText.toLowerCase());
  //     const matchesSource =
  //       selectSource === undefined || item?.sources?.name === selectSource;
  //     const matchesFrequency =
  //       selectedFrequency === undefined || item?.frequency === selectedFrequency;
  //     return matchesSearch && matchesFrequency && matchesSource;
  //   });

  const columns: any = [
    // Specify the type explicitly
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
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      onFilter: (value: string | number, record: ISentenceData) =>
        record.toString() === value.toString(),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
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
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (record: ISentenceDataUpdate) => (
    //     <span style={{ display: 'flex', gap: 10 }}>
    //       {/* <UpdateSentence
    //         record={record}
    //         refetch={refetch}
    //         sources={sources}
    //         sourcesLoading={sourcesLoading}
    //       />
    //       <Popconfirm
    //         title="Are you sure you want to delete this sentence?"
    //         onConfirm={() => onDelete(record?.id)}
    //         okText="Delete"
    //         cancelText="No"
    //       >
    //         <Button
    //           icon={<AiFillDelete style={{ marginBottom: -2 }} />}
    //           size="small"
    //           danger
    //         />
    //       </Popconfirm> */}
    //     </span>
    //   ),
    // },
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
