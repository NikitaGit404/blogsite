import { create } from "zustand";

export const useGlobalStore = create((set) => ({
  blogData: [],
  setBlogData: (blogData) => set({ blogData }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));
