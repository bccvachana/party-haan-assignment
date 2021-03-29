import { PoolClient } from 'pg';
import db from '_db';
import { CreatePartyInput, JoinPartyInput } from '_dto';
import logger from '_helpers/logger';
import { ICommonObject } from '_types/common.type';

export default {
  createTable: async (transactionPool: PoolClient): Promise<void> => {
    await transactionPool.query(`
      CREATE TABLE IF NOT EXISTS PARTY (
        ID SERIAL PRIMARY KEY,
        CREATED_AT TIMESTAMP NOT NULL,
        CREATED_BY INT NOT NULL REFERENCES USERS(ID) ON DELETE RESTRICT ON UPDATE CASCADE,
        UPDATED_AT TIMESTAMP NOT NULL,
        NAME TEXT NOT NULL,
        TOTAL_PARTICIPANT INT NOT NULL,
        PARTICIPANT INT NOT NULL,
        IMG_URL TEXT NOT NULL UNIQUE
      );
    `);
  },
  create: async (
    transactionPool: PoolClient,
    {
      userId, name, numPeople, imgUrl,
    }: CreatePartyInput,
  ): Promise<void> => {
    await transactionPool.query(`
      INSERT INTO PARTY (
        CREATED_AT, CREATED_BY, UPDATED_AT, 
        NAME, TOTAL_PARTICIPANT,
        PARTICIPANT, IMG_URL 
      ) VALUES (
        NOW(), $1, NOW(),
        $2, $3,
        0, $4
      );
    `, [userId, name, numPeople, imgUrl]);
    logger.info('create party done');
  },
  find: async (): Promise<ICommonObject[]> => {
    const result = await db.query(`
      SELECT
        *,
        CASE 
            WHEN participant >= total_participant THEN true
            ELSE false
          END is_full
      FROM
        PARTY
      ORDER BY
        created_at DESC;
    `);
    return db.extractResult(result);
  },
  join: async (
    transactionPool: PoolClient,
    { partyId }: JoinPartyInput,
  ): Promise<void> => {
    await transactionPool.query(`
      UPDATE 
        PARTY
      SET 
        PARTICIPANT = PARTICIPANT + 1
      WHERE 
        id = $1;
    `, [partyId]);
    logger.info('join party done');
  },
};
