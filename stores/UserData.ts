import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserDataState {
  birthDate: number | undefined
  setBirthDate: (date: number | undefined) => void
  didOnboard: boolean
  setDidOnboard: (didOnboard: boolean) => void
}

export const useUserDataStore = create<UserDataState>()(
  persist(
    (set) => ({
      birthDate: undefined,
      setBirthDate: (birthDate) => set({ birthDate }),
      didOnboard: false,
      setDidOnboard: (didOnboard) => set({ didOnboard }),
    }),
    {
      name: 'user-data',
    }
  )
)
