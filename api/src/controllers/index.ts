import express, { Router } from 'express';
import { map } from 'lodash/fp';
import userRouter from './user.route';
import partyRouter from './party.route';

const router: Router = express.Router();

const routes = [
  {
    router: userRouter,
    path: '/user',
  },
  {
    router: partyRouter,
    path: '/party',
  },
];

map(({
  router: subRouter,
  path,
}: {
  router: Router,
  path: string;
}) => {
  router.use(path, subRouter);
}, routes);

export default router;
