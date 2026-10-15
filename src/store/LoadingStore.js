import { create } from "zustand";

const useLoadingStore = create((set) => ({
  isLoading: false,
  isApiLoading: false,
  isRouteLoading: false,

  // Use this for your existing API loading calls
  setIsLoading: (value) =>
    set((state) => ({
      isApiLoading: value,
      isLoading: value || state.isRouteLoading,
    })),

  // Use this when navigating between routes
  setRouteLoading: (value) =>
    set((state) => ({
      isRouteLoading: value,
      isLoading: state.isApiLoading || value,
    })),
}));

export default useLoadingStore;
