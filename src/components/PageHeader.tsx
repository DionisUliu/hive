import {
  Avatar,
  ConfigProvider,
  Divider,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
} from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { BiHive, BiUser } from 'react-icons/bi';
import colors from '@/constants/colors';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaSignOutAlt } from 'react-icons/fa';
import { LiaFileContractSolid } from 'react-icons/lia';
import { BsBuildings } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import styles from '../styles/pageHeader.module.css';
import useGetApi from '@/lib/hooks/useGetApi';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const PageHeader = ({ children }: any) => {
  const session = useSession();
  const gender = session?.data?.user?.gender;
  const userName = session?.data?.user?.name;
  const urlMale = 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png';
  const urlFemale = 'https://cdn-icons-png.flaticon.com/128/4140/4140040.png';
  const [activeMenuItem, setActiveMenuItem] = useState<string>('building');
  const router = useRouter();
  const currentRoute = router.asPath.split('/')[2];

  useEffect(() => {
    if (activeMenuItem !== currentRoute) {
      setActiveMenuItem(currentRoute);
    }
  }, [activeMenuItem, currentRoute]);

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
    label: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      type,
      label,
    } as MenuItem;
  };

  const menuItems = [
    getItem(
      'buildings',
      'Buildings',
      <BsBuildings className={styles.icon_size_menu} />,
    ),
    getItem(
      'residents',
      'Residents',
      <HiOutlineUserGroup className={styles.icon_size_menu} />,
    ),
    getItem(
      'contracts',
      'Contracts',
      <LiaFileContractSolid className={styles.icon_size_menu} />,
    ),
    getItem('profile', 'Profile', <BiUser className={styles.icon_size_menu} />),
  ];

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
      <Layout
        style={{ height: '100%', minHeight: '100vh', overflow: 'hidden' }}
      >
        <Sider collapsed className={styles.menu_sider}>
          <div className={styles.title}>
            <BiHive className={styles.icon} />
            <h1>{`Hive`}</h1>
          </div>
          <Divider className={styles.divider} />
          <Menu
            theme="dark"
            className={styles.menu_side_wrapper}
            mode="inline"
            items={menuItems}
            onClick={(item) => {
              router.push(item.key);
              setActiveMenuItem(item.key);
            }}
            defaultSelectedKeys={['building']}
            selectedKeys={[activeMenuItem]}
          />
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
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-end',
                }}
              >
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
            <Content className={styles.content}>
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
