// components/ProtectedRoute.js
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: any) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  return status ? children : null;
};

export default ProtectedRoute;
