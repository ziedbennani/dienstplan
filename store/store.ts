import { create } from "zustand";
// Define the shape of your store
interface FilterStore {
  filters: string[];
  setFilters: (filters: string[]) => void;
  data: any[];
  setData: (data: any[]) => void;
}

// Create the store
export const useFilterStore = create<FilterStore>((set) => ({
  filters: [],
  setFilters: (filters) => set({ filters }),
  data: [],
  setData: (data) => set({ data }),
}));
