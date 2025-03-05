// src/store/uiStore.js

import { create } from 'zustand';

const useUIStore = create((set) => ({
  // Parallel Reality Layers
  activeLayer: 'time', // 'time', 'place', 'social', 'need'
  
  // Set active layer
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  
  // UI Theme
  colorMode: 'light',
  toggleColorMode: () => set((state) => ({ 
    colorMode: state.colorMode === 'light' ? 'dark' : 'light' 
  })),
  
  // Sidebar state (mobile responsive)
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  // Notification state
  notifications: [],
  addNotification: (notification) => set((state) => ({ 
    notifications: [...state.notifications, notification] 
  })),
  clearNotifications: () => set({ notifications: [] }),
}));

export default useUIStore;