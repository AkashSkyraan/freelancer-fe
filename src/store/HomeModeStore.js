import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useHomeModeStore = create(
  persist(
    (set) => ({
      homeMode: "freelancer",

      setHomeMode: (mode) => set({ homeMode: mode }),
    }),
    {
      name: "home-mode-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useHomeModeStore;
