import Pool from 'pg-pool';
import { Client, PoolClient } from 'pg';
import { dbConfig } from 'configs';
import { IQueryResult } from 'types/db.type';
import logger from '_helpers/logger';
import { ICommonObject } from '_types/common.type';
import camelcaseKeys from 'camelcase-keys';

import usersDb from './users.db';
import partyDb from './party.db';
import userPartyDb from './userParty.db';

const pool: Pool<Client> = new Pool(dbConfig);

const query = (
  sql: string,
  params?: (number | string | boolean)[] | undefined,
): Promise<IQueryResult> => pool.query(sql, params);

const execTransaction = async (
  callback: CallableFunction,
): Promise<{ result: any, error: Error; }> => {
  const transactionPool = await pool.connect();
  let result: any;
  let error: any;
  try {
    logger.info('start transacion');
    await transactionPool.query('BEGIN');
    result = await callback(transactionPool);
    logger.info('end transaction');
    await transactionPool.query('COMMIT');
  } catch (err) {
    logger.info('something went wrong, rolling back');
    await transactionPool.query('ROLLBACK');
    error = err;
  } finally {
    transactionPool.release();
  }
  return { result, error };
};

const migrate = async (): Promise<void> => {
  await execTransaction(async (transactionPool: PoolClient): Promise<void> => {
    await usersDb.createTable(transactionPool);
    await partyDb.createTable(transactionPool);
    await userPartyDb.createTable(transactionPool);
    logger.info('migrate successfully');
  });
};

const extractResult = (
  queryResult: IQueryResult,
): ICommonObject[] => (queryResult
  ? camelcaseKeys(queryResult.rows, { deep: true })
  : []);

export default {
  query,
  execTransaction,
  migrate,
  extractResult,
};

export {
  usersDb,
  partyDb,
  userPartyDb,
};
