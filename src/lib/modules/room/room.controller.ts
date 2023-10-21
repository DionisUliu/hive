import { authOptions } from '@/pages/api/auth/[...nextauth]';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession } from 'next-auth';

import * as service from './room.service';

export const getRooms = async (req: NextApiRequest, res: NextApiResponse) => {
  await getServerSession(req, res, authOptions(req, res));

  const rooms = await service.getRooms();
  return res.json(rooms);
};

export const getRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  await getServerSession(req, res, authOptions(req, res));

  const id: string = String(req.query?.id);
  const rooms = await service.getRoomById(id);
  return res.json(rooms);
};
