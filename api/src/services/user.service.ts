import { UserLoginInput, UserRegisterInput } from '_dto';
import { validateClassDTO } from '_helpers/classValidator';
import { IUser, IUserInput } from '_types/user.type';
import usersDb from '_db/users.db';
import bcryptjs from 'bcryptjs';
import db from '_db';
import { PoolClient } from 'pg';
import { isEmpty, omit } from 'lodash/fp';
import { ApiError } from '_helpers/error';
import { generateAccessToken, generateRefreshToken } from '_helpers/token';
import { ICommonObject } from '_types/common.type';

const register = async (
  payload: IUserInput,
): Promise<void> => {
  const userRegisterInput: UserRegisterInput = new UserRegisterInput(payload);
  await validateClassDTO(userRegisterInput);
  const { email, password } = userRegisterInput;
  db.execTransaction(async (transactionPool: PoolClient) => {
    await usersDb.insert(
      transactionPool,
      {
        email,
        password: await bcryptjs.hash(password, 10),
      },
    );
  });
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
    user: omit('password', user),
    accessToken,
    refreshToken,
  };
};

export default {
  register,
  login,
};
