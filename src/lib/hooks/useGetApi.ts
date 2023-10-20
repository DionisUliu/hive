import { useCallback, useEffect, useState } from 'react';

import * as api from '../api/users';

const useGetApi = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const request = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.fetchData(url);
      setData(response);
      setLoading(false);
    } catch (error) {
      setHasError(true);
    }
  }, [url]);

  const refetch = useCallback(() => {
    request();
  }, [request]);

  useEffect(() => {
    request();
  }, [request]);

  return { data: data as T, loading, hasError, refetch };
};

export default useGetApi;
