import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import Util from 'util';
import { GeneralError, InternalError } from '../utilities/error';

/**
 * Express error handling middleware
 */

export const errorMiddleware = (
  err: any,
  req?: NextApiRequest,
  res?: NextApiResponse,
  next?: NextHandler,
) => {
  let fullPath = null;
  let error = err;

  if (!(err instanceof GeneralError)) {
    error = new InternalError(
      typeof err === 'object' ? Util.inspect(err) : err,
    );
  }
  error.setPath(fullPath);
  if (res?.headersSent) {
    next!();

    return;
  }
  if (!error.logOnly) {
    res?.status(error.getCode()).json(error.printForHTTPResponse());
  }
};
