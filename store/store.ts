import { create } from "zustand";
// Define the shape of your store
interface FilterStore {
  filters: string[];
  setFilters: (filters: string[]) => void;
  data: any[];
  setData: (data: any[]) => void;
  triggered: boolean;
  setTriggered: (columns: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// Create the store
export const useFilterStore = create<FilterStore>((set) => ({
  filters: [],
  setFilters: (filters) => set({ filters }),
  data: [],
  setData: (data) => set({ data }),
  triggered: true,
  setTriggered: (triggered) => set({ triggered }),
  loading: true,
  setLoading: (loading) => set({ loading }),
}));
