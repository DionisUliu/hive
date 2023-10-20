import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { onNoMatch } from '@/lib/middleware/onNoMatch';
import { errorMiddleware } from '@/lib/middleware/errorMiddleware';
import * as controller from '@/lib/modules/users/users.controller';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(controller.getUser);
router.put(controller.updateUser);
router.delete(controller.deleteUser);

export default router.handler({
  onError: errorMiddleware,
  onNoMatch,
});
