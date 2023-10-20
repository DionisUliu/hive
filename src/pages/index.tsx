import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/signin');
  });
  return <div></div>;
};

export default Index;
