import { Prisma } from '@prisma/client';
import * as dal from './building.dal';

export const getAllBuildings = async () => {
  const query: Prisma.BuildingWhereInput = {};
  return await dal.getBuildings(query);
};
