import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import * as service from './resident.service';

export const createResident = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));

  console.log('1');
  // const data = JSON.parse(req?.body);

  const residents = await service.createResident(req?.body);
  return res.json(residents);
};

export const getResidents = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));

  const rooms = await service.getResidents();
  return res.json(rooms);
};

export const updateResident = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));

  const id: string = String(req.query?.id);
  const body = JSON.parse(req.body);

  const residents = await service.updateResident(id, body);
  return res.json(residents);
};

export const getResident = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));
  const body = JSON.parse(req.body);
  const id: string = String(req.query?.id);

  const residents = await service.updateResident(id, body);
  return res.json(residents);
};

export const deactivateResident = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));
  const id: string = String(req.query?.id);

  const residents = await service.deactivateResident(id);
  return res.json(residents);
};
