import Joi from 'joi';
import { BadRequest } from '@/lib/utilities/error';

import {
  SendResetLinkBody,
  ValidateResetLinkParams,
  ResetPasswordBody,
} from '@/lib/utilities/types';
import errorMessages from '@/constants/errorMessages';

export const validateSendResetLink = (body: SendResetLinkBody) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().email().required(),
    })
    .required();

  const { error } = schema.validate(body);

  if (error)
    throw new BadRequest(
      error?.details[0].message || errorMessages.GENERAL.BAD_REQUEST,
    );
};

export const validateResetLinkParams = (body: ValidateResetLinkParams) => {
  const schema = Joi.object()
    .keys({
      verificationCode: Joi.string().required(),
      id: Joi.string().required(),
    })
    .required();

  const { error } = schema.validate(body);

  if (error)
    throw new BadRequest(
      error?.details[0].message || errorMessages.GENERAL.BAD_REQUEST,
    );
};

export const validateResetPasswordBody = (body: ResetPasswordBody) => {
  const schema = Joi.object()
    .keys({
      verificationCode: Joi.string().required(),
      id: Joi.string().required(),
      password: Joi.string().required(),
    })
    .required();

  const { error } = schema.validate(body);

  if (error)
    throw new BadRequest(
      error?.details[0].message || errorMessages.GENERAL.BAD_REQUEST,
    );
};
