import { Prisma, Register } from '@prisma/client';
import prisma from '../../../config/prisma';

export const createRegistration = async (
  data: Prisma.RegisterCreateInput | Prisma.RegisterUncheckedCreateInput,
) => {
  const registration = await prisma.register.create({
    data,
  });
  return registration;
};

export const getRegistrations = async (query?: Prisma.RegisterWhereInput) => {
  const registrations = await prisma.register.findMany({
    where: query,
    include: { Room: true, Resident: true },
  });
  return registrations;
};

export const getRegistration = async (query: Prisma.RegisterWhereInput) => {
  const registration = await prisma.register.findFirst({
    where: query,
    include: { Room: true, Resident: true },
  });
  return registration;
};

export const getRegistrationById = async (id: string) => {
  const registration = await prisma.register.findFirst({
    where: {
      id,
    },
    include: { Room: true, Resident: true },
  });
  return registration;
};

export const updateRegistrationById = async (
  registrationId: string,
  data: Prisma.RegisterUpdateInput | Prisma.RegisterUncheckedUpdateInput,
): Promise<Register> => {
  const registration = await prisma.register.update({
    where: {
      id: registrationId,
    },
    data,
  });
  return registration;
};

export const getActiveRoomsIds = async () => {
  const activeRoomIds = await prisma.register.findMany({
    where: {
      active: true,
    },
    select: { roomId: true },
    distinct: ['roomId'],
  });
  return activeRoomIds;
};

export const getActiveResidentsIds = async () => {
  const activeResidentsIds = await prisma.register.findMany({
    where: {
      active: true,
    },
    select: { roomId: true },
    distinct: ['residentId'],
  });
  return activeResidentsIds;
};

export const getActiveContractsIds = async () => {
  const activeContractsIds = await prisma.register.findMany({
    where: {
      active: true,
    },
    select: { contractId: true },
    distinct: ['contractId'],
  });
  return activeContractsIds;
};
