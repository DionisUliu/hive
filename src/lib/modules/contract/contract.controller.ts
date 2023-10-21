import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import * as service from './contract.service';

export const getContracts = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));
  const roomId: string = String(req.query?.roomId);
  const residentId: string = String(req.query?.residentId);

  const contracts = await service.getContracts(roomId, residentId);
  return res.json(contracts);
};

export const getContract = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));
  const id: string = String(req.query?.id);
  const rooms = await service.getContract(id);
  return res.json(rooms);
};

export const createContract = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));
  // const data = JSON.parse(req.body);
  const rooms = await service.createContract(req.body);
  return res.json(rooms);
};

export const updateContract = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));
  // const data = JSON.parse(req.body);
  const id: string = String(req.query?.id);
  const contract = await service.updateContract(id, req.body);
  return res.json(contract);
};

export const deleteContract = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));
  const id: string = String(req.query?.id);
  const contract = await service.deleteContract(id);
  return res.json(contract);
};
