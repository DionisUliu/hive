import PageHeader from '@/components/PageHeader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { useSession } from 'next-auth/react';
import { ConfigProvider, Input, Spin } from 'antd';
import colors from '@/constants/colors';
import endpoints from '@/constants/endpoints';
import useGetApi from '@/lib/hooks/useGetApi';
import ContractTable from '@/components/Contract/ContractTable';

import { useEffect, useState } from 'react';

const Contracts = () => {
  const session = useSession();

  const {
    data: contractData,
    loading,
    refetch,
  } = useGetApi<any[]>(`${endpoints.CONTRACTS}`);

  const [contract, setContract] = useState<any[]>();

  useEffect(() => {
    if (!contract && contractData) {
      setContract(contractData);
    }
  }, [contractData, contract]);

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
              <h1 style={{ marginBottom: '20px' }}>Contracts</h1>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: 20,
                }}
              >
                <Input.Search
                  placeholder="Search contract by name"
                  allowClear
                  enterButton
                  onSearch={(value: any) =>
                    setContract(
                      contractData.filter((contract) => {
                        const contractName = `${contract?.name}`;

                        return contractName?.includes(value);
                      }),
                    )
                  }
                  style={{ width: 300 }}
                />
              </div>
              <ContractTable refetch={refetch} contractData={contract} />
            </>
          )}
        </ConfigProvider>
      </PageHeader>
    </ProtectedRoute>
  );
};

export default Contracts;
