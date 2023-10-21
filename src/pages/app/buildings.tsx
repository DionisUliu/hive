import PageHeader from '@/components/PageHeader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { useSession } from 'next-auth/react';
import { ConfigProvider, Spin } from 'antd';
import colors from '@/constants/colors';
import RoomCard from '@/components/RoomCard';
import RoomsFilter from '@/components/RoomsFilter';

import roomsMock from '../../mock/roomsMock.json';
import styles from '../../styles/buildings.module.css';
import BuildingsStats from '@/components/Buildings/BuildingsStats';
import BuildingsCards from '@/components/Buildings/BuildingsCards';

const Buildings = () => {
  const session = useSession();
  const loading = false;

  // const { data, loading } = useGetApi<any[]>(`${endpoints.USERS}${userId}`);

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
              <h1 className={styles.title}>Buildings</h1>
              <BuildingsStats />
              <BuildingsCards />
            </>
          )}
        </ConfigProvider>
      </PageHeader>
    </ProtectedRoute>
  );
};

export default Buildings;
