import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import * as service from './register.service';

export const getRegistrations = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));
  const roomId: string = String(req.query?.roomId);
  const residentId: string = String(req.query?.residentId);
  const buildingId: string = String(req.query?.buildingId);

  const registrations = await service.getRegistrations(
    roomId,
    residentId,
    buildingId,
  );
  return res.json(registrations);
};

export const getRegistration = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));
  const id: string = String(req.query?.id);
  const registration = await service.getRegistration(id);
  return res.json(registration);
};

export const createRegistration = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));
  // const data = JSON.parse(req.body);
  const registration = await service.createRegistration(req.body);
  return res.json(registration);
};

export const updateRegistration = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));

  const id: string = String(req.query?.id);
  // const body = JSON.parse(req.body);

  const registration = await service.updateRegistration(id, req.body);
  return res.json(registration);
};
