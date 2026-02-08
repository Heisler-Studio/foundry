export interface AuthState {
  token: string | null;
  user: User | null;
  setSession: (session: UserSession) => void;
  clearSession: () => void;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  token: string;
  user: User;
}

export interface LoginParams {
  provider: string;
  code: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
