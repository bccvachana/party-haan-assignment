import { axiosInstance } from 'utils/axios';

const login = async (loginValues: {
  email: string;
  password: string;
}): Promise<void> => {
  await axiosInstance.post(
    '/user/login',
    loginValues,
  );
  window.location.href = '/party';
};

const logout = async (): Promise<void> => {
  await axiosInstance.post('/user/logout');
  window.location.href = '/login';
};

export default {
  login,
  logout,
};
