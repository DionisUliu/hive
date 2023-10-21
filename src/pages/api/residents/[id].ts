import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { errorMiddleware } from '@/lib/middleware/errorMiddleware';
import { onNoMatch } from '@/lib/middleware/onNoMatch';
import * as controller from '@/lib/modules/resident/resident.controller';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(controller.getResident);
router.patch(controller.updateResident);
router.delete(controller.deactivateResident);

export default router.handler({
  onError: errorMiddleware,
  onNoMatch,
});
