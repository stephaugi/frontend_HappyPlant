import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getItem, setItem, deleteItemAsync } from "expo-secure-store";

type UserState = {
  isLoggedIn: boolean;
  shouldCreateAccount: boolean;
  hasPlants: boolean;
  logIn: () => void;
  logOut: () => void;
  updateHasPlants: () => void;
  updateHasNoPlants: () => void;
};

export const useAuthStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedIn: false,
      shouldCreateAccount: false,
      hasPlants: false,
      logIn: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: true,
          };
        });
      },
      logOut: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: false,
          };
        });
      },
      updateHasPlants: () => {
        set((state) => {
          return {
            ...state,
            hasPlants: true,
          };
        });
      },
      updateHasNoPlants: () => {
        set((state) => {
          return {
            ...state,
            hasPlants: false,
          };
        });
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    },
  ),
);
