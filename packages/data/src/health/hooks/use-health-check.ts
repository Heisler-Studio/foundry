import { useSuspenseQuery } from '@tanstack/react-query';
import { healthCheck } from '../api';

export const useHealthCheck = () => {
  return useSuspenseQuery({
    queryFn: healthCheck,
    queryKey: ['health-check'],
  });
};
