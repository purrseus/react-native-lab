import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createPersistOptions from './persistStorage';

interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthState extends Tokens {
  setTokens: (tokens: Partial<Tokens>) => void;
  clearTokens: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    immer(set => ({
      accessToken: null,
      refreshToken: null,
      setTokens: ({ accessToken, refreshToken }) =>
        set(state => {
          if (accessToken) state.accessToken = accessToken;
          if (refreshToken) state.refreshToken = refreshToken;
        }),
      clearTokens: () =>
        set(state => {
          state.accessToken = null;
          state.refreshToken = null;
        }),
    })),
    createPersistOptions<AuthState>('auth'),
  ),
);

export default useAuthStore;
