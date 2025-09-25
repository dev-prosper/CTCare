import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  employeeId: string | null;
  roles: string[] | null;
  setUser: (employeeId: string, roles: string[]) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      employeeId: null,
      roles: null,
      setUser: (employeeId, roles) => set({ employeeId, roles }),
      clear: () => set({ employeeId: null, roles: null }),
    }),
    {
      name: "auth-store",
    },
  ),
);
