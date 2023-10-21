import PageHeader from '@/components/PageHeader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { useSession } from 'next-auth/react';
import { ConfigProvider, Spin } from 'antd';
import colors from '@/constants/colors';
import BuildingsStats from '@/components/Buildings/BuildingsStats';
import BuildingsCards from '@/components/Buildings/BuildingsCards';
import endpoints from '@/constants/endpoints';
import useGetApi from '@/lib/hooks/useGetApi';

import styles from '../../styles/buildings.module.css';

const Buildings = () => {
  const session = useSession();

  const { data, loading } = useGetApi<any[]>(endpoints.BUILDINGS);

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
              <BuildingsCards 
                buildings={data}
              />
            </>
          )}
        </ConfigProvider>
      </PageHeader>
    </ProtectedRoute>
  );
};

export default Buildings;
