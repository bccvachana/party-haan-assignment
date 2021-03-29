import express, { Request, Response, Router } from 'express';
import asyncWrapper from '_middlewares/asyncWrapper';
import auth from '_middlewares/auth';
import { getOr } from 'lodash/fp';
import partyService from '_services/party.service';

const router: Router = express.Router();

router.get(
  '/',
  auth,
  asyncWrapper(
    async (req: Request, res: Response) => {
      const result = await partyService.find();
      res.send({
        data: result,
      });
    },
  ),
);

router.post(
  '/create',
  auth,
  asyncWrapper(
    async (req: Request, res: Response) => {
      const payload = getOr({}, 'body', req);
      await partyService.create(payload);
      res.send({
        message: 'create party successfully',
      });
    },
  ),
);

router.post(
  '/join',
  auth,
  asyncWrapper(
    async (req: Request, res: Response) => {
      const payload = getOr({}, 'body', req);
      await partyService.join(payload);
      res.send({
        message: 'join party successfully',
      });
    },
  ),
);

export default router;
