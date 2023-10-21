import PageHeader from '@/components/PageHeader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import colors from '@/constants/colors';
import { ConfigProvider, Spin } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import RoomsFilter from '@/components/RoomsFilter';

import styles from '../../styles/roomsList.module.css';

const RoomsList = () => {
  const session = useSession();
  const loading = false;
  const router = useRouter();

  const { buildingName, buildingId } = router.query;
  
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
            <div className={styles.rooms_container}>
              <h2>{`Building ${buildingName}`}</h2>
              <RoomsFilter />
            </div>
          )}
        </ConfigProvider>
      </PageHeader>
    </ProtectedRoute>
  );
};

export default RoomsList;
