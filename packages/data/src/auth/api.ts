import { api } from '../client';
import { AuthResponse, LoginParams } from './types';

export const loginWithProvider = async (params: LoginParams): Promise<AuthResponse> => {
  console.log('[TODO]: Wrap requests in logging interface');
  const { data } = await api.post('/auth/azure/login', params);
  return data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};
