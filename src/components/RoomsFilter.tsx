import generateFloors from '@/helper/generateFloors';
import { Radio } from 'antd';
import React, { SetStateAction } from 'react';

import styles from '../styles/cardRoom.module.css';

interface Props {
  allRooms?: any[];
  setRooms: React.Dispatch<SetStateAction<any[] | undefined>>;
}

const RoomsFilter: React.FC<Props> = ({allRooms, setRooms}) => {
  const floors = generateFloors();  

  return (
    <div className={styles.rooms_filter}>
      <h3 className={styles.rooms_filter_label}>Floors: </h3>
      <Radio.Group buttonStyle="solid" defaultValue='all' onChange={(e) => {
          const value = e.target.value
          if(value === 'all'){
            setRooms(allRooms || [])
          } else {
            setRooms((allRooms || []).filter((room) => room.name.charAt(1) === value));
          }
        }}>
        <Radio.Button defaultChecked value='all'>All</Radio.Button>
        {
          floors.map((floor) => (
            <Radio.Button key={floor.id} value={floor.id}>{floor.floorNumber}</Radio.Button>
            ))
          }
      </Radio.Group>
    </div>
  )
};

export default RoomsFilter;
