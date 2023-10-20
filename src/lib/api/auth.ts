import endpoints from '@/constants/endpoints';
import * as types from '../utilities/types';

export const sendResetPasswordLink = async (body: types.SendResetLinkBody) => {
  try {
    const res = await fetch(endpoints.SEND_RESET_PASSWORD_LINK, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error: any = await res.json();
      throw new Error(error.details);
    }

    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const validateResetPasswordLink = async (
  params: types.ValidateResetLinkParams,
) => {
  try {
    const res = await fetch(
      `${endpoints.VALIDATE_RESET_PASSWORD_LINK}?verification=${params.verificationCode}&identifier=${params.id}`,
    );

    if (!res.ok) {
      const error: any = await res.json();
      throw new Error(error.details);
    }

    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const resetPassword = async (body: types.ResetPasswordBody) => {
  try {
    const res = await fetch(`${endpoints.RESET_PASSWORD}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error: any = await res.json();
      throw new Error(error.details);
    }

    return;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
