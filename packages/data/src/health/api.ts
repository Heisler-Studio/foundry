import { api } from '../client';
import { HealthCheckResponse } from './types';

export const healthCheck = async (): Promise<HealthCheckResponse> => {
  try {
    console.info('Health check query start');
    const { data } = await api.get('/health-check');
    return data;
  } catch (error) {
    console.error('health check query error', error);
    return {
      status: 'error',
    };
  }
};
