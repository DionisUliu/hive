import {
  Avatar,
  ConfigProvider,
  Divider,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
} from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { BiHive, BiUser } from 'react-icons/bi';
import colors from '@/constants/colors';
import {
  signOut,
  useSession,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaSignOutAlt } from 'react-icons/fa';
import { LiaFileContractSolid } from 'react-icons/lia';
import { BsBuildings } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';

import styles from '../styles/pageHeader.module.css';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const PageHeader = ({ children }: any) => {
  const session = useSession();

  const gender = session?.data?.user?.gender;
  const userRole = session?.data?.user?.role;
  const userName = session?.data?.user?.name;
  const tokens = session?.data?.user?.tokens;
  const level = session?.data?.user?.level;
  const urlMale = 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png';
  const urlFemale = 'https://cdn-icons-png.flaticon.com/128/4140/4140040.png';

  const router = useRouter();

  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push('/signin');
    });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a key="2" onClick={handleSignOut}>
          <FaSignOutAlt style={{ marginBottom: -2 }} /> Sign Out
        </a>
      ),
    },
  ];

  const getItem = (
    key: React.Key,
    link: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ) => {
    return {
      key,
      icon,
      children,
      type,
      link,
    };
  }

  const menuItems = [
    getItem('1', 'buildings', <BsBuildings className={styles.icon_size_menu} />),
    getItem('2','residents', <HiOutlineUserGroup className={styles.icon_size_menu} />),
    getItem('3','contracts',  <LiaFileContractSolid className={styles.icon_size_menu} />),
    getItem('4','profile', <BiUser className={styles.icon_size_menu} />),
  ]
  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorFillContent: colors.SECONDARY,
          colorTextLabel: colors.WHITE,
          colorPrimary: colors.PRIMARY,
        },
      }}
    >
      <Layout style={{ height: '100%', minHeight: '100vh' }}>
        <Sider 
          collapsed
          className={styles.menu_sider}
        >
          <div className={styles.title}>
            <BiHive className={styles.icon} />
            <h1>{` Hive`}</h1>
          </div>
          <Divider className={styles.divider}/>
          <Menu 
            theme='dark'
            className={styles.menu_side_wrapper}
            mode="inline"
            onSelect={(e) => console.log(e)}
          >
            {menuItems.map((item) => (
              <Menu.Item 
                key={item?.key}
                onClick={() => router.push(item.link)}
              >
                {item.icon}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: 'transparent' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', gap: 50 }}>
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <div>
                    <Avatar
                      src={gender === 'male' ? urlMale : urlFemale}
                      size="large"
                      style={{ marginRight: 10, cursor: 'pointer' }}
                    />
                    <h2 className={styles.cta_user_name}>{userName}</h2>
                  </div>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Layout>
            <Content style={{ margin: '24px 16px 0' }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  borderRadius: 10,
                  border: '2px solid',
                  borderColor: colors.PRIMARY,
                }}
              >
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Made with <span role="img">❤</span> by ByteBond©
              {`${dayjs().year()}`}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default PageHeader;
