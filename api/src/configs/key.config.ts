import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

export const secretKey = env.SECRET_KEY || 'party-haan-secret-key';
