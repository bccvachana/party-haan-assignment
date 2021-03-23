import { NextFunction, Request, Response } from 'express';
import stripAnsi from 'strip-ansi';
import logger from '_helpers/logger';

export default (fn: Function) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await fn(req, res, next);
  } catch (err) {
    logger.error(err);
    res.status(err.metadata.status);
    res.json({ message: stripAnsi(err.message) });
  }
};
