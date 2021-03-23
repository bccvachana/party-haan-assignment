import { IsEmail, IsString, MinLength } from 'class-validator';
import { IUserInput } from '_types/user.type';

export default class UserRegisterInput {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  constructor({
    email,
    password,
  }: IUserInput) {
    this.email = email;
    this.password = password;
  }
}
