import PageHeader from '@/components/PageHeader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { useSession } from 'next-auth/react';
import { ConfigProvider, Spin } from 'antd';
import colors from '@/constants/colors';
import styles from '../../styles/buildings.module.css';
import endpoints from '@/constants/endpoints';
import useGetApi from '@/lib/hooks/useGetApi';
import ContractTable from '@/components/Contract/ContractTable';

const Contracts = () => {
  const session = useSession();

  const {
    data: contractData,
    loading,
    refetch,
  } = useGetApi<any[]>(`${endpoints.CONTRACTS}`);

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
              <h1 className={styles.title}>Contracts</h1>
              <ContractTable refetch={refetch} contractData={contractData} />
            </>
          )}
        </ConfigProvider>
      </PageHeader>
    </ProtectedRoute>
  );
};

export default Contracts;
