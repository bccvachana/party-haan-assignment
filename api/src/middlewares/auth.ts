import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash/fp';
import jwt from 'jsonwebtoken';
import { secretKey } from '_configs';
import logger from '_helpers/logger';
import stripAnsi from 'strip-ansi';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const accessToken = get('cookies.accessToken', req);
  try {
    const tokenPayload = jwt.verify(accessToken, secretKey);
    res.locals.user = tokenPayload;
    next();
  } catch (err) {
    logger.error(err);
    res
      .status(401)
      .send({
        code: 401,
        message: stripAnsi(err.message),
      });
  }
};
