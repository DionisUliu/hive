import endpoints from '@/constants/endpoints';

export async function createContract(body: any) {
  try {
    const response = await fetch(`${endpoints.CONTRACTS}`, {
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

export async function updateContract(body: any, contractId: string) {
  try {
    const response = await fetch(`${endpoints.CONTRACTS}/${contractId}`, {
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

export async function deleteContract(residentId: string) {
  try {
    await fetch(`${endpoints.CONTRACTS}/${residentId}`, {
      method: 'DELETE',
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
