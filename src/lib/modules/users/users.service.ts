import {
  IUserCreate,
  IUserRegistration,
  ResetPasswordBody,
  SendResetLinkBody,
  ValidateResetLinkParams,
} from '@/lib/utilities/types';
import * as dal from './users.dal';
import * as validator from './users.validator';
import bcrypt from 'bcrypt';
import { UnprocessableEntity } from '@/lib/utilities/error';
import errorMessages from '@/constants/errorMessages';
import { Prisma } from '@prisma/client';
import { sendResetPasswordLinkTemplate } from '@/templates/sendResetPasswordLinkTemplate';
import { generateKey } from '@/lib/utilities/generals';
import { sendEmail } from '@/lib/utilities/sendEmail';

export const getUsers = async () => {
  const users = await dal.getAllUsers();

  return users;
};

export const getUserById = async (userId: string) => {
  const user = await dal.getUserById(userId);

  return user;
};

export const createUser = async (userData: IUserRegistration) => {
  const foundUser = await dal.findUser({ email: userData.email });

  if (foundUser) throw new UnprocessableEntity(errorMessages.SIGNUP.USER_EXIST);

  const user = await dal.createUser(userData);

  return user;
};

export const updateUser = async (
  userId: string,
  updatedUserData: IUserCreate,
) => {
  const updatedUser = await dal.updateUserById(userId, updatedUserData);

  return updatedUser;
};

export const deleteUser = async (userId: string) => {
  await dal.deleteUser(userId);
};

export const sendResetPasswordLink = async (body: SendResetLinkBody) => {
  validator.validateSendResetLink(body);

  const query: Prisma.UserWhereInput = { email: body.email };
  const foundUser = await dal.findUser(query);

  if (!foundUser?.password)
    throw new UnprocessableEntity(errorMessages.USERS.NOT_NORMAL_USER);

  const verificationCode = generateKey();

  const data: Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput = {
    verificationCode: verificationCode,
  };

  const toAddress = body.email;
  const subject = 'Hive - Reset Password';
  const link = `${process.env.DOMAIN}reset-password?verification=${verificationCode}&id=${foundUser.id}`;

  const template = sendResetPasswordLinkTemplate(
    foundUser.firstName || '',
    link,
  );
  try {
    await Promise.all([
      sendEmail({ toAddress, subject, template }),
      dal.updateUserById(foundUser.id, data),
    ]);
    return true;
  } catch (error) {
    throw new Error('Sending reset password link failed');
  }
};

export const validateResetPasswordLink = async (
  params: ValidateResetLinkParams,
) => {
  validator.validateResetLinkParams(params);
  try {
    const query: Prisma.UserWhereInput = {
      id: params.id,
    };
    const user = await dal.findUser(query);

    if (!user?.password)
      throw new UnprocessableEntity(errorMessages.USERS.NOT_NORMAL_USER);

    if (user.verificationCode !== params.verificationCode)
      throw new UnprocessableEntity(
        errorMessages.USERS.INVALID_RESET_PASSWORD_LINK,
      );
  } catch (error) {
    throw new Error('Validating reset password link failed');
  }
};

export const resetPassword = async (body: ResetPasswordBody) => {
  validator.validateResetPasswordBody(body);

  try {
    const query: Prisma.UserWhereInput = { id: body.id };
    const user = await dal.findUser(query);
    if (!user?.password)
      throw new UnprocessableEntity(errorMessages.USERS.NOT_NORMAL_USER);

    if (user.verificationCode !== body.verificationCode)
      throw new UnprocessableEntity(
        errorMessages.USERS.INVALID_RESET_PASSWORD_LINK,
      );
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(body.password, salt);

    const data: Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput = {
      password,
    };
    await dal.updateUserById(user.id, data);
  } catch (error) {
    throw new Error('Resetting password failed');
  }
};
