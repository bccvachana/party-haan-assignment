import { PoolClient } from 'pg';
import logger from '_helpers/logger';
import db from '_db';
import { ICommonObject } from '_types/common.type';
import { UserRegisterInput } from '_dto';

export default {
  createTable: async (transactionPool: PoolClient): Promise<void> => {
    await transactionPool.query(`
      CREATE TABLE IF NOT EXISTS USERS (
        ID SERIAL PRIMARY KEY,
        CREATED_AT TIMESTAMP NOT NULL,
        UPDATED_AT TIMESTAMP NOT NULL,
        EMAIL TEXT NOT NULL UNIQUE,
        PASSWORD TEXT NOT NULL
      );
    `);
  },
  create: async (
    transactionPool: PoolClient,
    { email, password }: UserRegisterInput,
  ): Promise<void> => {
    await transactionPool.query(`
      INSERT INTO USERS (
        CREATED_AT, UPDATED_AT, EMAIL, PASSWORD
      ) VALUES (
        NOW(), NOW(), $1, $2
      );
    `, [email, password]);
    logger.info('create user done');
  },
  findByEmail: async (
    email: string,
  ): Promise<ICommonObject[]> => {
    const result = await db.query(`
      SELECT * FROM USERS WHERE EMAIL ILIKE $1
    `, [email]);
    return db.extractResult(result);
  },
  findById: async (
    id: number,
  ): Promise<ICommonObject[]> => {
    const result = await db.query(`
      SELECT * FROM USERS WHERE ID = $1
    `, [id]);
    return db.extractResult(result);
  },
};
