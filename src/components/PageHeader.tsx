import styles from '../styles/pageHeader.module.css';
import {
  Avatar,
  Button,
  ConfigProvider,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
} from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { profileMenus } from '@/constants/menuItems';
import { BiHive, BiSolidUser } from 'react-icons/bi';
import colors from '@/constants/colors';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaSignOutAlt } from 'react-icons/fa';
const { Header, Content, Footer, Sider } = Layout;

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
        <Header style={{ backgroundColor: '#fff' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div className={styles.title}>
              <BiHive className={styles.icon} />
              <h1>{` Hive`}</h1>
            </div>
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
        <Layout style={{ height: '100%' }}>
          <Sider breakpoint="lg" collapsedWidth="0">
            <Menu className={styles.menu_side_wrapper} mode="inline">
              {profileMenus?.map((item) => (
                <Menu.Item style={{ marginTop: '1.5rem' }} key={item.key}>
                  <Button
                    icon={<BiSolidUser className={styles.icon_size_menu} />}
                    onClick={() => router.push(item.link)}
                    type="link"
                    className={styles.text_size_menu}
                  >
                    {item.languageKey}
                  </Button>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
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
