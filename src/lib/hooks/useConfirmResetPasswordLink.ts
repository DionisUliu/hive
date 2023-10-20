import { useEffect, useCallback, useState } from 'react';

import * as api from '../api/auth';
import { ResetPasswordStatus } from '../utilities/types';

const useConfirmResetPasswordLink = (
  verificationCode: string | null,
  id: string | null,
) => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [status, setStatus] = useState<ResetPasswordStatus>(
    ResetPasswordStatus.SENDING_LINK,
  );

  const request = useCallback(
    async (code: string, uniqueIdentifier: string) => {
      setLoading(true);
      try {
        const isValid = await api.validateResetPasswordLink({
          verificationCode: code,
          id: uniqueIdentifier,
        });

        if (isValid) {
          setStatus(ResetPasswordStatus.CONFIRMED);
        }
      } catch (error) {
        setHasError(true);
        setStatus(ResetPasswordStatus.NOT_CONFIRMED);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!verificationCode && !id) {
      setStatus(ResetPasswordStatus.SENDING_LINK);
    } else if (!verificationCode || !id) {
      setStatus(ResetPasswordStatus.NOT_CONFIRMED);
    } else {
      request(verificationCode, id);
    }
  }, [request, verificationCode, id]);

  return { loading, hasError, status };
};

export default useConfirmResetPasswordLink;
