import { PoolClient } from 'pg';
import db from '_db';
import { JoinPartyInput } from '_dto';
import logger from '_helpers/logger';
import { ICommonObject } from '_types/common.type';

export default {
  createTable: async (transactionPool: PoolClient): Promise<void> => {
    await transactionPool.query(`
      CREATE TABLE IF NOT EXISTS USER_PARTY (
        ID SERIAL PRIMARY KEY,
        CREATED_AT TIMESTAMP NOT NULL,
        USER_ID INT NOT NULL REFERENCES USERS(ID) ON DELETE RESTRICT ON UPDATE CASCADE,
        PARTY_ID INT NOT NULL REFERENCES PARTY(ID) ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);
  },
  create: async (
    transactionPool: PoolClient,
    { userId, partyId }: JoinPartyInput,
  ): Promise<void> => {
    await transactionPool.query(`
      INSERT INTO USER_PARTY (
        CREATED_AT, USER_ID, PARTY_ID
      ) VALUES (
        NOW(), $1, $2
      );
    `, [userId, partyId]);
    logger.info('create user-party done');
  },
  findByUserId: async (
    userId: number,
  ): Promise<ICommonObject[]> => {
    const result = await db.query(`
      SELECT * FROM USER_PARTY WHERE USER_ID = $1;
    `, [userId]);
    return db.extractResult(result);
  },
};
