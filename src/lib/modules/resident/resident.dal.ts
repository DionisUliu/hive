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
    where: query,
  });
  return residents;
};

export const getResident = async (query: Prisma.ResidentWhereInput) => {
  const resident = await prisma.resident.findFirst({
    where: query,
  });
  return resident;
};

export const getResidentById = async (id: string) => {
  const resident = await prisma.resident.findFirst({
    where: {
      id,
    },
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
  });
  return resident;
};

export const deactivateResident = async (roomId: string) => {
  const resident = await prisma.resident.delete({
    where: {
      id: roomId,
    },
  });

  return resident;
};
