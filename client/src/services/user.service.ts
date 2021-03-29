import {
  compose, get, getOr, keyBy,
} from 'lodash/fp';
import { setParticipatedParty, setUser } from 'store/user/func';
import { ICommonObject } from 'types/common.type';
import { IUserInput } from 'types/user.type';
import { axiosInstance } from 'utils/axios';

const extractedParticipatedParty = (
  partyResult: ICommonObject,
): ICommonObject => compose(
  keyBy('partyId'),
  (result) => getOr([], 'data.data', result),
)(partyResult);

const register = async (
  registerValue: IUserInput,
): Promise<void> => {
  await axiosInstance.post(
    '/user/register',
    registerValue,
  );
};

const login = async (
  loginValue: IUserInput,
): Promise<void> => {
  await axiosInstance.post(
    '/user/login',
    loginValue,
  );
  localStorage.setItem('userIsLogin', 'true');
  window.location.href = '/party';
};

const logout = async (): Promise<void> => {
  await axiosInstance.post('/user/logout');
  localStorage.removeItem('userIsLogin');
  window.location.href = '/login';
};

const auth = async (): Promise<void> => {
  if (!localStorage.getItem('userIsLogin')) {
    setUser({});
    return;
  }
  try {
    const { data } = await axiosInstance.get('/user/auth');
    const userId = get('user.id', data);
    const userParticipatedPartyResult = await axiosInstance.get('/user/participated-party');
    setUser({
      id: userId,
      email: get('user.email', data),
      paticipatedParty: extractedParticipatedParty(
        userParticipatedPartyResult,
      ),
    });
  } catch {
    setUser({});
  }
};

const refreshToken = async (): Promise<void> => {
  await axiosInstance.get('/user/refresh-token');
};

const findParticipatedParty = async (): Promise<void> => {
  const result = await axiosInstance.get('/user/participated-party');
  setParticipatedParty(
    extractedParticipatedParty(result),
  );
};

export default {
  register,
  login,
  logout,
  auth,
  refreshToken,
  findParticipatedParty,
};
