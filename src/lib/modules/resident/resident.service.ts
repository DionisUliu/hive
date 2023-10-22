import { Prisma } from '@prisma/client';
import {
  ICreateResidentBody,
  IUpdateResidentBody,
} from '@/lib/utilities/types';
import { NotFound, UnprocessableEntity } from '@/lib/utilities/error';
import errors from '@/config/errors';

import * as dal from './resident.dal';

export const createResident = async (data: ICreateResidentBody) => {
  const foundResident = await dal.getResident({ email: data.email });
  if (foundResident)
    throw new UnprocessableEntity(errors.RESIDENT.UNPROCESSABLE_ENTITY);

  return await dal.createResident(data);
};

export const getResidents = async () => {
  const query: Prisma.ResidentWhereInput = {};
  return await dal.getResidents(query);
};

export const getResident = async (id: string) => {
  const resident = await dal.getResidentById(id);
  if (!resident) {
    throw new NotFound(errors.RESIDENT.NOT_FOUND);
  }
  return resident;
};

export const updateResident = async (id: string, data: IUpdateResidentBody) => {
  const resident = await dal.getResidentById(id);

  if (!resident) {
    throw new NotFound(errors.RESIDENT.NOT_FOUND);
  }

  const updatedResident = await dal.updateResidentById(id, data);
  return updatedResident;
};

export const deactivateResident = async (id: string) => {
  const resident = await dal.getResidentById(id);
  if (!resident) {
    throw new NotFound(errors.RESIDENT.NOT_FOUND);
  }
  const deletedAt = new Date();

  const updatedResident = await dal.updateResidentById(id, { deletedAt });
  return updatedResident;
};
