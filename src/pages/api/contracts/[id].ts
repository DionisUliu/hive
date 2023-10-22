import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorMiddleware } from '@/lib/middleware/errorMiddleware';
import { onNoMatch } from '@/lib/middleware/onNoMatch';
import * as controller from '@/lib/modules/contract/contract.controller';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.patch(controller.updateContract);
router.get(controller.getContract);
router.delete(controller.deleteContract);

export default router.handler({
  onError: errorMiddleware,
  onNoMatch,
});
