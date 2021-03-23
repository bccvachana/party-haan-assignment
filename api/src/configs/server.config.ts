import dotenv from 'dotenv';
import { toNumber } from 'lodash/fp';

dotenv.config();
const { env } = process;

export const serverConfig = {
  port: toNumber(env.PORT),
};
