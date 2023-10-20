import colors from '@/constants/colors';
import endpoints from '@/constants/endpoints';
import useGetApi from '@/lib/hooks/useGetApi';
import styles from '../styles/profile.module.css';
import { IUser } from '@/lib/utilities/types';
import { Avatar, Descriptions, DescriptionsProps, Progress, Tag } from 'antd';
import dayjs from 'dayjs';

const MyProfile = (data: any) => {
  const user: IUser = data?.data;

  const { data: levels, loading: levelsLoading } = useGetApi<any>(
    `${endpoints.LEVELS}`,
  );
  const currentLevel = levels?.currentLevel;
  const nextLevel = levels?.nextLevel;
  const percentageToNextLevel = levels?.percentageToNextLevel;

  const twoColors = {
    '0%': colors.GREEN,
    '100%': colors.PRIMARY,
  };

  const items: DescriptionsProps['items'] = [
    {
      label: 'First name',
      children: `${user?.firstName}`,
    },
    {
      label: 'Last name',
      children: `${user?.lastName}`,
    },
    {
      label: 'Gender',
      children: `${user?.gender}`,
    },
    {
      label: 'Email',
      children: `${user?.email}`,
    },
    {
      label: 'Created At',
      children: `${dayjs(user?.createdAt).format('DD/MM/YYYY dddd')}`,
    },
  ];
  return (
    <>
      <Descriptions
        style={{ marginBottom: '1rem' }}
        title="User info"
        layout="vertical"
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        items={items}
      />
    </>
  );
};

export default MyProfile;
