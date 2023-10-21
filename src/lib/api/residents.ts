import endpoints from '@/constants/endpoints';

export async function createResident(body: any) {
  try {
    const response = await fetch(`${endpoints.RESIDENTS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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

export async function updateResident(body: any, residentId: string) {
  try {
    const response = await fetch(`${endpoints.RESIDENTS}/${residentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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

export async function deleteResident(residentId: string) {
  try {
    await fetch(`${endpoints.RESIDENTS}/${residentId}`, {
      method: 'DELETE',
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
