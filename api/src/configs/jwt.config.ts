import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

export const jwtSecretKey = env.JWT_SECRET_KEY || 'party-haan-secret-key';
