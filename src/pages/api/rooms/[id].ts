import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorMiddleware } from '@/lib/middleware/errorMiddleware';
import { onNoMatch } from '@/lib/middleware/onNoMatch';
import * as controller from '@/lib/modules/room/room.controller';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(controller.getRoom);

export default router.handler({
  onError: errorMiddleware,
  onNoMatch,
});
