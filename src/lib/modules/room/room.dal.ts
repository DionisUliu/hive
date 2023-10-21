import { Prisma, Room } from '@prisma/client';
import prisma from '../../../config/prisma';

export const getRooms = async (query?: Prisma.RoomWhereInput) => {
  const jobs = await prisma.room.findMany({
    where: query,
    include: { contracts: true, history: true },
  });
  return jobs;
};

export const findJob = async (query: Prisma.RoomWhereInput) => {
  const room = await prisma.room.findFirst({
    where: query,
    include: { contracts: true, history: true },
  });
  return room;
};

export const getRoomById = async (id: string) => {
  const room = await prisma.room.findFirst({
    where: {
      id,
    },
    include: { contracts: true, history: true },
  });
  return room;
};

export const updateRoomById = async (
  roomId: string,
  data: Prisma.RoomUpdateInput | Prisma.RoomUncheckedUpdateInput,
): Promise<Room> => {
  const room = await prisma.room.update({
    where: {
      id: roomId,
    },

    data,
  });
  return room;
};

export const createRooms = async (data: Prisma.RoomCreateManyInput[]) => {
  const rooms = await prisma.room.createMany({
    data,
  });
  return rooms;
};
