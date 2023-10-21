import { Prisma } from '@prisma/client';
import prisma from '../../../config/prisma';

export const getBuildings = async (query?: Prisma.BuildingWhereInput) => {
  const buildings = await prisma.building.findMany({
    where: query,
  });
  return buildings;
};

export const getBuilidng = async (query: Prisma.BuildingWhereInput) => {
  const building = await prisma.building.findFirst({
    where: query,
  });
  return building;
};

export const getBuildingById = async (id: string) => {
  const building = await prisma.building.findFirst({
    where: {
      id,
    },
  });
  return building;
};
