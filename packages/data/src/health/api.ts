import { HealthCheckResponse } from './types';

export const healthCheck = async (): Promise<HealthCheckResponse> => {
  return {
    status: 'ok',
  };
};
