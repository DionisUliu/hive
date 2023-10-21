import PageHeader from '@/components/PageHeader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { useSession } from 'next-auth/react';
import { ConfigProvider, Spin } from 'antd';
import colors from '@/constants/colors';

import styles from '../../styles/buildings.module.css';
import ResidentsTable from '@/components/Residents/ResidentsTable';
import endpoints from '@/constants/endpoints';
import useGetApi from '@/lib/hooks/useGetApi';
import ResidentsActions from '@/components/Residents/ResidentsActions';

const Residents = () => {
  const session = useSession();

  const {
    data: residentData,
    loading,
    refetch,
  } = useGetApi<any[]>(`${endpoints.RESIDENTS}`);

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
              <h1 className={styles.title}>Residents</h1>
              <ResidentsActions refetch={refetch} />
              <ResidentsTable residentData={residentData} refetch={refetch} />
            </>
          )}
        </ConfigProvider>
      </PageHeader>
    </ProtectedRoute>
  );
};

export default Residents;
