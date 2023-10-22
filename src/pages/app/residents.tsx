import PageHeader from '@/components/PageHeader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { useSession } from 'next-auth/react';
import { ConfigProvider, Input, Spin } from 'antd';
import colors from '@/constants/colors';
import ResidentsTable from '@/components/Residents/ResidentsTable';
import endpoints from '@/constants/endpoints';
import useGetApi from '@/lib/hooks/useGetApi';
import ResidentsActions from '@/components/Residents/ResidentsActions';

import styles from '../../styles/buildings.module.css';
import { useEffect, useState } from 'react';

const Residents = () => {
  const session = useSession();

  const {
    data: residentData,
    loading,
    refetch,
  } = useGetApi<any[]>(`${endpoints.RESIDENTS}`);

  const [residents, setResidents] = useState<any[]>();

  useEffect(() => {
    if (!residents && residentData) {
      setResidents(residentData);
    }
  }, [residentData, residents]);

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
              <div
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <ResidentsActions refetch={refetch} />
                <Input.Search
                  placeholder="Search resident by name"
                  allowClear
                  enterButton
                  onSearch={(value: any) =>
                    setResidents(
                      residentData.filter((resident) => {
                        const fullName = `${resident?.firstName} ${resident?.lastName}`;

                        return fullName?.includes(value);
                      }),
                    )
                  }
                  style={{ width: 300 }}
                />
              </div>
              <ResidentsTable
                residentData={residents}
                refetch={refetch}
                setResidents={setResidents}
              />
            </>
          )}
        </ConfigProvider>
      </PageHeader>
    </ProtectedRoute>
  );
};

export default Residents;
