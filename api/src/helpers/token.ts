import jwt from 'jsonwebtoken';
import cryptoJs from 'crypto-js';
import { secretKey } from '_configs';
import { IUser } from '_types/user.type';

export const generateKey = async (
  rawKey: string,
): Promise<string> => cryptoJs.HmacSHA256(
  rawKey,
  secretKey,
).toString();

export const generateAccessToken = async (
  { id }: IUser,
): Promise<string> => jwt.sign({
  type: 'access',
  userId: id,
}, secretKey, {
  expiresIn: 15 * 60, // 15 mins
});

export const generateRefreshToken = async (
  { id, password }: IUser,
): Promise<string> => jwt.sign({
  type: 'refresh',
  userId: id,
  key: await generateKey(id + password),
}, secretKey);
