import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
/* eslint-disable @next/next/no-img-element */
import styles from '../../styles/buildings.module.css';

interface Props {
  buildings: any[];
}

const BuildingsCards: React.FC<Props> = ({ buildings }) => {
  const router = useRouter();

  return (
    <div>
      <Row gutter={30}>
        {(buildings || [])?.map((item, index) => (
          <Col
            key={index}
            onClick={() => {
              router.push({
                pathname: 'roomsList',
                query: {
                  buildingName: item.name,
                },
              });
            }}
          >
            <div className={styles.card}>
              <h4 className={styles.card_subtitle}>{item.subtitle}</h4>
              <h2 className={styles.card_title}>{`Building ${item.name}`}</h2>
              <img
                className={styles.card_image}
                alt="test"
                src="/building2.svg"
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BuildingsCards;
