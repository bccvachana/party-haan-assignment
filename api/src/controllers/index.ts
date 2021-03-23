import express, { Router } from 'express';
import { map } from 'lodash/fp';
import userRouter from './user.route';

const router: Router = express.Router();

const routes = [
  {
    router: userRouter,
    path: '/user',
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
