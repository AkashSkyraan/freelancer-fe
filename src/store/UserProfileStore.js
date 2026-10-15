import { create } from "zustand";
import { me } from "../api/auth.api";

const userProfileStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  fetchMe: async () => {
    try {
      const response = await me();

      if (
        !response?.success ||
        !response?.data ||
        typeof response.data !== "object" ||
        Object.keys(response.data).length === 0
      ) {
        set({
          user: null,
          isAuthenticated: false,
        });

        return false;
      }

      set({
        user: response.data,
        isAuthenticated: true,
      });
      return true;
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      return false;
    }
  },

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

export default userProfileStore;
