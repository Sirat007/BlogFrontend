
// import { create } from 'zustand';


// import { mountStoreDevtool } from 'simple-zustand-devtools';


// const useAuthStore = create((set, get) => ({
   
//     allUserData: null, 

    
//     loading: false,

   
//     user: () => ({
//         user_id: get().allUserData?.user_id || null,
//         username: get().allUserData?.username || null,
//     }),

   
//     setUser: (user) => set({ allUserData: user }),

    
//     setLoading: (loading) => set({ loading }),

    
//     // isLoggedIn: () => get().allUserData !== null,
//     isLoggedIn: get().allUserData !== null,
// }));


// // if (import.meta.env.DEV) {
// //     mountStoreDevtool('Store', useAuthStore);
// // }
// if ((process.env.NODE_ENV === 'development') || 
//     (typeof import.meta !== 'undefined' && import.meta.env?.DEV)) {
//   mountStoreDevtool('Store', useAuthStore);
// }


// export { useAuthStore };

import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const useAuthStore = create((set, get) => ({
    // User data stored here
    allUserData: null,
    
    // Loading state
    loading: false,

    // User info selector - memoized as a property, not a function
    user: {
        get userId() { return get().allUserData?.user_id || null },
        get username() { return get().allUserData?.username || null }
    },

    // Actions
    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    
    // Check if user is logged in - defined as a property, not a function
    isLoggedIn: () => get().allUserData !== null,
}));

// Enable DevTools only in development
if ((process.env.NODE_ENV === 'development') || 
    (typeof import.meta !== 'undefined' && import.meta.env?.DEV)) {
  mountStoreDevtool('Store', useAuthStore);
}

export { useAuthStore };