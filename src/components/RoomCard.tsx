import { MdEventAvailable } from 'react-icons/md';
import { TbHotelService } from 'react-icons/tb';
import { CiUser } from 'react-icons/ci';
import { Tag } from 'antd';
import roomTypes, { RoomTypeMapping } from '@/constants/roomTypes';
import { SetStateAction } from 'react';

import styles from '../styles/cardRoom.module.css';

interface Props {
  roomType: keyof RoomTypeMapping;
  isReserved: boolean;
  residentNumber: number;
  imageUrl: string;
  roomName: string;
  setRoomId: React.Dispatch<SetStateAction<string | undefined>>;
  setRoomName: React.Dispatch<SetStateAction<string | undefined>>;
  setResidentLimit: React.Dispatch<SetStateAction<number | undefined>>;
  setOpenDrawer: React.Dispatch<SetStateAction<boolean>>;
  setOpenDrawerInfo: React.Dispatch<SetStateAction<boolean>>;
  roomId: string;
}

const RoomCard: React.FC<Props> = ({
  roomType,
  isReserved,
  residentNumber,
  imageUrl,
  roomName,
  setRoomId,
  setRoomName,
  setResidentLimit,
  setOpenDrawer,
  setOpenDrawerInfo,
  roomId,
}) => {
  return (
    <div
      className={
        isReserved
          ? styles.card_container_reserved
          : styles.card_container_available
      }
    >
      <div
        className={
          isReserved
            ? styles.card_status_container_reserved
            : styles.card_status_container_available
        }
      >
        {isReserved ? (
          <>
            <TbHotelService />
            <p>Reserved</p>
          </>
        ) : (
          <>
            <MdEventAvailable />
            <p>Available</p>
          </>
        )}
      </div>
      <div
        className={styles.body_container}
        onClick={() => {
          if (!isReserved) {
            setOpenDrawer(true);
            setRoomId(roomId);
            setResidentLimit(residentNumber);
            setRoomName(roomName);
          } else {
            setOpenDrawerInfo(true);
            setRoomId(roomId);
            setResidentLimit(residentNumber);
            setRoomName(roomName);
          }
        }}
      >
        <img src={imageUrl} className={styles.room_image} />
        <div className={styles.info_container}>
          <h3 className={styles.room_number}>{roomName}</h3>
          <div className={styles.info_flex}>
            <Tag color="green" className={styles.rooms_available}>
              {roomTypes[roomType]}
            </Tag>
            <div className={styles.residents_info}>
              <CiUser />
              <p>{`Capacity (${residentNumber})`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
