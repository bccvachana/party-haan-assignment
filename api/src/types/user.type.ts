export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  password: string;
}

export interface IUserInput {
  email: string;
  password: string;
}
