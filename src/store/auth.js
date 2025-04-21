import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useAuthStore = create((set, get) => ({
  
  allUserData: null,

  
  loading: false,

 
  user: {
    get userId() {
      return get().allUserData?.user_id || null;
    },
    get username() {
      return get().allUserData?.username || null;
    },
  },

  
  setUser: (user) => set({ allUserData: user }),
  setLoading: (loading) => set({ loading }),

  
  isLoggedIn: () => get().allUserData !== null,
}));


if (
  process.env.NODE_ENV === "development" ||
  (typeof import.meta !== "undefined" && import.meta.env?.DEV)
) {
  mountStoreDevtool("Store", useAuthStore);
}

export { useAuthStore };
