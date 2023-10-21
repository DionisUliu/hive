import { Prisma, Resident } from '@prisma/client';
import prisma from '../../../config/prisma';

export const createResident = async (
  data: Prisma.ResidentCreateInput | Prisma.ResidentUncheckedCreateInput,
) => {
  const resident = await prisma.resident.create({
    data,
  });
  return resident;
};

export const getResidents = async (query?: Prisma.ResidentWhereInput) => {
  const residents = await prisma.resident.findMany({
    where: {
      ...query,
      deletedAt: {
        not: {
          equals: null,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    include: { contract: true, history: true },
  });
  return residents;
};

export const getResident = async (query: Prisma.ResidentWhereInput) => {
  const resident = await prisma.resident.findFirst({
    where: {
      ...query,
      deletedAt: {
        not: {
          equals: null,
        },
      },
    },
    include: { contract: true, history: true },
  });
  return resident;
};

export const getResidentById = async (id: string) => {
  const resident = await prisma.resident.findFirst({
    where: {
      id,
      deletedAt: {
        not: {
          equals: null,
        },
      },
    },
    include: { contract: true, history: true },
  });
  return resident;
};

export const updateResidentById = async (
  roomId: string,
  data: Prisma.ResidentUpdateInput | Prisma.ResidentUncheckedUpdateInput,
): Promise<Resident> => {
  const resident = await prisma.resident.update({
    where: {
      id: roomId,
    },
    data,
    include: { contract: true, history: true },
  });
  return resident;
};

export const deactivateResident = async (roomId: string) => {
  const resident = await prisma.resident.delete({
    where: {
      id: roomId,
    },
    include: { contract: true, history: true },
  });

  return resident;
};
