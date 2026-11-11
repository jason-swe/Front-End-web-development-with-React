import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {
    setCategories: (state, action) => { state.items = action.payload; state.status = 'ready'; state.error = null; },
    setCategoriesError: (state, action) => { state.status = 'error'; state.error = action.payload; },
  },
});

export const { setCategories, setCategoriesError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
