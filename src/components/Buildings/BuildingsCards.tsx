import { Col, Row } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';

/* eslint-disable @next/next/no-img-element */
import styles from '../../styles/buildings.module.css';

const conicColors = {
  '0%': '#F96F8A',
  '50%': '#ffe58f',
  '100%': '#87d068',
};

const data = [
  {
    id: 'A',
    title: `Building A`,
    subtitle: `Available ${20} rooms`,
    url: '/building2.svg',
  },
  {
    id: 'B',
    title: `Building B`,
    subtitle: `Available ${50} rooms`,
    url: '/building2.svg',
  },
  {
    id: 'C',
    title: `Building C`,
    subtitle: `Available ${80} rooms`,
    url: '/building2.svg',
  },
];

const BuildingsCards = () => {

  const router = useRouter();
  console.log(router);
  

  return (
    <div>
      <Row gutter={16}>
        {data.map((item, index) => (
          <Col xs={24} sm={12} md={6} lg={8} key={index} 
            onClick={() => {
              router.push({
                pathname:"roomsList", 
                query: {
                buildingName: item.title,
                buildingId: item.id,
              }})
            }}
          >
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
