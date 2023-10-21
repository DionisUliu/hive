import generateFloors from '@/helper/generateFloors';
import { Input, Radio } from 'antd';
import React, {
  useState,
  SetStateAction,
} from 'react';

import styles from '../styles/cardRoom.module.css';

interface Props {
  allRooms?: any[];
  setRooms: React.Dispatch<SetStateAction<any[] | undefined>>;
  buildingName: string;
}

const RoomsFilter: React.FC<Props> = ({allRooms, setRooms, buildingName}) => {
  const [floorFilter,setFloorsFilter] = useState<string>('all');
  const floors = generateFloors();  

  const { Search } = Input;

  return (
    <div className={styles.rooms_filter}>
      <div>
        <p className={styles.rooms_filter_label}>Floors: </p>
        <Radio.Group buttonStyle="solid" defaultValue='all' onChange={(e) => {
            const value = e.target.value;
            setFloorsFilter(value);
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
      <div>
        <p className={styles.rooms_filter_label}>Availability: </p>
        <Radio.Group buttonStyle="solid" onChange={(e) => {
          const value = e.target.value;
          if(floorFilter === 'all'){
            setRooms((allRooms || []).filter((room) => room.isAvailable === value));
          } else {
            setRooms((allRooms || []).filter((room) => room.isAvailable === value && room.name.charAt(1) === floorFilter))
          }
        }}>
          <Radio.Button value={false}>Reserved</Radio.Button>
          <Radio.Button value={true}>Available</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        <p className={styles.rooms_filter_label}>Search rooms: </p>
        <Search 
         placeholder="input search text"
         allowClear 
         onSearch={(value) => setRooms(((allRooms || []).filter((room) => room.name.includes(`${buildingName}${value}`))))} 
         style={{ width: 200 }} 
         prefix={buildingName}
         maxLength={3}
        />
      </div>
    </div>
  )
};

export default RoomsFilter;
