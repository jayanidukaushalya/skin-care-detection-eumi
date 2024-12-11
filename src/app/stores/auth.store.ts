import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface AuthStore {
  jwt?: string
  userId?: string
  role?: string

  setAuth: (jwt: string, userId: string, role: string) => void
  clearAuth: () => void
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      jwt: undefined,
      userId: undefined,
      role: undefined,

      setAuth: (jwt, userId, role) => {
        set({ jwt, userId, role })
      },

      clearAuth: () => {
        set({ jwt: undefined, userId: undefined, role: undefined })
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAuthStore
