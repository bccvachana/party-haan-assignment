import { IsEmail, IsString } from 'class-validator';
import { IUserInput } from '_types/user.type';

export default class UserRegisterInput {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  constructor({
    email,
    password,
  }: IUserInput) {
    this.email = email;
    this.password = password;
  }
}
