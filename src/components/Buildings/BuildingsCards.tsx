/* eslint-disable @next/next/no-img-element */
import styles from '../../styles/buildings.module.css';
import { Card, Row, Col, Progress, Tag, Space } from 'antd';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { BiStats } from 'react-icons/bi';
import { LiaFileContractSolid } from 'react-icons/lia';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsBuildings } from 'react-icons/bs';
import moment from 'moment';
const conicColors = {
  '0%': '#F96F8A',
  '50%': '#ffe58f',
  '100%': '#87d068',
};

const data = [
  {
    title: `Building A`,
    subtitle: `Available ${20} rooms`,
    url: '/building2.svg',
  },
  {
    title: `Building B`,
    subtitle: `Available ${50} rooms`,
    url: '/building2.svg',
  },
  {
    title: `Building C`,
    subtitle: `Available ${80} rooms`,
    url: '/building2.svg',
  },
];

const BuildingsCards = () => {
  return (
    <div>
      <Row gutter={16}>
        {data.map((item, index) => (
          <Col xs={24} sm={12} md={6} lg={8} key={index}>
            <div className={styles.card}>
              <h4 className={styles.card_subtitle}>{item.subtitle}</h4>
              <h2 className={styles.card_title}>{item.title}</h2>
              <img className={styles.card_image} alt="test" src={item.url} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BuildingsCards;
