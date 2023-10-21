import { MdEventAvailable } from 'react-icons/md';
import { TbHotelService } from 'react-icons/tb';
import { CiUser } from 'react-icons/ci';
import { Tag } from 'antd';

import styles from '../styles/cardRoom.module.css';

interface Props {
  roomType: string;
  isReserved: boolean;
  residentNumber: number;
  area: number;
}

const RoomCard: React.FC<Props> = ({
  roomType,
  isReserved,
  residentNumber,
  area,
}) => {
  const imageAddress = 'https://www.thespruce.com/thmb/2_Q52GK3rayV1wnqm6vyBvgI3Ew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg';
  
  return (
    <div className={isReserved 
      ? styles.card_container_reserved
      : styles.card_container_available
      }>
      <div className={isReserved
      ? styles.card_status_container_reserved
      : styles.card_status_container_available
      }>
        {
          isReserved
          ? (
            <>
              <TbHotelService />
              <p>Reserved</p> 
            </>
          )
          : (
            <>
            <MdEventAvailable />
            <p>Available</p></>
          )
        }        
      </div>
      <div className={styles.body_container}>
        <img 
          src={imageAddress} 
          className={styles.room_image} 
        />
        <div className={styles.info_container}>
          <h3 className={styles.room_number}>A101</h3>
          <div className={styles.info_flex}>
            <Tag color="green" className={styles.rooms_available}>{roomType}</Tag>
            <div className={styles.residents_info}>
              <CiUser /> 
              <p>{`Capacity (${residentNumber})`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default RoomCard;
