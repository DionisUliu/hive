import endpoints from '@/constants/endpoints';

import {
  IUserRegistration,
  IUserUpdate,
} from '../utilities/types';

export const fetchData = async (url: string) => {
  try {    
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details);
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function createUser(userData: IUserRegistration) {
  try {
    const response = await fetch(`${endpoints.USERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.details);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateUser(userId: string, updatedUserData: IUserUpdate) {
  try {
    const response = await fetch(`${endpoints.USERS}${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      const error: { details: string } = await response.json();
      throw new Error(error.details);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteUser(userId: string) {
  try {
    const response = await fetch(`${endpoints.USERS}${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error: { details: string } = await response.json();
      throw new Error(error.details);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function sendEmail(userId: string) {
  try {
    const response = await fetch(`${endpoints.USERS}${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error: { details: string } = await response.json();
      throw new Error(error.details);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
