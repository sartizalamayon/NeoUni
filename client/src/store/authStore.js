// src/store/authStore.js

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      role: null,
      
      // Login action
      login: (userData) => set({
        user: userData,
        isAuthenticated: true,
        role: userData.role,
      }),
      
      // Logout action
      logout: () => set({
        user: null,
        isAuthenticated: false,
        role: null,
      }),
      
      // Update user information
      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData },
      })),
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
    }
  )
);

export default useAuthStore;