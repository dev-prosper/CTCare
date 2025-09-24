// import { create } from "zustand";

// type AuthState = {
//   accessToken: string | null;
//   refreshToken: string | null;
//   setTokens: (access: string, refresh: string) => void;
//   clear: () => void;
// };

// export const useAuthStore = create<AuthState>((set) => ({
//   accessToken: null,
//   refreshToken: null,
//   setTokens: (access, refresh) => set({ accessToken: access, refreshToken: refresh }),
//   clear: () => set({ accessToken: null, refreshToken: null }),
// }));

import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (access: string, refresh: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  setTokens: (access, refresh) =>
    set({ accessToken: access, refreshToken: refresh }),
  clear: () => set({ accessToken: null, refreshToken: null }),
}));
