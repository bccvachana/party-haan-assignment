import { PoolClient } from 'pg';
import { validateClassDTO } from '_helpers/classValidator';
import db, { partyDb, userPartyDb } from '_db';
import { ICreatePartyInput, IJoinPartyInput } from '_types/party.type';
import { CreatePartyInput, JoinPartyInput } from '_dto';
import { ICommonObject } from '_types/common.type';

const find = async (): Promise<ICommonObject[]> => partyDb.find();

const create = async (
  payload: ICreatePartyInput,
): Promise<void> => {
  const createPartyInput: CreatePartyInput = new CreatePartyInput(payload);
  await validateClassDTO(createPartyInput);
  const { error } = await db.execTransaction(
    async (transactionPool: PoolClient) => {
      await partyDb.create(
        transactionPool,
        createPartyInput,
      );
    },
  );
  if (error) throw error;
};

const join = async (
  payload: IJoinPartyInput,
): Promise<void> => {
  const joinPartyInput: JoinPartyInput = new JoinPartyInput(payload);
  await validateClassDTO(joinPartyInput);
  const { error } = await db.execTransaction(
    async (transactionPool: PoolClient) => {
      await userPartyDb.create(transactionPool, joinPartyInput);
      await partyDb.join(
        transactionPool,
        joinPartyInput,
      );
    },
  );
  if (error) throw error;
};

export default {
  find,
  create,
  join,
};
