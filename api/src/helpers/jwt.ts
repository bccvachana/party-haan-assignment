import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '_configs';
import { IUser } from '_types/user.type';

export const generateAccessToken = async (
  { id }: IUser,
): Promise<string> => jwt.sign({
  type: 'access',
  userId: id,
}, jwtSecretKey, {
  expiresIn: 15 * 60, // 15 mins
});

export const generateRefreshToken = async (
  { id, password }: IUser,
): Promise<string> => jwt.sign({
  type: 'refresh',
  userId: id,
  key: id + password,
}, jwtSecretKey);
