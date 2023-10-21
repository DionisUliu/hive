import { Contract, Prisma } from '@prisma/client';
import prisma from '../../../config/prisma';

export const createContract = async (
  data: Prisma.ContractCreateInput | Prisma.ContractUncheckedCreateInput,
) => {
  const contract = await prisma.contract.create({
    data,
  });
  return contract;
};

export const getContracts = async (query?: Prisma.ContractWhereInput) => {
  const contracts = await prisma.contract.findMany({
    where: {
      ...query,
      deletedAt: {
        not: {
          equals: null,
        },
      },
    },
    include: { resident: true, Room: true },
    orderBy: { createdAt: 'desc' },
  });
  return contracts;
};

export const getContract = async (query: Prisma.ContractWhereInput) => {
  const contract = await prisma.contract.findFirst({
    where: {
      ...query,
      deletedAt: {
        not: {
          equals: null,
        },
      },
    },
    include: { resident: true, Room: true },
  });
  return contract;
};

export const getContractById = async (id: string) => {
  const contract = await prisma.contract.findFirst({
    where: {
      id,
      deletedAt: {
        not: {
          equals: null,
        },
      },
    },
    include: { resident: true, Room: true },
  });
  return contract;
};

export const updateContractById = async (
  roomId: string,
  data: Prisma.ContractUpdateInput | Prisma.ContractUncheckedUpdateInput,
): Promise<Contract> => {
  const contract = await prisma.contract.update({
    where: {
      id: roomId,
    },
    data,
  });
  return contract;
};

export const deleteContract = async (contractId: string) => {
  const contract = await prisma.contract.delete({
    where: {
      id: contractId,
    },
  });

  return contract;
};
