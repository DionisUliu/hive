import { IUser, IUserRegistration } from '@/lib/utilities/types';
import prisma from '../../../config/prisma';
import { Prisma } from '@prisma/client';

export const findUser = async (query: Prisma.UserWhereInput) => {
  try {
    const user = await prisma.user.findFirst({
      where: query,
    });
    return user;
  } catch (error) {
    console.log('No user found', error);
  }
};

export const getAllUsers = async (query?: IUser) => {
  const users = await prisma.user.findMany({
    where: query,
    orderBy: [{ createdAt: 'desc' }],
  });
  return users;
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
};

export const createUser = async (userData: IUserRegistration) => {
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
};

export const updateUserById = async (
  userId: string,
  data: Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput,
) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
  return user;
};

export const deleteUser = async (userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  });
};
