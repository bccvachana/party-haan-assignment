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
      res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'none' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
      res.send({
        message: 'login successfully',
        user,
      });
    },
  ),
);

router.post(
  '/logout',
  asyncWrapper(
    async (req: Request, res: Response) => {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.send();
    },
  ),
);

export default router;
