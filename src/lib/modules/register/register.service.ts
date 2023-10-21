import { Prisma } from '@prisma/client';
import {
  ICreateRegisterBody,
  IUpdateRegisterBody,
} from '@/lib/utilities/types';
import { NotFound, UnprocessableEntity } from '@/lib/utilities/error';
import errors from '@/config/errors';
import * as dal from './register.dal';
import * as roomDal from '../room/room.dal';
import * as residentDal from '../resident/resident.dal';
import * as buildingDal from '../building/building.dal';

export const createRegistration = async (data: ICreateRegisterBody) => {
  const registration = await dal.getRegistration(data);
  if (registration) {
    throw new UnprocessableEntity(errors.REGISTER.UNPROCESSABLE_ENTITY);
  }

  const foundResident = await residentDal.getResidentById(data.residentId);
  if (!foundResident) throw new NotFound(errors.RESIDENT.NOT_FOUND);

  const foundRoom = await roomDal.getRoomById(data.roomId);
  if (!foundRoom) throw new NotFound(errors.ROOM.NOT_FOUND);

  const foundContract = await roomDal.getRoomById(data.contractId);
  if (!foundContract) throw new NotFound(errors.CONTRACT.NOT_FOUND);

  return await dal.createRegistration(data);
};

export const getRegistrations = async (
  roomId: string | null,
  residentId: string | null,
) => {
  const query: Prisma.RegisterWhereInput = {};

  if (roomId) {
    const room = await roomDal.getRoomById(roomId);
    if (!room) throw new NotFound(errors.CONTRACT.NOT_FOUND);
    query.roomId = roomId;
  }

  if (residentId) {
    const resident = await residentDal.getResidentById(residentId);
    if (!resident) throw new NotFound(errors.CONTRACT.NOT_FOUND);
    query.residentId = residentId;
  }

  const registrations = await dal.getRegistrations(query);
  return registrations;
};

export const getRegistration = async (id: string) => {
  const registration = await dal.getRegistrationById(id);

  if (!registration) {
    throw new NotFound(errors.REGISTER.NOT_FOUND);
  }
  return registration;
};

export const updateRegistration = async (
  id: string,
  data: IUpdateRegisterBody,
) => {
  const registration = await dal.getRegistrationById(id);
  if (!registration) {
    throw new NotFound(errors.REGISTER.NOT_FOUND);
  }
  const updateBody: IUpdateRegisterBody = { ...data };

  if (data?.roomId) {
    const room = await roomDal.getRoomById(data.roomId);
  }

  const updatedResident = await dal.updateRegistrationById(id, updateBody);
  return updatedResident;
};
