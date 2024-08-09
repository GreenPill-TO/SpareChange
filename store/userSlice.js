import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch user details
export const fetchUserDetail = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`);
      return response.data.payload;
    } catch (error) {
      // Handle the error and pass it to the rejected state
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user details');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    pageTitle: "User", 
    credits: 0, 
    name: "",
    isLoggedIn: false,
    token: null,
    scrollId: new Date().getTime(),
    isLoading: false,
    error: null, // Add an error state to handle errors
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      if (!action.payload) {
        state.token = null;
        axios.defaults.headers.common['Authorization'] = null;
      }
    },
    setCredits: (state, action) => {
      state.credits = action.payload;
    },
    updateCredits: (state, action) => {
      state.credits += action.payload;
    },
    setScrollId: (state, action) => {
      state.scrollId = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error state on new request
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.credits = action.payload.credits;
        state.name = action.payload.name;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch user details';
      });
  }
});

// Export actions and reducer
export const { setLoggedIn, setToken, setCredits, setScrollId, updateCredits } = userSlice.actions;

export default userSlice.reducer;
