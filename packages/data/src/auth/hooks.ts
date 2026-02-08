// packages/data/features/auth/hooks.ts
import { useMutation } from '@tanstack/react-query';
import { loginWithProvider, logout } from './api';
import { useAuthStore } from './store';

export const useLogin = () => {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: loginWithProvider,
    onSuccess: (data) => {
      // Logic that connects API result to State updates happens here
      setSession(data);
    },
  });
};

export const useLogout = () => {
  const clearSession = useAuthStore((s) => s.clearSession);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearSession();
    },
  });
};
