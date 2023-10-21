import { Prisma } from '@prisma/client';
import * as dal from './room.dal';

export const getRooms = async () => {
  const query: Prisma.RoomWhereInput = {};
  return await dal.getRooms(query);
};

export const getRoomById = async (id: string) => {
  return await dal.getRoomById(id);
};
