import express, { Request, Response, Router } from 'express';
import asyncWrapper from '_middlewares/asyncWrapper';
import auth from '_middlewares/auth';
import userService from '_services/user.service';
import { get, getOr } from 'lodash/fp';

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
        accessToken,
        refreshToken,
      } = await userService.login(payload);
      res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'none' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
      res.send({
        message: 'login successfully',
      });
    },
  ),
);

router.post(
  '/logout',
  asyncWrapper(
    async (req: Request, res: Response) => {
      res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'none' });
      res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'none' });
      res.send({
        message: 'logout successfully',
      });
    },
  ),
);

router.get(
  '/auth',
  auth,
  asyncWrapper(
    async (req: Request, res: Response) => {
      res.send({
        user: res.locals.user,
        message: 'authenticate successfully',
      });
    },
  ),
);

router.get(
  '/refresh-token',
  asyncWrapper(
    async (req: Request, res: Response) => {
      const refreshToken = get('cookies.refreshToken', req);
      const { accessToken } = await userService.refreshToken(refreshToken);
      res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'none' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
      res.send({
        message: 'refresh token successfully',
      });
    },
  ),
);

router.get(
  '/participated-party',
  auth,
  asyncWrapper(
    async (req: Request, res: Response) => {
      const result = await userService.findParticipatedParty(
        get('locals.user.id', res) as number,
      );
      res.send({
        data: result,
      });
    },
  ),
);

export default router;
