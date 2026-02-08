// packages/data/features/auth/store.ts
import { create } from 'zustand';
import { AuthState } from './types';

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setSession: (session) => set({ token: session.token, user: session.user }),
  clearSession: () => set({ token: null, user: null }),
}));
