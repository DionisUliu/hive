import {
  Card,
  Col,
  Progress,
  Row,
  Space,
  Tag,
} from 'antd';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { BiStats } from 'react-icons/bi';
import { LiaFileContractSolid } from 'react-icons/lia';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsBuildings } from 'react-icons/bs';
import moment from 'moment';

import styles from '../../styles/buildings.module.css';

const conicColors = {
  '0%': '#F96F8A',
  '50%': '#ffe58f',
  '100%': '#87d068',
};

const data = [
  {
    title: `Growth ${moment().format('YYYY')} `,
    subtitle: 'Subtitle 1',
    content: (
      <Space wrap style={{ gap: 25 }}>
        <div className={styles.progress_wrapper}>
          <Progress
            type="circle"
            percent={30}
            size={65}
            strokeColor={conicColors}
          />
          <h4>Daily</h4>
        </div>
        <div className={styles.progress_wrapper}>
          <Progress
            type="circle"
            percent={60}
            size={65}
            strokeColor={conicColors}
          />
          <h4>Monthly</h4>
        </div>
        <div className={styles.progress_wrapper}>
          <Progress
            type="circle"
            percent={80}
            size={65}
            strokeColor={conicColors}
          />
          <h4>Yearly</h4>
        </div>
      </Space>
    ),
    icon: <BiStats className={styles.cards_icon} />,
  },
  {
    title: 'Contracts',
    subtitle: 'Subtitle 2',
    content: (
      <div>
        <h4>{'Total contracts'}</h4>
        <h1 style={{ fontSize: 40 }}> {20}</h1>
      </div>
    ),
    contentOptional: (
      <div>
        <h4 style={{ color: '#F96F8A' }}>{'Soon to expire'}</h4>
        <h1 style={{ color: '#F96F8A', fontSize: 40 }}> {20}</h1>
      </div>
    ),
    icon: <LiaFileContractSolid className={styles.cards_icon} />,
  },
];

const BuildingsStats = () => {
  return (
    <div>
      <Row gutter={16}>
        {data.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              title={
                <div>
                  {item.icon}
                  {item.title}
                </div>
              }
              style={{
                margin: '16px 0',
                border: '1px solid #fdc33b',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{item.content}</div>
                <div>{item.contentOptional}</div>
              </div>
            </Card>
          </Col>
        ))}
        <Col xs={24} sm={12} md={8} lg={6} key={10}>
          <Card
            title={
              <div>
                <HiOutlineUserGroup className={styles.cards_icon} />{' '}
                {'Total residents'}
              </div>
            }
            style={{
              margin: '16px 0',
              border: '1px solid #fdc33b',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={styles.buildings_list}>
                <div>
                  <Tag
                    icon={<BsBuildings style={{ marginRight: 5 }} />}
                    color="magenta"
                  >
                    {'Building A'}
                  </Tag>
                </div>
                <div>
                  <Tag
                    icon={<BsBuildings style={{ marginRight: 5 }} />}
                    color="magenta"
                  >
                    {'Building B'}
                  </Tag>
                </div>
                <div>
                  <Tag
                    icon={<BsBuildings style={{ marginRight: 5 }} />}
                    color="magenta"
                  >
                    {'Building C'}
                  </Tag>
                </div>
              </div>
              <div className={styles.buildings_list}>
                <div>
                  <Tag color="magenta">{`${200} Total residents`}</Tag>
                </div>
                <div>
                  <Tag color="magenta">{`${100} Total residents`}</Tag>
                </div>
                <div>
                  <Tag color="magenta">{`${50} Total residents`}</Tag>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} key={11}>
          <Card
            title={
              <div>
                <MdOutlineMeetingRoom className={styles.cards_icon} />{' '}
                {'Available rooms'}
              </div>
            }
            style={{
              margin: '16px 0',
              border: '1px solid #fdc33b',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={styles.buildings_list}>
                <div>
                  <Tag
                    icon={<BsBuildings style={{ marginRight: 5 }} />}
                    color="volcano"
                  >
                    {'Building A'}
                  </Tag>
                </div>
                <div>
                  <Tag
                    icon={<BsBuildings style={{ marginRight: 5 }} />}
                    color="volcano"
                  >
                    {'Building B'}
                  </Tag>
                </div>
                <div>
                  <Tag
                    icon={<BsBuildings style={{ marginRight: 5 }} />}
                    color="volcano"
                  >
                    {'Building C'}
                  </Tag>
                </div>
              </div>

              <div className={styles.buildings_list}>
                <div>
                  <Tag color="volcano">{`${200} available rooms`}</Tag>
                </div>
                <div>
                  <Tag color="volcano">{`${100} available rooms`}</Tag>
                </div>
                <div>
                  <Tag color="volcano">{`${50} available rooms`}</Tag>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BuildingsStats;
