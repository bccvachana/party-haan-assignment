import bcryptjs from 'bcryptjs';
import { PoolClient } from 'pg';
import { get, isEmpty } from 'lodash/fp';
import jwt from 'jsonwebtoken';
import { UserLoginInput, UserRegisterInput } from '_dto';
import { validateClassDTO } from '_helpers/classValidator';
import { IUser, IUserInput } from '_types/user.type';
import { ApiError } from '_helpers/error';
import db, { userPartyDb, usersDb } from '_db';
import { generateAccessToken, generateKey, generateRefreshToken } from '_helpers/token';
import { ICommonObject } from '_types/common.type';
import { secretKey } from '_configs';
import { isEqual } from 'lodash';

const register = async (
  payload: IUserInput,
): Promise<void> => {
  const userRegisterInput: UserRegisterInput = new UserRegisterInput(payload);
  await validateClassDTO(userRegisterInput);
  const { email, password } = userRegisterInput;
  const { error } = await db.execTransaction(
    async (transactionPool: PoolClient) => {
      await usersDb.create(
        transactionPool,
        {
          email,
          password: await bcryptjs.hash(password, 10),
        },
      );
    },
  );
  if (error) throw error;
};

const login = async (
  payload: IUserInput,
): Promise<ICommonObject> => {
  const userLoginInput: UserLoginInput = new UserLoginInput(payload);
  await validateClassDTO(userLoginInput);
  const { email, password } = userLoginInput;
  const userResult = await usersDb.findByEmail(email);
  if (isEmpty(userResult)) throw new ApiError('user not found', 400);
  const user = userResult[0] as IUser;
  const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  if (!isPasswordCorrect) throw new ApiError('incorrect password', 400);
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);
  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (
  reqRefreshToken: string,
): Promise<ICommonObject> => {
  const tokenPayload = jwt.verify(reqRefreshToken, secretKey);
  const userResult = await usersDb.findById(get('id', tokenPayload));
  if (isEmpty(userResult)) throw new ApiError('user not found', 400);
  const user = userResult[0] as IUser;
  const keyToCompare = await generateKey(user.id + user.password);
  if (!isEqual(keyToCompare, get('key', tokenPayload))) {
    throw new ApiError('invalid refresh token', 400);
  }
  return {
    accessToken: await generateAccessToken(user),
  };
};

const findParticipatedParty = async (
  userId: number,
): Promise<ICommonObject[]> => userPartyDb.findByUserId(userId);

export default {
  register,
  login,
  refreshToken,
  findParticipatedParty,
};
