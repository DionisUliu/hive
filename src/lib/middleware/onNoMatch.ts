import { NextApiRequest, NextApiResponse } from 'next';
// import api from '../../constants/errors';

export const onNoMatch = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(404).end('api.GENERAL.PAGE_NOT_FOUND');
};
