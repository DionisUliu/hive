import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../styles/pageHeader.module.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { Button } from 'antd';

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push('/signin');
    });
  };

  return (
    <Button
      onClick={handleSignOut}
      icon={<FaSignOutAlt className={styles.icon_size_menu} />}
      type="primary"
      danger
    >
      SignOut
    </Button>
  );
};

export default SignOut;
