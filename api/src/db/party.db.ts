import { PoolClient } from 'pg';

export default {
  createTable: async (transactionPool: PoolClient): Promise<void> => {
    await transactionPool.query(`
      CREATE TABLE IF NOT EXISTS PARTY (
        ID SERIAL PRIMARY KEY,
        CREATED_AT TIMESTAMP NOT NULL,
        CREATED_BY INT NOT NULL REFERENCES USERS(ID) ON DELETE RESTRICT ON UPDATE CASCADE,
        UPDATED_AT TIMESTAMP NOT NULL,
        NAME TEXT NOT NULL,
        NUM_PEOPLE NUMERIC NOT NULL
      );
    `);
  },
};
