import UserRegisterInput from './user/userRegister.input';
import UserLoginInput from './user/userLogin.input';
import CreatePartyInput from './party/createParty.input';
import JoinPartyInput from './party/joinParty.input copy';

export {
  UserRegisterInput,
  UserLoginInput,
  CreatePartyInput,
  JoinPartyInput,
};

export type TClassDTO =
  UserRegisterInput
  | UserLoginInput
  | CreatePartyInput
  | JoinPartyInput;
