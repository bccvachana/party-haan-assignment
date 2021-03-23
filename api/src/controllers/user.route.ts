/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, Router } from 'express';
import asyncWrapper from '_middlewares/asyncWrapper';
import userService from '_services/user.service';
import { getOr } from 'lodash/fp';

const router: Router = express.Router();

router.post(
  '/register',
  asyncWrapper(
    async (req: Request, res: Response) => {
      const payload = getOr({}, 'body', req);
      await userService.register(payload);
      res.send({
        message: 'register successfully',
      });
    },
  ),
);

router.post(
  '/login',
  asyncWrapper(
    async (req: Request, res: Response) => {
      const payload = getOr({}, 'body', req);
      const {
        user,
        accessToken,
        refreshToken,
      } = await userService.login(payload);
      res.cookie('partyHaan-accessToken', accessToken, { httpOnly: true });
      res.cookie('partyHaan-refreshToken', refreshToken, { httpOnly: true });
      res.send({
        message: 'login successfully',
        user,
      });
    },
  ),
);

export default router;
