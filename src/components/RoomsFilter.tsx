import generateFloors from '@/helper/generateFloors';
import { Radio } from 'antd';

import styles from '../styles/cardRoom.module.css';

const RoomsFilter = () => {
  const floors = generateFloors();

  return (
    <div className={styles.rooms_filter}>
      <h3 className={styles.rooms_filter_label}>Floors: </h3>
      <Radio.Group defaultValue="a" buttonStyle="solid">
        <Radio.Button value=''>All</Radio.Button>
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
