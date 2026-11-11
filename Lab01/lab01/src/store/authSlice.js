import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAdmin: false },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
    },
    clearAuthUser: (state) => { state.user = null; state.isAdmin = false; },
  },
});

export const { setAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
