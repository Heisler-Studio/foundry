import { useQuery } from '@tanstack/react-query';
import { healthCheck } from '../api';

export const useHealthCheck = () => {
  return useQuery({
    queryFn: healthCheck,
    queryKey: ['health-check'],
  });
};
