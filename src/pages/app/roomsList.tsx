import PageHeader from '@/components/PageHeader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import colors from '@/constants/colors';
import {
  ConfigProvider,
  Drawer,
  Spin,
} from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import RoomsFilter from '@/components/RoomsFilter';
import endpoints from '@/constants/endpoints';
import useGetApi from '@/lib/hooks/useGetApi';
import RoomCard from '@/components/RoomCard';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import styles from '../../styles/roomsList.module.css';

const RoomsList = () => {
  const session = useSession();
  const router = useRouter();

  const { data, loading } = useGetApi<any[]>(endpoints.ROOMS);

  const { buildingName } = router.query;

  const roomsPerBuilding = useMemo(() => data?.filter((item) => item.name.charAt(0) === buildingName) || [], [buildingName, data]);

  const [rooms, setRooms] = useState<any[]>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  
  useEffect(() => {
    if(!rooms && roomsPerBuilding.length > 0){
      setRooms(roomsPerBuilding)
    }
  },[rooms, roomsPerBuilding]);
  
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
              <RoomsFilter
                allRooms={roomsPerBuilding}
                setRooms={setRooms}
                buildingName={buildingName as string}
              />
              <div className={styles.rooms_list_container}>
                {rooms?.map((room) => (
                 <RoomCard
                  key={room.id}
                  roomType={room.type}
                  isReserved={!room.isAvailable}
                  residentNumber={room.capacity}
                  imageUrl={room.preview}
                  roomName={room.name}
                  setOpenDrawer={setOpenDrawer}
                 />
                 ) )}
              </div>
              <Drawer 
                title="" 
                placement="right" 
                onClose={() => setOpenDrawer(false)} 
                open={openDrawer}
                size="large"
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Drawer>
            </div>
          )}
        </ConfigProvider>
      </PageHeader>
    </ProtectedRoute>
  );
};

export default RoomsList;
