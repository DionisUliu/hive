import type { NextApiRequest, NextApiResponse } from 'next';
import { BadRequest } from '@/lib/utilities/error';
import * as service from './users.service';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const getAllUsers = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  //   await getServerSession(req, res, authOptions(req, res));
  const users = await service.getUsers();

  res.status(200).json(users);
};

export const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    throw new BadRequest('User ID is required');
  }

  const user = await service.getUserById(id.toString());

  if (!user) {
    throw new BadRequest('User not found');
  }
  return res.status(200).json(user);
};

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new BadRequest('Missing required fields');
  }

  const salt = await bcrypt.genSalt();
  const pswEncrypt = await bcrypt.hash(password, salt);

  const user = await service.createUser({
    ...req.body,
    firstName,
    lastName,
    email,
    password: pswEncrypt,
  });

  return res.status(201).json(user);
};

export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { firstName, lastName, email, password } = req.body;

  if (!id || (!firstName && !lastName && !email && !password)) {
    throw new BadRequest(
      'User ID and at least one field to update are required',
    );
  }

  const updatedUser = await service.updateUser(id.toString(), {
    firstName,
    lastName,
    email,
    password,
  });

  return res.status(200).json(updatedUser);
};

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    throw new BadRequest('User ID is required');
  }

  await service.deleteUser(id.toString());

  return res.status(204).end();
};

//-------------------

export const sendResetPasswordLink = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));

  const body = JSON.parse(req.body);

  const emailSent = await service.sendResetPasswordLink(body);
  return res.status(200).json(emailSent);
};

export const validateResetPasswordLink = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));

  const identifier: string = String(req.query?.identifier);
  const verificationCode: string = String(req.query?.verification);

  await service.validateResetPasswordLink({ id: identifier, verificationCode });
  return res.status(200).json(true);
};

export const resetPassword = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));

  const body = JSON.parse(req.body);

  await service.resetPassword(body);
  return res.status(200).json(true);
};
