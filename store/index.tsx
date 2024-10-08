import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import modalSlice from './modalSlice';
import leftSidebarSlice from './leftSidebarSlice';
import authSlice from './authSlice'; // Import the authSlice

const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    leftSidebar: leftSidebarSlice,
    auth: authSlice, // Add authSlice to the store
  },
});

// Define and export the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Optionally, export AppDispatch for use with dispatch in components
export type AppDispatch = typeof store.dispatch;

export default store;
