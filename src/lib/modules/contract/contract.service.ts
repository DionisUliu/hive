import {
  ICreateContractBody,
  IUpdateContractBody,
} from '@/lib/utilities/types';
import { NotFound, UnprocessableEntity } from '@/lib/utilities/error';
import errors from '@/config/errors';
import * as dal from './contract.dal';
import * as roomDal from '../room/room.dal';
import * as residentDal from '../resident/resident.dal';
import { Prisma } from '@prisma/client';

export const createContract = async (data: ICreateContractBody) => {
  // validation

  const contract = await dal.getContract({ ...data });
  if (contract)
    throw new UnprocessableEntity(errors.CONTRACT.UNPROCESSABLE_ENTITY);

  const room = await roomDal.getRoomById(data.roomId);
  if (!room) throw new NotFound(errors.ROOM.NOT_FOUND);

  const resident = await residentDal.getResidentById(data.residentId);
  if (!resident) throw new NotFound(errors.RESIDENT.NOT_FOUND);

  return await dal.createContract(data);
};

export const updateContract = async (id: string, data: IUpdateContractBody) => {
  //validate body

  const contract = await dal.getContractById(id);
  if (!contract) throw new NotFound(errors.CONTRACT.NOT_FOUND);

  if (data?.roomId) {
    const room = await roomDal.getRoomById(data.roomId);
    if (!room) throw new NotFound(errors.ROOM.NOT_FOUND);
  }

  if (data?.residentId) {
    const resident = await residentDal.getResidentById(data.residentId);
    if (!resident) throw new NotFound(errors.RESIDENT.NOT_FOUND);
  }

  await dal.updateContractById(id, data);
};

export const getContract = async (id: string) => {
  const contract = await dal.getContractById(id);

  if (!contract) {
    throw new NotFound(errors.CONTRACT.NOT_FOUND);
  }
  if (contract.deletedAt) {
    throw new NotFound(errors.CONTRACT.DELETED_CONTRACT);
  }
  return contract;
};

export const deleteContract = async (id: string) => {
  const deletedAt = new Date();
  const contract = await dal.updateContractById(id, { deletedAt });

  if (!contract) {
    throw new NotFound(errors.CONTRACT.NOT_FOUND);
  }
  return contract;
};

export const getContracts = async (
  roomId: string | null,
  residentId: string | null,
) => {
  const query: Prisma.ContractWhereInput = {};

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
  const contracts = await dal.getContracts(query);
  return contracts;
};