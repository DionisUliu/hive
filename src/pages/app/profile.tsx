import PageHeader from '@/components/PageHeader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import styles from '../../styles/profile.module.css';
import { useSession } from 'next-auth/react';
import { ConfigProvider, Spin, Tabs, TabsProps } from 'antd';
import colors from '@/constants/colors';
import MyProfile from '@/components/MyProfile';
import endpoints from '@/constants/endpoints';
import useGetApi from '@/lib/hooks/useGetApi';

const Profile = () => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const { data, loading } = useGetApi<any[]>(`${endpoints.USERS}${userId}`);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Profile',
      children: <MyProfile data={data} />,
    },
  ];

  return (
    <ProtectedRoute>
      <PageHeader session={session}>
        <ConfigProvider
          theme={{
            token: {
              colorFillContent: colors.SECONDARY,
              colorTextLabel: colors.WHITE,
              colorPrimary: colors.PRIMARY,
            },
          }}
        >
          {loading ? (
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40vh',
              }}
            >
              <Spin size="large" />
            </span>
          ) : (
            <>
              <h1 className={styles.title}>Profile</h1>
              <Tabs
                type="card"
                size="large"
                defaultActiveKey="1"
                items={items}
              />
            </>
          )}
        </ConfigProvider>
      </PageHeader>
    </ProtectedRoute>
  );
};

export default Profile;
