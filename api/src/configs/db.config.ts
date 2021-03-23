import dotenv from 'dotenv';
import { toNumber } from 'lodash/fp';

dotenv.config();
const { env } = process;

export const dbConfig = {
  host: env.POSTGRES_HOST,
  port: toNumber(env.POSTGRES_PORT),
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
};
