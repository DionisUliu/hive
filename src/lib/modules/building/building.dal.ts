import { Prisma } from '@prisma/client';
import prisma from '../../../config/prisma';

export const getBuildings = async (query?: Prisma.BuildingWhereInput) => {
  const jobs = await prisma.building.findMany({
    where: query,
  });
  return jobs;
};
